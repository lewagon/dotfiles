## Background and Objectives

As developers, we tend to focus on how the web page appears _to us_ when we code. We forget that we all see differently! Accessibility is the art of building websites for everyone, including people with disabilities or impairments. A lot of people visit websites using **assistive technologies** like screen readers, magnification software to zoom the content, speech input software, alternative input devices such as eye trackers, head pointers, and so many more...

Coding choices have a huge impact on how these technologies can bridge the user's disabilities. But writing accessible apps is not an obscure science or a separate language, it's just a series of wise principles. With the right code, you can build something wonderful for everyone.


## Specs

This challenge is more of a tutorial. You'll fix a page that has been coded without any care for inclusivity and discover the pilars of accessibility: **Styling**, **Semantics** and **Focus**.

![Main topics](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/main-topics.png)

**Setup**

Start by running a server:

```ruby
cd accessibility-guidelines
serve
```

We strongly recommend using Chrome. You will make an intensive use of the **Developer Tools** panels where Chrome has many useful tools for accessibility built-in. Open the developer tools and place them on the right:

![Chrome setup](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/chrome-setup.png)



## Styling

![Styling topic](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/styling-topic.png)

Subtle design choices can make the content difficult to read. Visual impairment is very common, a large part of the population wears glasses and color-blind people see colors in different spectrums. The goal of styling an app is to find the right balance between nice graphics and readability.


### Add text to UI warnings

![Vision](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/vision.png)

1. Open the **Rendering** panel (via the **More tools** menu)
2. Find the last menu **Emulate Vision Deficiencies** and test all the rendering differences.
The comment `textarea` in the page is outlined with a pink border to point out an error. Hard to discern when selecting Protanopia or Deuteranopia, right?
3. Open `index.html` and add an error message under the `textarea`.
<details>
<summary markdown='span'>View solution</summary>

```html
<p class="error-message">Comment can't be blank</p>
```
</details>


### Increase contrast

![Contrast](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/contrast.png)

1. Open the **Styles** panel in the **Elements** tab
2. Inspect the main heading `<h1>` and notice that the contrast score is marked as insufficient. Colors that are too similar tend to blend together and lower readability.
3. Choose colors with the appropriate contrast for all the titles. Test directly from the **color picker** to see the difference in real time.
![Pick a color](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/color.png)
4. Update your color choices in `style.css`


### Make the font-size more comfortable

![Contrast](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/font-size.png)

