import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { HIGH_LEVEL_TYPE_INCOME } from '../Data/Types';

const Words = {
    'INCOME': {
        tooltipText: "прихода"
    },
    'COSTS': {
        tooltipText: "расходов"
    }
}

export default class AddTypeModalWindowClass extends React.Component {
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

    handleSave(){
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