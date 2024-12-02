// frontend/src/redux/store.js

import { legacy_createStore as createStore } from 'redux';
import { applyMiddleware } from 'redux';
import { compose } from 'redux';
import { combineReducers } from 'redux';

import thunk from 'redux-thunk';
import sessionReducer from './session';
import businessesReducer from './businesses';
import servicesReducer from './services';
import connectionsReducer from './connections';

const rootReducer = combineReducers({
    session: sessionReducer,
    businesses: businessesReducer,
    services: servicesReducer,
    connections: connectionsReducer
});

let enhancer;
if (import.meta.env.MODE === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = (await import('redux-logger')).default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;