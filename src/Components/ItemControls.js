import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import EditTypeModalWindow from './EditTypeModalWindow';

export class EditAndDeleteItemControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,
            object: this.props.object
        };
        this.delete = this.delete.bind(this);
    }

    delete() {
        this.props.deleteType(this.state.type, this.state.object.id);
    }

    edit() {
        alert("edit " + this.state.object.id + " !");
    }

    render() {
        return(
            <span style={{ float: "right" }} >
               <EditTypeModalWindow type={this.state.type} object={this.state.object} editType={this.props.editType} />&nbsp;
                <a><FontAwesomeIcon icon={faTrashAlt} onClick={ () => this.delete() } /></a>
            </span>
        )
    }
}