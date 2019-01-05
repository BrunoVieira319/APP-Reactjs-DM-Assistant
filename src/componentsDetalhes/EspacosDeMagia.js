import React from 'react';
import { Row, Col, Button, Card, CardBody, CardHeader, CardFooter, Modal, ModalBody, 
    ModalHeader, ModalFooter, Input, InputGroup, InputGroupAddon} from 'reactstrap';
import Style from "style-it";
import css from "../css/EspacosDeMagia";
import { FaScroll, FaDiceD20, FaUndo } from 'react-icons/fa';
import withSubscribe from '../withSubscribe';

class EspacosDeMagia extends React.Component {
    
    montarScrolls = (quantiaEspacos, espacosRestantes) => {
        let scrolls = [];
        for(let i = 0; i < quantiaEspacos; i++) {
            if (espacosRestantes > i) {
                scrolls.push(<FaScroll key={i} size={34} color='#59ecfa'/>)
            } else {
                scrolls.push(<FaScroll key={i} size={34} color='#28588a'/>)
            }
        }
        return scrolls;
    }

    montarEspacos = (espacosDeMagia) => {
        let listaEspacos = [];
        if (espacosDeMagia != null) {
            espacosDeMagia.map((espacoDeMagia, i) => (
                listaEspacos.push(
                    <Row key={i}>
                        <Col xs='8'>
                            {'Nv '}{espacoDeMagia.nivel}{this.montarScrolls(espacoDeMagia.quantidadeMaxima, espacoDeMagia.quantidade)}
                        </Col>
                        <Col xs='4' className='col-buttons'>
                            <Button onClick={() => this.props.container.conjurarMagia(espacoDeMagia.nivel)}>
                                <FaDiceD20 color='#315cff' size={21}/>
                            </Button>{' '}
                            <Button onClick={() => this.props.container.restaurarEspaco(espacoDeMagia.nivel)}>
                                <FaUndo color='#315cff' size={21}/>
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

    render = () => {
        const cnt = this.props.container;

        return (Style.it (css(), 
            <div> 
                <Card>
                    <CardHeader tag='h3'> Espaços de Magia </CardHeader>
                    <CardBody>
                        {this.montarEspacos(cnt.state.personagem.espacosDeMagia)}
                    </CardBody>
                    <CardFooter>
                        <Button 
                            size='sm' 
                            onClick={cnt.toggleModalEspacosMagia}
                        > 
                            Adicionar Espaços
                        </Button>
                    </CardFooter>
                </Card>

                <Modal isOpen={cnt.state.modalEspacosMagia} toggle={cnt.toggleModalEspacosMagia}>
                    <ModalHeader>Adicionar Espaços de Magia</ModalHeader>
                    <ModalBody>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Nível:</InputGroupAddon>
                            <Input type="select" value={cnt.state.nivel} onChange={cnt.handleNivel}>
                                <option hidden>Selecione</option>
                                {this.montarOptionsParaSelectInput(9)}
                            </Input>

                            <InputGroupAddon addonType="prepend">Quantidade:</InputGroupAddon>
                            <Input type="select" onChange={cnt.handleQuantidadeMaxima}>
                                <option hidden>Selecione</option>
                                {this.montarOptionsParaSelectInput(4)}
                            </Input>
                        </InputGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={cnt.adicionarEspacosMagia}>Adicionar</Button>
                    </ModalFooter>
                </Modal>
            </div>
        ))
    }
}

export default withSubscribe(EspacosDeMagia);
