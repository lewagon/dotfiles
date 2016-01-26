### Adding a Bootstrap modal

Bootstrap [modal](http://getbootstrap.com/javascript/#modals) is a dynamic component of the library very easy to use (no need to write Javascript). As said in the documentation, just add a `data-toggle="modal"` and give the `data-target` to the button responsible for launching the modal, like

```html
<a href="#" class="btn btn-primary" data-toggle="modal" data-target="#how-it-works"></a>
```

Then you can just copy/paste Bootstrap modal from the [doc](http://getbootstrap.com/javascript/#modals) at the bottom of your `<body>`. Don't forget to put an `id` to the modal with same name as the `data-target` of your button. Otherwise, the button doesn't know which modal it refers to.


```html
<!-- Modal code from the doc-->
<div class="modal fade" id="how-it-works" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Your modal title</h4>
      </div>
      <div class="modal-body">
        <!-- here goes your modal body -->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```

And that's it!
