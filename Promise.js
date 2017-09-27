function Promise(fn){
	var value = null,
	deffereds = [].
	states = pending;

	function handle(){
        if (state === 'pending') {
            deferreds.push(deferred);
            return;
        }

        var cb = state === 'fulfilled' ? deferred.onFulfilled : deferred.onRejected,
            ret;
        if (cb === null) {
            cb = state === 'fulfilled' ? deferred.resolve : deferred.reject;
            cb(value);
            return;
        }
        ret = cb(value);
        deferred.resolve(ret);
	};

	function resolve(val){
		if (val && (typeof val === 'object' || typeof val === 'function')) {
			var then = val.then;
			if (typeof then === 'function') {
				then.call(val, resolve);
				return;
			}
		}
		value = val;
		state = 'fufilled';
		setTimeout(function() {
			deffereds.forEach(function(fufill){
				fufill(value);
			})			
		}, 0);
	};

	function reject(reason){
		//...
		state = 'rejected';
        value = reason;
		setTimeout(function () {
            deferreds.forEach(function (deferred) {
                handle(deferred);
            });
        }, 0);
	}

	fn(reslove, reject);
}

Promise.prototype.then  = function(onFuilled, onRejected){
	// if( states === 'pending'){
	// 	deffereds.push(onFuilled);
	// 	return this;
	// };
	// onFuilled(value);
	// return this;

	//返回一个可thenable链式的Promise
	return Promise(function(reslove, reject){
		handle({
			onFulfilled: onFulfilled || null,
			onRejected: onRejected || null,
			resolve: resolve,
			reject: reject
		});
	})
};

Promise.prototype.catch = function(onRejected){
	return this.then(undefined, onRejected)
}
