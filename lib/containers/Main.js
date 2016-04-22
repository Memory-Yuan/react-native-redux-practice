import React, {
	Component,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} from 'react-native';

export default class Main extends Component {
	static propTypes = {
		navigator: React.PropTypes.object.isRequired,
	}

	_gotoNotfound() {
		this.props.navigator.push({
			name: 'NotFound',
			title: 'Not Found Page'
		});
	}

	_gotoMovieList() {
		this.props.navigator.push({
			name: 'MovieList',
			title: 'Movie List'
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					Welcome to React Native!
				</Text>
				<Text style={styles.instructions}>
					This app is a practice for RN.
				</Text>
				<TouchableHighlight
					style={styles.heighLightTouch}
					onPress={this._gotoNotfound.bind(this)}>
					<Text>not found</Text>
				</TouchableHighlight>
				<TouchableHighlight
					style={styles.heighLightTouch}
					onPress={this._gotoMovieList.bind(this)}>
					<Text>movie list</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	heighLightTouch: {
		backgroundColor: 'yellow',
		padding: 10
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});

