import React, { Component } from 'react';
import { winningLines } from './functions'
class Yapp extends Component {
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
                console.log(this.findBestSquare())
            }
        });
        
    }

    findBestSquare = () => {
        let { board, xNext } = this.state

        if (xNext) return

        const spotsFilled = board.reduce((acc,ele) => {
            return ele ? acc + 1 : acc;
        },0)
        //save some computation and always grab the middle or a corner
        if (spotsFilled < 3) {
            if (!board[4]) {
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
        
        const squareScore = Array(9).fill(null)

        //i might need to calc the min as well, so algo can consider the worst move the opponent can make
        const getScores = (curBoard,depth,turn) => {
            //check if a winner
            let winner = this.checkWinner(curBoard)
            let draw = this.checkDraw(curBoard)
            
            //computer is 'o' - we want x to have no points
            //x should not be the first winner
            if (winner == 'x') {
                console.log('winner hit', turn, curBoard)
                return depth - 10
            } else if (winner == 'o') {
                console.log('winner hit', turn, curBoard)
                return 10 - depth
            } else if (draw) {
                console.log('draw hit board',curBoard)
                return 0
            }
            let moves = []
            let newDepth = depth + 1
            for (let i = 0; i < curBoard.length; i++) {
                if (!curBoard[i]) {
                    curBoard[i] = turn
                    let nextTurn = turn === 'x' ? 'o' : 'x'; //the turn must be getting out of whack. 
                    let move = {}
                    let score = getScores(curBoard.slice(),newDepth,nextTurn)
                    // if (score === 9) {
                        console.log('score from getScore call',i,score)
                    // }
                    
                    if(typeof score != "number"){
                        score = score.score;
                    }
                    move.square = i
                    move.score = score
                    moves.push(move)
                    curBoard[i] = null
                }
                
            }
            //console.log('moves', moves)
            let maxScore = 0
            let minScore = 0
            let maxMove = {}
            //console.log('maxScore',maxScore)
            let bestMoveIndex = null
            for (let k = 0; k < moves.length; k++) {
                if (moves[k].score > maxScore) {
                    maxScore = moves[k].score
                    maxMove = moves[k]
                } else if (moves[k].score < minScore) {

                }

                // if(moves[k].score > moves[max].score){
                //     maxScore = k;	
                // }		
            }
            //console.log('bestMoveIndex',bestMoveIndex)
            return maxMove;
            //return bestMoveIndex;
        }
        let playerTurn = xNext ? 'x' : 'o'
        return getScores(board,0,playerTurn)

        
        
        //based on the board, find all scenarios where each player could win, (opposite player win is negative points). Long defeats hurt less, short wins get more points, short defeats mean big negative points. 
            //put a board into the function
            //check if there's winner
                //if yes, return a 'win-score', which takes depth into account. 
                    //if x (human) is the winner, return depth (number of turns to full board (9)) minus 10
                    //if o (bot) is winner, return 10 - depth. [if depth is short, like you're close to a win, it gets more point than a longer win]
            //check if there's a draw
                //return 0 points (maybe prioritize this?)
            //for the current board, identify each square that is open as a 'move'
                //for each 'move' available, recurse (finding the next move) until there's a winner or draw, and return the score (depth/how many turns , then +- 10 for the win/loss)
                //find the single option with the most points? or add all the possible scenarios to the score?
            //backtrack, moving the square back to null to explore the other scenarios
            //find the max of the scores
            
    }

    newGame = () => {
        this.setState({
            board:Array(9).fill(null),
            winner: null,
            xNext: true
        })
    }

    //this must come after state is set (mark is made) from the handleclick function
    checkDraw = (board) => {
        let copyBoard = board.slice()
        console.log('checkDraw Board',copyBoard)
        return copyBoard.reduce((bool,ele) => {
            return bool && ele
        }, true)
    }

    checkWinner = (board) => {
        //console.log('checkWinner Board',board)
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

export default Yapp;
