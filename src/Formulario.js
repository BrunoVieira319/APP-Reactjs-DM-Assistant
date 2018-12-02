import React from "react";
import StateComponent from './StateComponent.js';
import { Subscribe } from 'unstated';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';
import { Link } from "react-router-dom";
import './style.css';

class Formulario extends React.Component {
    render = () => (
        <Subscribe to={[StateComponent]}>
            {sc => (
                <Container>
                    <Col sm="12" md={{ size: 6, offset: 3 }} >
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Nome:</InputGroupAddon>
                            <Input value={sc.state.nome} onChange={sc.handleNome}/>
                        </InputGroup>
                        <br/>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Raça:</InputGroupAddon>
                            <Input value={sc.state.raca} onChange={sc.handleRaca}/>
                            <InputGroupAddon addonType="prepend">Classe:</InputGroupAddon>
                            <Input value={sc.state.classe} onChange={sc.handleClasse}/>
                        </InputGroup>
                        <br/>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Nivel:</InputGroupAddon>
                            <Input type="number" value={sc.state.nivel} onChange={sc.handleNivel}/>
                            <InputGroupAddon addonType="prepend">Vida:</InputGroupAddon>
                            <Input type="number" value={sc.state.vidaMax} onChange={sc.handleVidaMax}/>
                        </InputGroup>
                        <br/>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Link da Imagem:</InputGroupAddon>
                            <Input value={sc.state.linkImg} onChange={sc.handleLink}/>
                        </InputGroup>
                        <br/>
                        <Link to="/">
                            <Button onClick={sc.adicionarPersonagem}>Adicionar Personagem</Button>
                        </Link>
                    </Col>
                </Container>
            )}
        </Subscribe>
    )
}

export default Formulario;