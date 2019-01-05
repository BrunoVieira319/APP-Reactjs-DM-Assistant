import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'unstated';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Container, Row, Nav } from 'reactstrap';
import { FaDAndD } from 'react-icons/fa'
import Style from 'style-it';
import css from './css/index.js';
import AddPersonagem from './AddPersonagem.js';
import AddMagia from './AddMagia.js';
import Personagens from './Personagens.js';
import Magias from './Magias'
import Detalhes from './Detalhes.js';
import EditarPersonagem from './EditarPersonagem.js';

class App extends Component {
  render = () => (
    Style.it(
      css(),
      <div>
        <Router>
          <div>
            
            <Row className={"header"}>
              <Container className={"header-container"}>
                <FaDAndD size={60} color='white' />
                <Nav>
                  <Link to="/personagens" className={"link-header"}>
                      Personagens
                  </Link>
                  <Link to="/magias" className={"link-header"}>
                      Magias
                  </Link>
                  <div className="dropdown">
                    <div className="link-header">Adicionar</div>
                    <div className="dropdown-content">
                      <Link to="/add/personagem">Personagem</Link>
                      <Link to="/add/magia">Magia</Link>
                    </div>
                  </div>
                </Nav>
              </Container>
            </Row>

            <Container className={"body-container"}>
              <Route path="/personagens" exact component={Personagens}/>
              <Route path="/magias" component={Magias}/>
              <Route path="/add/personagem" component={AddPersonagem}/>
              <Route path="/add/magia" component={AddMagia}/>
              <Route path="/:id/detalhes" component={Detalhes} />
              <Route path="/:id/editar" component={EditarPersonagem} />
            </Container>

          </div>
        </Router>
      </div>
    )
  )
}

render(<Provider><App /></Provider>, document.getElementById('root'));
