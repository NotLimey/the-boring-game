import React, { createContext, useCallback, useEffect, useState } from 'react';
import { generateNewRow, getInitialFrame } from '../functions/frame';
import { TGameEvent, TTile } from '../types';

export interface IGameContextProps {
	pixels: Array<TTile>;
	player: { x: number; y: number };
	paused: boolean;
	tick: number;
	ms: number;
	events?: TGameEvent[];
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
	const [state, setState] = useState<IGameContextProps>({
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

	useEffect(() => {
		const object = state.pixels.find(
			(p) => p.x === state.player.x && p.y === state.player.y
		);
		if (!object) return;
		if (object.type === 'sky') return;
		setState((p) => ({
			...p,
			events: [
				...(p.events ?? []),
				{
					type: 'collision',
					collidedWith: object,
					tick: p.tick,
					id: p.events?.length ?? 0,
				},
			],
		}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.player.x, state.player.y]);

	const pauseUnpause = () =>
		setState((prev) => ({ ...prev, paused: !prev.paused }));

	return (
		<GameContext.Provider
			value={{ ...state, updateContext: setState, pauseUnpause }}>
			{children}
		</GameContext.Provider>
	);
};
