import React from 'react';
import StateComponent from './StateComponent.js';
import { Subscribe } from 'unstated';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { FaUserCog } from "react-icons/fa";
import { Container, Col, Row, Card, CardImg, CardBody, CardTitle, CardSubtitle, 
    Progress, UncontrolledCollapse, Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';


class Personagens extends React.Component {

    constructor() {
        super();
        this.listaPersonagens = [];
    }

    componentDidMount = () => {
        fetch('http://localhost:3009/personagens', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            return response.json();
        }).then((dados) => {
            this.listaPersonagens = dados;
        })
    }
  
    render = () => (
        <Subscribe to={[StateComponent]}>
            {sc => (
                <Container>
                    {() => sc.inicializarListaPersonagens(this.listaPersonagens)}
                    <h1>Personagens</h1>
                    <Row>
                    {sc.state.listaPersonagens.map((char, i) => 
                        <Col xs='10' sm='6' md='3' key={i}>
                            <Card style={{margin: '15px 0'}}>

                                <Link to={`/${i}/detalhes`} >
                                    <CardImg width="100%" style={{height: '250px', objectFit: 'cover'}} src={char.linkImg} />
                                </Link>
                                <CardBody>
                                    <CardTitle>
                                        {char.nome}
                                        <Button style={{padding: '2px 4px', float: 'right'}}>
                                            <FaUserCog style={{fontSize: '24px'}} />
                                        </Button>
                                    </CardTitle>
                                    <CardSubtitle>{char.raca}{' '}{char.classe}{' '}{char.nivel}</CardSubtitle>
                                    
                                    HP : {char.vidaAtual} / {char.vidaMax}
                                    <Progress id={`toggler${i}`} value={char.vidaAtual} max={char.vidaMax} />
                                    <UncontrolledCollapse toggler={`toggler${i}`} style={{marginTop: '3px'}}>
                                        <InputGroup size="sm">
                                            <Input value={sc.state.vidaAtual} onChange={sc.handleVidaAtual}/>
                                            <InputGroupAddon addonType="append">
                                                <Button color="success" onClick={() => sc.setVidaAtual(i)} id={`toggler${i}`}>Set</Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                        <div style={{fontSize:'11px'}}>X Dano ou +X Cura ou /X PVsTemp</div>
                                    </UncontrolledCollapse>
                                </CardBody>

                            </Card>
                        </Col>
                    )}
                    </Row>
                </Container>
            )}
        </Subscribe>
    )
}

export default Personagens;