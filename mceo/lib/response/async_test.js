const aa = require('aa');

var async_var;

module.exports = class async_test{
	constructor(){
		console.log('async_test');
		async_var = this;
		aa(this.main);
	}
	
	init(){
		console.log('async_test.init');
	}
	
	process_tasks(){
		//sample from: https://www.npmjs.com/package/async-await
		console.log('async_test.process_tasks');
		
	}
	
	*main(){
		//sample from: https://www.npmjs.com/package/async-await
		var t = async_var;
		console.log('async_test.main');
		console.log(yield [1, 2, 3, 'goober']);
		console.log(yield Promise.resolve(444));
		
		try{ 
		
var p1 = new Promise((resolve, reject) => { 
  setTimeout(resolve, 4000, 'one'); 
}); 
var p2 = new Promise((resolve, reject) => { 
  setTimeout(resolve, 3000, 'two'); 
});
var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 2000, 'three');
});
var p4 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'four');
});
var p5 = new Promise((resolve, reject) => {
  reject('reject');
});

Promise.all([p1, p2, p3, p4]).then(values => { 
  console.log('promise.all values=' + values);
}, reason => {
  console.log('promise.all reason=' + reason)
});		
		
		
			//yield Promise.reject(new Error('expected'));
			/*
			yield Promise.reject(new Error('expected')).then(function(reason){
					console.log('reason callback');
				}, function(reason){
					console.log('reason='+reason);
					throw new Error('How cool '+reason);
				});						
				*/
/*			
			Promise.reject(new Error('expected')).then(function(reason){
				}, function(reason) {
					console.log(reason);
				});						
Promise.reject("Testing static reject").then(function(reason) {
}, function(reason) {
  console.log(reason);
});

Promise.reject(new Error('fail')).then(function(error) {
  // not called
}, function(error) {
  console.log(error); // Stacktrace
});
*/			
		}catch (e) { 
			console.error('error here %s', e); 
		}
		try{
			console.log('[11, 12, 13, 14]:', yield [
				t.asyncPromise(100, 11),
				t.asyncThunk(100, 12),
				t.asyncGenerator(100, 13),
				t.asyncPromise(100, 14),
				t.asyncPromise(100, 'goober')
			]);

			console.log('{x:11, y:12, z:13}:', yield {
				x: t.asyncPromise(100, 11),
				y: t.asyncThunk(100, 12),
				z: t.asyncGenerator(100, 13)
			});

			yield [t.sub(20), t.sub(30)];
		}catch(e){
			console.error('error from async %s', e); 
		}
	}
	
	asyncPromise(msec, arg) {
		return new Promise(function (callback, err) {
			console.log('resolve('+typeof callback+') object('+callback+')');
			//err('error number 2');
			if(err)
				console.log('reject('+typeof err+') object('+err+')');
			setTimeout(callback, msec, arg);
		});
	}
	
	asyncThunk(msec, arg) {
		return function (callback) {
			setTimeout(callback, msec, null, arg);
		};
  }
	
	*asyncGenerator(msec, arg) {
		var chan = aa.Channel();
		setTimeout(chan, msec, arg);
		return yield chan;
	}	
	
	*sub(base) {
		var t = async_var;
		console.log('%s: %s', base + 1, yield t.asyncPromise(100, base + 1));
		console.log('%s: %s', base + 2, yield t.asyncThunk(100, base + 2));
		console.log('%s: %s', base + 3, yield t.asyncGenerator(100, base + 3));
		console.log('%s', yield 222);
	}	
}; 
