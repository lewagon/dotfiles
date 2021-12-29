## 背景和目标

有时，你会想使用一个现有项目中的现有数据库。
你可能需要写一些ruby代码来使用Active Record操作数据，而不是写SQL查询。

## 详细说明

- 用`sqlite3`二进制文件打开`db/jukebox.db`数据库，并通过浏览`.schema`在`app/models`中创建所有必要的模型（你可能看不到`.db`文件，因为代码编辑器的默认设置是将其隐藏，你仍然可以通过在终端使用`ls -l db`检查文件是否存在）。
在你创建具有`has_many`和`belongs_to`关系的模型之前，**不要**运行测试。
详细说明会给你很多线索：
- 在你的模型被创建完后，添加一些方法和验证。
- 打开`app/queries.rb`文件，用Active Record查询从数据库获取相关结果（不允许使用SQL！）。

## 进一步的建议

深入阅读一下[Active Record查询接口](http://guides.rubyonrails.org/active_record_querying.html)
