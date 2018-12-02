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

class EspacosDeMagia extends React.Component {
    
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
                            {'Lv '}{espacoDeMagia.nivel}{this.montarScrolls(espacoDeMagia.quantiaEspacos, espacoDeMagia.espacosRestantes)}
                        </Col>
                        <Col xs='3' style={{padding: '0'}}>
                            <Button 
                                style={{backgroundColor: '#fff', padding: '3px 7px'}}
                                onClick={() => sc.conjurarMagia(this.props.index, i)}
                            >
                                <FaDiceD20 style={{color: '#b731ff', fontSize: '21px'}}/>
                            </Button>{' '}
                            <Button 
                                style={{backgroundColor: '#fff', padding: '3px 7px'}}
                                onClick={() => sc.restaurarUmEspaco(this.props.index, espacoDeMagia.nivel)}
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

    render = () => (
        <Subscribe to={[StateComponent]}>
            {sc => ( 
                <div> 
                <Card style={{backgroundColor: '#215a6b', marginTop:'15px', color:'#FFF'}}>
                    <CardHeader tag='h3'> Espaços de Magia </CardHeader>
                    <CardBody>
                        {this.montarEspacos(sc.state.listaPersonagens[this.props.index].espacosDeMagia, sc)}
                    </CardBody>
                    <CardFooter>
                        <Button size='sm' color="success" onClick={sc.toggleModalEspacosMagia}>Adicionar Espaços</Button>{" "} 
                        <Button size='sm' color="info" onClick={() => sc.restaurarEspacos(this.props.index)}> Restaurar </Button> 
                    </CardFooter>
                </Card>

                <Modal isOpen={sc.state.modalEspacosMagia} toggle={sc.toggleModalEspacosMagia}>
                    <ModalHeader>Adicionar Espaços de Magia</ModalHeader>
                    <ModalBody>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Nível:</InputGroupAddon>
                            <Input type="select" value={sc.state.nivelEspaco} onChange={sc.handleNivelEspaco}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                            </Input>

                            <InputGroupAddon addonType="prepend">Quantidade:</InputGroupAddon>
                            <Input type="select" value={sc.state.quantiaEspacosMagia} onChange={sc.handleQuantiaEspacosMagia}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </Input>
                        </InputGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => sc.adicionarEspacosMagia(this.props.index)}>Adicionar</Button>
                    </ModalFooter>
                </Modal>
                </div>
            )}
        </Subscribe>
    )
}

export default EspacosDeMagia;