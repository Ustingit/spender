import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

export class AddSpendWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddModal: false
        }
    }

    render() {
        return(<a style={{ textAlign: "center" }} >
            <FontAwesomeIcon size='3x' icon={ faPlusSquare } />
        </a>)
    }
}