import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

export default function configureStore(initialState) {
	const middleware = [thunk];
	let finalCreateStore = applyMiddleware(...middleware)(createStore);
	const store = finalCreateStore(reducer, initialState);

	return store;
}