import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'unstated';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Container } from 'reactstrap';
import Formulario from './Formulario.js';
import Personagens from './Personagens.js';
import Detalhes from './Detalhes.js';
import EditarPersonagem from './EditarPersonagem.js';

class App extends Component {
  render = () => (
    <Router>
      <div>
        <Container>
          <div style={{padding: '10px'}}>
            <Link to="/">Lista de Jogadores</Link>
          </div>
          <div style={{padding: '10px'}}>
            <Link to="/add">Adicionar Jogador</Link>
          </div>

          <Route path="/" exact component={Personagens}/>
          <Route path="/add" component={Formulario}/>
          <Route path="/:index/detalhes" component={Detalhes} />
          <Route path="/:index/editar" component={EditarPersonagem} />
        </Container>
      </div>
    </Router>    
  )
}

render(<Provider><App /></Provider>, document.getElementById('root'));
