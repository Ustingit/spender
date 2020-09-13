import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import RightWrapper, { WrapperType } from './Components/RightWrapper';
import { incomeTypes, costTypes, HIGH_LEVEL_TYPE_COSTS, HIGH_LEVEL_TYPE_INCOME } from './Data/Types';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      type: WrapperType.HISTORY,
      incomeTypes: incomeTypes,
      costsTypes: costTypes
    }
    this.setNewType = this.setNewType.bind(this);
  }

  changeType(newType){
      this.setState({ type: newType });
  }

  setNewType(spendType, text, comment = null) {
    let oldIncomes = this.state.incomeTypes;
    let oldCosts = this.state.costsTypes;

    if (spendType){
        if (spendType === HIGH_LEVEL_TYPE_INCOME) {
            var maxId = oldIncomes.sort((a,b) => b.id - a.id)[0].id;
            const newObject = { id: maxId + 1, name: text, default: false, comment: comment ? comment : text , type: spendType };

            this.setState({
                incomeTypes: [ ...this.state.incomeTypes, newObject ]
            });

            return;
        }

        if (spendType === HIGH_LEVEL_TYPE_COSTS) {
            var maxId = oldCosts.sort((a,b) => b.id - a.id)[0].id;
            const newObject = { id: maxId + 1, name: text, default: false, comment: comment ? comment : text , type: spendType };

            this.setState({
                costsTypes: [ ...this.state.costsTypes, newObject ]
            });

            return;
        }
    }

    alert("невозможно добавить, проверьте введённые данные!");
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
                  <Button onClick={ () => { this.changeType(WrapperType.HISTORY) }} >History</Button>
                  <Button onClick={ () => { this.changeType(WrapperType.SPEND_TYPES) } } >Spend types</Button>
                  <Button onClick={ () => { this.changeType(WrapperType.ABOUT) }} >About</Button>
              </ButtonGroup>
          </Col>
          <Col md={9} lg={9}>
              <RightWrapper type={this.state.type} incomeTypes={this.state.incomeTypes} costsTypes={this.state.costsTypes} setNewType={this.setNewType} />
          </Col>
        </Row>
    </Container>
    );  
  }
}

export default App;
