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
		let top = this.isTop(token);
		if(!this.is3DToken(token)) return;
		let width = scene.data.width;
		let spacing = width / 2;
		if(top) {
			let sideToken = this.tokens3D.find(binding => binding.top == token).side;
			sideToken.transform._x = token.transform._x + spacing;
		}
		else{
			let topToken = this.tokens3D.find(binding => binding.side == token).side;
			topToken.transform._x = token.transform._x - spacing;
		}
	}
	
	is3DToken(token) {
		return this.tokens3D && this.isTop(token) || this.isSide(token);
	}
	
	isTop(token) {
		return this.tokens3D.find(binding => binding.top == token) != null;
	}
	
		
	isSide(token) {
		return this.tokens3D.find(binding => binding.side == token) != null;
	}
	
	bindTokens(topToken,sideToken) {
		if(this.is3DToken(topToken)) {
			console.log(T3D.LOG_PREFIX, "Token already bound", topToken);
			return;
		}
		if(this.is3DToken(sideToken)) {
			console.log(T3D.LOG_PREFIX, "Token already bound", sideToken);
			return;
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
