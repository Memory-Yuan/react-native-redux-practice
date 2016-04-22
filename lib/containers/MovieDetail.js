import React, {
	Component,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as MovieActions from '../actions/MovieActions';

class MovieDetail extends Component {
	static propTypes = {
		movies: React.PropTypes.object.isRequired,
		movieActions: React.PropTypes.object.isRequired,
		navigator: React.PropTypes.object.isRequired,
	}

	_getImageSource(movie, kind) {
		let uri = movie && movie.posters ? movie.posters.thumbnail : null;
		if (uri && kind) {
			uri = uri.replace('tmb', kind);
		}
		return { uri };
	}

	render() {
		const movie = this.props.movies.showMovie;
		return (
			<ScrollView contentContainerStyle={styles.contentContainer}>
				<View style={styles.mainSection}>
					<Image
						source={this._getImageSource(movie, 'det')}
						style={styles.detailsImage}
					/>
					<View style={styles.rightPane}>
						<Text style={styles.movieTitle}>{movie.title}</Text>
						<Text>{movie.year}</Text>
						<View style={styles.mpaaWrapper}>
							<Text style={styles.mpaaText}>
								{movie.mpaa_rating}
							</Text>
						</View>
						<Ratings ratings={movie.ratings} />
					</View>
				</View>
				<View style={styles.separator} />
				<Text>
					{movie.synopsis}
				</Text>
				<View style={styles.separator} />
				<Cast actors={movie.abridged_cast} />
			</ScrollView>
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
)(MovieDetail);

class Ratings extends Component {
	static propTypes = {
		ratings: React.PropTypes.object.isRequired,
	}

	_getStyleFromScore(score) {
		if (score < 0) {
			return styles.noScore;
		}

		let normalizedScore = Math.round((score / 100) * MAX_VALUE);
		return {
			color: 'rgb(' +
				(MAX_VALUE - normalizedScore) + ', ' +
				normalizedScore + ', ' +
				0 +
			')'
		};
	}

	_getTextFromScore(score) {
		return score > 0 ? score + '%' : 'N/A';
	}

	render() {
		const criticsScore = this.props.ratings.critics_score;
		const audienceScore = this.props.ratings.audience_score;

		return (
			<View>
				<View style={styles.rating}>
					<Text style={styles.ratingTitle}>Critics:</Text>
					<Text style={[styles.ratingValue, this._getStyleFromScore(criticsScore)]}>
						{this._getTextFromScore(criticsScore)}
					</Text>
				</View>
				<View style={styles.rating}>
					<Text style={styles.ratingTitle}>Audience:</Text>
					<Text style={[styles.ratingValue, this._getStyleFromScore(audienceScore)]}>
						{this._getTextFromScore(audienceScore)}
					</Text>
				</View>
			</View>
		);
	}
}

class Cast extends Component {
	static propTypes = {
		actors: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
	}

	render() {
		if (!this.props.actors) {
			return null;
		}

		return (
			<View>
				<Text style={styles.castTitle}>Actors</Text>
				{this.props.actors.map(actor =>
					<Text key={actor.name} style={styles.castActor}>
						&bull; {actor.name}
					</Text>
				)}
			</View>
		);
	}
}

const MAX_VALUE = 200;
const styles = StyleSheet.create({
	contentContainer: {
		padding: 10,
	},
	rightPane: {
		justifyContent: 'space-between',
		flex: 1,
	},
	movieTitle: {
		flex: 1,
		fontSize: 16,
		fontWeight: '500',
	},
	rating: {
		marginTop: 10,
	},
	ratingTitle: {
		fontSize: 14,
	},
	ratingValue: {
		fontSize: 28,
		fontWeight: '500',
	},
	mpaaWrapper: {
		alignSelf: 'flex-start',
		borderColor: 'black',
		borderWidth: 1,
		paddingHorizontal: 3,
		marginVertical: 5,
	},
	mpaaText: {
		fontFamily: 'Palatino',
		fontSize: 13,
		fontWeight: '500',
	},
	mainSection: {
		flexDirection: 'row',
	},
	detailsImage: {
		width: 134,
		height: 200,
		backgroundColor: '#eaeaea',
		marginRight: 10,
	},
	separator: {
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
		height: StyleSheet.hairlineWidth,
		marginVertical: 10,
	},
	castTitle: {
		fontWeight: '500',
		marginBottom: 3,
	},
	castActor: {
		marginLeft: 2,
	},
	noScore: {
		color: '#999999',
	},
});

