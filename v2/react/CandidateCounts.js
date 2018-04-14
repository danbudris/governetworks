import React, { Component } from 'react'
import './App.css' 

class CandidateCounts extends Component {
    constructor(props){
        super(props);
        this.state = {
            electionYear: this.props.electionYear,
            candidates: this.props.candidates,
            democrats: (this.props.candidates.filter(cand => cand["CAND_PTY_AFFILIATION"] === "DEM")),
            republicans: (this.props.candidates.filter(cand => cand["CAND_PTY_AFFILIATION"] === "REP")),
            other: (this.props.candidates.filter(cand => cand["CAND_PTY_AFFILIATION"] !== "DEM" && cand["CAND_PTY_AFFILIATION"] !== "REP"))
        }
    }       
        
    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.candidates !== this.state.candidates) {
          this.setState({ candidates: nextProps.candidates });
          this.setState({democrats: (nextProps.candidates.filter(cand => cand["CAND_PTY_AFFILIATION"] === "DEM"))}),
          this.setState({republicans: (nextProps.candidates.filter(cand => cand["CAND_PTY_AFFILIATION"] === "REP"))}),
          this.setState({other: (nextProps.candidates.filter(cand => cand["CAND_PTY_AFFILIATION"] !== "DEM" && cand["CAND_PTY_AFFILIATION"] !== "REP"))}),
          this.setState({electionYear:(nextProps.electionYear)})
        }
    }

    render () {
        return (
            <div className="graphStats">
                <p> {this.state.electionYear} </p>
                <p> Candidates {this.state.candidates.length} </p>
                <p> Republicans {this.state.democrats.length} </p>
                <p> Democrats {this.state.republicans.length} </p>
                <p> Other {this.state.other.length} </p>
            </div>
        )
    }
}

export default CandidateCounts;
