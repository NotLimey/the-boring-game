import { useEffect, useState } from 'react';
import GameClass from '../classes/GameClass';

const CanvasVersion = () => {
	const [canvas, setCanvas] = useState<GameClass | null>(null);

	useEffect(() => {
		if (!canvas) return;
		console.log('CanvasVersion -> canvas');
		const handleButton = (e: KeyboardEvent) => {
			// if key is left arrow or a
			// move left
			// if key is right arrow or d
			// move right
			if (e.key === 'ArrowLeft' || e.key === 'a') {
				canvas.move('left');
			}
			if (e.key === 'ArrowRight' || e.key === 'd') {
				canvas.move('right');
			}
		};
		window.addEventListener('keydown', handleButton);
		canvas.start();
		return () => {
			window.removeEventListener('keydown', handleButton);
			canvas.stop();
		};
	}, [canvas]);

	return (
		<div className='bg-black text-white font-mono'>
			<div className='flex justify-center w-full min-h-screen items-center h-full py-8 md:py-24 flex-col'>
				<h1 className='text-3xl mb-8'>The boring game</h1>
				<div className=''>
					<canvas
						ref={(ref) => {
							if (!ref || canvas !== null) return;
							setCanvas(new GameClass(ref));
						}}
						className='bg-stone-900 border-2 border-gray-500'
						width='500'
						height='500'
						id='canvas'></canvas>
				</div>
			</div>
		</div>
	);
};

export default CanvasVersion;
