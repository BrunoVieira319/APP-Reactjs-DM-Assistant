import React from "react";
import withSubscribe from "./withSubscribe.js";
import { Container, Card, CardBody, CardHeader, CardColumns } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Style from "style-it";
import Escolas from "./enums/Escolas.js"
import breakLines from 'react-newline-to-break';

const magiaStyle = () => (`
    @import url('https://fonts.googleapis.com/css?family=PT+Sans');
    
    .card-columns {
        column-count: 2;
    }

    .card {
        font-family: 'PT Sans';
    }

    .card-body {
        line-height: 20px;
        font-size: 16px;
    }

    .card-header {
        padding: 9px 20px;
    }
`)

class Magia extends React.Component {

    componentDidMount = () => {
        fetch('http://localhost:3009/magia', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        }).then( response => 
            response.json()
        ).then( dados => {
            this.props.container.setState({
                magias: dados
            })
        })
    }

    render = () => {
        const cnt = this.props.container;

        return Style.it(
            magiaStyle(),
            <Container>
                <CardColumns>
                    { cnt.state.magias.map((magia, i) => (
                            <Card key={i}>
                                <CardHeader>
                                    <h3>{magia.nome}</h3>
                                    <span>{magia.nivel}º Nível de {Object.getOwnPropertyDescriptor(Escolas, magia.escola).value} {magia.ritual && "(Ritual)"}</span>
                                </CardHeader>
                                <CardBody>
                                    <b>Tempo de Conjuração:</b> {magia.tempoDeConjuracao}<br/>
                                    <b>Alcance:</b> {magia.alcance}<br/>
                                    <b>Componentes</b> {magia.componentes}<br/>
                                    <b>Duração:</b> {magia.duracao}<br/>
                                    <b>Descrição:</b> {breakLines(magia.descricao)}
                                </CardBody>
                            </Card>
                    ))}
                </CardColumns>
            </Container>
        )
    }
}

export default withSubscribe(Magia);