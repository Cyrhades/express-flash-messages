'use strict'
/*
	- Test
	- Arrow functions when possible



	const messages = require('express-messages')
	app.use(messages())
	app.get('/', (req, res) => {
		req.flash('notify', 'Test notification.')
	})


	- 



*/

module.exports = function(){
	return function(req, res, next){
		req.flash = _flash
		res.locals.getMessages = _getMessages(req, res)
		next()
	}
}


function _flash(type, msg){
	if(this.session === undefined) throw Error('req.flash() requires sessions')
	const msgs = this.session.flash = this.session.flash || {}

	// If setting
	if(type && msg){
		msgs[type] = msgs[type] || []
		if(Array.isArray(msg)){
			msgs[type].push(...msg)
			return
		}
		msgs[type].push(msg)
		return
	}

	// If getting
	if(type){
		const arr = msgs[type]
		delete msgs[type]
		return arr || []
	}


	// If getting everything
	this.session.flash = {}
	return msgs

}



function _getMessages(req, res){
	return function(){
		return req.flash()
	}
}