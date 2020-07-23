## Background and Objectives

Accessibility is the art of building website for everyone! Auditory, cognitive, physical, speech, and visual disabilities means the users could be using specific hardware or software tools to browse content. We refer to them as **assistive technology**. It can be screen readers, magnification software to zoom the content, speech input software, alternative input devices such as eye trackers, head pointers, and so many more, yet to invent...

Whether it's with audio, braille, or whatever technique, the purpose of assistive technology is to give the user a complete experience of the content. Coding choices will have a huge impact on compatibility with those tools. Accessibility is not an obscure science or a separate language, it's just a series of wise choices regarding HTML, CSS and Javascript. With a clean code, you can build something wonderful for everyone.



## Specs

Let's fix a page that has been coded without any care for accessibility. The challenge combines three major accessibility topics: **Styling**, **Semantics** and **Focus**.

![Main topics](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/main-topics.png)

It's strongly advised to use Chrome. You'll make an intensive use of **Developer Tools** panels, many useful tools for accessibility are already built-in Chrome. If you can't find a panel, there's a chance it is still hidden in the menus. Find it here:

![Panels](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/panels.png)


Start by running a server:

```ruby
cd accessibility-guidelines
serve
```



## Styling

![Styling topic](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/styling-topic.png)

Graphic design is meant to express a lot of messages through colors, forms, layout, etc. but let's keep in mind that the main goal is to pass information.  Subtile design choices can sometimes make the content difficult to read. Visual impairment is very common, a large part of the population need glasses to read screens at one point of their lifetime. Some people with color-blindness see colors in different spectrums. The goal of styling an app in to find the perfect balance between graphics and readability.



### Explore


#### Vision Deficiencies:

1. Open the **Rendering** panel in Chrome Developer Tools
2. At the very bottom of the panel, find the last menu "Emulate Vision Deficiencies"
3. Try to spot the information that cannot be read when emulating various deficiencies.

Note that we simulated an error in the form, the comment section is outlined with a pink border. Can you see it when selecting Protranopia or Deuteranopia?


#### Contrast:

1. Open the **Styles** panel in Chrome Developer Tools
2. Inspect any title (`h1`, `h2` or `h3`)
3. Click on the color to open the color picker

![Contrast](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/contrast.png)

Notice that the contrast ratio is marked as insufficient. Contrast is the difference between two colors. Colors that are too similar tend to blend together and lower readability. In our page the titles are too dim.


#### Font-size:

