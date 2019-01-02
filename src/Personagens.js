import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { FaUserCog } from "react-icons/fa";
import Style from "style-it";
import { Container, Col, Row, Card, CardImg, CardBody, CardTitle, CardSubtitle, 
    Progress, UncontrolledCollapse, Input, InputGroup, Button } from 'reactstrap';
import withSubscribe from './withSubscribe.js';


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

    render = () => (
        Style.it(`
            .card-img {
                height: 250px;
                object-fit: cover;
                object-position: 50% 10%;
                transition: 0.6s;
            }
            .card-img:hover {
                transform: scale(1.18);
            }
            a {
                overflow: hidden;
            }
            .button-config {
                padding: 2px 4px;
                float: right;
                background-color: #245;
            }
            .button-config:hover {
                background-color: #123;
            }
            .card-body {
                padding: 19px;
            }
            h1 {
                font-family: 'Cantora One';
                font-weight: bold;
                font-size: 50px;
            }
        `,
        <Container>
            <h1>Personagens</h1>
            <Row>
            {this.props.container.state.listaPersonagens.map((char, i) => 
                <Col xs='10' sm='6' md='3' key={i}>
                    <Card style={{margin: '15px 0'}}>
                        <Link to={`/${char.id}/detalhes`} >
                            <CardImg src={char.img} />
                        </Link>
                        <CardBody>
                            <CardTitle>
                                {char.nome}
                                <Link to={`/${i}/editar`}>
                                    <Button className={"button-config"} onClick={() => this.props.container.iniciarUpdate(i)}>
                                        <FaUserCog style={{fontSize: '24px'}} />
                                    </Button>
                                </Link>
                            </CardTitle>
                            <CardSubtitle>{char.raca}{' '}{char.classe}{' '}{char.nivel}</CardSubtitle>
                            
                            HP : {char.vidaAtual} / {char.vidaMax}
                            <Progress 
                                id={`toggler${i}`} 
                                value={char.vidaAtual} 
                                max={char.vidaMax}
                                onClick={() => document.getElementById(`input${i}`).focus()}
                            />
                            <UncontrolledCollapse toggler={`toggler${i}`} style={{marginTop: '3px'}}>
                                <InputGroup size="sm">
                                    <Input 
                                        id={`input${i}`}
                                        value={this.props.container.state.valorVida} 
                                        onChange={this.props.container.handleValorVida} 
                                        onKeyPress={event => {
                                            if (event.key === "Enter") {
                                                document.getElementById(`toggler${i}`).click();
                                                this.props.container.setVidaAtual(i);
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

export default withSubscribe(Personagens);