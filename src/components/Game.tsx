import clsx from 'clsx';
import { useEffect, useMemo } from 'react';
import useGame from '../hooks/useGame';
import { TTile } from '../types';

const Game = () => {
	const { pixels, player, paused, updateContext, pauseUnpause, events } =
		useGame();

	const handlePixelClick = (pixel: TTile) => console.dir(pixel);

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

	const sortedEvents = useMemo(
		() => events?.sort((a, b) => b.tick - a.tick) ?? [],
		[events]
	);

	return (
		<div className='flex justify-center'>
			<div className='w-48 h-96 output-log overflow-hidden'>
				{sortedEvents.slice(0, 12).map((e) => (
					<div key={e.id} className='h-5 w-full flex justify-between'>
						<div className='flex items-center'>
							<div className='w-8 h-full bg-stone-900 rounded-md inline-flex justify-center items-center mr-2'>
								{e.id}
							</div>{' '}
							{e.collidedWith.type}
						</div>
						{e.collidedWith.x} / {e.collidedWith.y}
					</div>
				))}
			</div>
			<div className='w-96 h-96 frame'>
				{pixels.map((pixel, i) => (
					<div
						key={i}
						style={{
							backgroundColor: pixel.bg,
						}}
						className={clsx('pixel text-white relative', pixel.bg)}>
						{pixel.children}
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
		</div>
	);
};

export default Game;
