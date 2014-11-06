$(function(){

  var promo = 1; // change to your own promo !
  var baseUrl = "http://localhost:3000/" + promo + "/comments";


  $("#comment-form").submit(function(event){
    event.preventDefault();
    var author = $("#your-name").val();
    var content = $("#your-message").val();

    var commentData = {
      author: author,
      content: content
    };

    $.post(baseUrl, commentData, function(data){
      addComment(data);
    });
  });

  $("#refresh").on("click", function(event){
    $("#messages ul li").remove();
    $.get(baseUrl, function(data) {
      for (var i = 0; i < data.length; i++){
        addComment(data[i]);
      }
    });
  });

  function addComment(comment){
    var dateSpan = " (<span class='date'>" + "posted " + "10 minutes ago" + "</span>) ";
    var innerComment = comment.content + dateSpan + "by " + comment.author;
    var comment = $("<li>").append(innerComment);
    $("#messages ul").prepend(comment);
  }

});