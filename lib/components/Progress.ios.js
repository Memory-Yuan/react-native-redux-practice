import React, {
	ActivityIndicatorIOS,
	Component,
	StyleSheet,
} from 'react-native';

export default class Progress extends Component {
	render() {
		return (
			<ActivityIndicatorIOS
				animating={true}
				style={[styles.centering, {height: 80}]}
				size="large"
			/>
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
});

