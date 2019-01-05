import React from 'react';
import withSubscribe from './withSubscribe.js'
import { Container, Row, Col, Card, CardImg, CardHeader } from 'reactstrap';
import Style from 'style-it';
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
        return (Style.it (`
                @import url('https://fonts.googleapis.com/css?family=PT+Sans');

                h3 {
                    font-family: 'Cantora One';
                }

                .list-group {
                    font-family: 'PT Sans';
                }

                .card {
                    margin-bottom: 15px;
                }

                .card-img {
                    height: 250px;
                    object-fit: cover;
                    object-position: 50% 15%;
                }
            `,
            <Container>
                <Row>
                    <Col xs='12' md='4'>
                        <Card>
                            <CardHeader tag='h3'>
                                {this.props.container.state.personagem.nome}
                            </CardHeader>
                            <CardImg src={this.props.container.state.personagem.img} />
                        </Card>

                        <DadosDeVida />
                        <EspacosDeMagia />

                    </Col>

                    <Col xs ='12' md='8'>
                        <Habilidades />
                        <Magias />

                    </Col>
                </Row>
            </Container>
        ))
    }
}

export default withSubscribe(Detalhes);