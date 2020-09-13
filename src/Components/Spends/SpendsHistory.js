import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

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
                        <h5>История расходов и приходов</h5><br />
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
    render() {
        return(
            <div key={this.props.data.id} >{this.props.data.sum} руб - {this.props.data.comment}</div>
        )
    }
}