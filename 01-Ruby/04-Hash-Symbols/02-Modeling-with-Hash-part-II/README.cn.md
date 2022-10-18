## 背景与目标

现在，假设你想改进你的卡路里计数器，使他能够接受饮料，汉堡，配菜，**以及套餐**。让我们在菜单上加上下面这三种套餐：

<table class="table">
  <thead>
    <tr>
      <th>Meal</th>
      <th>Items in Meal</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cheesy Combo</td>
      <td>Cheese Burger, Sweet Potatoes, Lemonade</td>
    </tr>
    <tr>
      <td>Veggie Combo</td>
      <td>Veggie Burger, Sweet Potatoes, Iced Tea</td>
    </tr>
    <tr>
      <td>Vegan Combo</td>
      <td>Vegan Burger, Salad, Lemonade</td>
    </tr>
  </tbody>
</table>

## 详细说明

你可能想要将这些膳食存储于另一个常量（constant）。注意：不要试图预先计算好每个套餐的卡路里，只要把组成套餐的各个菜品存储起来就好。你认为你怎样才能表示每顿饭的菜品呢？

现在让我们试着创建一个完整的`#calories_counter`，它能够帮我们计算卡路里，只需运行：

```ruby
orders = ["Sweet Potatoes", "Cheesy Combo", "Lemonade", "Vegan Combo"]
puts calories_counter(orders)
# => 1395
```

## 关键学习要点

- 你如何提取存储在`哈希(Hash)`中的`数组（Array）`的值呢？
- 如果要存储动物名字并按照字母表顺便排序，你会使用哪种数据结构呢？
- 如果要存储动物的名字和颜色，你会使用哪种数据结构呢？
