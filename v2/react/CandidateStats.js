 
class CandidateCounts extends Component {
    constructor(props){
        super(props);
        this.state = {
            candidates: this.props.candidates,
            democrats: (this.props.candidates.filter(cand => cand["CAND_PTY_AFFILIATION"] === "DEM")),
            republicans: (this.props.candidates.filter(cand => cand["CAND_PTY_AFFILIATION"] === "REP")),
            other: (this.props.candidates.filter(cand => cand["CAND_PTY_AFFILIATION"] !== "DEM" && cand["CAND_PTY_AFFILIATION"] !== "REP"))
        }
    }       
        
    render () {
        return (
            <div className="graphStats">
                <p> Candidates {this.state.candidates.length} </p>
                <p> Republicans {this.state.democrats.length} </p>
                <p> Democrats {this.state.republics.length} </p>
                <p> Other {this.state.candidates.other.length} </p>
            </div>
        )
    }
}

export default CandidateCounts;
