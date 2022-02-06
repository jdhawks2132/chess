import './App.css';
import ChessBoard from 'chessboardjsx';
import { useState, useEffect, useRef } from 'react';
import Chess from 'chess.js';

const container = {
	marginTop: '2rem',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-around',
	alignItems: 'center',
};

function App() {
	const [fen, setFen] = useState('start');

	let game = useRef(null);

	useEffect(() => {
		game.current = new Chess();
	}, []);

	console.log(game);

	const handleOnDrop = ({ sourceSquare, targetSquare }) => {
		let move = game.current.move({
			from: sourceSquare,
			to: targetSquare,
		});
		//check for illegal moves
		if (move === null) return;

		//update fen string
		setFen(game.current.fen());
	};

	const handleClickReset = () => {
		game.current.clear();
		game.current.reset();
		setFen('start');
	};

	return (
		<div className='App' style={container}>
			{game.current && game.current.game_over() ? (
				<div>
					<h1>Game Over</h1>
				</div>
			) : (
				<span></span>
			)}
			<ChessBoard position={fen} onDrop={handleOnDrop} />
			<div>
				<button className='btn' onClick={handleClickReset}>
					reset
				</button>
			</div>
		</div>
	);
}

export default App;
