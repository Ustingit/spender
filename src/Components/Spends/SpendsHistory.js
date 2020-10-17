import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import css from '../Spends/Spends.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { getSpendsGroupedByDate,  } from "../../Data/Spends";
import incomeImg from "../../Images/income.png";
import outcomeImg from "../../Images/outcome.png";
import { HIGH_LEVEL_TYPE_INCOME, HIGH_LEVEL_TYPE_COSTS } from "../../Data/Types"; 

export default class SpendHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: this.props.history,
            historyHash: this.props.historyHash
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.historyHash != prevProps.historyHash){
            let groupedData = getSpendsGroupedByDate();
            this.setState({
                history: groupedData
            })
        }
    }

    render() {
        var index = 0;

        return (
            <Container>
                <Row>
                    <Col md={12} lg={12} >
                        <h5 style={{ textAlign: "center" }} >История расходов и приходов</h5><br />
                    </Col>
                    <Col md={12} lg={12} >
                        <ListGroup>
                            {
                                Object.entries(this.state.history).map(entry => {
                                    return <DateGroup key={index++} data={entry} deleteItem={ this.props.deleteHistoryItem } />
                                })
                            }
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        )
    }
}

class DateGroup extends React.Component {
    render() {
        return(
            <div>
                <div style={{ textAlign: "center" }} >- {this.props.data[0]} -</div>
                <div style={{ textAlign: "center" }} >
                     {
                         this.props.data[1].map(entry => {
                             return <HistoryItem key={entry.id} data={entry} deleteItem={this.props.deleteItem} />
                         })
                     }
                </div>
            </div>
        )
    }
}

class HistoryItem extends React.Component {
    render() {
        var typeImagePath = null;
        if (this.props.data.highType === HIGH_LEVEL_TYPE_INCOME) {
            typeImagePath = incomeImg;
        } else if (this.props.data.highType === HIGH_LEVEL_TYPE_COSTS) {
            typeImagePath = outcomeImg;
        }

        return(
            <div style={{ textAlign: "center" }} className={ css.box } key={this.props.data.id} >
                <div className={ css.element } ><img width="26" alt="type image" src={ typeImagePath } /> {this.props.data.sum} руб - описание: {this.props.data.comment}   <a className={ css.fr } ><FontAwesomeIcon icon={faTrashAlt} onClick={ () => this.props.deleteItem(this.props.data.id) } /></a></div>
                    </div>
        )
    }
}