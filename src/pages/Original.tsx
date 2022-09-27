import App from '../App';
import { GameContextProvider } from '../components/GameContext';

const Original = () => {
	return (
		<GameContextProvider>
			<App />
		</GameContextProvider>
	);
};

export default Original;
