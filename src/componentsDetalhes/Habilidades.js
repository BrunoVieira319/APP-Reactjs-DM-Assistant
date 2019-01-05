import React from 'react';
import Style from 'style-it';
import { Row, Col, Button, ListGroup, ListGroupItem, ListGroupItemHeading, 
    ListGroupItemText, UncontrolledCollapse, Alert} from 'reactstrap';
import { MdAddCircle } from 'react-icons/md';
import { FaShieldAlt as Shield, FaUndo, FaDiceD20, FaTrashAlt } from 'react-icons/fa';
import breakLines from 'react-newline-to-break';
import ModalAddHabilidade from './ModalAddHabilidade.js';
import Recuperacao from '../enums/Recuperacao';
import withSubscribe from '../withSubscribe';
import css from '../css/Habilidades'

class Habilidades extends React.Component {

    montarShields = (usosRestantes, quantiaMaximaUsos) => {
        let listaShields = [];
        for(let i = 0; i < quantiaMaximaUsos; i++) {
            if (usosRestantes > i) {
                listaShields.push(
                    <Shield key={i} style={{color: '#3bc8e0'}}/>
                )
            } else {
                listaShields.push(
                    <Shield key={i} style={{color: '#DDD'}}/>
                )
            }
        }
        return listaShields;
    }

    render = () => { 
        const cnt = this.props.container;

        return Style.it(css(),
            <ListGroup>
                {cnt.state.personagem.habilidades.map((h, i) => 
                    <ListGroupItem key={i} >
                        <Row>
                            <Col xs='8' sm='4' className="col-nome-habilidade" id={`descricao${i}`}>
                                <ListGroupItemHeading>
                                    {h.habilidade.nome}
                                </ListGroupItemHeading>
                                <ListGroupItemText > 
                                    {' Recuperação: '}{Object.getOwnPropertyDescriptor(Recuperacao, h.recuperacao).value} 
                                </ListGroupItemText>
                            </Col>

                            <Col xs='4' sm='5' className="div-shields">
                                {this.montarShields(h.qtdUsosRestantes, h.qtdUsosMaximo)}
                            </Col>                            

                            <Col xs='12' sm='3' className="div-buttons">
                                <Button color="success" onClick={() => cnt.usarHabilidade(h.habilidade.id)}> 
                                    <FaDiceD20 /> 
                                </Button>{' '}
                                <Button color="info" onClick={() => cnt.restaurarUsos(h.habilidade.id)}> 
                                    <FaUndo /> 
                                </Button>{' '}
                                <Button color="danger" onClick={() => cnt.deletarHabilidade(h.habilidade.id)}> 
                                    <FaTrashAlt /> 
                                </Button>
                            </Col>
                        </Row>

                        <UncontrolledCollapse toggler={`#descricao${i}`}>
                            <Alert color="info">
                                {breakLines(h.habilidade.descricao)}
                            </Alert>
                        </UncontrolledCollapse>

                    </ListGroupItem>
                )} 

                <ListGroupItem tag="button" className="adicionar-habilidade" onClick={cnt.toggleModalHabilidade}>
                    <MdAddCircle className="add-icon"/> Adicionar Habilidade
                </ListGroupItem>

                <ModalAddHabilidade />

            </ListGroup>
        )
    }
}

export default withSubscribe(Habilidades);