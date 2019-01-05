import React from 'react';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import { FaDiceD6, FaDiceD20 } from 'react-icons/fa';
import Style from 'style-it';
import css from '../css/DadosDeVida';
import withSubscribe from '../withSubscribe';

class DadosDeVida extends React.Component {

    montarDados = (quantiaDados, quantiaMax) => {
        let listaDados = [];
        for(let i = 0; i < quantiaMax; i++) {
            if (quantiaDados > i) {
                listaDados.push(<FaDiceD6 key={i} className='dice' color='#080' />)
            } else {
                listaDados.push(<FaDiceD6 key={i} className='dice' color='#ddd' />)
            }
        }
        return listaDados;
    }

    render = () => {
        const cnt = this.props.container;

        return (
            Style.it(css(),
                <div>
                    <Card>
                        <CardHeader tag='h3'>
                            Dados de Vida
                            <Button
                                color="success" 
                                onClick={() => cnt.usarDadoVida(cnt.state.personagem.id)}
                            > 
                                <FaDiceD20 size={22}/> 
                            </Button>
                            </CardHeader>

                        <CardBody>
                            {this.montarDados(cnt.state.personagem.dadosDeVida, cnt.state.personagem.nivel)}
                        </CardBody>
                    </Card>
                </div>
            )
        )
    }
}

export default withSubscribe(DadosDeVida);