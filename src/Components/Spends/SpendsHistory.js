import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { ColoredLine } from '../Common/Lines/Lines'; 

export default class SpendHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: this.props.history
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={12} lg={12} >
                        <h5 style={{ textAlign: "center" }} >История расходов и приходов</h5><br />
                    </Col>
                    <Col md={12} lg={12} >
                        <ListGroup>
                            {
                                this.state.history.map(historyItem=> {
                                    return <HistoryItem data={historyItem} />
                                })
                            }
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        )
    }
}

class HistoryItem extends React.Component {
    divStyle = {

    };

    render() {
        return(
            <div style={{ textAlign: "center" }} key={this.props.data.id} >
                <sub>{this.props.data.datePrintable}</sub><sup>приход</sup>{this.props.data.sum} руб - описание: {this.props.data.comment}
                <ColoredLine color="black" />
            </div>
        )
    }
}