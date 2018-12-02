import React from 'react';
import { Subscribe } from 'unstated';
import StateComponent from '../StateComponent';
import { Row, Col, Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Modal, ModalBody, ModalHeader, ModalFooter, Input, InputGroup, InputGroupAddon, Popover, PopoverBody} from 'reactstrap';
import { MdAddCircle } from 'react-icons/md';
import { FaShieldAlt as Shield, FaUndo, FaDiceD20, FaTrashAlt } from 'react-icons/fa';

class Habilidades extends React.Component {
    
    constructor(props) {
        super(props);
        this.indexPersonagem = this.props.index;
        this.styleIcons = {
            width: '17px', 
            height: '17px'
        }
    }

    montarShields = (usosRestantes, quantiaMaximaUsos) => {
        let listaShields = [];
        for(let i = 0; i < quantiaMaximaUsos; i++) {
            if (usosRestantes > i) {
                listaShields.push(<Shield key={i} style={{width: '34px', height: '34px', marginLeft: '6px', color: '#3bc8e0'}}/>)
            } else {
                listaShields.push(<Shield key={i} style={{width: '34px', height: '34px', marginLeft: '6px', color: '#DDD'}}/>)
            }
        }
        return listaShields;
    }

    render = () => (
        <Subscribe to={[StateComponent]}>
            {sc => (
                <div>
                    <ListGroup>
                        {sc.state.listaPersonagens[this.indexPersonagem].listaHabilidades.map((habilidade, i) => 
                            <ListGroupItem 
                                key={i} 
                                id={`habilidade${i}`}  
                                style={{paddingBottom: '0'}}
                            >
                                <Row style={{paddingBottom: '0'}}>
                                    <Col sm='4' style={{paddingRight:'0'}} onClick={() => sc.togglePopoverHabilidade(this.indexPersonagem, i)}>
                                        <ListGroupItemHeading className="habilidade-titulo"> {habilidade.nomeHabilidade} </ListGroupItemHeading>
                                        <ListGroupItemText className="habilidade-texto"> {' Restaura em Descanso '}{habilidade.descanso} </ListGroupItemText>
                                    </Col>
                                    <Col sm='5' style={{marginTop:'5px', paddingRight:'0', paddingLeft: '0'}} onClick={() => sc.togglePopoverHabilidade(this.indexPersonagem, i)}>
                                        {this.montarShields(habilidade.usosRestantes, habilidade.quantiaUsosHabilidade)}
                                    </Col>
                                    <Col sm='3' style={{marginTop:'5px', paddingRight:'0', paddingLeft: '0'}}>
                                        <Button color="success" onClick={() => sc.usarHabilidade(this.indexPersonagem, i)}> <FaDiceD20 style={this.styleIcons}/> </Button>{' '}
                                        <Button color="info" onClick={() => sc.restaurarUsos(this.indexPersonagem, i)}> <FaUndo style={this.styleIcons}/> </Button>{' '}
                                        <Button color="danger" onClick={() => sc.deletarHabilidade(this.indexPersonagem, i)}> <FaTrashAlt style={this.styleIcons}/> </Button>
                                    </Col>
                                    <Popover 
                                        placement="auto" 
                                        isOpen={habilidade.popoverOpen} 
                                        target={`habilidade${i}`} 
                                        toggle={() => sc.togglePopoverHabilidade(this.indexPersonagem, i)}
                                    >
                                        <PopoverBody>{habilidade.descricaoHabilidade}</PopoverBody>
                                    </Popover>
                                </Row>
                            </ListGroupItem>
                        )} 
                        <ListGroupItem tag="button" className="adicionar-habilidade" onClick={sc.toggleModalHabilidade}>
                            <MdAddCircle style={{width: '32px', height: '32px', marginLeft: '6px', color: '#080'}}/> Adicionar Habilidade
                        </ListGroupItem>
                    </ListGroup>


                    <Modal size='lg' isOpen={sc.state.modalHabilidade} toggle={sc.toggleModalHabilidade} >
                        <ModalHeader>Adicionar Habilidade</ModalHeader>
                        <ModalBody>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">Nome da Habilidade:</InputGroupAddon>
                                <Input value={sc.state.nomeHabilidade} onChange={sc.handleNomeHabilidade}/>
                            </InputGroup>
                            <br/>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">Descanso:</InputGroupAddon>
                                <Input type="select" value={sc.state.descanso} onChange={sc.handleDescanso}>
                                    <option>Curto</option>
                                    <option>Longo</option>
                                </Input>
                                <InputGroupAddon addonType="prepend">Quantidade de Usos a cada Descanso:</InputGroupAddon>
                                <Input type="number" value={sc.state.quantiaUsosHabilidade} onChange={sc.handleQuantiaUsosHabilidade}/>                             
                            </InputGroup>
                            <br/>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">Descrição da Habilidade:</InputGroupAddon>
                                <Input type="textarea" value={sc.state.descricaoHabilidade} onChange={sc.handleDescricaoHabilidade}/>
                            </InputGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => sc.adicionarHabilidade(this.indexPersonagem)}>Adicionar</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            )}
        </Subscribe>
    )
}

export default Habilidades;