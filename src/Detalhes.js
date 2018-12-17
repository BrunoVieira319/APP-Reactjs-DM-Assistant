import React from 'react';
import { Subscribe } from 'unstated';
import StateComponent from './StateComponent';
import { Container, Row, Col } from 'reactstrap';
import DadosDeVida from './componentsDetalhes/DadosDeVida.js';
import Habilidades from './componentsDetalhes/Habilidades.js';
import EspacosDeMagia from './componentsDetalhes/EspacosDeMagia.js';
import Magias from './componentsDetalhes/Magias.js'

export default function container({match}) {
    return (
        <Subscribe to={[StateComponent]}>
            {sc => <Detalhes container={sc} index={match.params.index}/>}
        </Subscribe>
    )
}

class Detalhes extends React.Component {

    constructor() {
        super();
        this.state = {
            isLoading: true,
            dados: {}
        }
    }

    componentDidMount = () => {
        fetch('http://localhost:3009/personagem', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        }).then( response => 
            response.json())
        .then( dados => {
                this.props.container.setState({listaPersonagens: dados});
                this.setState({dados: dados});
        }).then(() => {
            this.setState({isLoading: false})
        })
    }

    componentDidUpdate = () => {
        fetch('http://localhost:3009/personagem', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        }).then( response => 
            response.json())
        .then( dados => {
            let update = false;
            for (let i = 0; i < dados.length; i++) {
                if ( dados.map(personagem => personagem._rev)[i] !== 
                    this.state.dados.map(personagem => personagem._rev)[i] ) {
                    update = true;
                }
            }
            if (update) {
                this.props.container.setState({listaPersonagens: dados});
                this.setState({dados: dados});
            }
        })
    }


    render = () => {
        return this.state.isLoading ? <p>loading</p> :
            <Container>
                <h2>
                    {this.props.container.state.listaPersonagens[this.props.index].nome}
                </h2>

                <Row>
                    <Col xs='12' md='4'>
                        <DadosDeVida index={this.props.index} />
                        <EspacosDeMagia index={this.props.index} />

                    </Col>

                    <Col xs ='12' md='8'>
                        <Habilidades index={this.props.index} />
                        <Magias index={this.props.index} />

                    </Col>
                </Row>
            </Container>
    }
}