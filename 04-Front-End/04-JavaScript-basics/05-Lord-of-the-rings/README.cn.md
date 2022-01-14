## 详细说明

在这个练习里, 霍比特人(Hobbits)，精灵(Elves)，矮人(Dwarves)和老鹰(Eagles)会和邪恶的兽人(Orcs), 恶狼（Wargs）,妖怪（Goblins）,强兽人（Uruk-hai）和 巨魔(Trolls) 战斗. 打开文件`lib/lord_of_the_rings.js`。你会看到待实现的三个函数。

第一段函数`isGood`引入士兵类型（字符串[`String`])作为参数，如果这个士兵是好人一方的话，函数应该返回 `true`。

- `isGood("Hobbits")` 应返回`true`
- `isGood("Uruk-hai")` 应返回`false`

第二个函数`buildSoldierObject` 使用`battlefield` (字符串`String`)作为参数， 并且应该返回一个JavaScript对象[`object`]. 这个对象`keys`是一个 **士兵**, `values`是 **战场上同种类士兵的数量**. 这里有一些你需要解析的战场字符串（并转换成对象）:

- `Elves:5,Orcs:4`
- `Hobbits:4,Dwarves:1,Elves:1,Goblins:100,Uruk-hai:1`

例如:

```js
const battlefield = "Elves:3,Orcs:2"
buildSoldierObject(battlefield)  //=> { "Elves": 3, "Orcs": 2 }
```

提示一下如何在JavaScript里使用对象:

```js
const beatles = {}

// Create
beatles.john = "guitar"; // OR beatles["john"] = "guitar"
beatles.paul = "bass";

// Read
console.log(beatles.paul);

// Update
beatles.paul = "bass guitar"; // OR beatles["paul"] = "bass guitar"

// Delete
delete beatles.paul

```

第三个函数`whoWinsTheWar`会把所有的连接起来。使用`battlefield`参数(字符串`String`), 它会返回一个字符串，显示战斗的结果：

- `Tie` 如果战场是空的或者好坏双方有相同数量的士兵。
- `Good` 如果好人一方的士兵人数比坏人一方多。
- `Evil` 如果坏人一方的士兵人数比好人一方多。

_NB: 在这个练习中我们简化了战争，无需考虑每一个士兵种类的“价值”。_