1. Open Chrome settings
2. Open **Appearance** page (or type this URI chrome://settings/appearance)
3. Change the default font-size to a bigger one

![Contrast](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/font-size.png)

You probably expected to see the text in a bigger font. Unfortunately it doesn't change anything to your page, that's because all the font sizes as set in fixed pixels. Some [units](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size) are relative (`em`, `rem`) to the default browser font-size. More often is it set to 16px. When the user change the settings, all fonts with relative units change proportionally.


#### Viewport:

1. Open Chrome Developer Tools
2. Click on the **Toggle device toolbar** button
3. Choose a mobile preset

![Viewport](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/viewport.png)

You page appears smaller than expected, it is shrunk. To get how the size of the page is calculated, we must understand how mobile display web pages. They often render at a bigger width and they zoom out the whole thing. It is done intentionally because most websites are optimised for wider screen and content is spread horizontally. There is a way to change the format of the page, also called [viewport](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag) by adding a special meta tag in `<head>`.



### Take action

Open `style.css` to fix readability for everyone.

- Fix color contrast to all the titles (`h1`, `h2`, `h3`).
- Increase the font-size of `p` to ease readability (use the Blurred vision emulator for reference).
- Allow custom font-size by using relative units (`em`) instead of pixels.


Open `index.html` to fix content

- Spot the `textarea`, it has an `error` class. The light outline is not a clear information and cannot be seen by everyone. Add a paragraph below the `textarea` with a message about the error: `<p class="error-message">Comment must not be blank</p>`
- Force the [viewport](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag) to consider the device size as the available width for your page. Put the following tag in the `<head>`:
`<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- Avoid content reordering. Remember accessibility technology reads content from the code, not from the rendered page. In your page, the navigation widget is at the bottom of the code, but at the top of the page. Place it at the beginning so it can be read first by the users. 



## Semantics

![Semantics topic](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/semantics-topic.png)

Let's play a game. Those two websites look absolutely similar, but what makes them different?

![Semantics](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/semantics.svg?sanitize=true)

The first website rely on CSS styling to structure the content. The second one makes a very wise use of native HTML tags and reclaims the natural roles of the elements. Is the final result the same? Well, not really, the first is only visual, the second can be interpreted by any assistive technology too.
 
The source code is the starting point to generate two user interfaces: 
- a **graphical interface** that you can **see** in a browser
- an **accessibility tree** that you can perceive with **other senses** through **assistive technology**.

![Accessibility Tree](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/accessibility-tree.svg?sanitize=true)

Assistive technology kind of "understands" code, it knows that the content is more than just words. It reads the text and constantly adds some context. For example, a link labeled "Accessibility Principles" in VoiceOver for mac will be spoken out like this: "visited, link, Accessibility Principles / You are currently on a link, to click this link press Control-Option-Space".



### Explore

#### Semantic elements

1. Open the **Accessibility** panel.
2. With the inspect tool, wander around the page to inspect some of the elements.
3. Have a look each time at the accessibility properties in the panel.

![Accessibility panel](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/accessibility.png)

Spot the `role` attribute, it is one of the most important. 
You'll find they are great differences between **non-semantic** elements, like `div` or `span` which are just generic containers, and **semantics** elements like `h1`, `nav` which have specific `role`.

When coding, the best practise is to use native [HTML5 elements](https://developer.mozilla.org/en-US/docs/Glossary/semantics) because they have built-in behaviours. But it's not always possible. Custom components, like a loading bar for example, have no others options than a hierarchy of generic `div` containers. The good news is you still have the opportunity to be caught up by the accessibility tree. Special attributes, named [ARIA attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) after the standard **Accessible Rich Internet Application**, can be added to any element.

ARIA attributes can also translate interactions made through Javascript. Imagine a  page with tabs. Tabs can be clicked, can be switched, they basically have [states](https://developer.mozilla.org/en-US/docs/Web/Accessibility/An_overview_of_accessible_web_applications_and_widgets). A good implementation of ARIA attributes can mimic those interactive behaviours to assistive technology.

Bootstrap which is a solid accessible framework, applies all the necessary ARIA attributes to its components. Please keep them, they are precious to assistive technology.


#### Form
- Take time to carefully inspect some `input` elements in the form
- Try to click on "Styling" next to a checkbox
- Try to click on "Yes" next to a radio button, is there a difference?

Inputs, textareas have a lot more attributes below `role`. They need special properties to match their complex behaviours and states. See the `name` property? It is filled with the text of another tag: the label. Labels go hand in hand with inputs. The first indicates what is expected and the second saves the user's choice.
Label can also be clicked, checkboxes and radio buttons can be ticked with a click on the label. In your page, the radio button functionality seems broken, isn't the label missing?


#### Meaning

Some informations in the page are only visual, try to spot them all:

- Images
- Read the title of the tab in the browser
- There a link labeled "clear here"
- In the footer the arrow button, with no text

Images, links, tabs, buttons are all part of the content. When the design delivers rely on visual information or context, we must back it up with semantic code to give all users a similar experience.
Assistive technology tools go beyond than just read, they add essential navigation functionalities. All users tend to overview the content before they decide to read deeper. That's why screens readers build list of major elements like **links** or **headings**, with a direct access to specific parts:

![VoiceOver](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/voiceover.png)

In conclusion, some elements have implicit accessibility attributes, they structure the content or add interactions details. We can add more properties to custom components the preserve the user experience.


### Take action

Open `index.html`, fix it by adding **semantic** logic.

#### Semantic elements:
- Replace generic div containers with [HTML5 semantic elements](https://developer.mozilla.org/en-US/docs/Glossary/semantics) (`<header>`, `<main>` and `<footer>`).
- Titles are marked by classes (`.title` and `.subtitle`). Replace them with dedicated heading tags from `h2` and `h3`.
- Use `p` for paragraphs instead of div with `.content` class.


#### Form
- One of the input type does not match the question it is supposed to address.
Find the input when the user enters a zoom scale. The input if of type `text`, could you find a better [input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input)?
- Add missing [`label`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) to inputs "yes" and "no":

```html
<input type="radio" name="explanations" id="yes">
<label for="yes">Yes</label>
<input type="radio" name="explanations" id="no">
<label for="no">No</label>
```

A label refers to an input's `id` with the attribute `for`

```html
<label for="yes">
<input type="radio" id="yes">
```


#### Meaning:
- Add alternative text to the images. Use the [`alt`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Img) attribute to describe precisely the image for those who won't see it.
- The link "click here" doesn't give any information about the URL. Remember screen readers build lists of links to enable direct access. Lists can't be a succession of "clear here", "read more" or any generic instructions. Replace the text with a clear description: "Accessibility Principles".
- In the footer, there is a button with no text to move to the top. Add an ARIA attribute to make it available to the accessibility tree : `aria-label="Back to top"`.
- Add a `lang` attribute to the html tag: `<html lang="en">`. If this attribute is missing, screen readers will fallback to their default languages.
- Add a `<title>` tag to the page in `<head>`: `<title>Accessibility Guidelines</title>`.




## Focus

![Focus topic](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/focus-topic.png)

Have you ever noticed the blue outline when you type in a form? Some developers get rid of it with a little CSS because it doesn't suit their design. Don't do it! This blue outline is a **focus ring**, it's highly important for keyboard users.

Focus highlights the element that receives the user input. Only interactive elements are triggered by focus (links and form elements), content items (text and images) are not focusable. Focus will follow the same order than the HTML document. While it possible to reorder the focus sequence with [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex), it's not recommended and considered an anti-pattern.


### Explore:

Practice the keyboard-only navigation:

- Use tab to move forward in the page / Use SHIFT + tab to move backward
- Use arrow keys to select values in a form
- Use space bar to tick checkboxes
- Press Enter to submit

![Link](https://raw.githubusercontent.com/lewagon/fullstack-images/master/frontend/accessibility/link.png)

If you pay attention, the focus gets trapped in the page somewhere at the beginning. Did you notice that you pressed tab three times without any feedback? Can you guess what happened?
When the navigation is hidden to your eyes, it is still available in the HTML document. The focus will trigger it anyway. To avoid this behaviour and it from the accessibility tree, use CSS properties such as `visibility: hidden` or `display: none`. The element will be hidden from both the browser and the accessibility tree.


### Take action
Open `nav.css` to fix the focus problem.

- When closed, the navigation list must be hidden from the accessibility tree. Add `visibility: hidden;` to it's default state
- On the nav open state, add `visibility: visible;`




## Optional: Test by yourself


### LightHouse (Google)
Lighthouse is an audit tool which includes accessibility. You can test it on the page you fixed in this challenge.
[Lighthouse explained](https://developers.google.com/web/tools/lighthouse/)
(If you experience difficulties the first time you launch an audit, try to reboot Chrome)


### Accessibility Insights (Microsoft)
Install [Accessibility Insights](https://accessibilityinsights.io) to run an audit.


### Screen readers
- [VoiceOver on Mac](https://www.youtube.com/watch?v=5R-6WvAihms&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g&index=7)
- [NVDA for Windows](https://www.youtube.com/watch?v=Jao3s_CwdRU&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g&index=9)




## Read more

- ["Accessibility" on developers.google](https://developers.google.com/web/fundamentals/accessibility/)
- ["Accessible to all" on web.dev](https://web.dev/accessible/)
- ["The POUR Methodology" on Adobe's blog](https://theblog.adobe.com/design-with-accessibility-in-mind-the-pour-methodology/)
- ["A11ycasts with Rob Dodson" on Youtube](https://www.youtube.com/watch?v=HtTyRajRuyY&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)
- [How visually impaired people navigate the web](https://uxdesign.cc/how-visually-impaired-people-navigate-the-web-7f9eab9d9c37)
-["An overview of accessible web applications and widgets" on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/An_overview_of_accessible_web_applications_and_widgets)

