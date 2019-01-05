import React from 'react';
import withSubscribe from '../withSubscribe.js';
import { Row, Col, Button, ListGroup, ListGroupItem, UncontrolledCollapse, Alert, 
    ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { MdAddCircle } from 'react-icons/md';
import { FaHatWizard, FaTrashAlt } from 'react-icons/fa';
import Style from 'style-it';
import breakLines from "react-newline-to-break";
import Escolas from '../enums/Escolas.js';
import css from '../css/magiasDetalhes.js'
import ModalAddMagia from './ModalAddMagia.js';

class Magias extends React.Component {

    render = () => {
        const cnt = this.props.container;

        return( Style.it(
            css(),
            <div>
                <ListGroup>
                    {cnt.state.personagem.magias.map((m, i) => m.preparada &&
                        <ListGroupItem key={i} color="info">
                            <Row>
                                <Col xs='8' style={{paddingRight:'0'}} id={`descricaoMagiaPreparada${i}`}>
                                    <ListGroupItemHeading> 
                                        <b>{m.magia.nome} </b>
                                    </ListGroupItemHeading>
                                    <ListGroupItemText> 
                                        {m.magia.nivel + "º Nível de " + Object.getOwnPropertyDescriptor(Escolas, m.magia.escola).value}
                                        {m.magia.ritual && "(Ritual)"}
                                    </ListGroupItemText>
                                </Col>

                                <Col xs='4' className="div-buttons">
                                    <Button color="dark" onClick={() => cnt.desprepararMagia(m.magia.id)} > <FaHatWizard /> </Button>
                                </Col>
                            </Row>

                            <UncontrolledCollapse toggler={`#descricaoMagiaPreparada${i}`}>
                                <Alert color="dark">
                                    {breakLines(m.magia.descricao)}
                                </Alert>
                            </UncontrolledCollapse>
                        </ListGroupItem>
                    )}
                </ListGroup>

                <ListGroup>
                    {cnt.state.personagem.magias.map((m, i) => !m.preparada &&
                        <ListGroupItem 
                            key={i}
                            className="list-item-magia"
                        >
                            <Row>
                                <Col xs='8' style={{paddingRight:'0'}} id={`descricaoMagia${i}`}>
                                    <ListGroupItemHeading> 
                                        {m.magia.nome}
                                    </ListGroupItemHeading>
                                    <ListGroupItemText> 
                                        {m.magia.nivel + "º Nível de " + Object.getOwnPropertyDescriptor(Escolas, m.magia.escola).value}
                                        {m.magia.ritual && "(Ritual)"}
                                    </ListGroupItemText>
                                </Col>

                                <Col xs='4' className="div-buttons">
                                    <Button color="primary" onClick={() => cnt.prepararMagia(m.magia.id)} > <FaHatWizard /> </Button>
                                    <Button color="danger" onClick={() => cnt.removerMagia(m.magia.id)} > <FaTrashAlt /> </Button>
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

                <ModalAddMagia />
                
            </div>
        ))
    }
}

export default withSubscribe(Magias);