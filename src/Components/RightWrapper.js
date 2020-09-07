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

const HIGH_LEVEL_TYPE_INCOME = 'INCOME';
const HIGH_LEVEL_TYPE_COSTS = 'COSTS';

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

let IncomeOrCostTypes = {
    INCOME: {
        "зарплата": { id: 0, name: "зарплата", default: true, comment: "сюда входит аванс, зарплата, премии или бонусы, которые вы получили от основного или дополнительных видов деятельности", type: HIGH_LEVEL_TYPE_INCOME },
        "долг": { id: 1, name: "долг", default: true, comment: "возврат отдолженных средств", type: HIGH_LEVEL_TYPE_INCOME },
        "пассивный доход": { id: 2, name: "пассивный доход", default: true, comment: "доходы, полученные от депозитов, инвестиций, и т.д.", type: HIGH_LEVEL_TYPE_INCOME },
        "подарок": { id: 3, name: "подарок", default: true, comment: "средства, подаренные по какому-либо поводу.", type: HIGH_LEVEL_TYPE_INCOME }
    },
    COSTS: {
        "питание": { id: 0, name: "питание", default: true, comment: "расходы на питание.", type: HIGH_LEVEL_TYPE_COSTS },
        "хоз. расходы": { id: 1, name: "хоз. расходы", default: true, comment: "расходы на хозяйственные нужды.", type: HIGH_LEVEL_TYPE_COSTS },
        "транспорт": { id: 2, name: "транспорт", default: true, comment: "расходы на транспорт, такси либо шэринг.", type: HIGH_LEVEL_TYPE_COSTS }
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
            showAddModal: false
        }
    }

    notPossibleToEditDefaultType() {
        alert("Стандартные типы редактировать запрещено!");
    }
    
    editType(isDefaultType) {
        alert("2!");
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
                            <AddTypeModalWindowClass spendType={HIGH_LEVEL_TYPE_INCOME} />
                                </h3><br />                                
                            {
                                Object.keys(IncomeOrCostTypes.INCOME).map(function(key, index) { 
                                    return <ListGroup.Item key={IncomeOrCostTypes.INCOME[key].id} action onClick={ () => this.editType(IncomeOrCostTypes.INCOME[key].default) } >
                                            {IncomeOrCostTypes.INCOME[key].name}
                                    </ListGroup.Item>
                                })
                            }
                                <h3>Расходы:&nbsp; 
                                    <AddTypeModalWindowClass spendType={HIGH_LEVEL_TYPE_COSTS} />
                                    </h3><br />
                                {
                                    Object.keys(IncomeOrCostTypes.COSTS).map(function(key, index) { 
                                        return <ListGroup.Item key={IncomeOrCostTypes.COSTS[key].id} action onClick={ () => this.editType(IncomeOrCostTypes.COSTS[key].default) } >
                                                {IncomeOrCostTypes.COSTS[key].name}
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
            showModal: false
        }
    }

    handleShow() {
        this.setState({ showModal: true });
    }

    handleClose() {
        this.setState({ showModal: false });
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
          <Modal.Header closeButton>
            <Modal.Title><h3>Добавление типа {Words[this.state.spendType].tooltipText}</h3></Modal.Title>
          </Modal.Header>
          <Modal.Body>
                <div>Добавьте название нового типа:</div>
                <div><input type="text" id="newTypeName" placeholder="введите название"></input></div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleClose()}>
                Закрыть
            </Button>
            <Button variant="primary" onClick={() => this.handleClose()}>
                Добавить
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );}
}


export default RightWrapper;
export { RightPageType as WrapperType }