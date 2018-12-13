import { Container } from "unstated";

export default class StateComponent extends Container {
    state = {
        listaPersonagens: [],
        nome: "",
        nivel: '',
        vidaMax: '',
        vidaAtual: '',
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
        modalEspacosMagia: false
    };

    handleNome = (e) => { this.setState({ nome: e.target.value })}
    handleNivel = (e) => { this.setState({ nivel: e.target.value })}
    handleVidaMax = (e) => { this.setState({ vidaMax: e.target.value })}
    handleDadoVida = (e) => { this.setState({ dadoVida: e.target.value })}
    handleRaca = (e) => { this.setState({ raca: e.target.value })}
    handleClasse = (e) => { this.setState({ classe: e.target.value })}
    handleLink = (e) => { this.setState({ linkImg: e.target.value })}
    handleVidaAtual = (e) => { this.setState({ vidaAtual: e.target.value })} 
    handleNomeHabilidade = (e) => { this.setState({ nomeHabilidade: e.target.value })} 
    handleDescanso = (e) => { this.setState({ descanso: e.target.value })} 
    handleQuantiaUsosHabilidade = (e) => { this.setState({ quantiaUsosHabilidade: e.target.value })} 
    handleDescricaoHabilidade = (e) => { this.setState({ descricaoHabilidade: e.target.value })}
    handleNivelEspaco = (e) => { this.setState({nivelEspaco: e.target.value})}
    handleQuantiaEspacosMagia = (e) => { this.setState({quantiaEspacosMagia: e.target.value})}
    handleNomeMagia = (e) => { this.setState({ nomeMagia: e.target.value })} 
    handleDescricaoMagia = (e) => { this.setState({ descricaoMagia: e.target.value })}
    
    setVidaAtual = (indexPersonagem) => {
        let lista = this.state.listaPersonagens;
        lista[indexPersonagem].vidaAtual = Number.parseInt(this.state.vidaAtual);

        this.setState({
            listaPersonagens: lista,
            vidaAtual: ''
        })
    }

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

    togglePopoverHabilidade = (indexPersonagem, indexHabilidade) => {
        let lista = this.state.listaPersonagens;
        if (lista[indexPersonagem].listaHabilidades[indexHabilidade].descricaoHabilidade !== "") {
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

    usarDadoVida = (indexPersonagem) => {
        let lista = this.state.listaPersonagens;
        lista[indexPersonagem].quantiaDadosVida -= 1; 
        this.setState({
            listaPersonagens: lista
        })
    }

    usarHabilidade = (indexPersonagem, indexHabilidade) => {
        let lista = this.state.listaPersonagens;
        lista[indexPersonagem].listaHabilidades[indexHabilidade].usosRestantes -= 1;
        this.setState({
            listaPersonagens: lista
        })
    }

    conjurarMagia = (indexPersonagem, indexEspaco) => {
        let lista = this.state.listaPersonagens;
        if (lista[indexPersonagem].espacosDeMagia[indexEspaco].espacosRestantes !== 0) {
            lista[indexPersonagem].espacosDeMagia[indexEspaco].espacosRestantes -= 1;
        }
        this.setState({
            listaPersonagens: lista
        })
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
        this.setState({
            listaPersonagens: lista
        })
    }

    restaurarDadosVida = (indexPersonagem) => {
        let lista = this.state.listaPersonagens;
        lista[indexPersonagem].quantiaDadosVida = lista[indexPersonagem].nivel; 
        this.setState({
            listaPersonagens: lista
        })
    }

    restaurarUmEspaco = (indexPersonagem, nivelEspaco) => {
        let lista = this.state.listaPersonagens;
        lista[indexPersonagem].espacosDeMagia.forEach(espaco => {
            if (espaco.nivel === nivelEspaco && espaco.espacosRestantes < espaco.quantiaEspacos) {
                espaco.espacosRestantes += 1;
            }
        })
        this.setState({
            listaPersonagens: lista
        })
    }

    restaurarEspacos = (indexPersonagem) => {
        let lista = this.state.listaPersonagens;
        lista[indexPersonagem].espacosDeMagia.forEach(espaco => {
            espaco.espacosRestantes = espaco.quantiaEspacos;
        })
        this.setState({
            listaPersonagens: lista
        })
    }

    deletarHabilidade = (indexPersonagem, indexHabilidade) => {
        let lista = this.state.listaPersonagens;
        let listaHabilidadesAtualizada = lista[indexPersonagem].listaHabilidades.filter((habilidade, i) => i !== indexHabilidade);
        lista[indexPersonagem].listaHabilidades = listaHabilidadesAtualizada;
        this.setState({
            listaPersonagens: lista
        })
    }

    deletarMagia = (indexPersonagem, indexMagia) => {
        let lista = this.state.listaPersonagens;
        let listaMagiasAtualizada = lista[indexPersonagem].listaMagias.filter((magia, i) => i !== indexMagia);
        lista[indexPersonagem].listaMagias = listaMagiasAtualizada;
        this.setState({
            listaPersonagens: lista
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

        this.setState({
            listaPersonagens: lista,
            modalHabilidade: false,
            nomeHabilidade: "",
            descanso: "Curto",
            quantiaUsosHabilidade: '',
            descricaoHabilidade: ""
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

        this.setState({
            listaPersonagens: lista,
            nomeMagia: "",
            descricaoMagia: "",
            modalMagia: false
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

        this.setState({
            listaPersonagens: lista,
            modalEspacosMagia: false,
            nivelEspaco: 1,
            quantiaEspacosMagia: 1
        })
    }

    adicionarPersonagem = () => {
        let char = {};
        if (this.state.nome === "") {
            char = {
                nome: "Driytjan",
                nivel: 3,
                vidaMax: 10,
                vidaAtual: 10,
                raca: "Humano",
                classe: "Clérigo",
                quantiaDadosVida: 3,
                listaHabilidades: [
                    {
                        nomeHabilidade: "Canalizar Divindade",
                        quantiaUsosHabilidade: 2,
                        usosRestantes: 2,
                        descanso: "Curto",
                        descricaoHabilidade: "Gastando 1 Canalizar Divindade todos os mortos-vivos a 9m que possam te ver e ouvir devem passar em resistência de Sabedoria ou serem Afastados por 1 minuto ou até sofrerem dano. Uma criatura Afastada deve se mover o mais longe possível do clérigo, não pode se mover para menos de 9m dele e não pode fazer Reações. Suas únicas ações permitidas são Corrida e tentar se livrar de algo que o impeça de fugir. Caso não tenha para onde fugir a criatura pode usar a ação Esquiva.",
                        popoverOpen: false
                    }
                ],
                listaMagias: [],
                espacosDeMagia: [],
                linkImg: "https://vignette.wikia.nocookie.net/quiz-rpg-the-world-of-mystic-wiz/images/7/79/Asward_%28Novice_Assassin%29_transparent.png/revision/latest?cb=20140911025632",
            };
        } else {
            char = {
                nome: this.state.nome,
                nivel: this.state.nivel,
                vidaMax: this.state.vidaMax,
                vidaAtual: this.state.vidaMax,
                raca: this.state.raca,
                classe: this.state.classe,
                quantiaDadosVida: this.state.nivel,
                linkImg: this.state.linkImg,
                listaHabilidades: [],
                listaMagias: [],
                espacosDeMagia: [],
            };
        }

        fetch('http://localhost:3009/', {
            method: 'POST',
            body: JSON.stringify(char),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if(response.status == 200) {
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
    
    inicializarListaPersonagens = (lista) => {
        this.setState({
            listaPersonagens: lista
        })
        console.log(this.state.listaPersonagens)
    }
}

