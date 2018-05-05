import React, { Component } from 'react'
import './App.css'
import ReactEcharts from 'echarts-for-react'

class ContributionChart extends Component {
    constructor(props){
        super(props)
        this.state = {
            candidate: this.props.candidate,
            response: {}
        };
    }
    
      componentDidMount() {
        // whent the componenet has rendered and mounted successfully, call the API and return the graph data
        this.callApi(this.state.candidate)
          .then(response => this.setState({ response: response }))
          .then(console.log(this.state.response))
          .catch(err => console.log(err));
      }
    
      componentWillReceiveProps(nextProps){
                  // whent the componenet has rendered and mounted successfully, call the API and return the graph data
        this.callApi(nextProps.candidate)
            .then(response => this.setState({ response: response }))
            .then(console.log(this.state.response))
            .catch(err => console.log(err));
      }

      // function to a call the api and return the body of the result
      callApi = async (candidate) => {
        const response = await fetch('http://127.0.0.1:8080/api/graph/contribution/' + candidate);
        const body = await response.json();
    
        if (response.status !== 200) throw Error(body.message);
        return body;
      };

    // function to convert the api result into a full set of graph options
    getOption = (candidateGraph) => {
        return {
            legend: {
                data: ['Primary Candidate','Candidate', 'Committee']
            },
            series: [{
                type: 'graph',
                layout: 'force',
                animation: false,
                label: {
                normal: {
                    position: 'right',
                    formatter: '{b}'
                }
                },
                draggable: true,
                data: candidateGraph.nodes,
                categories: candidateGraph.categories,
                force: {
                // initLayout: 'circular'
                // repulsion: 20,
                edgeLength: 5,
                repulsion: 20,
                gravity: 0.2
                },
                edges: candidateGraph.links
            }]
        };
    };

    render() {
        return(
            <div> 
                <div>
                    <label> Contributions from Committees </label>
                    <ReactEcharts
                        option={this.getOption(this.state.response)}
                        style={{height: '700px', width: '700px'}}
                        className='react_for_echarts'
                    />
                </div>    
            </div>
        )
    }
}

export default ContributionChart