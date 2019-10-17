const words = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus in mollis nunc sed id semper risus. Id nibh tortor id aliquet lectus proin nibh nisl condimentum. Nam aliquam sem et tortor consequat id. In fermentum posuere urna nec tincidunt praesent semper. Arcu dui vivamus arcu felis bibendum ut. Eget duis at tellus at urna. Lorem ipsum dolor sit amet consectetur adipiscing. Risus sed vulputate odio ut enim blandit volutpat maecenas volutpat. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat. Nullam ac tortor vitae purus faucibus. Vel elit scelerisque mauris pellentesque pulvinar. Quis hendrerit dolor magna eget est lorem ipsum dolor. Quam quisque id diam vel quam elementum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultricies lacus sed turpis tincidunt id aliquet risus. Sit amet luctus venenatis lectus. Amet aliquam id diam maecenas ultricies mi eget. In est ante in nibh mauris cursus mattis molestie. Cras fermentum odio eu feugiat. Augue eget arcu dictum varius duis at consectetur lorem. Nibh cras pulvinar mattis nunc sed blandit libero volutpat sed. Tempus quam pellentesque nec nam aliquam sem. Aliquam sem et tortor consequat id porta nibh venenatis. Tincidunt dui ut ornare lectus sit. Nulla at volutpat diam ut venenatis tellus. Ut faucibus pulvinar elementum integer. Mi in nulla posuere sollicitudin aliquam ultrices."+
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget nulla facilisi etiam dignissim diam quis. Et leo duis ut diam quam nulla porttitor. Tincidunt eget nullam non nisi est sit amet. Condimentum mattis pellentesque id nibh. Aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque. Dictum non consectetur a erat nam at lectus urna duis. Faucibus et molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Sapien et ligula ullamcorper malesuada proin. Mollis nunc sed id semper risus in hendrerit gravida. Turpis egestas maecenas pharetra convallis posuere morbi leo urna. Condimentum vitae sapien pellentesque habitant morbi tristique senectus et. Lacus sed viverra tellus in hac habitasse platea dictumst vestibulum. Venenatis urna cursus eget nunc scelerisque viverra. Metus dictum at tempor commodo ullamcorper a. Pellentesque elit ullamcorper dignissim cras tincidunt. Suspendisse potenti nullam ac tortor vitae."
];
let i = 0;
let timer;

function typingEffect() {
	let word = words[i].split("");
	var loopTyping = function() {
		if (word.length > 0) {
			document.getElementById('word').innerHTML += word.shift();
		} else {
			deletingEffect();
			return false;
		};
		timer = setTimeout(loopTyping, 15);
	};
	loopTyping();
};

function deletingEffect() {
	let word = words[i].split("");
	var loopDeleting = function() {
		if (word.length > 0) {
			word.pop();
			document.getElementById('word').innerHTML = word.join("");
		} else {
			if (words.length > (i + 1)) {
				i++;
			} else {
				i = 0;
			};
			typingEffect();
			return false;
		};
		timer = setTimeout(loopDeleting, 50);
	};
	loopDeleting();
};

typingEffect();