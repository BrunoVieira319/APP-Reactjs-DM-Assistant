import React from 'react';
import { Subscribe } from 'unstated';
import StateComponent from '../StateComponent';
import { Row, Col, Button, Card, CardBody, CardHeader, CardFooter, Modal, ModalBody, ModalHeader, ModalFooter, Input, InputGroup, InputGroupAddon} from 'reactstrap';
import { FaScroll, FaDiceD20, FaPlusCircle } from 'react-icons/fa';

const styleScrollOn = {
    fontSize: '34px', 
    marginLeft: '6px',
    color: '#59ecfa'
}

const styleScrollOff = {
    fontSize: '34px', 
    marginLeft: '6px',
    color: '#064650'
}

export default class EspacosDeMagia extends React.Component {
    
    montarScrolls = (quantiaEspacos, espacosRestantes) => {
        let listaScrolls = [];
        for(let i = 0; i < quantiaEspacos; i++) {
            if (espacosRestantes > i) {
                listaScrolls.push(<FaScroll key={i} style={styleScrollOn}/>)
            } else {
                listaScrolls.push(<FaScroll key={i} style={styleScrollOff}/>)
            }
        }
        return listaScrolls;
    }

    montarEspacos = (espacosDeMagia, sc) => {
        let listaEspacos = [];
        if (espacosDeMagia != null) {
            espacosDeMagia.map((espacoDeMagia, i) => (
                listaEspacos.push(
                    <Row key={i}>
                        <Col xs='9'>
                            {'Nv '}{espacoDeMagia.nivel}{this.montarScrolls(espacoDeMagia.quantidadeMaxima, espacoDeMagia.quantidade)}
                        </Col>
                        <Col xs='3' style={{padding: '0'}}>
                            <Button 
                                style={{backgroundColor: '#fff', padding: '3px 7px'}}
                                onClick={() => sc.conjurarMagia(espacoDeMagia.nivel)}
                            >
                                <FaDiceD20 style={{color: '#b731ff', fontSize: '21px'}}/>
                            </Button>{' '}
                            <Button 
                                style={{backgroundColor: '#fff', padding: '3px 7px'}}
                                onClick={() => sc.restaurarEspaco(espacoDeMagia.nivel)}
                            >
                                <FaPlusCircle style={{color: '#0adaff', fontSize: '21px'}}/>
                            </Button>
                        </Col>
                    </Row>
                )
            ))
        }
        return listaEspacos;
    }

    montarOptionsParaSelectInput = (quantidade) => {
        let options = []
        for (let i = 1; i <= quantidade; i++) {
            options.push(<option key={i} value={i}>{i}</option>)
        }
        return options;
    }

    render = () => (
        <Subscribe to={[StateComponent]}>
            {sc => ( 
                <div> 
                <Card style={{backgroundColor: '#256', marginTop:'15px', color:'#FFF'}}>
                    <CardHeader tag='h3'> Espaços de Magia </CardHeader>
                    <CardBody>
                        {this.montarEspacos(sc.state.personagem.espacosDeMagia, sc)}
                    </CardBody>
                    <CardFooter>
                        <Button size='sm' color="success" onClick={sc.toggleModalEspacosMagia}>Adicionar Espaços</Button>{" "} 
                    </CardFooter>
                </Card>

                <Modal isOpen={sc.state.modalEspacosMagia} toggle={sc.toggleModalEspacosMagia}>
                    <ModalHeader>Adicionar Espaços de Magia</ModalHeader>
                    <ModalBody>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Nível:</InputGroupAddon>
                            <Input type="select" value={sc.state.nivel} onChange={sc.handleNivel}>
                                <option hidden>Selecione</option>
                                {this.montarOptionsParaSelectInput(9)}
                            </Input>

                            <InputGroupAddon addonType="prepend">Quantidade:</InputGroupAddon>
                            <Input type="select" onChange={sc.handleQuantidadeMaxima}>
                                <option hidden>Selecione</option>
                                {this.montarOptionsParaSelectInput(4)}
                            </Input>
                        </InputGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={sc.adicionarEspacosMagia}>Adicionar</Button>
                    </ModalFooter>
                </Modal>
                </div>
            )}
        </Subscribe>
    )
}

