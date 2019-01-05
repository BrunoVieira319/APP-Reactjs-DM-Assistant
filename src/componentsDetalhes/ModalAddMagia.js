import React from 'react';
import withSubscribe from '../withSubscribe';
import {Modal, ModalBody, ModalHeader, Input, InputGroup, InputGroupAddon, ListGroup, 
    ListGroupItem, ListGroupItemHeading, ListGroupItemText} from 'reactstrap';

class ModalAddMagia extends React.Component {
    render = () => {
        let cnt = this.props.container;

        return (
            <Modal isOpen={cnt.state.modalMagia} toggle={cnt.toggleModalMagia} >
                <ModalHeader>Adicionar Magia</ModalHeader>

                <ModalBody>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Nome da Magia:</InputGroupAddon>
                        <Input onChange={cnt.pesquisarMagias}/>
                    </InputGroup>

                    <ListGroup>
                        {cnt.state.magiasRetornadas.map((magia , i) => (
                            <ListGroupItem 
                                key={i} 
                                onClick={() => cnt.adicionarMagiaParaPersonagem(magia.id)}
                                style={{cursor: 'pointer'}}
                            >
                                <ListGroupItemHeading style={{marginBottom: '1px'}}> 
                                    {magia.nome}
                                </ListGroupItemHeading>
                                <ListGroupItemText style={{marginBottom: '1px'}}> 
                                    {magia.nivel + "º Nível de " + magia.escola}
                                </ListGroupItemText>

                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </ModalBody>
            </Modal>
        )
    }
}

export default withSubscribe(ModalAddMagia);