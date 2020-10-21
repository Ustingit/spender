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
import { getSpendsGroupedByDate, setNewHistory, getSpends, getCurrentMaxIdById, addSpend } from "./Data/Spends";
import { generateUUID } from './Utils/GuidHelper'; 

/* 
TODO:

1) add spend
2) edit spend

*/

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      type: WrapperType.HISTORY,
      incomeTypes: this.props.incomeTypes,
      costsTypes: this.props.costTypes,
      history: getSpendsGroupedByDate(),
      historyHash: generateUUID()
    }
    this.setNewType = this.setNewType.bind(this);
    this.deleteType = this.deleteType.bind(this);
    this.editExistType = this.editExistType.bind(this);
    this.deleteHistoryItem = this.deleteHistoryItem.bind(this);
    this.addSpendItem = this.addSpendItem.bind(this);
  }

  addSpendItem(item) {
      var id = getCurrentMaxIdById();
      var itemToAdd = {
        id: id + 1, 
        sum: item.sum,
        highType: HIGH_LEVEL_TYPE_COSTS,
        concreteTypeId: 2,
        date: new Date().toString(),
        comment: item.comment
      };

      addSpend(itemToAdd);

      var updatedHistory = getSpendsGroupedByDate();
      this.setState({
        history: updatedHistory,
        historyHash: generateUUID()
      });
      
  }

  deleteHistoryItem(id) {
    let filteredHistory = getSpends().filter(item => item.id !== id);
    setNewHistory(filteredHistory);
    
    this.setState({
      historyHash: generateUUID()
    })
  }

  changeType(newType){
      this.setState({ type: newType });
  }

  deleteType(type, id) {
      if (type === HIGH_LEVEL_TYPE_INCOME) {
        let filteredArray = this.state.incomeTypes.filter(item => item.id !== id)
        this.setState({incomeTypes: filteredArray});
        setNewList(filteredArray, type);
      } else if (type === HIGH_LEVEL_TYPE_COSTS) {
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
        Spender - приложение для контроля ваших ежедневных трат!
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
                            history={this.state.history}
                            deleteHistoryItem={this.deleteHistoryItem}
                            historyHash={this.state.historyHash}
                            addSpend={this.addSpendItem} />
          </Col>
        </Row>
    </Container>
    );  
  }
}

export default App;


/*

Tips:

1)
componentWillUpdate(nextProps, nextState) {
        alert("WillUpdate cur: " + this.state.show + ", " + this.state.sum + ", " + this.state.description + ". next: " + nextState.show + ", " + nextState.sum + ", " + nextState.description);
    }

    componentDidUpdate(prevProps, prevState) {
        alert("DidUpdate cur: " + this.state.show + ", " + this.state.sum + ", " + this.state.description + ". prev: " + prevState.show + ", " + prevState.sum + ", " + prevState.description);
    }





*/