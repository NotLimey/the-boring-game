import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';
import Game from './components/Game';
import useGame from './hooks/useGame';

type speed = 'normal' | 'slow' | 'fast' | 'super fast';

function App() {
	const { pauseUnpause, paused, score, updateContext } = useGame();
	const currentTick = useRef(0);
	const [speed, setSpeed] = useState<speed>(
		(window.localStorage.getItem('speed') as speed) || 'normal'
	);

	useEffect(() => {
		const speed = window.localStorage.getItem('speed');
		if (speed) {
			setSpeed(speed as speed);
		}
	}, []);

	useEffect(() => {
		let ms = 500;
		switch (speed) {
			case 'normal':
				ms = 500;
				break;
			case 'slow':
				ms = 1000;
				break;
			case 'fast':
				ms = 250;
				break;
			case 'super fast':
				ms = 100;
				break;
		}
		window.localStorage.setItem('speed', speed);
		updateContext((p) => ({
			...p,
			ms,
		}));
	}, [speed, updateContext]);

	return (
		<div className='flex min-h-screen w-full justify-center items-center flex-col bg-gray-100'>
			<div className='fixed w-full top-8 px-12 flex justify-center'>
				<div className='bg-white shadow-xl w-full py-4 rounded-xl px-6 flex justify-evenly items-center max-w-xl'>
					<p className='text-xl'>{currentTick.current} ticks</p>
					<div className='flex-1 inline-flex justify-center'>
						<button
							type='button'
							onClick={pauseUnpause}
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
					<p className='font-mono'>Score: {score}</p>
				</div>
			</div>
			<Game />
			<p className='mt-10'>Points vary after speed</p>
			<div className='flex justify-center gap-x-3 mt-3'>
				{['normal', 'slow', 'fast', 'super fast'].map((s) => (
					<button
						key={s}
						type='button'
						onClick={() => setSpeed(s as speed)}
						className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
							speed === s
								? 'bg-indigo-600 text-white hover:bg-indigo-700'
								: 'bg-white text-gray-700 hover:bg-gray-50'
						} `}>
						{s}
					</button>
				))}
			</div>
		</div>
	);
}

export default App;
