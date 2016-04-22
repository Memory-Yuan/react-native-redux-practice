import React, {
	Component,
	StyleSheet,
	Text,
	View
} from 'react-native';

export default class NotFound extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					Not found!!
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
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
});

