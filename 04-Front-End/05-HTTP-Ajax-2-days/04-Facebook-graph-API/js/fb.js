var accessToken = "CAu......0vXW"; // copy your access token here

$(function() {

  // Listen click from button
  $("#btn-info-from-facebook").on("click", function(e) {

    // Get basic data from facebook
    $.get("https://graph.facebook.com/me?fields=first_name,last_name",
      { access_token: accessToken },
      function(data) {
        var firstName = data.first_name;
        var lastName = data.last_name;

        var pictureUrl = "http://graph.facebook.com/" + data.id + "/picture?type=square";
        var profilePic = $("<img>").attr("src", pictureUrl);

        $("#my-profile .basic").append(profilePic);
        $("#my-profile .basic").append(firstName + ", " + lastName);
      });

    // Your turn:
    // Play with the graph explorer to see which data you want to inject (friends, education, whatever you like!)
    // Inject this data in the #advanced-infos div

  });

});

