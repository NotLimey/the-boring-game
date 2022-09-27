import clsx from 'clsx';
import { useEffect, useMemo } from 'react';
import useGame from '../hooks/useGame';
import { TTile } from '../types';

const Game = () => {
	const {
		pixels,
		player,
		paused,
		updateContext,
		pauseUnpause,
		events,
		gameOver,
		scores,
	} = useGame();

	const handlePixelClick = (pixel: TTile) => console.dir(pixel);

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === ' ') {
				return pauseUnpause();
			}
			if (paused || gameOver) return;

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
	}, [gameOver, pauseUnpause, paused, updateContext]);

	const sortedEvents = useMemo(
		() => events?.sort((a, b) => b.tick - a.tick) ?? [],
		[events]
	);

	const top10Scores = useMemo(() => {
		const sortedScores = scores.sort((a, b) => b.score - a.score);
		return sortedScores.slice(0, 10);
	}, [scores]);

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
			<div className='w-96 h-96 frame relative'>
				{gameOver && (
					<div className='absolute w-full h-full flex justify-center items-center bg-black/50 z-10'>
						<h2 className='font-mono text-3xl text-white'>
							GAME OVER
						</h2>
					</div>
				)}
				{pixels.map((pixel, i) => (
					<div
						key={i}
						style={{
							backgroundColor: pixel.bg,
						}}
						className={clsx('pixel text-white relative', pixel.bg)}>
						{pixel.children}
						{pixel.x === player.x && pixel.y === player.y && (
							<div
								className={clsx(
									'h-full w-4 mt-5 relative',
									gameOver && 'rotate-90'
								)}>
								<div className='bg-black w-2 h-2 left-1 right-1 absolute' />
								<div className='bg-black absolute top-2 w-2 h-3 left-1' />
								<div className='bg-black absolute w-0.5 left-0 h-3 top-2' />
								<div className='bg-black absolute w-0.5 right-0 h-3 top-2' />
								<div className='bg-black absolute w-0.5 left-1 h-6 bottom-0' />
								<div className='bg-black absolute w-0.5 right-1 h-6 bottom-0' />
								<div className='bg-black absolute w-4 right-1 h-0.5 top-2 left-0' />
							</div>
						)}
						{/* <div
							className='x-y'
							onClick={() => handlePixelClick(pixel)}
							children={
								<p>
									{pixel.x}/{pixel.y}
								</p>
							}
						/> */}
					</div>
				))}
			</div>
			<div className='w-48 h-96 score-board overflow-hidden'>
				{top10Scores.map((e, scoreIdx) => (
					<div
						key={e.date}
						className='h-5 w-full flex justify-between'>
						<div className='flex items-center'>
							<div className='h-full bg-stone-900 px-2 rounded-md inline-flex justify-center items-center mr-2'>
								{scoreIdx + 1}
							</div>
						</div>
						{e.score} points
					</div>
				))}
			</div>
		</div>
	);
};

export default Game;
