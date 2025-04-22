## 背景和目标

练习Bootstrap grids。

学习如何用不同的响应行为构建各种网格（grids）。

## 详细说明

以下是你在这次挑战中需要重现的[笑脸格子](http://lewagon.github.io/bootstrap-challenges/01-New-Bootstrap-grid/)。这三个格子一开始是这样的:

```html
<div class="container">
  <div class="row">
    <!-- 根据响应行为的不同，有不同的变体 -->
  </div>
</div>
```

之后，你要根据你想要的行为，在`.row`里面添加不同的`.col-??-??`。

⚠️ **不要破坏网格（grids）**

不要将boostrap网格类添加到与其他CSS相同的层级上。

```html
<div class="container">
  <div class="row">
    <!-- 👎 -->
    <div class="card bg-light col-6">。
      😀
    </div>
  </div>
</div>
```

不要在内容周围建立一个网格，而是像这样插入：


```html
<div class="container">
  <div class="row">
    <!-- 👍 -->
    <div class="col-6">
      <div class="card bg-light">。
        😀
      </div>
    </div>
  </div>
</div>
```

## 进一步的建议和资源

- 在编码网格（grid）时，总是以最小分辨率的`.col`类开始。先问问自己，在手机上想要哪个比例。全屏（`.col-12`）？半屏（`.col-6`）？还是25%屏（`.col-3`）？
- 然后进入下一个分辨率(`sm`)，重复这个思路🤔。以此类推，一直到`xxl`。
- 你不需要去写所有的`sm/md/lg/xl/xxl`类。如果你不写所有的类，那么总是先前的类会被应用。例如，一个`<div class="col-12 col-lg-6">`从手机到笔记本是全屏的，然后从笔记本到大屏幕（桌面电脑）是半屏的。

提示: 如果你的页面一直不能显示你当前的代码，不要忘记**硬刷新**你的浏览器(`Cmd` / `Ctrl` + Shift + R`)来清除你的浏览器的缓存!
