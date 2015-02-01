## Background & Objectives

In this challenge, learn to insert Bootstrap modals on a sign-up example. Don't spend too much time on this challenge, this is pretty much a copy/paste exercise. Just understand how the button and form are linked though `data-target` and `id` HTML attributes, then move on to the next challenge.

## Specs

**Signup button**

```html
<!-- Sign-up button -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#signUp">
  Sign Up
</button>
```

**Signup modal**

```html
<!-- Sign-up Modal -->
<div class="modal fade" id="signUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title" id="myModalLabel">Sign Up</h4>
      </div>
      <div class="modal-body">
        <!-- Your signup form -->
      </div>
    </div>
  </div>
</div>
```


