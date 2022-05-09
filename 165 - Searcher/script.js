$(document).ready(function(){
  var keyword = "";
  var resultArea = $("#results");
  var searchBar = $("#searchBar");
  var searchButton = $(".glyphicon-search");
  var searchUrl = "https://en.wikipedia.org/w/api.php";
  var displayResults = function(){
    $.ajax({
      url: searchUrl,
      dataType: 'jsonp',
      data: {
        action: 'query',
        format: 'json',
        generator: 'search',
          gsrsearch: keyword,
          gsrnamespace: 0,
          gsrlimit: 10,
        prop:'extracts|pageimages',
          exchars: 200,
          exlimit: 'max',
          explaintext: true,
          exintro: true,
          piprop: 'thumbnail',
          pilimit: 'max',
          pithumbsize: 200
      },
      success: function(json){
        var results = json.query.pages;
        $.map(results, function(result){
          var link = "http://en.wikipedia.org/?curid="+result.pageid;
          var elem1 = $('<a>');
          elem1.attr("href",link);
          elem1.attr("target","_blank");
          var elem2 = $('<li>');
          elem2.append($('<h3>').text(result.title));
          //if(result.thumbnail) elem.append($('<img>').attr('width',150).attr('src',result.thumbnail.source));
          elem2.append($('<p>').text(result.extract));
          elem1.append(elem2);
          resultArea.append(elem1);
        });
        $("footer").append("<p>----x--------x----</p>");
      }
    });   
  };
 /* 
  searchBar.autocomplete({
        source: function (request, response) {
            $.ajax({
                url: searchUrl,
                dataType: 'jsonp',
                data: {
                    'action': "opensearch",
                    'format': "json",
                    'search': request.term
                },
                success: function (data) {
                    response(data[1]);
                }
            });
        }
    });
  */
  searchButton.click(function(){
    keyword = searchBar.val();
    resultArea.empty();
    $("footer").empty();
    displayResults(); 
    $("#searchBox").animate({'padding-top':"0"}, 600);
    $(".container-fluid").animate({height:"30vh"}, 600);
  });
  
  searchBar.keypress(function(e){
      if(e.keyCode==13)
      $(searchButton).click();
  });

});