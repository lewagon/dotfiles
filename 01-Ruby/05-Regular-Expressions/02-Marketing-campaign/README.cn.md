## 背景与目标

电子邮件（Email）是任何SaaS（软件即服务）业务的命脉，知道如何在程序中处理它们超级重要。

在大多数的网站中，它们是创建账户的关键。如果email拼写错误，用户将无法获取他的密码。此外，从营销人员的角度来看，你需要与你的客户进行交流，那就需要保证你的联系人数据库里有一个可靠的有效email数据集。

## 故事
在这个挑战中，让我们假设你将在几周内发布一款应用程序。一旦你的网站上线，你将通过大量的邮件广告活动立刻通知每个人。同时，你准备了一个登陆页用来收集访问者的邮件地址。

![Scenario](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email-scenario.svg?sanitize=true)

## 详细说明
### 收集有效email

![Collect valid emails](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email-step1.svg?sanitize=true)

你的登陆页已经准备就绪。你想确保来访者提交一个有效的email。

编写`valid?`方法，它依据email的有效性返回一个正确的布林值（boolean）：
- 识别电子邮件的不同部分，并编写一个正则表达式来匹配一个典型的email
- 你自己编写一个简单的regex，没必要试图使其完美（写出一个完美的email regex是不可能的）！

**警告：**正则表达式是不足以表达出能验证100%合规的电子邮件地址，详见[这个Stackoverflow的讨论](https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression)以及[这个网站](https://emailregex.com/) 的阐述。在专业的环境中，我们倾向于使用外部服务，例如[Sendgrid](https://sendgrid.com/solutions/email-api/email-address-validation-api/)或[Mailgun](https://www.mailgun.com/email-validation/) 所提供的服务，它使用了一个巨大的数据库和机器学习来判断一个地址是否正确。

#### Email地址的模式

每一个电子邮件地址是由一个**用户名（username）**和一个**域名（domain name）**组成。它遵循一下的模式：

![email的格式](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email.svg?sanitize=true)

#### 关于域名

顶级域名（Top Level Domain）也称TLD是域名中的最后一组字符，紧接在**点（dot）**之后，可以从一个标准化的列表中进行选择。最常见的一种是商业网站的`.com`，但你可能听过一些过去的TLDs，例如`.net`和`.org`。

主要的类型有：

- gTLD：通用顶级域名（例如`.com`, `.net`, `.org`）
- ccTLD：国家代码顶级域名（例如`.fr`, `.de`, `.jp`）

但这里还有[更多](https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains)

### 清理数据库

![清理数据库](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email-step2.svg?sanitize=true)

几天过去了，你的数据库已经填入了一些有用的联系人。你的营销团队从专业人士那里获得了更多的数据以扩大受众。在发布邮件广告活动之前，你需要清理数据库并过滤掉任何无效的eamil。

编写`clean_database`方法（method）：
- 它以一个由email组成的数组作为参数
- 它返回一个仅包含有效email的数组

### 生成统计数据
![生成统计数据](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email-step3.svg?sanitize=true)

你的登陆页包含了一个非常简单的表格仅用户收集联系人电子邮箱。你并不是很了解你的客户，但你可以从email地址推断出一些信息。你决定统计一下TLD（顶级域名，Top Level Domains）。**从现在起，所有你正在使用的数据库都已经为你清理干净了。**

编写`group_by_tld`方法，它返回一个哈希（Hash），该哈希将email地址按照TLD进行了分组。

例如：

```ruby
{
  com:  ["julien@mdn.com"],
  de: ["dimitri@berlin.de"],
  fr: ["kevin@yahoo.fr", "edward@gmail.fr"]
}
```

### 邮件广告活动

![邮件广告活动](https://raw.githubusercontent.com/lewagon/fullstack-images/master/ruby/email-step4.svg?sanitize=true)

你现在开始处理你的邮件主体，并希望它是定制化的。以“亲爱的顾客（Dear customer）”开头，听起来并不好，你宁愿从邮件中提取出用户名并以“Dear Seb”开头。

编写`compose_email`方法：
- 从email中提取用户名，域名以及TLD
- 返回如下格式的`哈希（Hash）`：

```ruby
{
  username: seb,
  domain: lewagon,
  tld: com
}
```

### （选做）使用`本地化（locale）`翻译

你对TLD所做的统计数据显示，你的很多客户来自德国和法国。你订购了这两种语言的翻译。翻译为你提供了这个：

```ruby
LOCALES = {
  en: {
    subject: "Our website is online",
    body: "Come and visit us!",
    closing: "See you soon",
    signature: "The Team"
  },
  fr: {
    subject: "Notre site est en ligne",
    body: "Venez nous rendre visite !",
    closing: "A bientot",
    signature: "L'équipe"
  },
  de: {
    subject: "Unsere Website ist jetzt online",
    body: "Komm und besuche uns!",
    closing: "Bis bald",
    signature: "Das Team"
  }
}
```

编写`compose_translated_email`方法：
- 从email中提取用户名，域名以及TLD
- 从TLD推断用户的语言
- 用相应的翻译替代文本部分
- 返回以下格式的`哈希（Hash）`

```ruby
{
  username: seb,
  domain: lewagon,
  tld: com,
  subject: "Our website is online",
  body: "Come and visit us!",
  closing: "See you soon",
  signature: "The Team"
}
```

**重构提示：**如果你的方法（method）有太多行，你可以将其分为2个方法。例如，创建一个方法专用于在本地化（LOCALES）中选择正确的翻译。然后在`compose_translated_email`中需要翻译句子的地方使用它。

```ruby
def translate(keyword, language)
  # TODO: return the translation
end

translate(:subject, :en)
# "Our website is online"

translate(:subject, :fr)
# "Notre site est en ligne"
```
