/* eslint-disable no-multiple-empty-lines */
/* eslint-disable prefer-const */

// INSTRUCTIONS - PLEASE READ!!
// Here are some challenges. Solve them from top to bottom

// **Each time** you complete a challenge, please commit and push!
// This is a good practice. Each time you make some progress in software
// development, you want to save a snapshot.


module.exports = function runChallenges(check) {
  // Ex 1. Read what's written in the email input
  //       Make the function getEmail() return it
  const getEmail = () => {
    // TODO: return the email
  };

  // /!\ DO NOT CHANGE THIS LINE - TEST PURPOSES
  const borisesEmail = getEmail();

  // Ex 2. Change the content of the email input by writing your own email address


  // Ex 3. Replace the email hint (next to the input) with 'This is my email now'
  //       The text should be emphasized using a <strong> tag



  // Ex 4. Add the .blue CSS class to the th elements



  // Ex 5. Count the number of table body rows there are
  //       Make the function teamCount() return it
  const teamCount = () => {
    // TODO: return the number of teams
  };

  // /!\ DO NOT CHANGE THIS LINE - TEST PURPOSES
  const teamCountBeforeAddition = teamCount();

  // Ex 6. Say there is a 15th team added to the table.
  //       Add a row at the bottom, this new team should have zero points.



  // Ex 7. Write some code to sum all points given to all teams
  //       Make the function summarizePoints() return it
  const summarizePoints = () => {
    // TODO: return the sum
  };


  // Ex 8. Change the background color of all `<th>` cells to #DDF4FF



  // Ex 9. Remove the "Email:" label from the DOM










  // Checking exercise answers. DO NOT MODIFY THIS LINE
  check(borisesEmail, teamCountBeforeAddition, summarizePoints());
};
