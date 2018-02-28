const form = document.querySelector('form');
const input = document.querySelector('#password');
const msg = document.querySelector('#msg');

let hash = '';
let suffix = '';
form.addEventListener('submit', handleSubmit);
//input.addEventListener('blur', handleSubmit);

function handleSubmit(e){
	e.preventDefault();
	if(input.value !== ''){
		hash = createHash(input.value); //here's the only time we have a plaintext verison, we immediately hash it.
		form.reset();
		msg.textContent = '';
		let range = hash.substring(0, 5);
		suffix = hash.substring(5).toUpperCase();
		checkPassword(range);
	}
}

//Hash password using SHA-1
//Thanks to CryptoJS
function createHash(plaintext){
	var hash = CryptoJS.SHA1(plaintext);
	return hash.toString(CryptoJS.enc.Base64);
}


function checkPassword(range){
	callAPI(range, function(data){
		var list = convert(data);
		let result = list[suffix];
		if(result){
			//password was found, display error
			msg.classList.add('text-danger');
			msg.classList.remove('text-success');
			msg.textContent = `Uh oh, this password has been used ${Number(result).toLocaleString()} times before.`;
		}else{
			//password not found, yay!
			msg.classList.add('text-success');
			msg.classList.remove('text-danger');
			msg.textContent = 'This password hasn\'t been found, good to go!';
		}
	});
}

//Converts raw text return from API into ojbect where hash suffix is key and # times found in DB is the value
//this allows for faster lookup later by searching for the key.
function convert(data){
	let arr = data.split('\r\n');
	let list = {};
	arr.forEach(function(el){
		let temp = el.split(':');
		list[temp[0]] = temp[1];
	});
	return list;
}

//use JS fetch to call HIBP API
function callAPI(range, callback){
	fetch('https://api.pwnedpasswords.com/range/' + range)
		.then(function(res){
			res.text().then(function (text) {
				callback(text);
		});
	});
}