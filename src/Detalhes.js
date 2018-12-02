import React from 'react';
import { Subscribe } from 'unstated';
import StateComponent from './StateComponent';
import { Container, Row, Col } from 'reactstrap';
import DadosDeVida from './componentsDetalhes/DadosDeVida.js';
import Habilidades from './componentsDetalhes/Habilidades.js';
import EspacosDeMagia from './componentsDetalhes/EspacosDeMagia.js';
import Magias from './componentsDetalhes/Magias.js'


function Detalhes({match}) {
    let index = match.params.index;

    return (
        <Subscribe to={[StateComponent]}>
            {sc => (
                <Container>
                    <h2>{sc.state.listaPersonagens[index].nome}</h2>

                    <Row>
                        <Col xs='12' md='4'>
                            <DadosDeVida index={index} />
                            <EspacosDeMagia index={index} />

                        </Col>

                        <Col xs ='12' md='8'>
                            <Habilidades index={index} />
                            <Magias index={index} />

                        </Col>
                    </Row>

                </Container>
            )}
        </Subscribe>
    )
}

export default Detalhes;