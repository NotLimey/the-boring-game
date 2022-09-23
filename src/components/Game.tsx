import useGame from '../hooks/useGame';
import clsx from 'clsx';
import { TFramePixel } from '../types';
import { useEffect } from 'react';

const Game = () => {
	const { pixels, colors, player, paused, updateContext, pauseUnpause } =
		useGame();

	const handlePixelClick = (pixel: TFramePixel) => console.dir(pixel);

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === ' ') {
				return pauseUnpause();
			}
			if (paused) return;

			const moveLeft = () => {
				// if player x is greater than 1
				// set player x to player x - 1
				updateContext((p) => ({
					...p,
					player: {
						...p.player,
						x: p.player.x > 1 ? p.player.x - 1 : p.player.x,
						tick: p.tick,
					},
				}));
			};
			const moveRight = () => {
				// if player x is less than 8
				// set player x to player x + 1
				updateContext((p) => ({
					...p,
					player: {
						...p.player,
						x: p.player.x < 8 ? p.player.x + 1 : p.player.x,
						tick: p.tick,
					},
				}));
			};
			switch (e.key) {
				case 'a': {
					moveLeft();
					break;
				}

				case 'd': {
					moveRight();
					break;
				}

				case 'ArrowLeft':
					moveLeft();
					break;
				case 'ArrowRight':
					moveRight();
					break;
			}
		};

		window.addEventListener('keydown', handleKey);
		return () => {
			window.removeEventListener('keydown', handleKey);
		};
	}, [pauseUnpause, paused, updateContext]);

	return (
		<div className='w-96 h-96 frame'>
			{pixels.map((pixel, i) => (
				<div
					key={i}
					style={{
						backgroundColor: pixel.color,
					}}
					className={clsx(
						'pixel text-white relative',
						(colors as any)[pixel.color as string]
					)}>
					{pixel.content}
					{pixel.x === player.x && pixel.y === player.y && (
						<div className='player' />
					)}
					<div
						className='x-y'
						onClick={() => handlePixelClick(pixel)}
						children={
							<p>
								{pixel.x}/{pixel.y}
							</p>
						}
					/>
				</div>
			))}
		</div>
	);
};

export default Game;
