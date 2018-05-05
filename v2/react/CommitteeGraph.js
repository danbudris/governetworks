import React, { Component } from 'react'
import './App.css'
import { InteractiveForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force'
import ValuePicker from './ValuePicker';

class ContributionGraph extends Component {
    constructor(props){
        super(props);
        this.state = {
            candidate: "",
            contributions: [],
            committees: [],
            electionYear: "",
            electionState: ""
        };
    }

    getCand = (candID) => {
        fetch("/candidate?candID="+candID)
        .then(res => res.json())
        .then(data => {
            this.setState({candidate: data})
        });
    }

    getCmte = (cmteID) => {
        fetch("/contribution?cmteID="+cmteID)
        .then(res => res.json())
        .then(data => {
            this.setState({})
        });
    }

    getCont = (candOrCmte) => {
        if (candOrCmte["cmteID"]){cmte = candOrCmte["cmteID"]}
        else {cmte="all"}
        if (candOrCmte["candID"]){cand = candOrCmte["candID"]}
        else {cand="all"}
        fetch("/contribution?candID="+cand+"&cmteID="+cmte)
        .then(res => res.json())
        .then(data => {

        })
    }

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
                        this.state.candidate.map(cand => {
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
                            return <ForceGraphNode 
                                node={{id: cand["CAND_ID"], 
                                label: cand["CAND_NAME"]}} 
                                stroke={color} 
                                fill={color}
                            />
                        })
                    }
                    {
                        this.state.committees.map(cmte => {
                            return <ForceGraphNode 
                                node={{id: cmte["CMTE_ID"], lable: cmte["CMTE_NM"]}}
                            />
                        })
                    }
                    {
                        this.state.contributions.map(cont => {
                            return (
                            <ForceGraphNode 
                                node={{id: cont["TRAN_ID"],
                                label: cont["CMTE_ID"] + " " + cont["TRANSACTION_AMT"]
                                }}
                                stroke="green"
                                fill="green"
                            />,
                            <ForceGraphLink
                                link={{source: cont["CMTE_ID"], target: cont["TRAN_ID"]}}
                            />,
                            <ForceGraphLink
                                link={{source: cont["TRAN_ID"], target: cont["CAND_ID"]}}
                            />
                            )
                        })
                    }
                </InteractiveForceGraph>
                <div className="infoBar">
                    <ValuePicker label="Candidates" values={["H0CA27085","Joe","Tag","Neil"]} callback={()=>(alert('test'))}/>
                    <ValuePicker label="Committees" values={['all','2018','2016','2014','2012','2010']} callback={this.updateYear}/>
                </div>
            </div>
        )
    }
}

export default ContributionGraph;
        