import React, { Component } from 'react';
import { winningLines } from './functions'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: Array(9).fill(null),
            xNext: true,
            winner: null,
            draw: null
        };
    }

    handleClick = (i) => {
        let { board, xNext, winner } = this.state

        board = board.slice();
        if (winner || board[i]) {
            return
        }
        board[i] = xNext ? 'x' : 'o';
        this.setState({
            board: board,
            xNext: !xNext,
        }, () => {
            if (this.checkWinner(board)) {
                this.setState({
                    winner: board[i]
                })
            } else if (this.checkDraw(board)) {
                this.setState({
                    draw: true
                })
            } else {
                // if (!xNext) {

                // }
                let square = this.findBestSquare()
                console.log('square',square)
                board[square] = 'o'
                this.setState({
                    board: board,
                    xNext: xNext,
                })
            }
        });
        
    }

    findBestSquare = () => {
        const { board, xNext } = this.state
        
        if (xNext) {
            return 'sup'
        }

        const spotsFilled = board.reduce((acc,ele) => {
            return ele ? acc + 1 : acc;
        },0)
        //save some computation and always grab the middle or a corner
        if (spotsFilled < 5) {
            
            if (!board[4]) {
                console.log('no board 4 hit')
                return 4
            } else if (!board[0]){
                return 0
            } else if (!board[2]){
                return 2
            } else if (!board[6]){
                return 6
            } else if (!board[8]){
                return 8
            }
        }

        return this.search(board)

        
    }

    search = (board) => {
        console.log('search hit')
        let bestMoveValue = -Infinity
        let move = 0
    
        for (let i = 0; i < board.length; i++) {
          let newBoard = this.newMove(i, 'o', board)
          if (newBoard) {
            let predictedMoveValue = this.minMoveValue(newBoard)
            if (predictedMoveValue > bestMoveValue) {
              bestMoveValue = predictedMoveValue
              move = i
            }
          }
        }
    
        return move
      }

    newMove = (move,player,board) => {
        console.log('newmove hit')
        let copyBoard = board.slice()
        console.log(copyBoard)
        if (!copyBoard[move]) {
            console.log('null hit in newMove')
            copyBoard[move] = player
            return copyBoard
        }
        return
    }

    minMoveValue = (board) => {
        if (this.checkWinner('o', board)) return Infinity
        if (this.checkWinner('x', board)) return -Infinity
        if (this.checkDraw(board)) return 0
    
        let bestMoveValue = Infinity
    
        for (let i = 0; i < board.length; i++) {
          let newBoard = this.newMove(i, 'x', board)
          if (newBoard) {
            let predictedMoveValue = this.maxMoveValue(newBoard)
            if (predictedMoveValue < bestMoveValue) bestMoveValue = predictedMoveValue
          }
        }
    
        return bestMoveValue
      }

    maxMoveValue = (board) => {
        if (this.checkWinner('o', board)) return Infinity
        if (this.checkWinner('x', board)) return -Infinity
        if (this.checkDraw(board)) return 0
    
        let bestMoveValue = -Infinity
    
        for (let i = 0; i < board.length; i++) {
          let newBoard = this.newMove(i, 'o', board)
          if (newBoard) {
            let predictedMoveValue = this.minMoveValue(newBoard)
            if (predictedMoveValue > bestMoveValue) bestMoveValue = predictedMoveValue
          }
        }
    
        return bestMoveValue
    }

    newGame = () => {
        this.setState({
            board:Array(9).fill(null),
            winner: null,
            xNext: true
        })
    }

    
    checkDraw = (board) => {
        return board.reduce((bool,ele) => {
            return bool && ele
        }, true)
    }

    checkWinner = (board) => {
        for (let ele of winningLines) {
            const [a, b, c] = ele;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    }

    render() {
        const { board, xNext, winner, draw } = this.state
        const turn = xNext ? 'X' : 'O';

        return (
            <div className="App">
            <div className="Title">
                Tic-Tac-No win for you
            </div>
            {!winner && !draw && <div className="Turn">
                Player Turn: {turn}
            </div>}
            {winner && <div className="Turn winRed">{winner} wins!</div>}
            {draw && <div className="Turn winRed">Draw :(</div>}
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
