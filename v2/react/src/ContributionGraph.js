import React, { Component } from 'react'
import './App.css'
import { InteractiveForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force'
import ValuePicker from './ValuePicker';

class ContributionGraph extends Component {
    constructor(props){
        super(props);
        this.state = {
            candidate: [],
            contributions: [],
            committees: [],
            electionYear: "",
            electionState: ""
        };
    }

    getCand = (candID) => {
        fetch("/candidate/"+candID)
        .then(res => res.json())
        .then(data => {
            //this.setState({contributions: (this.getCont({candID: data[0]["CAND_ID"]}))})
            this.getCont({candID: data[0]["CAND_ID"]})
            this.setState({candidate: data})
            //this.setState({contributions: contributions})

        })
    }

    getCmte = (cmteID) => {
        fetch("/contribution?cmteID="+cmteID)
        .then(res => res.json())
        .then(data => {
            this.setState({committees: data})
        });
    }

    cmtes = (contributions) => {
        var cmteList = []
        for (var i in contributions){
            cmteList.push({CMTE_ID: contributions[i].CMTE_ID})
        }
        this.setState({committees: cmteList})
    }

    // Get candidate or committe information, and set the contributions graph to those associated with the entity
    getCont = (candOrCmte) => {
        let cmte = ""
        let cand = ""
        if (candOrCmte["cmteID"]){cmte = candOrCmte["cmteID"]}
        else {cmte="all"}
        if (candOrCmte["candID"]){cand = candOrCmte["candID"]}
        else {cand="all"}
        fetch("/contribution?candID="+cand+"&cmteID="+cmte)
        .then(res => res.json())
        .then(data => {
            this.setState({contributions: data});
            this.cmtes(data)
        })
    }

    updateYear = () => {

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
                        this.state.contributions.map(cont => {
                            return (
                            <ForceGraphNode 
                                node={{id: cont["TRAN_ID"],
                                label: cont["CMTE_ID"] + " " + cont["TRANSACTION_AMT"]
                                }}
                                stroke="green"
                                fill="green"
                            />
                            )
                        })
                    }
                    {
                        this.state.contributions.map(cont => {
                            return(
                                <ForceGraphLink
                                    link={{source: cont["TRAN_ID"], target: cont["CAND_ID"]}}
                                />
                            )
                        })
                    }
                    {
                        //this breaks the graph; the links don't display correctly when we add this in, not sure why.  They all cluster together at middle
                        this.state.committees.map(cmte => {
                            return <ForceGraphNode 
                                node={{id: cmte["CMTE_ID"], 
                                label: cmte.CMTE_ID}}
                                stroke="white"
                                fille="white"
                            />
                        })
                    }
                </InteractiveForceGraph>
                <div className="infoBar">
                    <ValuePicker label="Candidates" values={["H0CA27085","H0AR03030","H0AR01125","H2CA43245"]} callback={this.getCand}/>
                    <ValuePicker label="Committees" values={this.state.committees} callback={this.updateYear}/>
                </div>
            </div>
        )
    }
}

export default ContributionGraph;
        

/*

                            <ForceGraphLink
                                link={{source: cont["CMTE_ID"], target: cont["TRAN_ID"]}}
                            />,
                            <ForceGraphLink
                                link={{source: cont["TRAN_ID"], target: cont["CAND_ID"]}}
                            />
                        */