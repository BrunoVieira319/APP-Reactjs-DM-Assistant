import React from 'react';
import StateComponent from './StateComponent.js';
import { Link } from "react-router-dom";
import { Subscribe } from 'unstated';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Input, InputGroup, InputGroupAddon, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

export default class EditarPersonagem extends React.Component {

    render = () => (
        <Subscribe to={[StateComponent]}>
            { sc => 
                <Container>
                    <Col sm="12" md={{ size: 6, offset: 3 }} >
                        <h2>
                            Editando {sc.state.listaPersonagens[this.props.match.params.index].nome}
                        </h2>

                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Nome:</InputGroupAddon>
                            <Input value={sc.state.nome} onChange={sc.handleNome}/>
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
                            <Button color="primary" onClick={() => sc.editarPersonagem(this.props.match.params.index)}>
                                Salvar Personagem
                            </Button>
                        </Link>
                            {' '}<Button color="danger" onClick={sc.toggleModalRemover}>Excluir Personagem</Button>
                    </Col>

                    <Modal isOpen={sc.state.modalRemover} toggle={sc.toggleModalRemover} >
                        <ModalBody>
                            Tem certeza que deseja remover este personagem?
                        </ModalBody>
                        <ModalFooter>
                            <Link to="/">
                                <Button color="danger" onClick={() => sc.removerPersonagem(this.props.match.params.index)}>Sim</Button>
                            </Link>
                            <Button onClick={sc.toggleModalRemover}>Não</Button>
                        </ModalFooter>
                    </Modal>
                </Container>
            }
        </Subscribe>
    )

}