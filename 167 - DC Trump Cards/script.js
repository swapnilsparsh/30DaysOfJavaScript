var dcCards = document.querySelector(".js-card");

var heroName = [
	"Superman",
	"Batman",
	"Wonderwoman",
	"Flash",
	"Green Lantern",
	"Aquaman",
	"Cyborg"
];

var altName = [
	"Kal-El / Clark Kent",
	"Bruce Wayne",
	"Diana Prince",
	"Barry Allen",
	"Hal Jordan",
	"Arthur Curry",
	"Victor Stone"
];

var groupAffiliation = [
	"Justice League",
	"Justice League",
	"Justice League",
	"Justice League",
	"Justice League",
	"Justice League",
	"Justice League"
];

var comicArt = [
	"https://armchairmogul.files.wordpress.com/2011/07/supes.jpg",
	"https://imgix.ranker.com/user_node_img/42/822905/original/david-finch-writers-photo-u4?w=650&q=50&fm=pjpg&fit=crop&crop=faces",
	"https://cdn1.thr.com/sites/default/files/imagecache/NFE_portrait/2018/08/wonder_woman_58_-_publicity_-_p_2018.jpg",
	"https://cdn11.bigcommerce.com/s-0kvv9/images/stencil/1280x1280/products/272820/381201/jul180644__14403.1537997529.jpg?c=2&imbypass=on",
	"https://i.pinimg.com/originals/a9/52/58/a9525813f9beddc4a1818d87b8d4c963.jpg",
	"https://i.pinimg.com/originals/a2/78/12/a2781277d54f3fd21f7194860bf708be.jpg",
	"https://i.pinimg.com/originals/6e/7c/48/6e7c481f7750f3f285ff3f58b87dd686.jpg"
];

var heroDetails = [
	"A member of, and inspiration for, the Justice League. He is a Kryptonian survivor, and a journalist for the Daily Planet based in Metropolis.",
	"A wealthy socialite, and the owner of Wayne Enterprises. He dedicates himself to protecting Gotham City from its criminal underworld as a highly trained, masked vigilante equipped with various tools and weapons.",
	"An antiquities dealer and an immortal Amazonian warrior, who is the crown princess of Themyscira. She is endowed with metahuman attributes and abilities inherited from her parents.",
	"A Central City University student, who can move at superhuman speeds with his ability to tap into the Speed Force.",
	"Green Lantern",
	"The heir to the throne of the undersea nation of Atlantis.[11] His metahuman aquatic abilities and physical attributes originate from his Atlantean physiology.",
	"A former college athlete who, after being cybernetically reconstructed after a nearly fatal car accident, is turned into a techno-organic being enhanced by reactive, adaptive biomimetic alien technology."
];

var comicCard = "";
for (i = 0; i < heroName.length; i++) {
	comicCard +=
		"<div class='card'><div class='card-inner'><div class='card-front'><div class='hero-name'><h2 class='hero-name_front'>" +
		heroName[i] +
		"</h2><h5 class='alt-name_front'>" +
		altName[i] +
		"</h5></div></div><div class='card-back'><div class='hero-details_back'><p>" +
		heroDetails[i] +
		"</p></div><h1 class='hero-name_back'>" +
		heroName[i] +
		"</h1><div class='alt-details-list'><h2 class='alt-details_name'>" +
		altName[i] +
		"</h2><h2 class='alt-details_group'>" +
		groupAffiliation[i] +
		"</h2></div></div></div></div>";
}

dcCards.insertAdjacentHTML("beforeend", comicCard);