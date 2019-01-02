import React from 'react';
import withSubscribe from './withSubscribe.js'
import { Container, Row, Col } from 'reactstrap';
import IconLoading from 'react-loading';
import DadosDeVida from './componentsDetalhes/DadosDeVida.js';
import Habilidades from './componentsDetalhes/Habilidades.js';
import EspacosDeMagia from './componentsDetalhes/EspacosDeMagia.js';
import Magias from './componentsDetalhes/Magias.js'

class Detalhes extends React.Component {

    constructor() {
        super();
        this.state = {
            isLoading: true,
        }
    }

    componentDidMount = () => {
        fetch(`http://localhost:3009/personagem/${this.props.match.params.id}/detalhes`, {
            method: 'GET',
        }).then( response => 
            response.json()
        ).then( dados => {
            this.props.container.setState({personagem: dados});
        }).then(() => {
            this.setState({isLoading: false})
        })
    }

    styleDivIconLoading = () => ({
        width:'100%', 
        height:'500px', 
        display:'flex', 
        justifyContent:'center', 
        alignItems: 'center'
    })

    render = () => {
        if (this.state.isLoading) {
            return (
                <div style={this.styleDivIconLoading()}>
                    <IconLoading type={"spokes"} color={"#2B4"} width={130} /> 
                </div>
            )
        } 
        return (
            <Container>
                <h2>
                    {this.props.container.state.personagem.nome}
                </h2>

                <Row>
                    <Col xs='12' md='4'>
                        <DadosDeVida />
                        <EspacosDeMagia />

                    </Col>

                    <Col xs ='12' md='8'>
                        <Habilidades />
                        <Magias />

                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withSubscribe(Detalhes);