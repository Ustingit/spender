import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default class EditTypeModalWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            type: this.props.type,
            objectId: this.props.objectId,
            newTypeName: "",
            newComment: ""
        };
    }

    edit() {
        alert("edit in modal");
        this.setState({ showModal: false });
        this.props.editType(this.state.objectId, this.state.type, this.state.newTypeName, this.state.newComment);
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

    render() {
        return(
            <>
                <a><FontAwesomeIcon icon={faEdit} onClick={ () => this.handleShow() } /></a>
                
                <Modal show={this.state.showModal} onHide={() => this.handleClose()} animation={false}>
                  <Modal.Header>
                    <Modal.Title><h3>Редактирование типа</h3></Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                        <input type="text" placeholder="Впишите название" onChange={ this.onNameChange } /><br />
                        <input type="text" placeholder="Впишите комментарий" onChange={ this.onCommentChange } />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleClose()}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={ this.edit.bind(this) }>
                        Добавить
                    </Button>
                  </Modal.Footer>
                </Modal>
            </>
        )
    }
}