<!-- Please put your translation here and with the same style in README.md -->
## 背景与目标

恭喜你来到第一个可选练习。这一个会有点棘手，应该会让你忙久一点。它可以被看作一个[Code Kata](http://en.wikipedia.org/wiki/Kata_%28programming%29), 程序员用来训练他们自己的练习。

## 详细说明

我们想要你写一个`colorful?`方法（method），它需要一个数字作为参数，如果该数字是**colorful**的，则返回true，否则返回false。

一个colorful数字是指这样一个数字：它的所有的连续子集的积都是不重复的。

在这个练习中，只考虑**3**位数（而不是更多）。

例子：

- `263`是一个colorful数字，因为(2, 6, 3, 2x6, 6x3, 2x6x3)都是不同的。
- `236`不是colorful数字，因为(2, 3, **6**, **2x3**, 3x6, 2x3x6)中出现了2次6。
