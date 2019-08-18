import React, { Component } from 'react';

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
        return <div>{this.state.intro} from app.js</div>
    }
};


export default App;
