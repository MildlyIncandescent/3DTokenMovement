const T3D = {
	SCOPE: "3d-token-movement",
	LOG_PREFIX: "3D Token Movement | " 
};

class Token3D {
	constructor () {
		Hooks.on("updateToken", this._onUpdateToken);
		console.log(T3D.LOG_PREFIX, "Initialized");
		this.tokens3D = new Array();
	}
	
	_onTokenUpdate(scene, token, update, options, userId) {
		console.log(T3D.LOG_PREFIX, "Updating Token");
		let top = isTop(token);
		if(!is3DToken(token)) return;
		let width = scene.data.width;
		let spacing = width / 2;
		if(top) {
			let sideToken = tokens3D.find(binding => binding.top == token).side;
			sideToken.transform._x = token.transform._x + spacing;
		}
		else{
			let topToken = tokens3D.find(binding => binding.side == token).side;
			topToken.transform._x = token.transform._x - spacing;
		}
	}
	
	is3DToken(token) {
		return this.tokens3D && isTop(token) || isSide(token);
	}
	
	isTop(token) {
		return tokens3D.find(binding => binding.top == token) != null;
	}
	
		
	isSide(token) {
		return tokens3D.find(binding => binding.side == token) != null;
	}
	
	bindTokens(topToken,sideToken) {
		if(is3DToken(topToken)) {
			console.log(T3D.LOG_PREFIX, "Token already bound", topToken);
		}
		if(is3DToken(sideToken)) {
			console.log(T3D.LOG_PREFIX, "Token already bound", sideToken);
		}
		let boundTokens = {
			top : topToken,
			side: sideToken
		};
		this.tokens3D.push(boundTokens);
	}
}

console.log(T3D.LOG_PREFIX, "Loaded");
Hooks.on('init', () => game.token3D = new Token3D());
