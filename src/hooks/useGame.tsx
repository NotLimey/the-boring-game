import { useContext } from 'react';
import { GameContext } from '../components/GameContext';

const colors = {
	sky: 'bg-sky-500',
	dirt: 'bg-orange-900',
};

const useGame = () => {
	const context = useContext(GameContext);

	return {
		...context,
		colors,
	};
};

export default useGame;
