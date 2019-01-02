import React from 'react';
import withSubscribe from '../withSubscribe.js';
import { Modal, ModalHeader, ModalBody, ModalFooter, InputGroup,
    Input, InputGroupAddon, Button } from 'reactstrap';
import Recuperacao from '../enums/Recuperacao.js'


class ModalHabilidade extends React.Component {
    render = () => {
        let cnt = this.props.container;

        return (
            <Modal size='lg' isOpen={cnt.state.modalHabilidade} toggle={cnt.toggleModalHabilidade} >
                <ModalHeader>Adicionar Habilidade</ModalHeader>
                <ModalBody>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Nome da Habilidade:</InputGroupAddon>
                        <Input value={cnt.state.nome} onChange={cnt.handleNome}/>
                    </InputGroup>
                    <br/>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Recuperação:</InputGroupAddon>
                        <Input type="select" onChange={cnt.handleRecuperacao}>
                            <option hidden>Selecione</option>
                            {
                                Object.keys(Recuperacao).map((recuperacao, i) => (
                                    <option key={i} value={Object.keys(Recuperacao)[i]}>
                                        {Object.values(Recuperacao)[i]}
                                    </option>
                                ))
                            }
                        </Input>
                        <InputGroupAddon addonType="prepend">Quantidade de Usos a cada Descanso:</InputGroupAddon>
                        <Input type="number" value={cnt.state.qtdUsosMaximo} onChange={cnt.handleQtdUsosMaximo}/>                             
                    </InputGroup>
                    <br/>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Descrição da Habilidade:</InputGroupAddon>
                        <Input type="textarea" value={cnt.state.descricao} onChange={cnt.handleDescricao}/>
                    </InputGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={cnt.adicionarHabilidade}>Adicionar</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default withSubscribe(ModalHabilidade);