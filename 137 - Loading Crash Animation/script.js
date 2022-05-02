var path = document.querySelector("path");
var length = path.getTotalLength();
// create timeline
var timeline = new TimelineMax({
	repeat: -1,
	repeatDelay: 1
});

// initial animation of svg
TweenMax.to("svg", 0.5, {
	opacity: 1
});

// set up looping text animation
TweenMax.to("text", 0.5, {
	opacity: .2,
	yoyo: true,
	repeat: -1,
	ease: Sine.easeInOut
});

// path animation
timeline.from(path, 1, {
	autoAlpha: 0,
	ease: Power2.easeOut
});
timeline.to(path, 2, {
	attr: {
		"stroke-dashoffset": 0
	},
	ease: Quint.easeIn
}, 0);


// Explosion
timeline.staggerFrom("polygon", .2, {
		scale: 0,
		transformOrigin: "center",
		ease: Back.easeOut
	}, .05, 2);
	timeline.staggerTo("polygon", 0.5, {
		cycle: {
			rotation: [-90, 90]
		},
		transformOrigin: "center"
	}, 0, 2);
	timeline.staggerTo("polygon", .5, {
		autoAlpha: 0,
		transformOrigin: "center",
		ease: Back.easeOut
	}, -.05, 2 + "+=.4");

// remove path
timeline.to(path, 2, {
	attr: {
		"stroke-dashoffset": -length
	},
	autoAlpha: 0,
	ease: Quint.easeInOut
}, 2);