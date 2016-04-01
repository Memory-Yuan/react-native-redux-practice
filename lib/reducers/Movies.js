import Immutable, { Map, List, fromJS } from 'immutable';
import types from '../constants/ActionTypes';
import createReducer from '../utils/createReducer';

const initialState = fromJS({
	movieList: [],
	loading: false
});

export default createReducer(initialState, {
	[types.MOVIE_FETCH_SUCCESS]: (state, action) => {
		return state.set('movieList', fromJS(action.movieList));
	},
	[types.MOVIE_LOADING]: (state, action) => {
		return state.set('loading', action.isLoading);
	},
});