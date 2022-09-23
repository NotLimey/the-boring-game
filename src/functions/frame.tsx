import { TFramePixel } from '../types';
import { getRandomTreasure } from './trasure';

const ROW_LENGTH = 8;
const COL_LENGTH = 8;

export function getInitialFrame(): Array<TFramePixel> {
	const frame: TFramePixel[] = [];
	for (let x = 0; x < ROW_LENGTH; x++) {
		for (let y = 0; y < COL_LENGTH; y++) {
			frame.push({
				color: x < 5 ? 'sky' : 'dirt',
				content: x === 5 && <div className='grass' />,
				x: x + 1,
				y: y + 1,
			});
		}
	}
	return frame;
}

export function generateNewRow(x: number): Array<TFramePixel> {
	const newRow = [];
	for (let y = 0; y < COL_LENGTH; y++) {
		newRow.push(getNewFrame(x, y));
	}
	return newRow;
}

export function getNewFrame(x: number, y: number, spawnRate = 10): TFramePixel {
	const random = Math.floor(Math.random() * 100);
	if (random < spawnRate) {
		const treasure = getRandomTreasure();
		return {
			color: 'dirt',
			content: <div className='treasure'>{treasure.component}</div>,
			x: x,
			y: y,
		};
	} else {
		return {
			color: 'dirt',
			content: undefined,
			x: x,
			y: y,
		};
	}
}
