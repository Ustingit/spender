import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import { spendTypeOptions } from '../../Data/Spends';
import { HIGH_LEVEL_TYPE_COSTS, HIGH_LEVEL_TYPE_INCOME, incomeTypesSelectorData, costsTypesSelectorData } from '../../Data/Types';

const customStyles = {
    menu: () => ({
      width: 200
    }),
    control: () => ({
      width: 200
    }),
} // styles={customStyles}

export class AddSpendWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            description: "",
            sum: "",
            selectedType: null,
            selectedSubType: null,
            subTypeOptions: []
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
            selectedType: this.state.selectedType ? this.state.selectedType.value : HIGH_LEVEL_TYPE_COSTS,
            selectedSubType: this.state.selectedSubType
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
        if (selectedType.value === HIGH_LEVEL_TYPE_COSTS) {
            this.setState({ 
                selectedType: selectedType,
                subTypeOptions: costsTypesSelectorData(),
                selectedSubType: null
             });
        }

        if (selectedType.value === HIGH_LEVEL_TYPE_INCOME) {
            this.setState({ 
                selectedType: selectedType,
                subTypeOptions: incomeTypesSelectorData(),
                selectedSubType: null
             });
        }

        this.setState({ 
            selectedType: selectedType,
            selectedSubType: null
         });
    };

    handleSubTypeChange = selectedSubType => {
        this.setState({ 
            selectedSubType: selectedSubType.value
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
                            <Select options={spendTypeOptions} onChange={ this.handleTypeChange } width='100px' noOptionsMessage={() => "типы отсутствуют"} placeholder='Тип' />
                            <Select options={ this.state.subTypeOptions } onChange={ this.handleSubTypeChange } noOptionsMessage={() => "нет конкретных типов"} placeholder='Подтип' />
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