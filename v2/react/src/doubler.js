import React, { Component } from 'react'

class Doubler extends Component {
    constructor(props){
    super(props);
    this.state = {
            number: this.props.number
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({number: nextProps.number})
    }

    render(){
        return (
            <div>
                <p> Doubled Number: {this.state.number * 2} </p>
            </div>
        )
    }
}

export default Doubler;
