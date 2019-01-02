import React from "react";
import StateComponent from './StateComponent.js';
import { Subscribe } from 'unstated';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Input, InputGroup, InputGroupAddon, Button} from 'reactstrap';
import './style.css';
import Escolas from './enums/Escolas.js';

export default class AddPersonagem extends React.Component {

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
                <Container>
                    <Col sm="12" md={{ size: 8, offset: 2 }} >
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Nome:</InputGroupAddon>
                            <Input value={sc.state.nome} onChange={sc.handleNome}/>
                        </InputGroup>
                        <br/>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Nível:</InputGroupAddon>
                            <Input type="select" value={sc.state.nivel} onChange={sc.handleNivel}>
                                <option hidden>Selecione</option>
                                {this.montarOptionsParaSelectInput(9)}
                            </Input>

                            <InputGroupAddon addonType="prepend">Escola:</InputGroupAddon>
                            <Input type="select" onChange={sc.handleEscola}>
                                <option hidden>Selecione</option>
                                {
                                    Object.keys(Escolas).map((escola, i) => (
                                        <option key={i} value={Object.keys(Escolas)[i]}>
                                            {Object.values(Escolas)[i]}
                                        </option>
                                    ))
                                }
                            </Input>
                        </InputGroup>
                        <br/>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend" >Tempo de Conjuração:</InputGroupAddon>
                            <Input 
                                value={sc.state.tempoDeConjuracao} 
                                onChange={sc.handleTempoDeConjuracao}
                                placeholder="1 ação, 1 minuto ..."
                            />
                        </InputGroup>
                        <br/>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend" >É ritual:</InputGroupAddon>
                            <Input type="select" onChange={sc.handleRitual}>
                                <option hidden>Selecione</option>
                                <option value={true}>Sim</option>
                                <option value={false}>Não</option>
                            </Input>
                            <InputGroupAddon addonType="prepend">Alcance:</InputGroupAddon>
                            <Input value={sc.state.alcance} onChange={sc.handleAlcance}/>
                            <InputGroupAddon addonType="prepend">Duração:</InputGroupAddon>
                            <Input value={sc.state.duracao} onChange={sc.handleDuracao}/>
                        </InputGroup>
                        <br/>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Componentes:</InputGroupAddon>
                            <Input value={sc.state.componentes} onChange={sc.handleComponentes}/>
                        </InputGroup>
                        <br/>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Descrição:</InputGroupAddon>
                            <Input type="textarea" value={sc.state.descricao} onChange={sc.handleDescricao}/>
                        </InputGroup>
                        <br/>
                        <Button onClick={sc.adicionarMagia}>Adicionar Magia</Button>
                    </Col>
                </Container>
            )}
        </Subscribe>
    )
}