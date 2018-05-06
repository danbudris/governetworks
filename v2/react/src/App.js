import React, { Component } from 'react';
import ContributionChart from './chart.js';
import CandidatePicker from './CandidatePicker.js'
import ValuePicker from './ValuePicker.js'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        electionState: "all",
        electionYear: "all",
        party: "DEM",
        office: "S",
        candidates: [],
        candidate: "",
    };
  }

  render() {
    return (
      <div className="primary">
            <ContributionChart 
              candidate={this.state.candidate}
            />
            <ValuePicker
              label="State"
              values={[ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ]}
              callback={(state)=>(this.setState({'electionState':state}))}
            />
            <ValuePicker
              label="Year"
              values={["2008","2010","2012","2014","2016","2018"]}
              callback={(year)=>(this.setState({'electionYear':year}))}
            />
            <ValuePicker
              label="Party"
              values={["DEM","REP"]}
              callback={(party)=>(this.setState({'party':party}))}
            />
            <ValuePicker
              label="Office"
              values={["S","H"]}
              callback={(office)=>(this.setState({'office':office}))}
            />
            <CandidatePicker 
              label="Candidates"
              state={this.state.electionState}
              year={this.state.electionYear}
              party={this.state.party}
              office={this.state.office}
              callback={(cand)=>(this.setState({'candidate':cand}))}/>
      </div>
    );
  }
}

export default App;

/*
            <RelationshipGraph 
            electionState={this.state.electionState}
            electionYear={this.state.electionYear}


            <RelationshipGraph />
            <ContributionGraph />
            <button onClick={() => {this.setState({candidate: "H4AZ07043"}); console.log(this.state.candidate)}}> TESTING </button>

*/