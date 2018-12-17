import { Container } from "unstated";

export default class StateComponent extends Container {
    state = {
        listaPersonagens: [],
        nome: "",
        nivel: '',
        vidaMax: '',
        valorVida: '',
        raca: "",
        classe: "",
        linkImg: "",
        nomeHabilidade: "",
        descanso: "Curto",
        quantiaUsosHabilidade: '',
        descricaoHabilidade: "",
        nivelEspaco: 1,
        quantiaEspacosMagia: 1,
        nomeMagia: "",
        descricaoMagia: "",
        modalMagia: false,
        modalHabilidade: false,
        modalEspacosMagia: false,
        modalRemover: false
    };

    handleNome = (e) => { this.setState({ nome: e.target.value })}
    handleNivel = (e) => { this.setState({ nivel: e.target.value })}
    handleVidaMax = (e) => { this.setState({ vidaMax: e.target.value })}
    handleDadoVida = (e) => { this.setState({ dadoVida: e.target.value })}
    handleRaca = (e) => { this.setState({ raca: e.target.value })}
    handleClasse = (e) => { this.setState({ classe: e.target.value })}
    handleLink = (e) => { this.setState({ linkImg: e.target.value })}
    handleValorVida = (e) => { this.setState({ valorVida: e.target.value })} 
    handleNomeHabilidade = (e) => { this.setState({ nomeHabilidade: e.target.value })} 
    handleDescanso = (e) => { this.setState({ descanso: e.target.value })} 
    handleQuantiaUsosHabilidade = (e) => { this.setState({ quantiaUsosHabilidade: e.target.value })} 
    handleDescricaoHabilidade = (e) => { this.setState({ descricaoHabilidade: e.target.value })}
    handleNivelEspaco = (e) => { this.setState({nivelEspaco: e.target.value})}
    handleQuantiaEspacosMagia = (e) => { this.setState({quantiaEspacosMagia: e.target.value})}
    handleNomeMagia = (e) => { this.setState({ nomeMagia: e.target.value })} 
    handleDescricaoMagia = (e) => { this.setState({ descricaoMagia: e.target.value })}

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

    togglePopoverHabilidade = (indexPersonagem, indexHabilidade) => {
        let lista = this.state.listaPersonagens;
        let descricaoHabilidade = lista[indexPersonagem].listaHabilidades[indexHabilidade].descricaoHabilidade;
        if (descricaoHabilidade !== "") {
            let popover = lista[indexPersonagem].listaHabilidades[indexHabilidade].popoverOpen;
            lista[indexPersonagem].listaHabilidades[indexHabilidade].popoverOpen = !popover;
            this.setState({
                listaPersonagens: lista
            })
        }
    }

    togglePopoverMagia = (indexPersonagem, indexMagia) => {
        let lista = this.state.listaPersonagens;
        if (lista[indexPersonagem].listaMagias[indexMagia].descricaoMagia !== "") {
            let popover = lista[indexPersonagem].listaMagias[indexMagia].popoverOpen;
            lista[indexPersonagem].listaMagias[indexMagia].popoverOpen = !popover;
            this.setState({
                listaPersonagens: lista
            })
        }
    }

