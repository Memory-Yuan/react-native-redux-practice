module.exports = {
	"parser": "babel-eslint",
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		}
	},
	"env": {
		"browser": true,
		"node": true,
		"es6": true,
		"jasmine": true
	},
	"extends": ["eslint:recommended", "plugin:react/recommended"],
	"plugins": [
		"react"
	],
	"rules": {
		"indent": 			["warn", "tab"],
		"linebreak-style": 	["error", "unix"],
		"quotes": 			["warn", "single"],
		"semi": 			["error", "always"],
		"comma-dangle": 	["error", "only-multiline"],
		"no-unused-vars": 	["warn", {"vars": "all", "args": "none"}],
		"no-console": 		0
	}
};

