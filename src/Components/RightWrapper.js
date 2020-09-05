import React from 'react';
import About from './About';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'

const RightPageType = {
    HISTORY: "HISTORY",
    SPEND_TYPES: "SPEND_TYPES",
    STATISTICS: "STATISTICS",
    ABOUT: "ABOUT"
}

let IncomeOrCostTypes = {
    INCOME: {
        "зарплата": { name: "зарплата", default: true, comment: "сюда входит аванс, зарплата, премии или бонусы, которые вы получили от основного или дополнительных видов деятельности" },
        "долг": { name: "долг", default: true, comment: "возврат отдолженных средств" },
        "пассивный доход": { name: "пассивный доход", default: true, comment: "доходы, полученные от инвестиций, акци и т.д." },
        "подарок": { name: "подарок", default: true, comment: "средства, подаренные по какому-либо поводу." }
    },
    COSTS: {
        "питание": { name: "питание", default: true, comment: "расходы на питание." },
        "хоз. расходы": { name: "хоз. расходы", default: true, comment: "расходы на хозяйственные нужды." },
        "транспорт": { name: "транспорт", default: true, comment: "расходы на транспорт, такси либо шэринг." }
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

function notPossibleToEditDefaultType() {
    alert("Стандартные типы редактировать запрещено!");
}

function editType() {
    alert("2!");
}

class SpendTypes extends React.Component {
    constructor(props) {
        super(props);
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
                            <h3>Приходы:</h3><br />
                            {
                            Object.keys(IncomeOrCostTypes.INCOME).map(function(key, index) { 
                                return <ListGroup.Item action onClick={ () => {
                                    if (IncomeOrCostTypes.INCOME[key].default) {
                                      notPossibleToEditDefaultType()
                                    } else {
                                      editType()
                                    }
                                  } } >
                                        {IncomeOrCostTypes.INCOME[key].name}
                                </ListGroup.Item>
                            })
                            }

                            <h3>Расходы:</h3><br />
                            {
                            Object.keys(IncomeOrCostTypes.COSTS).map(function(key, index) { 
                                return <ListGroup.Item action onClick={ () => {
                                    if (IncomeOrCostTypes.COSTS[key].default) {
                                      notPossibleToEditDefaultType()
                                    } else {
                                      editType()
                                    }
                                  } } >
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

export default RightWrapper;
export { RightPageType as WrapperType }