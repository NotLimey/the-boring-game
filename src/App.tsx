import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { generateNewRow, getInitialFrame } from './functions/frame';

// create const arr with length 36
const colors = {
	sky: 'bg-sky-500',
	dirt: 'bg-orange-900',
};

function App() {
	const [frame, setFrame] = useState(getInitialFrame());
	const [paused, setPaused] = useState(true);
	const [player, setPlayer] = useState({ x: 4, y: 4 });

	const updateFrame = useCallback(() => {
		if (paused) return;
		// from frame delete first row and add new row
		setFrame((prevFrame) => [
			...prevFrame.slice(8),
			...generateNewRow(prevFrame[prevFrame.length - 1].x + 1),
		]);
	}, [paused]);

	useEffect(() => {
		const interval = setInterval(updateFrame, 1000);
		return () => clearInterval(interval);
	}, [updateFrame]);

	return (
		<div className='flex min-h-screen w-full justify-center items-center'>
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
							children={
								<p>
									{pixel.x}/{pixel.y}
								</p>
							}
						/>
					</div>
				))}
			</div>
			<button onClick={() => setPaused(!paused)}>
				{paused ? 'Play' : 'Pause'}
			</button>
		</div>
	);
}

export default App;
