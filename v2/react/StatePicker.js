import React, { Component } from 'react'
import { FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import './App.css'

class ValuePicker extends Component {
    constructor(props){
        super(props);
        this.state = {
            valueList: props.values
        };
    }
   
    handleChange = (event) => {
        // set the state to the selected electionState, refreshing the component with the new state information
        this.setState({selectedValue: event.target.value});
        this.props.callback(event.target.value);
    };

    render() {
        return (
            <div>
                <FormGroup controlId="formControlsSelect">
                    <ControlLabel>{this.props.label}</ControlLabel>
                    <FormControl componentClass="select" placeholder="select" onChange={this.handleChange}>
                    {this.state.valueList.map(
                        value => {
                        return <option value={value}> {value} </option>
                        }
                    )}
                    </FormControl>
                </FormGroup>
            </div>
        )
    }
}

export default ValuePicker;
