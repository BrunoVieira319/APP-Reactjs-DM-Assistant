import React from 'react';
import { Subscribe } from 'unstated';
import StateComponent from '../StateComponent';
import { Row, Col, Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Modal, ModalBody, ModalHeader, ModalFooter, Input, InputGroup, InputGroupAddon, Popover, PopoverBody} from 'reactstrap';
import { MdAddCircle } from 'react-icons/md';
import { FaUndo, FaDiceD20, FaTrashAlt } from 'react-icons/fa';

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
                                style={{paddingBottom: '0'}}
                            >
                                <Row style={{paddingBottom: '0'}}>
                                    <Col sm='9' style={{paddingRight:'0'}} onClick={() => sc.togglePopoverMagia(this.indexPersonagem, i)}>
                                        <ListGroupItemHeading className="magia-titulo"> {magia.nomeMagia} </ListGroupItemHeading>
                                    </Col>
                                    <Col sm='3' style={{marginTop:'5px', paddingRight:'0', paddingLeft: '0'}}>
                                        <Button color="success" onClick={() => sc.usarHabilidade(this.indexPersonagem, i)}> <FaDiceD20 style={this.styleIcons}/> </Button>{' '}
                                        <Button color="info" onClick={() => sc.restaurarUsos(this.indexPersonagem, i)}> <FaUndo style={this.styleIcons}/> </Button>{' '}
                                        <Button color="danger" onClick={() => sc.deletarMagia(this.indexPersonagem, i)}> <FaTrashAlt style={this.styleIcons}/> </Button>
                                    </Col>
                                    <Popover 
                                        placement="auto" 
                                        isOpen={magia.popoverOpen} 
                                        target={`magia${i}`} 
                                        toggle={() => sc.togglePopoverMagia(this.indexPersonagem, i)}
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
                </div>
            )}
        </Subscribe>
    )
}

export default Magias;