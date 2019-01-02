import React from "react";
import StateComponent from './StateComponent.js';
import { Subscribe } from 'unstated';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Input, InputGroup, InputGroupAddon, Button} from 'reactstrap';
import './style.css';

const Racas = {
    ANAO: "Anão",
	DRACONATO: "Draconato",
	ELFO: "Elfo",
	GNOMO: "Gnomo",
	HALFLING: "Halfling",
	HUMANO: "Humano",
	MEIO_ELFO: "Meio-Elfo",
	MEIO_ORC: "Meio-Orc",
	TIEFLING: "Tiefling"
};
Object.freeze(Racas);

const Classes = {
    BARBARO: "Bárbaro",
	BARDO: "Bardo",
	BRUXO: "Bruxo",
	CLERIGO: "Clérigo",
	DRUIDA: "Druida",
	FEITICEIRO: "Feiticeiro",
	GUERREIRO: "Guerreiro",
	LADINO: "Ladino",
	MAGO: "Mago",
	MONGE: "Monge",
	PALADINO: "Paladino",
	PATRULHEIRO: "Patrulheiro"
};
Object.freeze(Classes);

export default class AddPersonagem extends React.Component {
    render = () => (
        <Subscribe to={[StateComponent]}>
            {sc => (
                <Container>
                    <Col sm="12" md={{ size: 6, offset: 3 }} >
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Nome:</InputGroupAddon>
                            <Input value={sc.state.nome} onChange={sc.handleNome}/>
                        </InputGroup>
                        <br/>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Raça:</InputGroupAddon>
                            <Input type="select" onChange={sc.handleRaca}>
                                <option hidden>Selecione uma raça</option>
                                {
                                    Object.keys(Racas).map((raca, i) => (
                                        <option key={i} value={Object.keys(Racas)[i]}>
                                            {Object.values(Racas)[i]}
                                        </option>
                                    ))
                                }
                            </Input>

                            <InputGroupAddon addonType="prepend">Classe:</InputGroupAddon>
                            <Input type="select" onChange={sc.handleClasse}>
                                <option hidden>Selecione uma classe</option>
                                {
                                    Object.keys(Classes).map((classe, i) => (
                                        <option key={i} value={Object.keys(Classes)[i]}>
                                            {Object.values(Classes)[i]}
                                        </option>
                                    ))
                                }
                            </Input>
                        </InputGroup>
                        <br/>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Nivel:</InputGroupAddon>
                            <Input type="number" value={sc.state.nivel} onChange={sc.handleNivel}/>
                            <InputGroupAddon addonType="prepend">Vida:</InputGroupAddon>
                            <Input type="number" value={sc.state.vidaMax} onChange={sc.handleVidaMax}/>
                        </InputGroup>
                        <br/>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Link da Imagem:</InputGroupAddon>
                            <Input value={sc.state.img} onChange={sc.handleImg}/>
                        </InputGroup>
                        <br/>
                            
                        <Button onClick={sc.adicionarPersonagem}>Adicionar Personagem</Button>
                    </Col>
                </Container>
            )}
        </Subscribe>
    )
}

