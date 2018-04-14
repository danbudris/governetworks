import React, { Component } from 'react'
import './App.css'
import { InteractiveForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force'
import ValuePicker from './ValuePicker';
import CandidateCounts from './CandidateCounts';

class RelationshipGraph extends Component {
    constructor(props){
        super(props);
        this.state = {
            candidates: [],
            electionState: props.electionState,
            electionYear: props.electionYear,
            candidatesDisplay: []
        };
    }

    grab = (electionState) => {
        fetch("/candidate?state="+electionState+"&year=all")
        .then(res => res.json())
        .then(data => {
            this.setState({candidates: data})
            if (this.state.electionYear !== "all"){
                this.setState({candidatesDisplay: (data.filter(cand => cand["CAND_ELECTION_YR"] === parseInt(this.state.electionYear)))})
            } else {
                this.setState({candidatesDisplay: data})
            }
        });
    }

    updateYear = (year) => {
        if (year !== "all"){
            this.setState({candidatesDisplay: this.state.candidates.filter(cand => cand["CAND_ELECTION_YR"] === parseInt(year))});
        } else {
            this.setState({candidatesDisplay: this.state.candidates});
        }
        this.setState({electionYear: year});
    }

    stateList = ["all","AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID", "IL","IN",
                 "KS","KY","LA","MA","MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ",
                 "NM","NV","NY", "OH","OK","OR","PA","PR","PW","RI","SC","SD","TN","TX","UT","VA","VI",
                 "VT","WA","WI","WV","WY"];

    render() {
        return (
            <div className="graph main">
                <InteractiveForceGraph
                    zoom
                    // Required use of 'alpha: 1' to avoid a bug with the component: https://github.com/uber/react-vis-force/issues/60
                    simulationOptions={{ height: 600, width: 600, alpha: 1 }}
                    labelAttr="label"
                    onSelectNode={(node) => console.log(node)}
                    highlightDependencies 
                >
                    {   
                        this.state.candidatesDisplay.map(cand => {
                            // when the state updates, map all of the returned elements to the interactive graph
                            let party = cand["CAND_PTY_AFFILIATION"];
                            let color = "";
                            if (party === "DEM"){
                                color = "#470FF4"
                            } 
                            else if (party === "REP") {
                                color = "#CE2D4F"
                            } 
                            else {
                                color = "#CEBBC9"
                            }
                            return <ForceGraphNode node={{id: cand["CAND_ID"], label: cand["CAND_NAME"]}} stroke={color} fill={color}/>
                        }) 
                    }
                </InteractiveForceGraph>
                <div className="infoBar">
                    <CandidateCounts candidates={this.state.candidatesDisplay} electionYear={this.state.electionYear}/>
                    <ValuePicker label="Election State" values={this.stateList} callback={this.grab}/>
                    <ValuePicker label="Election Year" values={['all','2018','2016','2014','2012','2010']} callback={this.updateYear}/>
                </div>
            </div>
        )
    }
}

export default RelationshipGraph;
        