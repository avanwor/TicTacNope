import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: Array(9).fill(null),
            xNext: true,
            winner: null,
        };
    }

    handleClick = (i) => {
        let { board, xNext, winner } = this.state

        board = board.slice();
        if (winner || board[i]) {
            return
        }
        board[i] = xNext ? 'X' : 'O';
        this.setState({
            board: board,
            xNext: !xNext,
        });
        if (this.checkWinner(board)) {
            this.setState({
                winner: board[i]
            })
        }
    }

    newGame = () => {
        this.setState({
            board:Array(9).fill(null),
            winner: null
        })
    }

    checkWinner = (board) => {
        const winningLine = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let ele of winningLine) {
            const [a, b, c] = ele;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    }

    render() {
        const { board, xNext, winner } = this.state
        const turn = xNext ? 'X' : 'O';

        return (
            <div className="App">
            <div className="Title">
                Tic-Tac-No win for you
            </div>
            {!winner && <div className="Turn">
                Player Turn: {turn}
            </div>}
            {winner && <div className="Turn winRed">{winner} wins!</div>}
            <button onClick={this.newGame}>new game</button>
            <table className="Board">
                <tbody>
                    <tr className="Row">
                        <td className="Cell" onClick={()=>this.handleClick(0)}>{board[0]}</td>
                        <td className="Cell" onClick={()=>this.handleClick(1)}>{board[1]}</td>
                        <td className="Cell" onClick={()=>this.handleClick(2)}>{board[2]}</td>
                    </tr>
                    <tr className="Row">
                        <td className="Cell" onClick={()=>this.handleClick(3)}>{board[3]}</td>
                        <td className="Cell" onClick={()=>this.handleClick(4)}>{board[4]}</td>
                        <td className="Cell" onClick={()=>this.handleClick(5)}>{board[5]}</td>
                    </tr>
                    <tr className="Row">
                        <td className="Cell" onClick={()=>this.handleClick(6)}>{board[6]}</td>
                        <td className="Cell" onClick={()=>this.handleClick(7)}>{board[7]}</td>
                        <td className="Cell" onClick={()=>this.handleClick(8)}>{board[8]}</td>
                    </tr>
                </tbody>
            </table>
          </div>
        )
    }
}

export default App;
