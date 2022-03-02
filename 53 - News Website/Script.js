const gen=document.getElementById("general");
const bus=document.getElementById("buisness");
const tech=document.getElementById("tech");
const spo=document.getElementById("sports");
const en=document.getElementById("entertain");
const sear=document.getElementById("sear");
const seart=document.getElementById("seart");
const nh=document.getElementById("newshead");

const ert=document.getElementById("ert");

const API_KEY="Your Api Key";
const HEADLINES_NEWS="https://newsdata.io/api/1/news?apikey="+API_KEY+"&country=in&category=top";
const BUSINESS_NEWS="https://newsdata.io/api/1/news?apikey="+API_KEY+"&country=in&category=business";
const SPORTS_NEWS="https://newsdata.io/api/1/news?apikey="+API_KEY+"&country=in&category=sports";
const ENTERTAINMENT_NEWS="https://newsdata.io/api/1/news?apikey="+API_KEY+"&country=in&category=entertainment";
const TECHNOLOGY_NEWS="https://newsdata.io/api/1/news?apikey="+API_KEY+"&country=in&category=technology";
const SEARCH_NEWS="https://newsdata.io/api/1/news?apikey="+API_KEY+"&q";
const GENERAL_NEWS="https://newsdata.io/api/1/news?apikey="+API_KEY+"&country=in&category=politics";


var newsData=[];

var k=1;
window.onload=headere;
function headere() {
	nh.innerHTML="<h1>HeadLines</h1>";
	
	fetchHeadlines();
};
sear.addEventListener("click",function(){
	
	fetchQueryNews();
});

bus.addEventListener("click",function(){
	nh.innerHTML="<h1>Business</h1>";
	fetchBusinessNews();

});
tech.addEventListener("click",function(){
	nh.innerHTML="<h1>Technology</h1>";
	fetchTechnologyNews();
});
gen.addEventListener("click",function(){
	nh.innerHTML="<h1>General</h1>";
	fetchGeneralNews();
});
spo.addEventListener("click",function(){
	nh.innerHTML="<h1>Sport</h1>";
	fetchSportsNews();
});
en.addEventListener("click",function(){
	nh.innerHTML="<h1>Entertainment</h1>";
	fetchEntertainNews();
});

const fetchGeneralNews = async () => {
	const response = await fetch(HEADLINES_NEWS);

	
		const jso=await response.json();
		console.log(jso);
		newsData=jso.results;
	
	displayNews();
}
const fetchHeadlines = async () => {
	const response = await fetch(GENERAL_NEWS);

	
		const jso=await response.json();
		console.log(jso);
		newsData=jso.results;
	
	displayNews();
}
const fetchBusinessNews = async () => {
	const response = await fetch(BUSINESS_NEWS);

	
		const jso=await response.json();
		console.log(jso);
		newsData=jso.results;
	
	displayNews();
}
const fetchTechnologyNews = async () => {
	const response = await fetch(TECHNOLOGY_NEWS);

	
		const jso=await response.json();
		console.log(jso);
		newsData=jso.results;
	
	displayNews();
}
const fetchSportsNews = async () => {
	const response = await fetch(SPORTS_NEWS);

	
		const jso=await response.json();
		console.log(jso);
		newsData=jso.results;
	
	displayNews();
}
const fetchEntertainNews = async () => {
	const response = await fetch(ENTERTAINMENT_NEWS);
		const jso=await response.json();
		console.log(jso);
		newsData=jso.results;
	displayNews();
}
const fetchQueryNews = async () => {
		const response=await fetch(SEARCH_NEWS+seart.value);
		const jso=await response.json();
		console.log(jso);
		newsData=jso.results;
	displayNews();
}

function displayNews() {
	ert.innerHTML="";
	var et=document.createElement('div');
	et.className="columns";

	if(newsData.length == 0){
		nb.innerHTML="<h5>No data found</h5>"
		return;
	}
  var rt=et;
	Array.prototype.forEach.call(newsData,news =>{
		if(k>3){
			rt=document.createElement('div');
			rt.className="columns";
			ert.appendChild(rt);
			k=1;
		}
		var date=news.pubDate.split(" ");

		var col=document.createElement('div');
		col.ClassName="is-4 p-2 card column";

		var card = document.createElement('div');
		card.className="p-2";

		var image = document.createElement('img');
		image.setAttribute("height","matchparent");
		image.setAttribute("width","100%");
		image.src=news.image_url;

		var cardBo=document.createElement('div');

		var newshead=document.createElement('h5');
		newshead.className="card-header-title"
		newshead.innerHTML=news.title;
		console.log(news.title);
		var datahe=document.createElement('h6');
		datahe.className="has-text-primary";
		datahe.innerHTML=date[0];

		var des=document.createElement('p');
		des.className="has-text-dark";
		des.innerHTML=news.description;
		console.log(news.description);
		var link=document.createElement('a');
		link.className="button is-dark"
		link.setAttribute("target","_blank");
		link.href=news.link;
		link.innerHTML="Read more";
		cardBo.appendChild(newshead);
		cardBo.appendChild(datahe);
		cardBo.appendChild(des);
		cardBo.appendChild(link);
		card.appendChild(image);
		card.appendChild(cardBo);
		col.appendChild(card);
		rt.appendChild(col);
		k++;
	});
}
