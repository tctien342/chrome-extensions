import React, { useState, useEffect } from 'react';
import './App.scss';
import { useTypedTranslation } from '../languages/typedTranslation';
import { APP_VERSION } from '../config';
import { sendEventToBackground } from '../manager';
function App() {
	const { t } = useTypedTranslation();
	const getValue = async () => {
		// TODO: Call background to get some app value here
		let value = await sendEventToBackground({ action: 'get_value' });
		return true;
	};
	useEffect(() => {
		getValue();
	}, []);
	return (
		<div className="h-100 w-100 bg-white flex flex-column justify-center items-center">
			<div className="w-100 h-25 pa2 flex items-center justify-center">
				<img className="ma0 h-100" src={require('../../assets/images/48x48.png')}></img>
				<h3 className="ma0 w-100 fw7 pl1 o-70">{t('appName')}</h3>
				<p className="ma0 fw1 pl1 o-70">{APP_VERSION}</p>
			</div>
		</div>
	);
}

export default App;
