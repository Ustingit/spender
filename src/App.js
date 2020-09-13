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
import { HIGH_LEVEL_TYPE_COSTS, HIGH_LEVEL_TYPE_INCOME, setNewList, addItemToList } from './Data/Types';
import { Spends } from "./Data/Spends";

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      type: WrapperType.HISTORY,
      incomeTypes: this.props.incomeTypes,
      costsTypes: this.props.costTypes,
      history: Spends
    }
    this.setNewType = this.setNewType.bind(this);
    this.deleteType = this.deleteType.bind(this);
    this.editExistType = this.editExistType.bind(this);
  }

  changeType(newType){
      this.setState({ type: newType });
  }

  deleteType(type, id) {
      if (type = HIGH_LEVEL_TYPE_INCOME) {
        let filteredArray = this.state.incomeTypes.filter(item => item.id !== id)
        this.setState({incomeTypes: filteredArray});
        setNewList(filteredArray, type);
      } else if (type == HIGH_LEVEL_TYPE_COSTS) {
        let filteredArray = this.state.costsTypes.filter(item => item.id !== id)
        this.setState({costsTypes: filteredArray});
        setNewList(filteredArray, type);
      } else {
        alert("Не удаловь удалить элемент с id: " + id + " типа: " + type);
      }
  }

  setNewType(spendType, text, comment = null) {
    let oldIncomes = this.state.incomeTypes;
    let oldCosts = this.state.costsTypes;

    if (spendType && text){
        if (spendType === HIGH_LEVEL_TYPE_INCOME) {
            var maxId = oldIncomes.sort((a,b) => b.id - a.id)[0].id;
            const newObject = { id: maxId + 1, name: text, default: false, comment: comment ? comment : text , type: spendType };

            this.setState({
                incomeTypes: this.state.incomeTypes.concat(newObject)
            });
            addItemToList(newObject, spendType);
        }

        if (spendType === HIGH_LEVEL_TYPE_COSTS) {
            var maxId = oldCosts.sort((a,b) => b.id - a.id)[0].id;
            const newObject = { id: maxId + 1, name: text, default: false, comment: comment ? comment : text , type: spendType };

            this.setState({
                costsTypes: this.state.costsTypes.concat(newObject)
            });
            addItemToList(newObject, spendType);
        }
    } else {
      alert("невозможно добавить, проверьте введённые данные!");
    }
  }

  editExistType(objectId, type, newTypeName, newComment = null) {
    if (objectId && type && newTypeName){
        if (type === HIGH_LEVEL_TYPE_INCOME) {
            const newState = this.state.incomeTypes.map(obj =>
                obj.id === objectId ? { ...obj, name: newTypeName, comment: newComment ? newComment: newTypeName } : obj
            );

            this.setState({
              incomeTypes: [ ...newState ]
            })
        }

        if (type === HIGH_LEVEL_TYPE_COSTS) {
            const newState = this.state.costsTypes.map(obj =>
                obj.id === objectId ? { ...obj, name: newTypeName, comment: newComment ? newComment: newTypeName } : obj
            );

            this.setState({
                costsTypes: [ ...newState ]
            })
        }
    } else {
      alert("невозможно добавить, проверьте введённые данные!");
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
                  <Button onClick={ () => { this.changeType(WrapperType.HISTORY) }} >История операций</Button>
                  <Button onClick={ () => { this.changeType(WrapperType.SPEND_TYPES) } } >Типы трат и приходов</Button>
                  <Button onClick={ () => { this.changeType(WrapperType.ABOUT) }} >О нас</Button>
              </ButtonGroup>
          </Col>
          <Col md={9} lg={9}>
              <RightWrapper type={this.state.type} 
                            incomeTypes={this.state.incomeTypes} 
                            costsTypes={this.state.costsTypes} 
                            setNewType={this.setNewType}
                            deleteType={this.deleteType}
                            editType={this.editExistType}
                            history={this.state.history} />
          </Col>
        </Row>
    </Container>
    );  
  }
}

export default App;
