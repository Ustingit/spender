import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

export class EditAndDeleteItemControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,
            objectId: this.props.objectId
        };
        this.delete = this.delete.bind(this);
    }

    delete() {
        this.props.deleteType(this.state.type, this.state.objectId);
    }

    edit() {
        alert("edit " + this.state.objectId + " !");
    }

    render() {
        return(
            <span style={{ float: "right" }} >
                <a><FontAwesomeIcon icon={faEdit} onClick={ () => this.edit() } /></a>&nbsp;
                <a><FontAwesomeIcon icon={faTrashAlt} onClick={ () => this.delete() } /></a>
            </span>
        )
    }
}