import { Container } from "unstated";

export default class StateComponent extends Container {
    state = {
        listaPersonagens: [],
        magias: [],
        magiasRetornadas: [],
        personagem: {},
        nome: "",
        nivel: '',
        vidaMax: '',
        valorVida: '',
        raca: "",
        classe: "",
        img: "",
        recuperacao: "",
        qtdUsosMaximo: '',
        descricao: "",
        quantidadeMaxima: 1,
        ritual: undefined,
        escola: "",
        tempoDeConjuracao: "",
        alcance: "",
        duracao: "",
        componentes: "",
        modalMagia: false,
        modalHabilidade: false,
        modalEspacosMagia: false,
        modalRemover: false
    };

    handleNome = (e) => { this.setState({ nome: e.target.value }) }
    handleNivel = (e) => { this.setState({ nivel: e.target.value }) }
    handleVidaMax = (e) => { this.setState({ vidaMax: e.target.value }) }
    handleRaca = (e) => { this.setState({ raca: e.target.value }) }
    handleClasse = (e) => { this.setState({ classe: e.target.value }) }
    handleImg = (e) => { this.setState({ img: e.target.value }) }
    handleValorVida = (e) => { this.setState({ valorVida: e.target.value }) } 
    handleRecuperacao = (e) => { this.setState({ recuperacao: e.target.value }) } 
    handleQtdUsosMaximo = (e) => { this.setState({ qtdUsosMaximo: e.target.value }) } 
    handleDescricao = (e) => { this.setState({ descricao: e.target.value }) }
    handleQuantidadeMaxima = (e) => { this.setState({quantidadeMaxima: e.target.value}) }
    handleEscola = (e) => { this.setState({ escola: e.target.value }).then(() => console.log(this.state.escola))}
    handleRitual = (e) => { this.setState({ ritual: e.target.value }) }
    handleTempoDeConjuracao = (e) => { this.setState({ tempoDeConjuracao: e.target.value}) }
    handleAlcance = (e) => { this.setState({ alcance: e.target.value }) }
    handleDuracao = (e) => { this.setState({ duracao: e.target.value }) }
    handleComponentes = (e) => { this.setState({ componentes: e.target.value }) }

    toggleModalHabilidade = () => {
        this.setState({
            modalHabilidade: !this.state.modalHabilidade
        })
    }

    toggleModalEspacosMagia = () => {
        this.setState({
            modalEspacosMagia: !this.state.modalEspacosMagia
        })
    }

    toggleModalMagia = () => {
        this.setState({
            modalMagia: !this.state.modalMagia
        })
    }

    toggleModalRemover = () => {
        this.setState({
            modalRemover: !this.state.modalRemover
        })
    }

    resetarState = () => {
        this.setState({
            nome: "",
            nivel: '',
            vidaMax: '',
            valorVida: '',
            raca: "",
            classe: "",
            img: "",
            recuperacao: "",
            qtdUsosMaximo: '',
            descricao: "",
            quantidadeMaxima: 1,
            ritual: undefined,
            escola: "",
            tempoDeConjuracao: "",
            alcance: "",
            duracao: "",
            componentes: ""
        })
    }

    setVidaAtual = (indexPersonagem) => {
        let lista = this.state.listaPersonagens;
        let caracterComparativo = this.state.valorVida.charAt(0);
        let vidaAtual = lista[indexPersonagem].vidaAtual;
        let vidaAtualizada = 0;
        
        if (caracterComparativo === "+") {
            vidaAtualizada = parseInt(vidaAtual) + parseInt(this.state.valorVida);
        } else if (caracterComparativo === "/") {

        } else {
            vidaAtualizada = parseInt(vidaAtual) - parseInt(this.state.valorVida);
        }

        vidaAtualizada = Math.max(vidaAtualizada, 0)
        vidaAtualizada = Math.min(vidaAtualizada, lista[indexPersonagem].vidaMax)

        lista[indexPersonagem].vidaAtual = vidaAtualizada;
        let id = lista[indexPersonagem].id;

        fetch(`http://localhost:3009/personagem/${id}/vida/${vidaAtualizada}`, {
            method: "PUT"
        }).then( response => {
            if (response.status === 200) {
                this.setState({
                    listaPersonagens: lista,
                    valorVida: ""
                })
            }
        })
    }

    descansar = (idPersonagem) => {
        let personagens = this.state.listaPersonagens;
        let personagem = personagens.find(p => p.id === idPersonagem);
        let indicePersonagem = personagens.findIndex(p => p.id === idPersonagem);

        fetch(`http://localhost:3009/personagem/${idPersonagem}/descansar`, {
            method: 'PUT'
        }).then( response => {
            if (response.status === 200) {
                personagem.vidaAtual = personagem.vidaMax;
                personagens[indicePersonagem] = personagem;

                this.setState({
                    listaPersonagens: personagens
                })
            }
        })
    }

