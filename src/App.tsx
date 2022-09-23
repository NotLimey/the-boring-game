import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';
import Game from './components/Game';
import useGame from './hooks/useGame';

function App() {
	const { pauseUnpause, paused, score } = useGame();
	const currentTick = useRef(0);

	return (
		<div className='flex min-h-screen w-full justify-center items-center flex-col bg-gray-100'>
			<Game />
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
		</div>
	);
}

export default App;
