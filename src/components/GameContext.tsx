import React, { createContext, useCallback, useEffect, useState } from 'react';
import { generateNewRow, getInitialFrame } from '../functions/frame';
import { TFramePixel } from '../types';

export interface IGameContextProps {
	pixels: Array<TFramePixel>;
	player: { x: number; y: number };
	paused: boolean;
	tick: number;
	ms: number;
}

export interface IGameContext extends IGameContextProps {
	updateContext: React.Dispatch<React.SetStateAction<IGameContextProps>>;
	pauseUnpause: () => void;
}

export const GameContext = createContext<IGameContext>({
	pixels: getInitialFrame(),
	player: { x: 5, y: 5 },
	paused: true,
	tick: 0,
	ms: 500,
} as IGameContext);

export const GameContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [state, setState] = useState({
		pixels: getInitialFrame(),
		player: { x: 5, y: 5 },
		paused: true,
		tick: 0,
		ms: 500,
	});

	const updateFrame = useCallback(() => {
		setState((p) => ({
			...p,
			pixels: [
				...p.pixels.slice(8),
				...generateNewRow(p.pixels[p.pixels.length - 1].y + 1),
			],
			player: {
				...p.player,
				y: p.player.y + 1,
			},
			tick: p.tick + 1,
		}));
	}, []);

	useEffect(() => {
		const interval = setInterval(
			() => !state.paused && updateFrame(),
			state.ms
		);
		return () => clearInterval(interval);
	}, [state.paused, updateFrame, state.ms]);

	const pauseUnpause = () =>
		setState((prev) => ({ ...prev, paused: !prev.paused }));

	return (
		<GameContext.Provider
			value={{ ...state, updateContext: setState, pauseUnpause }}>
			{children}
		</GameContext.Provider>
	);
};
