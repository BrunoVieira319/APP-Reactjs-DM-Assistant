import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Input, InputGroup, InputGroupAddon, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import withSubscribe from './withSubscribe.js';

class EditarPersonagem extends React.Component {

    render = () => {
        let cnt = this.props.container;
        let personagem = cnt.state.listaPersonagens.find(p => p.id === parseInt(this.props.match.params.id));

        return (
            <Container>
                <Col sm="12" md={{ size: 6, offset: 3 }} >
                    <h3>
                        Editando {personagem.nome}
                    </h3>
                    <br/>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Nivel:</InputGroupAddon>
                        <Input type="number" value={cnt.state.nivel} onChange={cnt.handleNivel}/>
                        <InputGroupAddon addonType="prepend">Vida:</InputGroupAddon>
                        <Input type="number" value={cnt.state.vidaMax} onChange={cnt.handleVidaMax}/>
                    </InputGroup>
                    <br/>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Link da Imagem:</InputGroupAddon>
                        <Input value={cnt.state.img} onChange={cnt.handleImg}/>
                    </InputGroup>
                    <br/>
                    <Button color="primary" onClick={() => cnt.editarPersonagem(personagem.id)}>
                        Salvar Personagem
                    </Button>
                    {' '}
                    <Button color="danger" onClick={cnt.toggleModalRemover}>Excluir Personagem</Button>
                </Col>

                <Modal isOpen={cnt.state.modalRemover} toggle={cnt.toggleModalRemover} >
                    <ModalBody>
                        Tem certeza que deseja remover este personagem?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => cnt.removerPersonagem(personagem.id)}>Sim</Button>
                        <Button onClick={cnt.toggleModalRemover}>Não</Button>
                    </ModalFooter>
                </Modal>
            </Container>
        )
    }
}

export default withSubscribe(EditarPersonagem);