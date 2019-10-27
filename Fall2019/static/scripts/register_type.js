const words = ["Excellence: Saint Leo University is an educational enterprise. All of us, individually and collectively, work hard to ensure that our students develop the character, learn the skills, and assimilate the knowledge essential to become morally responsible leaders. The success of our University depends upon a conscientious commitment to our mission, vision, and goals." +
" Community: Saint Leo University develops hospitable Christian learning communities everywhere we serve. We foster a spirit of belonging, unity, and interdependence based on mutual trust and respect to create socially responsible environments that challenge all of us to listen, to learn, to change, and to serve." +
" Respect: Animated in the spirit of Jesus Christ, we value all individuals’ unique talents, respect their dignity, and strive to foster their commitment to excellence in our work. Our community’s strength depends on the unity and diversity of our people, on the free exchange of ideas, and on learning, living, and working harmoniously." +
" Personal Development: Saint Leo University stresses the development of every person’s mind, spirit, and body for a balanced life. All members of the Saint Leo University community must demonstrate their commitment to personal development to help strengthen the character of our community." +
" Responsible Stewardship: Our Creator blesses us with an abundance of resources. We foster a spirit of service to employ our resources for University and community development. We must be resourceful. We must optimize and apply all of the resources of our community to fulfill Saint Leo University’s mission and goals." +
" Integrity: The commitment of Saint Leo University to excellence demands that its members live its mission and deliver on its promise. The faculty, staff, and students pledge to be honest, just, and consistent in word and deed."];
let i = 0;
let timer;

function typingEffect() {
	let word = words[i].split("");
	var loopTyping = function() {
		if (word.length > 0) {
			document.getElementById('word').innerHTML += word.shift();
		} else {
			document.getElementById('word').innerHTML += " ";
			if (words.length > (i + 1)) {
				i++;
			} else {
				i = 0;
			};
			typingEffect();
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
			//document.getElementById('word').innerHTML = word.join("");
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