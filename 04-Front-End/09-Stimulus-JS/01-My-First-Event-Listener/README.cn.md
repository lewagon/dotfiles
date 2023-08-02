## 背景和目标

这个挑战的目标是让你使用JavaScript来操作DOM，但是*使用的是[Stimulus](https://stimulus.hotwired.dev/)*。这是一个非常简单的演示，让你开始使用Stimulus。你可能会从讲座中认出它😉。试着自己做一下。

## 设置

从终端运行服务器：

```bash
serve
```

然后访问`localhost:8000`。你可以看到我们正在使用Bootstrap。此外，在`<body>`中有一个大按钮。我们一会儿再来看看它用来干嘛。

要安装[`Stimulus`](https://stimulus.hotwired.dev/handbook/installing)，让我们从你的`index.html`开始。如AJAX讲座中所述，我们将使用`importmap`导入`Stimulus`。

我们来复习一下，什么是`importmap`？当我们在代码中导入许多JS插件时，添加许多`<script>`标签可能会很快变得混乱。`importmap`允许我们创建一个库来固定和导入我们需要的所有JS插件。这有点像Ruby中的`Gemfile`。

首先，你需要导入`es-module-shims`，以确保`importmap`可以在旧浏览器中工作。然后，你可以导入Stimulus库。基本上，将这个复制粘贴到你的`index.html`的`<head>`中：

```html
<script async src="https://ga.jspm.io/npm:es-module-shims@1.6.3/dist/es-module-shims.js"></script>
<script type="importmap">
  {
    "imports": {
      "@hotwired/stimulus": "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js"
    }
  }
</script>
```

完成后，让我们进入我们的`index.js`文件。你需要导入`Stimulus`库并注册一个控制器。控制器将负责对按钮的点击做出反应。在这种情况下，我们将称之为控制器`EventListenerController`：

```javascript
import { Application } from "@hotwired/stimulus";

import EventListenerController from "./controllers/event_listener_controller.js";

window.Stimulus = Application.start();
window.Stimulus.register("event-listener", EventListenerController);
```

然后在空的`controllers`文件夹中创建一个`event_listener_controller.js`文件。这是我们将写的代码来对按钮的点击做出反应的地方。将这个复制粘贴到文件中作为一个模板来开始：

```javascript
// lib/controllers/event_listener_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    // TODO: console.log something!
  }
}
```

尝试从connect方法中`console.log`一些东西。如果你在控制台中看到它，你就可以开始了！如果你什么都没看到，检查一下你是否正确地将你的Stimulus控制器附加到DOM上。例如，你可以通过在`index.html`文件中的`<button>`中添加`data-controller="event-listener"`属性来实现。

## 详细参数

你的目标是在`lib/controllers/event_listener_controller.js`文件中实现一些JavaScript。**你应该对蓝色按钮的点击做出反应。**当点击时，控制器将触发一个`disable()`函数，该函数将：

- 使这个按钮被禁用。这可以通过添加`.disabled`类来完成。
- 将按钮内的文本从“Click me!”更改为“Bingo!”。
- 选做：当点击按钮时，`sound.mp3`[在浏览器中播放](https://stackoverflow.com/questions/9419263/playing-audio-with-javascript)。

这个声音在一些运行在**Ubuntu**上的浏览器上可能不起作用。要修复它，只需运行：

```bash
sudo apt-get install ubuntu-restricted-extras
```
