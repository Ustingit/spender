import React, { useState } from 'react';
import About from './About';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { HIGH_LEVEL_TYPE_INCOME, HIGH_LEVEL_TYPE_COSTS, incomeTypes, costTypes } from '../Data/Types';
import { EditAndDeleteItemControl } from './ItemControls';

const RightPageType = {
    HISTORY: "HISTORY",
    SPEND_TYPES: "SPEND_TYPES",
    STATISTICS: "STATISTICS",
    ABOUT: "ABOUT"
}

const Words = {
    'INCOME': {
        tooltipText: "прихода"
    },
    'COSTS': {
        tooltipText: "расходов"
    }
}

class RightWrapper extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            type: RightPageType.HISTORY
        }
    }

    renderSwitch(param){
        switch (param) {
            case RightPageType.HISTORY:
                return <div>List of spends:</div>
            case RightPageType.ABOUT:
                return <About />
            case RightPageType.SPEND_TYPES:
                return <SpendTypes />
            default:
                return <div></div>
        }
    }
    
    render() {
        return(
            <div>
            {                
                this.renderSwitch(this.props.type)
            }
            </div>
        );
    }
}

class SpendTypes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddModal: false,
            incomeTypes: incomeTypes,
            costsTypes: costTypes
        };
        this.handleClick = this.handleClick.bind(this);
        this.setNewType = this.setNewType.bind(this);
    }

    handleClick(isDefault) {
        if (isDefault) {
            alert("Редактировать базовые типы запрещено.");
        }
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

                incomeTypes.push(newObject);

                return;
            }

            if (spendType === HIGH_LEVEL_TYPE_COSTS) {
                var maxId = oldCosts.sort((a,b) => b.id - a.id)[0].id;
                const newObject = { id: maxId + 1, name: text, default: false, comment: comment ? comment : text , type: spendType };

                this.setState({
                    costsTypes: [ ...this.state.costsTypes, newObject ]
                });

                costTypes.push(newObject);

                return;
            }
        }

        alert("невозможно добавить, проверьте введённые данные!");
    }

    render() {
        return(
            <Container>
                <Row>
                    <Col md={12} lg={12} >
                        <h2>Доступные статусы:</h2>
                    </Col>
                    <Col md={12} lg={12} >
                        <ListGroup>
                            <h3>Приходы:&nbsp; 
                            <AddTypeModalWindowClass spendType={HIGH_LEVEL_TYPE_INCOME} setNewType={this.setNewType} />
                                </h3><br />                                
                            {
                                this.state.incomeTypes.map(typeObjectInformation => { 
                                    return <ListGroup.Item key={typeObjectInformation.id} action 
                                                onClick={ () => this.handleClick(typeObjectInformation.default) } >
                                            <div>{typeObjectInformation.name} {!typeObjectInformation.default && <EditAndDeleteItemControl type={HIGH_LEVEL_TYPE_INCOME} objectId={typeObjectInformation.id} /> }</div>
                                    </ListGroup.Item>
                                })
                            }
                                <h3>Расходы:&nbsp; 
                                    <AddTypeModalWindowClass spendType={HIGH_LEVEL_TYPE_COSTS} setNewType={this.setNewType} />
                                    </h3><br />
                                {
                                    this.state.costsTypes.map(typeObjectInformation => { 
                                        return <ListGroup.Item key={typeObjectInformation.id} action 
                                                    onClick={ () => this.handleClick(typeObjectInformation.default) } >
                                                {typeObjectInformation.name}
                                        </ListGroup.Item>
                                })
                            }
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        );
    }
}

class AddTypeModalWindowClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spendType: props.spendType ?? HIGH_LEVEL_TYPE_INCOME,
            showModal: false,
            newTypeName: "",
            newComment: ""
        }
    }

    handleShow() {
        this.setState({ showModal: true });
    }

    handleClose() {
        this.setState({ showModal: false });
    }

    onNameChange = (e) => {
        this.setState({ newTypeName: e.target.value })
    }

    onCommentChange = (e) => {
        this.setState({ newComment: e.target.value })
    }

    handleSave(event){
        var test = event.target.value;
        console.log(test);

        this.handleClose();
        
        if (this.props.setNewType) {
            this.props.setNewType(this.state.spendType, this.state.newTypeName, this.state.newComment !== "" ?  this.state.newComment : this.state.newTypeName );
        }
    }

    render() {
    return (
      <>
        <OverlayTrigger placement="right" overlay={
                <Tooltip id={`tooltip-right`}>
                      Добавить тип {Words[this.state.spendType].tooltipText}
                </Tooltip>    
            } >
                <a onClick={ () => this.handleShow() } ><FontAwesomeIcon icon={faPlusCircle} /></a>
        </OverlayTrigger>
  
        <Modal show={this.state.showModal} onHide={() => this.handleClose()} animation={false}>
          <Modal.Header>
            <Modal.Title><h3>Добавление типа {Words[this.state.spendType].tooltipText}</h3></Modal.Title>
          </Modal.Header>
          <Modal.Body>
                <input type="text" placeholder="Впишите название нового типа" onChange={ this.onNameChange } /><br />
                <input type="text" placeholder="Впишите комментарий" onChange={ this.onCommentChange } />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleClose()}>
                Закрыть
            </Button>
            <Button variant="primary" onClick={ this.handleSave.bind(this) }>
                Добавить
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );}
}


export default RightWrapper;
export { RightPageType as WrapperType }