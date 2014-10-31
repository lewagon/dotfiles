## Background & Objectives

Note: You can start a local webserver by typing the following command in your terminal (just make sure you are in the exercises folder):

```bash
$ serve
```

(it has been defined in an [alias](https://github.com/lewagon/dotfiles/blob/f894306fd81502f1fe513dd253e3129f4b56874d/aliases#L7))

You can now visit your files on [http://localhost:8000](http://localhost:8000)

Learn about :

#### HTML Skeleton tags

* `<!DOCTYPE html>`
* `<head>`, `<title>`, `<meta>`
* `<body>`

#### Content tags

* Text tags (h1, p, ul/ol/li, em, strong)
* Link tag
* Form tags (form, input, textarea)
* Image tag
* Tables tag

#### HTML5 Tags

* header, footer, article, aside, audio, video, ...

## Specs

Each page MUST have a header with your blog title and a footer with informations and links.

#### blog.html

Write a `blog.html` which contains multiple blog posts filled with sports results, or tv show casts (Game of Thrones, ...) or whatever topic you like which involves enough data to work with.

* You must use table tags to present your teams results (or the cast of your tvshow).
* You must introduce your posts with nice pictures.
* You must group all information in a semantical way (Use the adequates HTML5 tags).

#### contact.html

Write a `contact.html` page that contains a basic contact form.

* You must use form tags.
* You must use checkboxes, selects, inputs and textareas.
* You must use an input type date.

#### Link it all together

Link those two pages with a basic navigation menu in each of these pages.

* You must use an unordered list.
* You must use link tags.
* You could use the `_target="blank"` attribute.
