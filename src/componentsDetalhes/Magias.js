import React from 'react';
import withSubscribe from '../withSubscribe.js';
import { Row, Col, Button, ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader, 
    Input, InputGroup, InputGroupAddon, UncontrolledCollapse, Alert, ListGroupItemHeading, 
    ListGroupItemText } from 'reactstrap';
import { MdAddCircle } from 'react-icons/md';
import { FaHatWizard, FaTrashAlt } from 'react-icons/fa';
import Style from 'style-it';
import breakLines from "react-newline-to-break";
import Escolas from '../enums/Escolas.js';
import css from '../css/magiasDetalhes.js'

class Magias extends React.Component {
    render = () => {
        let cnt = this.props.container;

        return( Style.it(
            css(),
            <div>
                <ListGroup>
                    {cnt.state.personagem.magias.map((m, i) => 
                        <ListGroupItem 
                            key={i}
                            className="list-item-magia"
                        >
                            <Row>
                                <Col sm='8' style={{paddingRight:'0'}} id={`descricaoMagia${i}`}>
                                    <ListGroupItemHeading> 
                                        {m.magia.nome}
                                    </ListGroupItemHeading>
                                    <ListGroupItemText> 
                                        {m.magia.nivel + "º Nível de " + Object.getOwnPropertyDescriptor(Escolas, m.magia.escola).value}
                                        {m.magia.ritual ? "(Ritual)" : ""}
                                    </ListGroupItemText>
                                </Col>

                                <Col sm='4' className="div-buttons">
                                    <Button color="primary" onClick={() => cnt.prepararMagia(m.magia.id)} > <FaHatWizard /> </Button>
                                    <Button color="danger" onClick={() => cnt.deletarMagia(m.magia.id)} > <FaTrashAlt /> </Button>
                                </Col>
                            </Row>

                            <UncontrolledCollapse toggler={`#descricaoMagia${i}`}>
                                <Alert color="info">
                                    {breakLines(m.magia.descricao)}
                                </Alert>
                            </UncontrolledCollapse>

                        </ListGroupItem>
                    )} 

                    <ListGroupItem tag="button" className="adicionar-magia" onClick={cnt.toggleModalMagia}>
                        <MdAddCircle className="add-icon"/> Adicionar Magia
                    </ListGroupItem>
                </ListGroup>

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
            </div>
        ))
    }
}

export default withSubscribe(Magias);