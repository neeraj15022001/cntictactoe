import React, {Component} from 'react';
import tw from "tailwind-styled-components"
import x from "../../assets/x.png"
import o from "../../assets/o.png"

class GameBoard extends Component {
    constructor() {
        super();
        this.state = {
            //1 for x and 2 for o
            userPlaying: 1,
            game: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            spacesLeft: 9,
        }
    }

    changeState = (row, col) => {
        this.setState((prevState) => {
            let newGame = prevState.game
            newGame[row][col] = this.state.userPlaying
            return {
                ...prevState,
                game: newGame,
                userPlaying: this.state.userPlaying === 1 ? 2 : 1,
                spacesLeft: prevState.spacesLeft - 1
            }
        })
    }

    showResult = (winner) => {
        if (this.state.spacesLeft === 0 && winner === 0) {
            alert("It's a tie")
            return 1
        } else {
            if (winner !== 0) {
                alert(`Player ${winner} won`)
                return 1
            } else {
                return 0
            }
        }
    }
    checkWinner = () => {
        let game = this.state.game
        let winner = 0
        //check rows
        for (let i = 0; i < 3; i++) {
            if (game[i][0] === game[i][1] && game[i][1] === game[i][2]) {
                winner = game[i][0]
            }
        }
        //check columns
        for (let i = 0; i < 3; i++) {
            if (game[0][i] === game[1][i] && game[1][i] === game[2][i]) {
                winner = game[0][i]
            }
        }
        //check diagonals
        if (game[0][0] === game[1][1] && game[1][1] === game[2][2]) {
            winner = game[0][0]
        }
        if (game[0][2] === game[1][1] && game[1][1] === game[2][0]) {
            winner = game[0][2]
        }
        return winner
    }
    resetGame = () => {
        this.setState({
            userPlaying: 1,
            game: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            spacesLeft: 9,
        })
    }
    handleClick = (e) => {
        if (e.target.tagName === "IMG") {
            alert("NOT Allowed")

        } else if (e.target.tagName === "TD") {
            const col = e.target.dataset.col
            const row = e.target.parentElement.dataset.row
            // this.changeState(row, col)
            let newGame = this.state.game
            newGame[row][col] = this.state.userPlaying
            const winner = this.checkWinner(newGame)
            const res = this.showResult(winner)
            if (res === 1) {
                this.resetGame()
            } else {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        game: newGame,
                        userPlaying: prevState.userPlaying === 1 ? 2 : 1,
                        spacesLeft: prevState.spacesLeft - 1
                    }
                })
            }

        }
    }

    render() {
        return (
            <div>
                <ScoreBoard>
                    <ScoreBoardLabel>Player 1</ScoreBoardLabel>
                    <Scores>
                        <ScoreLabel>0</ScoreLabel>
                        <ScoreLabel>-</ScoreLabel>
                        <ScoreLabel>0</ScoreLabel>
                    </Scores>
                    <ScoreBoardLabel>Computer</ScoreBoardLabel>
                </ScoreBoard>
                <GameBox>
                    <GameTable>
                        <TableBody>
                            {this.state.game.map((row, index) => (
                                <GameRow data-row={index} key={index}>
                                    {row.map((col, index) => (
                                        col === 0 ? (
                                            <GameCell data-col={index} onClick={this.handleClick} key={index + 9}>
                                                {col === 0 ? "" : <Image src={col === 1 ? x : o}/>}
                                            </GameCell>) : (<GameCell data-col={index} key={index + 9}>
                                            {col === 0 ? "" : <Image src={col === 1 ? x : o}/>}
                                        </GameCell>)
                                    ))}
                                </GameRow>
                            ))}
                        </TableBody>
                    </GameTable>
                </GameBox>
            </div>
        );
    }
}

const ScoreBoard = tw.div`w-96 flex items-center justify-between py-5`
const Scores = tw.div`bg-white px-5 py-2 rounded-full shadow-lg`
const ScoreLabel = tw.span`font-bold text-gray-500`
const ScoreBoardLabel = tw.span`font-bold text-gray-400 px-6`
const GameBox = tw.div`w-96 h-96 bg-white shadow-lg rounded-lg`
const GameTable = tw.table`table-auto w-full h-full`
const GameRow = tw.tr``
const GameCell = tw.td` border-2 w-1/3 h-1/3`
const Image = tw.img`w-auto h-20 mx-auto my-auto`
const TableBody = tw.tbody``
export default GameBoard;