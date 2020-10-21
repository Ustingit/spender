import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import { spendTypeOptions } from '../../Data/Spends';
import { HIGH_LEVEL_TYPE_COSTS } from '../../Data/Types';

export class AddSpendWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            description: "",
            sum: "",
            selectedType: null
        };
    }

    showModal() {
        this.setState({ 
            show: true
        })
    }

    hideModal(e) {
        e.stopPropagation();

        this.setState({ 
            show: false,
            sum: "",
            description: ""
        })
    }

    setDescription(e) {
        e.preventDefault();
        this.setState({
            description: e.target.value
        })
    }

    setSum(e) {
        e.preventDefault();

        //TODO: here checks for Only numbers
        this.setState({
            sum: e.target.value
        })
    }

    saveSpend(e) {
        e.stopPropagation();

        var item = {
            sum: this.state.sum,
            comment: this.state.description,
            selectedType: this.state.selectedType ? this.state.selectedType.value : HIGH_LEVEL_TYPE_COSTS
        }
    
        this.setState({ 
            show: false,
            sum: "",
            description: ""
        })

        if (this.props.addSpend) {
            this.props.addSpend(item);
        }
    }

    handleTypeChange = selectedType => {
        this.setState({ 
            selectedType: selectedType
         });
    };

    render() {
        return(<a style={{ textAlign: "center" }} onClick={ () => this.showModal() } >
            <FontAwesomeIcon size='3x' icon={ faPlusSquare } />
            { this.state.show && <div>
                    <div>Заполните поля ниже, чтобы добавить новый расход\доход</div>
                    <div>
                        <div>
                            <input type="text" value={this.state.description} onChange={ this.setDescription.bind(this) } placeholder="описание" />
                            <input type="text" value={this.state.sum} onChange={ this.setSum.bind(this) } placeholder="сумма" />
                            <Select options={spendTypeOptions} onChange={ this.handleTypeChange } />
                        </div>
                        <div>
                            <button onClick={ this.hideModal.bind(this) } >отменить</button>&nbsp;
                            <button onClick={ this.saveSpend.bind(this) } >добавить</button>
                        </div>
                    </div>
                </div> }
        </a>)
    }
}