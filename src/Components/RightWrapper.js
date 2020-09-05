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

let ExtendedTypes = {
    HISTORY: { name: "HISTORY", default: true, comment: "список всех расходов и приходов" },
    SPEND_TYPES: { name: "SPEND_TYPES", default: true, comment: "типы расходов и приходов" },
    STATISTICS: { name: "STATISTICS", default: true, comment: "статистика по всем расходам и приходам" },
    ABOUT: { name: "ABOUT", default: true, comment: "о нас" }
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
                        Currenly available types:
                    </Col>
                    <Col md={12} lg={12} >
                        <ListGroup>
                            {
                            Object.keys(ExtendedTypes).map(function(key, index) { 
                                return <ListGroup.Item action onClick={ () => {
                                    if (ExtendedTypes[key].default) {
                                      notPossibleToEditDefaultType()
                                    } else {
                                      editType()
                                    }
                                  } } >
                                        {ExtendedTypes[key].name}
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