import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { FaUserCog, FaMedrt } from "react-icons/fa";
import Style from "style-it";
import { Container, Col, Row, Card, CardImg, CardBody, CardTitle, CardSubtitle, 
    Progress, UncontrolledCollapse, Input, InputGroup, Button } from 'reactstrap';
import withSubscribe from './withSubscribe.js';
import css from './css/Personagens.js';

class Personagens extends React.Component {

    componentDidMount = () => {
        fetch('http://localhost:3009/personagem', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        }).then( response => 
            response.json()
        ).then( dados => {
            this.props.container.setState({
                listaPersonagens: dados
            })
        })
    }

    corDaBarraDeVida = (vidaAtual, vidaMax) => {
        let percentualDeVida = vidaAtual * 100 / vidaMax ;
        if (percentualDeVida > 33) {
            return "barra-verde"
        } 
        return "barra-vermelha"
    }

    render = () => {
        let cnt = this.props.container;
    
        return( Style.it(css(),
            <Container>
                <h1>Personagens</h1>
                <Row>
                {cnt.state.listaPersonagens.map((personagem, i) => 
                    <Col xs='10' sm='6' md='3' key={i}>
                        <Card style={{margin: '15px 0'}}>
                            <Link to={`/${personagem.id}/detalhes`} >
                                <CardImg src={personagem.img} />
                            </Link>
                            <CardBody>
                                <Row>
                                    <Col sm="10">
                                        <CardTitle>
                                            {personagem.nome}
                                        </CardTitle>
                                        <CardSubtitle>{personagem.raca}{' '}{personagem.classe}{' '}{personagem.nivel}</CardSubtitle>
                                        HP : {personagem.vidaAtual} / {personagem.vidaMax}
                                    </Col>

                                    <Col sm="2" className="col-buttons">
                                        <Link to={`/${personagem.id}/editar`}>
                                            <Button 
                                                className="button-editar" 
                                                title="Editar Personagem"
                                                
                                            >
                                                <FaUserCog />
                                            </Button>
                                        </Link>

                                        <Button 
                                            className="button-descansar" 
                                            title="Descansar"
                                            onClick={() => cnt.descansar(personagem.id)}
                                        >
                                            <FaMedrt />
                                        </Button>
                                    </Col>
                                </Row>
                                <Progress 
                                    id={`toggler${i}`} 
                                    value={personagem.vidaAtual}
                                    max={personagem.vidaMax}
                                    onClick={() => document.getElementById(`input${i}`).focus()}
                                    barClassName={this.corDaBarraDeVida(personagem.vidaAtual, personagem.vidaMax)}
                                />
                                <UncontrolledCollapse toggler={`toggler${i}`} style={{marginTop: '3px'}}>
                                    <InputGroup size="sm">
                                        <Input 
                                            id={`input${i}`}
                                            value={cnt.state.valorVida} 
                                            onChange={cnt.handleValorVida} 
                                            onKeyPress={event => {
                                                if (event.key === "Enter") {
                                                    document.getElementById(`toggler${i}`).click();
                                                    cnt.setVidaAtual(i);
                                                }
                                            }}
                                        />
                                    </InputGroup>
                                    <div style={{fontSize:'11px'}}>X Dano ou +X Cura ou /X PVsTemp</div>
                                </UncontrolledCollapse>
                            </CardBody>

                        </Card>
                    </Col>
                )}
                </Row>
            </Container>
        ))
    }
}

export default withSubscribe(Personagens);