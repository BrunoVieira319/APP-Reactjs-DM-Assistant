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

const styleIcons = {
    width: '17px', 
    height: '17px'
}

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
        let cnt = this.props.container;

        return Style.it(`
            .list-group-item-heading, .list-group-item-text {
                margin-bottom: 1px;
            }

            .list-group-item {
                padding-top: 7px;
                padding-bottom: 7px;
            }

            .col-nome-habilidade {
                padding-right: 0;
            }

            .adicionar-habilidade:hover {
                background-color: #d0ffd0;
                transition: 0.6s;
            }
            
            .adicionar-habilidade {
                background-color: #EEE;
                transition: 0.6s;
                cursor: pointer;
                padding-top: 11px;
                padding-bottom: 11px;
            }

            .div-shields {
                margin: auto auto;
                font-size: 34px;
            }

            .div-buttons {
                display: flex;
                justify-content: flex-end;
                padding-top: 8px;
                padding-bottom: 8px;
            }
        
            .div-buttons button {
                margin-left: 5px;
                font-size: 18px;
            }

            .add-icon {
                color: #080;
                width: 32px;
                height: 32px;
            }
            `,

            <ListGroup>
                {cnt.state.personagem.habilidades.map((h, i) => 
                    <ListGroupItem key={i} >
                        <Row>
                            <Col sm='4' className="col-nome-habilidade" id={`descricao${i}`}>
                                <ListGroupItemHeading > 
                                    {h.habilidade.nome} 
                                </ListGroupItemHeading>
                                <ListGroupItemText > 
                                    {' Recuperação: '}{Object.getOwnPropertyDescriptor(Recuperacao, h.recuperacao).value} 
                                </ListGroupItemText>
                            </Col>

                            <Col sm='5' className="div-shields">
                                {this.montarShields(h.qtdUsosRestantes, h.qtdUsosMaximo)}
                            </Col>

                            <Col sm='3' className="div-buttons">
                                <Button color="success" onClick={() => cnt.usarHabilidade(h.habilidade.id)}> 
                                    <FaDiceD20 style={styleIcons}/> 
                                </Button>{' '}
                                <Button color="info" onClick={() => cnt.restaurarUsos(h.habilidade.id)}> 
                                    <FaUndo style={styleIcons}/> 
                                </Button>{' '}
                                <Button color="danger" onClick={() => cnt.deletarHabilidade(h.habilidade.id)}> 
                                    <FaTrashAlt style={styleIcons}/> 
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

                <div style={{height: "20px"}} />

                <ModalAddHabilidade />

            </ListGroup>
        )
    }
}

export default withSubscribe(Habilidades);