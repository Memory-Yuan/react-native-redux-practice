import React, {
	Component,
	Image,
	ListView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as MovieActions from '../actions/MovieActions';
import Progress from '../components/Progress';

class MovieList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			})
		};
	}

	static propTypes = {
		movies: React.PropTypes.object.isRequired,
		movieActions: React.PropTypes.object.isRequired,
		navigator: React.PropTypes.object.isRequired,
	}

	componentWillMount(){
		if(this.props.movies.movieList.length == 0){
			this.props.movieActions.fetchData();
		}else{
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(this.props.movies.movieList)
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		const thisMovieList = this.props.movies.movieList;
		const nextMovieList = nextProps.movies.movieList;
		if(!_.isEqual(thisMovieList, nextMovieList)){
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(nextMovieList)
			});
		}
	}

	_renderLoadingView() {
		return (
			<View style={styles.container}>
				<Progress/>
			</View>
		);
	}

	_renderMovie(movie) {
		return (
			<TouchableOpacity onPress={this._showDetail.bind(this, movie)}>
				<View style={styles.container}>
					<Image
						source={{uri: movie.posters.thumbnail}}
						style={styles.thumbnail}
					/>
					<View style={styles.rightContainer}>
						<Text style={styles.title}>{movie.title}</Text>
						<Text style={styles.year}>{movie.year}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}

	_showDetail(movie){
		this.props.movieActions.showMovie(movie);
		this.props.navigator.push({
			name: 'MovieDetail',
			title: movie.title,
		});
	}

	render() {
		if (this.props.movies.loading) {
			return this._renderLoadingView();
		}

		return (
			<ListView
				dataSource={this.state.dataSource}
				renderRow={this._renderMovie.bind(this)}
				style={styles.listView}
			/>
		);
	}
}

export default connect(
	state => ({
		movies: state.movies.toJS(),
	}),
	dispatch => ({
		movieActions: bindActionCreators(MovieActions, dispatch),
	})
)(MovieList);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	rightContainer: {
		flex: 1,
	},
	thumbnail: {
		width: 53,
		height: 81,
	},
	title: {
		fontSize: 20,
		marginBottom: 8,
		textAlign: 'center',
	},
	year: {
		textAlign: 'center',
	},
	listView: {
		// paddingTop: 20,
		backgroundColor: '#F5FCFF',
	},
});