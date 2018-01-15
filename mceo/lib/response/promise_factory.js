var pf = require("promise-factory").PromiseFactory;

module.exports = class promise_factory{
	constructor(){
		console.log('async_test.constructory');
		this.main();
	}
	
	init(){
		console.log('async_test.init');
	}
	
	process_tasks(){
		//sample from: https://www.npmjs.com/package/async-await
		console.log('async_test.process_tasks');
		
	}
	
	main(){
		var t = this;
		try{
			pf.all([
				pf.create(function(resolve, reject) {
					try{
						resolve(t.test1());
					}catch(e){
						console.log('rejected');
						reject('test1');
					}
				}),
				pf.create(function(resolve, reject) {
					resolve("test2");
				})
			]).then(function(res) {
				console.log(res);
			});
			pf.reject(new Error('expected')).then(function(reason){
					console.log('reason callback');
				}, function(reason){
					console.log('reason='+reason);
					throw new Error('How cool '+reason);
				});						
		}catch(e){
			console.log('got it: '+e.message);
		}
	}
	
	test1(){
		try{
			console.log('test1');
			throw new Error('test1 throwing an error');
		}catch(e){
			console.log(e.message);
			throw new Error(e);
		}
	}
}