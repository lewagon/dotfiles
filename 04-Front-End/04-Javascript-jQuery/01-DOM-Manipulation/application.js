// INSTRUCTIONS - PLEASE READ!!
// Here are some challenges. Solve them from top to bottom

// **Each time** you time you complete a challenge, please commit and push!
// This is a good practise. Each time you make some progress in software
// development, you want to save a snapshot.

function run_challenges() {

  // Ex 1. Read the content of the email input
  var email = null;  // TODO: replace null, keep the email variable.



  // Ex 2. Fill the content of the email input with your email



  // Ex 3. Replace the email hint (next to the input) with 'This is my email now'



  // Ex 4. Add the .blue CSS class to the table header cells (th elements)



  // Ex 5. Count the number of table body rows there are (team count!)
  var team_count = 0;  // TODO: replace 0, keep the team_count variable.



  // Ex 6. Say there is a 15th team added to the table.
  //       Add a row at the bottom, this new team should have zero points.



  // Ex 7. Write some code to sum all points given to all teams
  var sum = 0;  // TODO: replace 0 with your sum result, keep the sum variable.









  // Checking exercise answers. DO NOT MODIFY BELOW
  assert_equal(email, "boris@lewagon.org");
  assert_not_equal(document.getElementById("email").value, "boris@lewagon.org");
  assert_equal(document.getElementById("email-hint").innerHTML, "This is my email now");
  assert_equal($('th:eq(0)').css('color'), 'rgb(0, 0, 255)');
  assert_equal(team_count, 14);
  assert_equal($('tbody > tr').length, 15);
  assert_equal(sum, 859)
}