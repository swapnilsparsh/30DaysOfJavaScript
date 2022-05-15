
var createCards= function(arr){
  for(var i in arr){
    $(".cards").append(
      '<a href=\'https://en.wikipedia.org/?\
      curid=' + arr[i].pageid+ '\' target="_blank">\
       <div class=\'card-container\'>\
       <div class=\'card-text\'>\
       <span class=\'card-title\'>'+arr[i].title+'\
       </span>'+ arr[i].extract+ '</div></div></a>'
    )
  }
}

//function for finding the the wikipedia content
var findData= function(){
  //removes keyboard on mobile
  $("#search-bar").blur();
  var url='https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=search&exsentences=1&exintro=1&explaintext=1&gsrnamespace=0&exlimit=max&gsrwhat=text&gsrlimit=10&gsrsearch=';
  var term;
  var term= $("#search-bar").val();
  if(!term=='' &&
     !$('.cards').html==''){
    $(".container").css("margin-top", "4em");
    $(".cards").html("");
    $(".ion-load-c").show();
  }
  
  url+=term;
  console.log(url);
  
  $.ajax( {
    url: url,
    dataType: 'jsonp',
    type: 'GET',
    headers: { 'Wikipedia-Search-Result-App': '1.0' },
    success: function(data) {
      $(".ion-load-c").hide();
      if(term!='' && jQuery.isEmptyObject(data.query))
        $(".cards").html(
          "<div class=card-error>\
          <div class=card-text>\
        No results found</div></div>");
      createCards(data.query.pages)      
    },
    error:function(e){
      console.log(e);
      $(".cards").html('Oh no! An error occured, try again');
    } 
    } );
}

//random button
$(".randombutton").click(function(){
  window.open(
    "https://en.wikipedia.org/wiki/Special:Random"
  );
});

//erase everything
$(".ion-close").click(function(){
  $("#search-bar").val("");
  $("#search-bar").focus();
});

$(document).ready(function(){
  $("body").on("keydown", function(e){
    var code=e.which;
    if(e.which!=13 && (e.which>40 || e.which<37)){
      //bring focus back to 
      //search on keypresses
      $("#search-bar").focus();
    }
  });
});



//find data and display cards on
//clicking button or pressing 
//enter in the search bar
$(".searchbutton").click(findData);
$("#search-bar").on('keyup', function(e){
  console.log(e.which);
  if(e.which=='13'){
    findData();
  }
});