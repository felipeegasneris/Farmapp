import React, {Component} from 'react';
import {Provider} from 'mobx-react';
import Stack from './routes';
import store from './stores/store';
import { Root } from "native-base";

export default class MobXApp extends Component {
	render() {
		return (
			<Root>
				<Provider store={store}>
					<Stack/>
				</Provider>
			</Root>
		);
	}
}