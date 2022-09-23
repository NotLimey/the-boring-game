import { TTreasure } from '../types';

export const getRandomTreasure = () =>
	treasures[Math.floor(Math.random() * treasures.length)];

export const treasures: TTreasure[] = [
	{
		name: 'diamond',
		component: (
			<img
				className='regular-treasure'
				src='/gems/diamond.png'
				alt='diamond'
			/>
		),
		value: 100,
	},
];
