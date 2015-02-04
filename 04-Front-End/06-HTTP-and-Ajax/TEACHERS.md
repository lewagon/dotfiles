## Live-Code

Instead of re-doing the Promo-Chat exercise, you can tell the student
to use the `People` endpoint of the [Clearbit](https://clearbit.com/) API.

The interface is simple: an input to type an email, submit the form =>
catch the `submit` with jQuery => send an AJAX request to the Clearbit APi
=> read the json returned and display in a div the result.

One difficulty will be to send an `Authentication` HTTP header.