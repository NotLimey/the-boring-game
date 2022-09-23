import { TTile } from '../types';
import { getRandomTreasure } from './trasure';

const ROW_LENGTH = 8;
const COL_LENGTH = 8;

export function getInitialFrame(): Array<TTile> {
	const frame: TTile[] = [];
	for (let y = 0; y < COL_LENGTH; y++) {
		for (let x = 0; x < ROW_LENGTH; x++) {
			frame.push({
				type: y < 5 ? 'sky' : 'dirt',
				children: y === 5 && <div className='grass' />,
				x: x + 1,
				y: y + 1,
				bg: y < 5 ? 'bg-sky-500' : 'bg-orange-900',
			});
		}
	}
	return frame;
}

export function generateNewRow(y: number): Array<TTile> {
	const newRow = [];
	for (let x = 0; x < COL_LENGTH; x++) {
		newRow.push(getNewFrame(x + 1, y));
	}
	return newRow;
}

export function getNewFrame(x: number, y: number, spawnRate = 10): TTile {
	const random = Math.floor(Math.random() * 100);
	if (random < 8) {
		return {
			type: 'lava',
			x,
			y,
			bg: 'bg-red-600',
		};
	}
	if (random < 16) {
		const treasure = getRandomTreasure();
		return {
			type: treasure.name,
			bg: 'bg-orange-900',
			children: <div className='treasure'>{treasure.component}</div>,
			x: x,
			y: y,
		};
	}
	return {
		bg: 'bg-orange-900',
		type: 'dirt',
		x: x,
		y: y,
	};
}