    pesquisarMagias = (e) => {
        let nomeMagia = e.target.value;

        if (nomeMagia.length > 1) {
            fetch(`http://localhost:3009/magia/nome=${nomeMagia}`, {
                method: 'GET',
                
            }).then( response => response.json()
            ).then( dados => 
                this.setState({
                    nome: nomeMagia,
                    magiasRetornadas: dados
                })
            )
        } else {
            this.setState({
                magias: []
            })
        }
    }

    usarHabilidade = (idHabilidade) => {
        let personagem = this.state.personagem;
        let habilidade = personagem.habilidades.find(hp => hp.habilidade.id === idHabilidade);

        if (habilidade.qtdUsosRestantes > 0) {
            fetch(`http://localhost:3009/personagem/${personagem.id}/habilidade/${idHabilidade}/usar`, {
                method: 'PUT'
            }).then(response => {
                if (response.status === 200) {

                    personagem.habilidades.forEach(hp => {
                        if (hp.id === habilidade.id) {
                            hp.qtdUsosRestantes -= 1;
                        }
                    })

                    this.setState({
                        personagem: personagem
                    })
                }
            })
        }
    }

    conjurarMagia = (nivel) => {
        let personagem = this.state.personagem;
        let espacoDeMagia = personagem.espacosDeMagia.find(e => e.nivel === nivel);

        if (espacoDeMagia.quantidade > 0) {
            fetch(`http://localhost:3009/personagem/${personagem.id}/espacoDeMagia/${nivel}/usar`,{
                method: 'PUT'
            }).then(response => {
                if (response.status === 200) {
                    personagem.espacosDeMagia.forEach(e => {
                        if (e.nivel === nivel) e.quantidade -= 1;
                    })
                    
                    this.setState({
                        personagem: personagem
                    })
                }
            })
        }
    }

    prepararMagia = (idMagia) => {
        let personagem = this.state.personagem

        fetch(`http://localhost:3009/personagem/${personagem.id}/magia/${idMagia}/preparar`, {
            method: 'PUT'
        }).then( response => {
            if (response.status === 200) {
                personagem.magias.forEach(m => {
                    if (m.magia.id === idMagia) m.preparada = true ;
                })

                this.setState({
                    personagem: personagem
                })
            } else {
                response.json().then(response => alert(response.message))
            }
        })
    }

    desprepararMagia = (idMagia) => {
        let personagem = this.state.personagem

        fetch(`http://localhost:3009/personagem/${personagem.id}/magia/${idMagia}/despreparar`, {
            method: 'PUT'
        }).then( response => {
            if (response.status === 200) {
                personagem.magias.forEach(m => {
                    if (m.magia.id === idMagia) m.preparada = false ;
                })

                this.setState({
                    personagem: personagem
                })
            } else {
                response.json().then(response => alert(response.message))
            }
        })
    }

    restaurarUsos = (idHabilidade) => {
        let personagem = this.state.personagem;
        let habilidade = personagem.habilidades.find(hp => hp.habilidade.id === idHabilidade);

        if (habilidade.qtdUsosRestantes < habilidade.qtdUsosMaximo) {
            fetch(`http://localhost:3009/personagem/${personagem.id}/habilidade/${idHabilidade}/restaurar`, {
                method: 'PUT'
            }).then(response => {
                if (response.status === 200) {

                    personagem.habilidades.forEach(hp => {
                        if (hp.id === habilidade.id) {
                            hp.qtdUsosRestantes = hp.qtdUsosMaximo;
                        }
                    })

                    this.setState({
                        personagem: personagem
                    })
                }
            })
        }
    }

    restaurarEspaco = (nivel) => {
        let personagem = this.state.personagem;
        let espacoDeMagia = personagem.espacosDeMagia.find(e => e.nivel === nivel);

        if (espacoDeMagia.quantidade < espacoDeMagia.quantidadeMaxima) {
            fetch(`http://localhost:3009/personagem/${personagem.id}/espacoDeMagia/${nivel}/restaurar`, {
                method: 'PUT'
            }).then(response => {
                if (response.status === 200) {

                    personagem.espacosDeMagia.forEach(e => {
                        if (e.nivel === nivel) {
                            e.quantidade += 1;
                        }
                    })

                    this.setState({
                        personagem: personagem
                    })
                }
            })
        }
    }

