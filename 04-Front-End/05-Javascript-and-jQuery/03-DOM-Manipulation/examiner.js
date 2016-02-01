var EXERCISE_NUMBER = 1;

function assert_equal(actual, expected) {
  if (actual == expected) {
    add_success();
  } else {
    if (typeof expected === "number") {
      add_error('Expected ' + expected + ', got ' + actual + '');
    } else {
      add_error('Expected "' + expected + '", got "' + actual + '"');
    }
  }
}

function assert_not_equal(actual, not_expected) {
  if (actual != not_expected) {
    add_success();
  } else {
    if (typeof not_expected === "number") {
      add_error('Expected ' + actual + ' to differ from ' + not_expected + '');
    } else {
      add_error('Expected "' + actual + '" to differ from "' + not_expected + '"');
    }
  }
}

function add_success() {
  $('#results').append('<li class="success">Exercise ' + EXERCISE_NUMBER + ' OK</li>');
  EXERCISE_NUMBER++;
}

function add_error(msg) {
  $('#results').append('<li class="error">Exercise ' + EXERCISE_NUMBER + ' KO: ' + msg + ' </li>');
  EXERCISE_NUMBER++;
}

$(document).ready(function() {
  run_challenges();
})