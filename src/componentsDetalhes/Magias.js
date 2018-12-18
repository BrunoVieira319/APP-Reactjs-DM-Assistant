import React from 'react';
import { Subscribe } from 'unstated';
import StateComponent from '../StateComponent';
import { Row, Col, Button, ListGroup, ListGroupItem, Modal, 
    ModalBody, ModalHeader, ModalFooter, Input, InputGroup, InputGroupAddon, Popover, PopoverBody} from 'reactstrap';
import { MdAddCircle } from 'react-icons/md';
import { FaHatWizard, FaTrashAlt } from 'react-icons/fa';

class Magias extends React.Component {
    render = () => (
        <Subscribe to={[StateComponent]}>
            {sc => (
                <div>
                    <ListGroup>
                        {sc.state.listaPersonagens[this.props.index].listaMagias.map((magia, i) => 
                            <ListGroupItem 
                                key={i}
                                id={`magia${i}`}
                                style={{padding: "10px 20px"}}
                            >
                                <Row>
                                    <Col sm='8' style={{paddingRight:'0'}} onClick={() => sc.togglePopoverMagia(this.props.index, i)}>
                                        <p style={{fontSize: "20px", marginBottom: "0"}}> {magia.nomeMagia} </p>
                                    </Col>
                                    <Col sm='4' style={{display: "flex", justifyContent: "flex-end"}}>
                                        <Button onClick={() => sc.prepararMagia(this.props.index, i)}> <FaHatWizard /> </Button>
                                        <Button color="danger" onClick={() => sc.deletarMagia(this.props.index, i)}> <FaTrashAlt /> </Button>
                                    </Col>
                                    <Popover 
                                        placement="bottom" 
                                        isOpen={magia.popoverOpen} 
                                        target={`magia${i}`} 
                                        toggle={() => sc.togglePopoverMagia(this.props.index, i)}
                                    >   
                                        <PopoverBody>{magia.descricaoMagia}</PopoverBody>
                                    </Popover>
                                </Row>
                            </ListGroupItem>
                        )} 
                        <ListGroupItem tag="button" className="adicionar-magia" onClick={sc.toggleModalMagia}>
                            <MdAddCircle style={{width: '32px', height: '32px', marginLeft: '6px', color: '#008'}}/> Adicionar Magia
                        </ListGroupItem>
                    </ListGroup>

                    <Modal size='lg' isOpen={sc.state.modalMagia} toggle={sc.toggleModalMagia} >
                        <ModalHeader>Adicionar Magia</ModalHeader>
                        <ModalBody>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">Nome da Magia:</InputGroupAddon>
                                <Input value={sc.state.nomeMagia} onChange={sc.handleNomeMagia}/>
                            </InputGroup>
                            <br/>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">Descrição da Magia:</InputGroupAddon>
                                <Input type="textarea" value={sc.state.descricaoMagia} onChange={sc.handleDescricaoMagia}/>
                            </InputGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => sc.adicionarMagia(this.props.index)}>Adicionar</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            )}
        </Subscribe>
    )
}

export default Magias;