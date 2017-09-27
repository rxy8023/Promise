var option = {
	protocol: 'https:',
	host: 'www.easy-mock.com',
	port: 443,
	path: '/mock/59c50ef3e0dc663341b5405c/example_1506086643799/proxy',
	method: 'GET',


};



var req = https.request(option,function(res){
	console.log('status: '+res.statusCode);
	console.log('HEADER: ' + JSON.stringify(res.headers));

	res.setEncoding('utf-8');
	res.on('data',function(chunk){
		console.log('DOBY: ' + chunk);
	});
	res.on('end',function(){
		console.log('end');
	});
});

req.on('error', function(e){
	console.log('problem with question: ' + e.message)
});

req.write('data/n');
req.write('data/n');
req.end();



function Promise(fn) {
    var value = null,
        deferreds = [];

    this.then = function (onFulfilled) {
        deferreds.push(onFulfilled);
        return this
    };

    function resolve(value) {
        deferreds.forEach(function (deferred) {
            deferred(value);
        });
    }

    fn(resolve);
}

function Promise(fn){
	var value = null,
	deffereds = [];
	this.then = function(onFuilled, onRejected){
		deffereds.push(onFuilled);
		return this;
	}
	function resove(value){
		deffereds.forEach(function(fufill){
			fufill(value);
		})
	}
}