1. Open Chrome settings (`cmd ,` or `ctrl ,`)
2. Select the **Appearance** menu
3. Change the default font-size from `Medium` to `Very Large` and go back to [localhost:8000](http://localhost:8000). You probably expected to see the text bigger. Unfortunately it has not changed much because some of the font sizes are set in pixels. Only relative [units](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size) change proportionally to the browser's defaults.
4. Replace font sizes with relative units (`rem`) in `styles.css`. Increase the font-size of `<p>` to be more comfortable. Use the Blurred vision emulator to test your changes.


### Allow the app to be responsive

![Viewport](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/viewport.png)

1. In the developers tools, click on the **Toggle device toolbar** button
1. Choose a mobile preset. Your page appears smaller than expected and shrunk. This is a consequence of how mobiles display web content: they render at a bigger width and zoom out the whole page. It is intentional because most websites are optimised for horizontal screens.
1. In `index.html`, force the [viewport](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag) to consider the device size as the width of your page. Add the necessary meta tag in `<head>`.
<details>
<summary markdown='span'>View solution</summary>

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
</details>


## Semantics

![Semantics topic](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/semantics-topic.png)

![Semantics](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/semantics.svg?sanitize=true)

Those two websites look similar, but are in fact very different. The first one relies on CSS to organize the page's display. The second one relies on the natural roles of the HTML elements. Is the final result the same? **No, because assistive technologies are not able to describe the first one accurately**.

Behind the scenes, assistive technologies rely on code to render the page, much like browsers do. But it needs an overlay of **semantic** information to be able to name and describe the elements to the user. For example, to perform intelligible audio descriptions of `<a>` tags:

![Audio](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/audio.png)

Tools can do a lot beyond reading, they extend navigation functionalities. VoiceOver builds summaries of major elements with a direct access, here, a list of headings:

![VoiceOver](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/voiceover.png)

The semantic information is infered from:
- Native [HTML5 elements](https://developer.mozilla.org/en-US/docs/Glossary/semantics), like headings, navigation, etc. They have implicit roles understood by a wide range of assistive tools.
- [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA), a complete set of attributes that patch missing information. By the way, you can find lots of aria attributes examples in Bootstrap components. Bootstrap is pretty [compliant with accessibility standards](https://getbootstrap.com/docs/4.5/getting-started/accessibility/), make sure you keep those attributes, they are useful!

![User Interface](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/user-interface.svg?sanitize=true)


### Use the right HTML tags

It's important to leverage HTML tags native roles and behaviour as much as possible. For instance, always use an `<a>` or a `<button>` for a clickable element. Adding a `cursor: pointer;` css rule in your code is a [smell](https://en.wikipedia.org/wiki/Code_smell)!

![Accessibility panel](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/accessibility.png)

1. Open the **Accessibility** panel.
2. With the **Inspect tool**, inspect the `<h1>` tag and one `<div>`.
3. Have a look each time at the accessibility properties in the panel. The `role` attribute, it is one of the most important.
Wander through the page if you like to explore more. You'll find great differences between **non-semantic** elements, like `<div>` or `<span>` which are just generic containers, and **semantics** elements like `<h1>`, `<nav>` with specific `role`.
4. Replace generic `<div>`s with the right HTML5 tags: 
  - `<header>`, `<main>` and `<footer>` for the structure
  - `<h2>` and `<h3>` for the headings
  - `<p>` for paragraphs.

### Connect interacting elements

Input elements have a lot of specific properties to relay their complex behaviours. See their `name` property? It is filled with the text of another tag: the [`label`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label). Labels always go hand in hand with inputs.

1. When you click on the word "Styling", it selects the related checkbox. When you try to click "Yes", it seems broken compared to the previous test. It's because the "Yes" is not tagged as `label` in the HTML.
1. Open `index.html` and add missing labels to radio buttons "Yes" and "No", with the `for` attribute pointing to the input's `id`.
1. The "zoom scale" input is supposed to be filled with a number, but is declared of type `text`. Find a more appropriate [input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input) to allow a correct description.

<details>
<summary markdown='span'>View solution</summary>

```html
<input type="radio" name="explanations" id="yes">
<label for="yes">Yes</label>
<input type="radio" name="explanations" id="no">
<label for="no">No</label>
```
</details>


### Add missing information

When information is only visual or cannot live without context, we must back it up with semantic code to deliver all users a similar experience. [ARIA attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) come to the rescue when no native HTML element is relevant to the situation.

1. Add alternative description to the images with the [`alt`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Img) attribute.
1. The link "click here" is too vague, replace the text with a clear intention: "Accessibility Principles".
1. Add ARIA attributes to buttons without text.
1. Specify the language in the `html` tag: `<html lang="en">`. If this attribute is missing, screen readers will fallback to their default languages.
1. Insert the `<title>` of the page in `<head>`, it will be read when switching from tab to tab.

<details>
<summary markdown='span'>View nav button solution</summary>
    
```html
<button class="toggle-nav" aria-label="Toggle menu"></button> 
```
</details>

<details>
<summary markdown='span'>View footer link solution</summary>

```html
<a href="#top" class="to-top" aria-label="Back to top"></a>
```
</details>

<details>
<summary markdown='span'>View title solution</summary>

```html
<title>Accessibility Guidelines</title>
```
</details>


## Focus

![Focus topic](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/focus-topic.png)

Have you ever noticed the blue outline when you type in a form? Some developers remove it with CSS because it does not suit their design. Don't do it! This blue outline is a **focus ring**, it's highly important for keyboard users.

Only interactive elements can receive focus, content items (text and images) are not focusable. Focus jumps from element to element in the same order than the HTML. Even though it is possible to manage the orders with the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) attribute, it's considered an anti-pattern.

![Link](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/link.png)

1. Practice the keyboard-only navigation:
    - `⇥` TAB to move forward in the page / `⇧` SHIFT + `⇥` TAB to move backward
    - `↑ ↓ ← →` Arrow keys to select values in a form
    - SPACE bar to tick checkboxes
    - `↵` ENTER to submit

    Did you notice that you pressed TAB three times without any feedback? You actually focused the three links of the hidden navigation widget. Hint: when an element is hidden to your eyes, it doesn't mean it is hidden from the code.

2. Toggle the navigation [`visibility`](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility) in `focus.css`.
    <details>
    <summary markdown='span'>View solution</summary>

    ```css
    nav.close ul {
      visibility: hidden;
    }
    ```
    </details>

3. Now the CSS is fixed, open the navigation and try to focus it again. We need to fix one last thing: the navigation links should be the first items to receive focus. Open `index.html` and move the `<nav>` code before the `<main>` container.


## (Optional) Test the result


### LightHouse (Google)
Lighthouse is an audit tool which tests accessibility among other things. You can test it on the page you fixed in this challenge.
[Lighthouse explained](https://developers.google.com/web/tools/lighthouse/). If you experience difficulties the first time you launch an audit, try to reboot Chrome.


### Accessibility Insights (Microsoft)
Install [Accessibility Insights](https://accessibilityinsights.io) to run an audit.


### Screen readers
- [VoiceOver on Mac](https://www.youtube.com/watch?v=5R-6WvAihms&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g&index=7)
- [NVDA for Windows](https://www.youtube.com/watch?v=Jao3s_CwdRU&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g&index=9)


## Read more

- ["Accessibility" on developers.google](https://developers.google.com/web/fundamentals/accessibility/)
- ["Accessible to all" on web.dev](https://web.dev/accessible/)
- ["The POUR Methodology" on Adobe's blog](https://theblog.adobe.com/design-with-accessibility-in-mind-the-pour-methodology/)
- The [a11y project](https://www.a11yproject.com/about/#what-does-the-term-a11y-mean)
- ["A11ycasts with Rob Dodson" on Youtube](https://www.youtube.com/watch?v=HtTyRajRuyY&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)
- [How visually impaired people navigate the web](https://uxdesign.cc/how-visually-impaired-people-navigate-the-web-7f9eab9d9c37)
-["An overview of accessible web applications and widgets" on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/An_overview_of_accessible_web_applications_and_widgets)
