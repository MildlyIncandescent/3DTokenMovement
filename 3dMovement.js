const T3D = {
	SCOPE: "3d-token-movement",
	SETTING_AREA_WIDTH: "area width",
	LOG_PREFIX: "3D Token Movement | " 
};

class Token3D {
	
	constructor () {
		game.settings.register(T3D.SCOPE, T3D.SETTING_AREA_WIDTH, { 
			name: "3D Area Width",
			hint: "",
			config: true,
			type: Integer,
			default: 1200
		});
		Hooks.on("updateToken", this._onUpdateToken.bind(this));
		console.log(T3D.LOG_PREFIX, "Initialized");
	}
	
	_onTokenUpdate(scene, token, update, options, userId) {
		
	}
}

console.log(T3D.LOG_PREFIX, "Loaded");
Hooks.on('init', () => game.token3D = new Token3D());
