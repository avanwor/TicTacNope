import React, { Component } from 'react';
import Board from './board'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            intro: 'Hello'
        }
    }

    componentDidMount() {
        //make api call
    }

    render() {
        return (
            <Board />
        )
    }
};

export default App;
