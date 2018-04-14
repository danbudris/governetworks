import React, { Component } from 'react';
import RelationshipGraph from './RelationshipGraph';
import ContributionGraph from './ContributionGraph';
import ContributionChart from './chart.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        electionState: "all",
        electionYear: "all",
        candidate: "H0CA27085"
    };
  }

  render() {
    return (
      <div className="primary">
            <ContributionChart 
              candidate={this.state.candidate}
            />
            <button onClick={() => {this.setState({candidate: "H4AZ07043"}); console.log(this.state.candidate)}}> TESTING </button>
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
*/