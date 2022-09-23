import React, { createContext, useCallback, useEffect, useState } from 'react';
import { generateNewRow, getInitialFrame } from '../functions/frame';
import { TGameEvent, TScore, TTile } from '../types';

export interface IGameContextProps {
	pixels: Array<TTile>;
	player: { x: number; y: number };
	paused: boolean;
	tick: number;
	ms: number;
	events?: TGameEvent[];
	score: number;
	gameOver: boolean;
	scores: TScore[];
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
	score: 0,
	gameOver: false,
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
		score: 0,
		gameOver: false,
		scores: [],
	});

	useEffect(() => {
		const existingScores = localStorage.getItem('scores');
		if (existingScores) {
			setState((p) => ({
				...p,
				scores: JSON.parse(existingScores),
			}));
		}
	}, []);

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

	const addScoreToScores = useCallback(
		(score: TScore) => {
			setState((p) => ({
				...p,
				scores: [...p.scores, score],
			}));
			const jsonScores = JSON.stringify([...state.scores, score]);
			localStorage.setItem('scores', jsonScores);
		},
		[state.scores]
	);

	const updatePartial = useCallback((partial: Partial<IGameContextProps>) => {
		setState((p) => ({
			...p,
			...partial,
		}));
	}, []);

	useEffect(() => {
		if (state.paused || state.gameOver) return;
		const interval = setInterval(() => updateFrame(), state.ms);
		return () => clearInterval(interval);
	}, [state.paused, updateFrame, state.ms, state.gameOver]);

	useEffect(() => {
		const object = state.pixels.find(
			(p) => p.x === state.player.x && p.y === state.player.y
		);
		if (!object) return;
		if (object.type === 'lava') {
			updatePartial({
				gameOver: true,
			});
			addScoreToScores({
				score: state.score,
				date: new Date().getTime(),
			});
			return;
		}
		if (object.type === 'sky') return;
		const addScore = object.type === 'diamond' ? 100 : 5;
		updatePartial({
			events: [
				...(state.events ?? []),
				{
					type: 'collision',
					collidedWith: object,
					tick: state.tick,
					id: state.events?.length ?? 0,
				},
			],
			pixels: state.pixels.map((p) => {
				if (p.x === state.player.x && p.y === state.player.y) {
					return {
						...p,
						type: 'sky',
						bg: 'bg-orange-900/50',
						children: null,
					};
				}
				return p;
			}),
			score: state.score + addScore,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.player.x, state.player.y]);

	const pauseUnpause = () => {
		if (state.gameOver) {
			setState({
				pixels: getInitialFrame(),
				player: { x: 5, y: 5 },
				paused: false,
				tick: 0,
				ms: 500,
				score: 0,
				gameOver: false,
				scores: state.scores,
			});
			return;
		}
		setState((prev) => ({ ...prev, paused: !prev.paused }));
	};

	return (
		<GameContext.Provider
			value={{ ...state, updateContext: setState, pauseUnpause }}>
			{children}
		</GameContext.Provider>
	);
};
