import types from '../constants/ActionTypes';
import appConst from '../constants/AppConstants';
const { API_KEY, API_URL, FETCH_INITMODE, PAGE_SIZE } = appConst;

export function fetchData(){
	return dispatch => {
		dispatch({
			type: types.MOVIE_LOADING,
			isLoading: true
		});
		return fetch(`${API_URL}?apikey=${API_KEY}&page_limit=${PAGE_SIZE}`, FETCH_INITMODE)
			.then((response) => response.json())
			.then((responseData) => {
				dispatch({
					type: types.MOVIE_FETCH_SUCCESS,
					movieList: responseData.movies,
				});
				dispatch({
					type: types.MOVIE_LOADING,
					isLoading: false
				});
			})
			.catch(error => {
				console.error(error)
			})
			.done();
	}
}
