import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { generateNewRow, getInitialFrame } from './functions/frame';
import { TFramePixel } from './types';
import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid';

// create const arr with length 36
const colors = {
	sky: 'bg-sky-500',
	dirt: 'bg-orange-900',
};

function App() {
	const [frame, setFrame] = useState(getInitialFrame());
	const [paused, setPaused] = useState(true);
	const [player, setPlayer] = useState({ x: 4, y: 4 });
	const [secondsElapsed, setSecondsElapsed] = useState(0);

	const updateFrame = useCallback(() => {
		setSecondsElapsed((prev) => prev + 1);
		setFrame((prevFrame) => [
			...prevFrame.slice(8),
			...generateNewRow(prevFrame[prevFrame.length - 1].y + 1),
		]);
		setPlayer((prevPlayer) => ({
			...prevPlayer,
			y: prevPlayer.y + 1,
		}));
	}, []);

	useEffect(() => {
		const interval = setInterval(() => !paused && updateFrame(), 1000);
		return () => clearInterval(interval);
	}, [updateFrame, paused]);

	const handlePixelClick = (pixel: TFramePixel) => {
		const isPlayerHere = pixel.x === player.x && pixel.y === player.y;
		console.dir({
			...pixel,
			isPlayerHere,
		});
	};

	return (
		<div className='flex min-h-screen w-full justify-center items-center flex-col bg-gray-100'>
			<div className='w-96 h-96 frame'>
				{frame.map((pixel, i) => (
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
			<div className='fixed w-full top-8 px-12 flex justify-center'>
				<div className='bg-white shadow-xl w-full py-4 rounded-xl px-6 flex justify-evenly items-center max-w-xl'>
					<p className='text-xl'>{secondsElapsed} seconds</p>
					<div className='flex-1 inline-flex justify-center'>
						<button
							type='button'
							onClick={() => setPaused((prev) => !prev)}
							className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
							{paused ? (
								<>
									<PlayIcon className='h-4 w-4' />
								</>
							) : (
								<>
									<PauseIcon className='h-4 w-4' />
								</>
							)}
						</button>
					</div>
					<p>Score: 0</p>
				</div>
			</div>
		</div>
	);
}

export default App;
