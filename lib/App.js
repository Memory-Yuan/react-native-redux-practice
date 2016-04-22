import React, {
	Component,
	Navigator,
	StyleSheet,
	Text,
	TouchableOpacity,
} from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './utils/configureStore';
import * as containers from './containers';

const store = configureStore();

const {
	Main,
	MovieList,
	MovieDetail,
	NotFound
} = containers;

export default class App extends Component {

	configureScene(route) {
		if(route.sceneConfig){
			return route.sceneConfig;
		}
		return Navigator.SceneConfigs.FloatFromRight;
	}

	renderScene(route, navigator) {
		//如果想要更靈活一點，可以把routes object的每一個都改成function，這樣可以對每一個做不同處理
		const routes = {
			'Main': 		<Main navigator={navigator}/>,
			'MovieList': 	<MovieList navigator={navigator}/>,
			'MovieDetail': 	<MovieDetail navigator={navigator}/>,
			'NotFound': 	<NotFound navigator={navigator}/>,
			// Example() { return (<Example/>); },
		};

		return (routes[route.name] || routes['NotFound']);
		// return (routes[route.name] || routes['NotFound'])();
	}

	render() {
		return (
			<Provider store={store}>
				<Navigator
					initialRoute={{name: 'Main', title: 'Main'}}
					configureScene={this.configureScene}
					renderScene={this.renderScene}
					sceneStyle={styles.scene}
					navigationBar={
						<Navigator.NavigationBar
							style={styles.navBar}
							routeMapper={NavigationBarRouteMapper}/>
					}
				/>
			</Provider>
		);
	}
}

const NavigationBarRouteMapper = {
	LeftButton(route, navigator, index, navState) {
		return (
			<TouchableOpacity
				style={styles.opacityTouch}
				onPress={() => navigator.pop()}>
				<Text style={styles.leftBth}>
					Back
				</Text>
			</TouchableOpacity>
		);
	},
	RightButton(route, navigator, index, navState) {
		return (
			<TouchableOpacity
				style={styles.opacityTouch}
				onPress={() => navigator.push({
					name: 'Main',
					title: 'Main'
				})}>
				<Text style={styles.leftBth}>
					Index
				</Text>
			</TouchableOpacity>
		);
	},
	Title(route, navigator, index, navState) {
		return (
			<TouchableOpacity style={styles.opacityTouch}>
				<Text style={styles.title}>
					{route.title || 'No Title'}
				</Text>
			</TouchableOpacity>
		);
	}
};

const styles = StyleSheet.create({
	navBar: {
		flex: 1,
		backgroundColor: '#246dd5',
		alignItems: 'center'
	},
	scene: {
		paddingTop: 64,
	},
	opacityTouch: {
		flex: 1,
		justifyContent: 'center'
	},
	leftBth: {
		color: 'white',
		margin: 10
	},
	title: {
		color: 'white',
		margin: 10,
		fontSize: 16
	}
});