    removerPersonagem = (id) => {
        fetch(`http://localhost:3009/personagem/${id}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.status === 200) {
                alert('Personagem removido')
                this.setState({
                    modalRemover: false
                })
            }
        })
    }

    deletarHabilidade = (idHabilidade) => {
        let personagem = this.state.personagem;

        fetch(`http://localhost:3009/personagem/${personagem.id}/habilidade/${idHabilidade}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.status === 200) {
                let habilidadesAtualizada = personagem.habilidades.filter(hp => hp.habilidade.id !== idHabilidade);
                personagem.habilidades = habilidadesAtualizada;

                this.setState({
                    personagem: personagem
                })
            }
        })    
    }

    removerMagia = (idMagia) => {
        let personagem = this.state.personagem;

        fetch(`http://localhost:3009/personagem/${personagem.id}/magia/${idMagia}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.status === 200) {
                let magiasAtualizada = personagem.magias.filter(m => m.magia.id !== idMagia);
                personagem.magias = magiasAtualizada;

                this.setState({
                    personagem: personagem
                })
            }
        }) 
    }

    editarPersonagem = (id) => {
        if (this.state.nivel === '' && this.state.vidaMax === '' && this.state.img === '') {
            return alert("Nenhum campo preenchido")
        }

        let personagem = {
            id: id,
            nivel: this.state.nivel,
            vidaMax: this.state.vidaMax,
            img: this.state.img
        }

        fetch(`http://localhost:3009/personagem`, {
            method: 'PUT',
            body: JSON.stringify(personagem),
            headers: { 
                "Content-Type": "application/json"
            }
        }).then( response => {
            if (response.status === 200) {
                alert("Personagem editado")
                this.resetarState();
            }
        })
    }

    adicionarMagiaParaPersonagem = (idMagia) => {
        fetch(`http://localhost:3009/personagem/${this.state.personagem.id}/magia/${idMagia}`, {
            method: 'POST'
        }).then( response => {
            if (response.status === 200) {
                this.atualizarPersonagem();
            }
        })
    }

    usarDadoVida = (id) => {
        let personagem = this.state.personagem;

        if (personagem.dadosDeVida > 0) {
            fetch(`http://localhost:3009/personagem/${id}/dadoDeVida`, {
                method: 'PUT'
            }).then(response => {
                if (response.status === 200) {
                    personagem.dadosDeVida -= 1;
                    this.setState({
                        personagem: personagem
                    })
                }
            })
        }
    }
    
    adicionarHabilidade = () => {
        let habilidade = {
            nome: this.state.nome,
            qtdUsosMaximo: this.state.qtdUsosMaximo,
            recuperacao: this.state.recuperacao,
            descricao: this.state.descricao
        }

        fetch(`http://localhost:3009/personagem/${this.state.personagem.id}/habilidade`, {
            method: 'POST',
            body: JSON.stringify(habilidade),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.status === 200) {
                this.atualizarPersonagem();
            }
        })
    }

    adicionarMagia = (indexPersonagem) => {
        let magia = {
            nome: this.state.nome,
            nivel: this.state.nivel,
            ritual: this.state.ritual,
            escola: this.state.escola,
            tempoDeConjuracao: this.state.tempoDeConjuracao,
            alcance: this.state.alcance,
            duracao: this.state.duracao,
            componentes: this.state.componentes,
            descricao: this.state.descricao
        }

        fetch(`http://localhost:3009/magia`, {
            method: 'POST',
            body: JSON.stringify(magia),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.status === 200) {
                alert("Magia Adicionada com Sucesso");
                this.resetarState();
            }  else {
                response.json().then(response => alert(response.message))
            }
        })
    }

    adicionarEspacosMagia = () => {
        let espacoDeMagia = {
            nivel: this.state.nivel,
            quantidadeMaxima: this.state.quantidadeMaxima,
        }

        fetch(`http://localhost:3009/personagem/${this.state.personagem.id}/espacoDeMagia`, {
            method: 'POST',
            body: JSON.stringify(espacoDeMagia),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.status === 200) {
                this.atualizarPersonagem();
            }
        })
    }

    adicionarPersonagem = () => {
        let char = {
            nome: this.state.nome,
            nivel: this.state.nivel,
            vidaMax: this.state.vidaMax,
            raca: this.state.raca,
            classe: this.state.classe,
            img: this.state.img,
        };

        fetch('http://localhost:3009/personagem', {
            method: 'POST',
            body: JSON.stringify(char),
            headers: { "Content-Type": "application/json" }
        }).then((response) => {
            if (response.status === 200) {    
                this.resetarState();
                alert('Personagem adicionado');
            } else {
                alert("Falha ao adicionar personagem");
            }
        })
    }

    atualizarPersonagem = () => {
        fetch(`http://localhost:3009/personagem/${this.state.personagem.id}/detalhes`, {
            method: 'GET'
        }).then( response => 
            response.json()
        ).then( dados => {
            this.setState({
                personagem: dados,
                modalHabilidade: false,
                modalMagia: false,
                modalEspacosMagia: false,
                nome: "",
                recuperacao: "",
                qtdUsosMaximo: '',
                descricao: "",
                magiasRetornadas: []
            });
        })
    }
}

