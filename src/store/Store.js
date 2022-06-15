import {createStore, compose} from 'redux';

import rootReducer from '../reducers/Root';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(
    rootReducer,
    composeEnhancer(
        window.devToolsExtension ? window.devToolsExtension() : (f) =>f
    )
);

export default store;