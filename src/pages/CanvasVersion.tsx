import { useEffect, useRef } from 'react';
import GameClass from '../classes/GameClass';

const CanvasVersion = () => {
	const canvas = useRef<GameClass | null>(null);

	useEffect(() => {
		const c = canvas.current;
		if (!c) return;
		console.log('Canvas rendered');
		const handleButton = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft' || e.key === 'a') {
				c.direction = -1;
			}
			if (e.key === 'ArrowRight' || e.key === 'd') {
				c.direction = 1;
			}
		};
		window.addEventListener('keydown', handleButton);
		window.addEventListener('keyup', () => (c.direction = 0));
		c.start();
		return () => {
			window.removeEventListener('keydown', handleButton);
			window.removeEventListener('keyup', () => (c.direction = 0));
			c.stop();
		};
	}, [canvas]);

	return (
		<div className='bg-black text-white font-mono'>
			<div className='flex justify-center w-full min-h-screen items-center h-full py-8 md:py-24 flex-col'>
				<h1 className='text-3xl mb-8'>The boring game</h1>
				<div className=''>
					<canvas
						ref={(ref) => {
							if (!ref || canvas.current !== null) return;
							canvas.current = new GameClass(ref);
						}}
						className='bg-stone-900 border-4 border-gray-500'
						width='500'
						height='500'
						id='canvas'
					/>
				</div>
				<button onClick={() => canvas.current?.stop()}>Stop</button>
				<button onClick={() => canvas.current?.start()}>Start</button>
			</div>
		</div>
	);
};

export default CanvasVersion;
