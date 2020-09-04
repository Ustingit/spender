import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import RightWrapper, { WrapperType } from './Components/RightWrapper';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      type: WrapperType.HISTORY
    }
  }

  render (){
    return (
    <Container>
      <Jumbotron>
        Spender - app for calculating of your daily spends!
      </Jumbotron>
        <Row>
          <Col md={3} lg={3}>
              <ButtonGroup vertical>
                  <Button onClick={ () => { this.setState({ type: WrapperType.HISTORY }) } } >History</Button>
                  <Button onClick={ () => { this.setState({ type: WrapperType.SPEND_TYPES }) } } >Spend types</Button>
                  <Button>About</Button>
              </ButtonGroup>
          </Col>
          <Col md={9} lg={9}>
              <RightWrapper type={this.state.type} />
          </Col>
        </Row>
    </Container>
    );  
  }
}

export default App;
