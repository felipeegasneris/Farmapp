import React, { Component } from 'react';

import { Provider } from 'mobx-react';

import Stack from './routes';

import store from './stores/store';

export default class MobXApp extends Component {
    render() {
        return (
            <Provider store={store}>
                <Stack />
            </Provider>
        );
    }
}