    resetarState = () => {
        this.setState({
            nome: "",
            nivel: '',
            vidaMax: '',
            valorVida: "",
            raca: "",
            classe: "",
            linkImg: "",
            nomeHabilidade: "",
            descanso: "Curto",
            quantiaUsosHabilidade: '',
            descricaoHabilidade: "",
            nivelEspaco: 1,
            quantiaEspacosMagia: 1,
            nomeMagia: "",
            descricaoMagia: ""
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

        this.atualizarPersonagem(lista[indexPersonagem]).then(() => {
            this.setState({
                listaPersonagens: lista,
                valorVida: ""
            })
        })
    }

    iniciarUpdate = (indexPersonagem) => {
        let personagem = this.state.listaPersonagens[indexPersonagem]
        this.setState({
            nome: personagem.nome,
            nivel: personagem.nivel,
            vidaMax: personagem.vidaMax,
            linkImg: personagem.linkImg
        })
    }

    editarPersonagem = (i) => {
        let lista = this.state.listaPersonagens;
        lista[i].nome = this.state.nome;
        lista[i].vidaMax = this.state.vidaMax;
        lista[i].nivel = this.state.nivel;
        lista[i].linkImg = this.state.linkImg;

        this.atualizarPersonagem(lista[i]).then(() => {
            this.setState({
                listaPersonagens: lista,
                nome: "",
                nivel: '',
                vidaMax: '',
                linkImg: ""
            })
        })
    }

    usarDadoVida = (indexPersonagem) => {
        let lista = this.state.listaPersonagens;
        let quantiaDadosVida = lista[indexPersonagem].quantiaDadosVida;
        if (quantiaDadosVida > 0) {
            lista[indexPersonagem].quantiaDadosVida -= 1;
            this.atualizarPersonagem(lista[indexPersonagem]).then(() => {
                this.setState({
                    listaPersonagens: lista
                })
            })
        }
    }

    usarHabilidade = (indexPersonagem, indexHabilidade) => {
        let lista = this.state.listaPersonagens;
        let usosRestantes = lista[indexPersonagem].listaHabilidades[indexHabilidade].usosRestantes;
        
        if (usosRestantes > 0) {
            lista[indexPersonagem].listaHabilidades[indexHabilidade].usosRestantes -= 1;
            this.atualizarPersonagem(lista[indexPersonagem]).then(() => {
                this.setState({
                listaPersonagens: lista
                })
            })
        }
    }

    conjurarMagia = (indexPersonagem, indexEspaco) => {
        let lista = this.state.listaPersonagens;
        let espacosRestantes = lista[indexPersonagem].espacosDeMagia[indexEspaco].espacosRestantes;
        if (espacosRestantes > 0) {
            lista[indexPersonagem].espacosDeMagia[indexEspaco].espacosRestantes -= 1;

            this.atualizarPersonagem(lista[indexPersonagem]).then(() => {
                this.setState({
                listaPersonagens: lista
                })
            })
        }
    }

    prepararMagia = (indexPersonagem, indexMagia) => {
        let magiaParaPreparar = this.state.listaPersonagens[indexPersonagem].listaMagias[indexMagia];
        magiaParaPreparar.preparada = !magiaParaPreparar.preparada;
        let lista = this.state.listaPersonagens;
        lista[indexPersonagem].listaMagias[indexMagia] = magiaParaPreparar;

        this.setState({
            listaPersonagens: lista
        })
    }

    restaurarUsos = (indexPersonagem, indexHabilidade) => {
        let lista = this.state.listaPersonagens;
        let habilidade = lista[indexPersonagem].listaHabilidades[indexHabilidade];
        habilidade.usosRestantes = habilidade.quantiaUsosHabilidade;
        lista[indexPersonagem].listaHabilidades[indexHabilidade] = habilidade;

        this.atualizarPersonagem(lista[indexPersonagem]).then(() => {
            this.setState({
            listaPersonagens: lista
            })
        })
    }

    restaurarDadosVida = (indexPersonagem) => {
        let lista = this.state.listaPersonagens;
        lista[indexPersonagem].quantiaDadosVida = lista[indexPersonagem].nivel;

        this.atualizarPersonagem(lista[indexPersonagem]).then(() => {
            this.setState({
                listaPersonagens: lista,
            })
        })
    }

    restaurarUmEspaco = (indexPersonagem, nivelEspaco) => {
        let lista = this.state.listaPersonagens;
        lista[indexPersonagem].espacosDeMagia.forEach(espaco => {
            if (espaco.nivel === nivelEspaco && espaco.espacosRestantes < espaco.quantiaEspacos) {
                espaco.espacosRestantes += 1;

                this.atualizarPersonagem(lista[indexPersonagem]).then(() => {
                    this.setState({
                        listaPersonagens: lista,
                    })
                })
            }
        })
    }

    restaurarEspacos = (indexPersonagem) => {
        let lista = this.state.listaPersonagens;
        lista[indexPersonagem].espacosDeMagia.forEach(espaco => {
            espaco.espacosRestantes = espaco.quantiaEspacos;
        })

        this.atualizarPersonagem(lista[indexPersonagem]).then(() => {
            this.setState({
                listaPersonagens: lista,
            })
        })
    }

    removerPersonagem = (indexPersonagem) => {
        let personagem = this.state.listaPersonagens[indexPersonagem]
        fetch('http://localhost:3009/personagem', {
            method: "DELETE",
            body: JSON.stringify(personagem),
            headers: { "Content-Type": "application/json" }
        }).then(response => {
            if (response.status === 200) {
                this.toggleModalRemover();
            }
        })
    }

    deletarHabilidade = (indexPersonagem, indexHabilidade) => {
        let lista = this.state.listaPersonagens;
        let listaHabilidadesAtualizada = lista[indexPersonagem].listaHabilidades.filter((habilidade, i) => i !== indexHabilidade);
        lista[indexPersonagem].listaHabilidades = listaHabilidadesAtualizada;

        this.atualizarPersonagem(lista[indexPersonagem]).then(() => {
            this.setState({
                listaPersonagens: lista,
            })
        })
    }

    deletarMagia = (indexPersonagem, indexMagia) => {
        let lista = this.state.listaPersonagens;
        let listaMagiasAtualizada = lista[indexPersonagem].listaMagias.filter((magia, i) => i !== indexMagia);
        lista[indexPersonagem].listaMagias = listaMagiasAtualizada;

        this.atualizarPersonagem(lista[indexPersonagem]).then(() => {
            this.setState({
                listaPersonagens: lista,
            })
        })
    }
    
    adicionarHabilidade = (indexPersonagem) => {
        let habilidade = {
            nomeHabilidade: this.state.nomeHabilidade,
            quantiaUsosHabilidade: this.state.quantiaUsosHabilidade,
            usosRestantes: this.state.quantiaUsosHabilidade,
            descanso: this.state.descanso,
            descricaoHabilidade: this.state.descricaoHabilidade,
            popoverOpen: false
        }

        let lista = this.state.listaPersonagens;
        lista[indexPersonagem].listaHabilidades.push(habilidade);

        this.atualizarPersonagem(lista[indexPersonagem]).then(() => {
            this.setState({
                listaPersonagens: lista,
                modalHabilidade: false,
                nomeHabilidade: "",
                descanso: "Curto",
                quantiaUsosHabilidade: '',
                descricaoHabilidade: ""
            })
        })
    }

    adicionarMagia = (indexPersonagem) => {
        let magia = {
            nomeMagia: this.state.nomeMagia,
            descricaoMagia: this.state.descricaoMagia,
            preparada: false,
            popoverOpen: false
        }

        let lista = this.state.listaPersonagens;
        lista[indexPersonagem].listaMagias.push(magia);

        this.atualizarPersonagem(lista[indexPersonagem]).then(() => {
            this.setState({
                listaPersonagens: lista,
                nomeMagia: "",
                descricaoMagia: "",
                modalMagia: false
            })
        })
    }

    adicionarEspacosMagia = (indexPersonagem) => {
        let lista = this.state.listaPersonagens;
        let listaEspacos = lista[indexPersonagem].espacosDeMagia;
        let espacoDeMagia = {
            nivel: this.state.nivelEspaco,
            quantiaEspacos: this.state.quantiaEspacosMagia,
            espacosRestantes: this.state.quantiaEspacosMagia
        }

        if (listaEspacos.some(espaco => espaco.nivel === espacoDeMagia.nivel)) {
            listaEspacos = listaEspacos.filter(espaco => espaco.nivel !== espacoDeMagia.nivel)
        }

        listaEspacos.push(espacoDeMagia);
        listaEspacos.sort((a, b) => a.nivel - b.nivel);
        lista[indexPersonagem].espacosDeMagia = listaEspacos;

        this.atualizarPersonagem(lista[indexPersonagem]).then(() => {
            this.setState({
                listaPersonagens: lista,
                modalEspacosMagia: false,
                nivelEspaco: 1,
                quantiaEspacosMagia: 1
            })
        })
    }

    adicionarPersonagem = () => {
        let char = {
            nome: this.state.nome,
            nivel: this.state.nivel,
            vidaMax: this.state.vidaMax,
            vidaAtual: this.state.vidaMax,
            pvsTemporarios: 0,
            raca: this.state.raca,
            classe: this.state.classe,
            quantiaDadosVida: this.state.nivel,
            linkImg: this.state.linkImg,
            listaHabilidades: [],
            listaMagias: [],
            espacosDeMagia: [],
        };

        fetch('http://localhost:3009/personagem', {
            method: 'POST',
            body: JSON.stringify(char),
            headers: { "Content-Type": "application/json" }
        }).then((response) => {
            if(response.status === 200) {
                let lista = this.state.listaPersonagens;
                lista.push(char);
        
                this.setState({
                    listaPersonagens: lista,
                    nome: "",
                    nivel: '',
                    vidaMax: '',
                    raca: "",
                    classe: "",
                    dadoVida: "",
                    linkImg: ""
                })
            }
        })
    }

    atualizarPersonagem = (personagem) => {
        return fetch('http://localhost:3009/personagem', {
            method: 'PUT',
            body: JSON.stringify(personagem),
            headers: { "Content-Type": "application/json" }
        })
    }
}

