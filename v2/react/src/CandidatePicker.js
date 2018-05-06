import React, { Component } from 'react'
import { FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import './App.css'

class CandidatePicker extends Component {
    constructor(props){
        super(props);
        this.state = {
            state: props.state,
            year: props.year,
            party: props.party,
            office: props.office,
            valueList: []
        };
    }
   
    componentWillMount() {
        // whent the componenet has rendered and mounted successfully, call the API and return the graph data
        this.callApi(this.state.state, this.state.year, this.state.party, this.state.office)
            .then(response => this.setState({ valueList: response }))
            .then(console.log(this.state.valueList))
            .catch(err => console.log(err));
    }

    componentDidMount() {
        // whent the componenet has rendered and mounted successfully, call the API and return the graph data
        this.callApi(this.state.state, this.state.year, this.state.party, this.state.office)
          .then(response => this.setState({ valueList: response }))
          .then(console.log(this.state.valueList))
          .catch(err => console.log(err));
      }
    
    componentWillReceiveProps(nextProps){
        // whent the componenet has rendered and mounted successfully, call the API and return the graph data
        this.callApi(nextProps.state, nextProps.year, nextProps.party, nextProps.office)
            .then(response => this.setState({ valueList: response }))
            .then(console.log(this.state.valueList))
            .catch(err => console.log(err));
      }

      // function to sync the api and return the body of the result
      callApi = async (state, year, party, office) => {
        const response = await fetch("http://127.0.0.1:8080/candidate?party="+party+"&state="+state+"&year="+year+"&candOffice="+office, {
            body: JSON.stringify(), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, same-origin, *omit
            headers: {
              'user-agent': 'Mozilla/4.0 MDN Example',
              'content-type': 'application/json'
            },
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // *client, no-referrer
          });
        const body = await response.json();
    
        if (response.status !== 200) throw Error(body.message);
        return body;
      };
    
    handleChange = (event) => {
        // set the state to the selected value, refreshing the component with the new state information
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
                        return <option label= {value.CAND_NAME} value={value.CAND_ID}> {value.CAND_NAME} </option>
                        }
                    )}
                    </FormControl>
                </FormGroup>
            </div>
        )
    }
}

export default CandidatePicker;