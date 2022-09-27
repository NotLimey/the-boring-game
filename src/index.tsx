import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import CanvasVersion from './pages/CanvasVersion';
import Original from './pages/Original';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<CanvasVersion />} />
				<Route path='/original' element={<Original />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
