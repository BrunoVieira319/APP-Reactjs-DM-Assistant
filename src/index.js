import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'unstated';
import Style from "style-it";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Container, Row, Nav } from 'reactstrap';
import Formulario from './Formulario.js';
import Personagens from './Personagens.js';
import Detalhes from './Detalhes.js';
import EditarPersonagem from './EditarPersonagem.js';

class App extends Component {
  render = () => (
    Style.it(`
      @import url('https://fonts.googleapis.com/css?family=Skranji|Cantora+One');

      .header {
        background-color: #354;
        height: 60px;
      }
      .header-container {
        background-color: #354;
        display: flex;
        justify-content: flex-end;
      }
      .link-header {
        font-family: 'Cantora One';
        font-size: 22px;
        padding: 14px;
        text-decoration: none;
        color: #FFF;
        transition: 0.4s;
      }
      .link-header:hover {
        background-color: #263;
      }
      .body-container {
        margin-top: 30px;
      }
      `,
      <div>
        <Router>
          <div>

            <Row className={"header"}>
              <Container className={"header-container"}>
                <Nav>
                  <Link to="/" className={"link-header"}>
                      Lista de Personagens
                  </Link>
                  <Link to="/add" className={"link-header"}>
                      Adicionar Personagem
                  </Link>
                </Nav>
              </Container>
            </Row>

            <Container className={"body-container"}>
              <Route path="/" exact component={Personagens}/>
              <Route path="/add" component={Formulario}/>
              <Route path="/:index/detalhes" component={Detalhes} />
              <Route path="/:index/editar" component={EditarPersonagem} />
            </Container>

          </div>
        </Router>
      </div>
    )
  )
}

render(<Provider><App /></Provider>, document.getElementById('root'));
