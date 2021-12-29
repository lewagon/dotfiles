## 背景与目标

有时你会遇到一个数据库，它的表和列的名称**不符合**Active Record的惯例。这意味着它不能自动将
模型名称映射到表，或外键到`has_many`/`belongs_to`关联。

## 详细说明

- 用`sqlite3`二进制打开`db/dirty_jukebox.db`数据库，通过浏览`.schema`在`app/models`中创建所有必要的模型（再一次由于你的设置，你可能无法在代码编辑器中看到`.db`文件，在终端使用`ls -l db`检查文件是否存在）。这一次，你需要额外的努力来正确地将模型映射到正确的表。
- 对于一些`has_many`/`belongs_to`关系，你会注意到外键不符合惯例。就是时候手动覆盖它们了。

## 进一步的建议

- 阅读如何[覆盖命名惯例](http://guides.rubyonrails.org/active_record_basics.html)
- 寻找[`foreign_key`的用法](http://guides.rubyonrails.org/association_basics.html)
