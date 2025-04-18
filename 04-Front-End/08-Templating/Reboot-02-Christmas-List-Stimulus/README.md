**Important ❗** This challenge will be live-coded by the teacher. There's no need for students to do it on their own. But, here are some instructions to help guide:

## Teacher's Guide: Christmas List with StimulusJS

As a livecode only (i.e. the students are welcome to try it themselves after class, but there will not be ticket time for this), you will refactor the code so it uses Stimulus.

Stimulus has already been configured and **controllers/gifts_controller.js** has been created for you, all you need to do is refactor the code in `index.js` (which we have unlinked from `index.html`). Once you're done refactoring, you can delete `index.js` as all the JS will be in our controller. Good luck!

### 1. Connect the controller to the DOM

We will be using one Stimulus controller for the entire challenge, so you should select a HTML element (a `<div>` or otherwise) that has access to both of the lists and the forms within it.

```
<!-- index.html -->

<div data-controller="gifts">
    <!-- [...] -->
</div>
```

### 2. Add an item via the gift form

#### 2.1. Turn the form's inputs into data-targets

```
<!-- index.html -->

<!-- [...] -->

<input type="text"
        class="form-control w-100 mt-2"
        id="name"
        data-gifts-target="nameInput">

<!-- [...] -->

<input type="text"
        class="form-control w-100 mt-2"
        id="name"
        data-gifts-target="priceInput">

<!-- [...] -->
```

```
// controllers/gifts_controller.js

export default class extends Controller {
    static targets = ["nameInput", "priceInput"]

    // [...]
}
```

#### 2.2. Add a data-action to the form

```
<!-- index.html -->

<!-- [...] -->

<form data-action="submit->gifts#addItemViaForm"
      class="w-100 mx-auto">

<!-- [...] -->

```

```
// controllers/gifts_controller.js

export default class extends Controller {
    // [...]

    addItemViaForm(e) {
        e.preventDefault()
        const name = this.nameInputTarget.value
        const price = this.priceInputTarget.value

        console.log(name)
        console.log(price)
    }
}
```

#### 2.1. Turn the list into a data-target

```
<!-- index.html -->

<!-- [...] -->

<ol class="list"
    data-gifts-target="list">
</ol>

<!-- [...] -->
```

```
// controllers/gifts_controller.js

export default class extends Controller {
    static targets = ["nameInput", "priceInput, "list"]

    // [...]
}
```

#### 2.2. Create the `toggleStrike` function and finish off the `addItemViaForm` function

With StimulusJS, we can add the 'event listener' that will toggle the presence of the `.strike` class directly on the `<li>` element when we create it, which makes our lives much easier.

```
// controllers/gifts_controller.js

export default class extends Controller {
    // [...]

    toggleStrike(e) {
        e.currentTarget.classList.toggle('strike')
    }

    addItemViaForm(e) {
        e.preventDefault()
        const name = this.nameInputTarget.value
        const price = this.priceInputTarget.value

        const listItem = `<li
            class="gift-item"
            data-action="click->gifts#toggleStrike">
                ${name} - €${price}
            </li>`

        this.listTarget.insertAdjacentHTML('beforeend', listItem)
    }
}
```

And that's it for the first form!

### 2. Add an item via the ideas form

#### 2.1. Turn the ideas form's input into a data-target

```
<!-- index.html -->

<select class="form-select w-50"
        id="search-input"
        data-gifts-target="ideasInput">
    <!-- [...] -->
</select>
```

```
// controllers/gifts_controller.js

export default class extends Controller {
    static targets = ["nameInput", "priceInput, "list", "ideasInput"]

    // [...]
}
```

#### 2.2. Turn the ideas list into a data-target

```
<!-- index.html -->

<ul class="search-list"
    data-gifts-target="ideasList">
</ul>
```

```
// controllers/gifts_controller.js

export default class extends Controller {
    static targets = ["nameInput", "priceInput, "list", "ideasInput", "ideasList"]

    // [...]
}
```

#### 2.3. Add a data-action to the ideas form

```
<!-- index.html -->

<form class="mt-4 search-form"
        data-action="submit->gifts#searchGifts">
        <!-- [...] -->
</form>
```

#### 2.3. Code the `searchGifts` function

```
// controllers/gifts_controller.js

export default class extends Controller {
    // [...]

    searchGifts(e) {
        e.preventDefault();

        const query = this.ideasInputTarget.value

        fetch(`https://fakestoreapi.com/products/category/${query}`)
            .then(res => res.json())
            .then(data => {
                data.forEach((item) => {
                    const listItem = `<div class="d-flex align-items-center">
                        <li>${item.title} - €${item.price}</li>
                        <button class="btn btn-info btn-sm ms-2 text-white" data-action="click->gifts#moveItem">Add</button>
                    </div>`
                    this.ideasListTarget.insertAdjacentHTML('beforeend', listItem)
                })
            });
    }
}
```

#### 2.3. Code the `moveItem` function

```
moveItem(e) {
    const item = e.currentTarget.parentElement;
    const li = item.querySelector('li');

    li.setAttribute('data-action', 'click->gifts#toggleStrike');
    li.classList.add('gift-item');

    this.listTarget.appendChild(li);

    item.remove();
}
```
