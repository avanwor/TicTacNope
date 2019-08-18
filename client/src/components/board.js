import React from 'react';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xNext: true
        };
    }

    handleClick = (i) => {
        let { squares, xNext } = this.state
        squares = squares.slice();
        squares[i] = xNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xNext: !xNext,
        });
    }

    newGame = () => {
        this.setState({squares:Array(9).fill(null)})
    }

    render() {
        const { squares, xNext } = this.state
        const turn = xNext ? 'X' : 'O';

        return (
            <div className="App">
            <div className="Title">
              Tic-Tac-Toe!
            </div>
            <div className="Turn">
              Player Turn: {turn}
            </div>
            <button variant="contained" color="primary" onClick={this.newGame}>new game</button>
            <table className="Board">
                <tbody>
                    <tr className="Row">
                        <td className="Cell" onClick={()=>this.handleClick(0)}>{squares[0]}</td>
                        <td className="Cell" onClick={()=>this.handleClick(1)}>{squares[1]}</td>
                        <td className="Cell" onClick={()=>this.handleClick(2)}>{squares[2]}</td>
                    </tr>
                    <tr className="Row">
                        <td className="Cell" onClick={()=>this.handleClick(3)}>{squares[3]}</td>
                        <td className="Cell" onClick={()=>this.handleClick(4)}>{squares[4]}</td>
                        <td className="Cell" onClick={()=>this.handleClick(5)}>{squares[5]}</td>
                    </tr>
                    <tr className="Row">
                        <td className="Cell" onClick={()=>this.handleClick(6)}>{squares[6]}</td>
                        <td className="Cell" onClick={()=>this.handleClick(7)}>{squares[7]}</td>
                        <td className="Cell" onClick={()=>this.handleClick(8)}>{squares[8]}</td>
                    </tr>
                </tbody>
            </table>
          </div>
        )
    }
}

export default Board;
