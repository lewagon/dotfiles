require_relative "agency_names"

# Type this to run this file
#   rake db:seed:vtuber_batch_2
# To run all the seeds file in the db/seeds folder, run this command
#   rake db:seed:all
[
  {
    name: "Non Anon",
    jp_name: "亜音ノン",
    description: "No description available.",
    agency: @indie,
    gender: "female",
    main_language: "English",
    yt_channel: "https://www.youtube.com/@NonAnon",
    twitch_channel: "https://twitch.tv/notnonanon"
  },
  {
    name: "Chiaki Katsumi",
    jp_name: "千秋 勝美",
    description: "Feared and revered by many, Chiaki is the leader of the renowned hacker organization, Nylena. Though she tries to live up to her imposing title, her playful nature cannot be easily contained, and her gaming spirit runs strong.",
    agency: @pixellink,
    gender: "female",
    main_language: "English",
    birthday: "2020/02/03",
    debut_date: "2023/06/16",
    yt_channel: "https://www.youtube.com/@ChiakiKatsumi",
  },
  {
    name: "Miuna Usako",
    jp_name: "みうな兎子",
    description: "A once ordinary toy bunny brought magically back to life by an unknown force. Miuna is sure to win you over with her irresistible cuteness.",
    agency: @pixellink,
    gender: "female",
    main_language: "English",
    birthday: "2020/12/07",
    debut_date: "2023/06/16",
    yt_channel: "https://www.youtube.com/@MiunaUsako",
  },
  {
    name: "Nijyuna",
    jp_name: "にじゅな",
    description: "A singing rabbit born on the moon.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    debut_date: "2023/01/07",
    yt_channel: "https://www.youtube.com/@Nijyuuu7",
    twitch_channel: "https://twitch.tv/nijyuna"
  },
  {
    name: "Vesper Noir",
    jp_name: "ノワール・ヴェスパー",
    description: "It's his childish nature that allows him to speak so freely about his dreams. He might even actually let everyone around him dream.\nAdventurer's Guild TEMPUS's academic advisor.\nHe also holds the posts of custodian and arch-scholar at the Grand Library.\nLogical and rational at all times, he doesn't lift a finger unless completely convinced by something.\nHe has an aversion to sunlight due to spending too long cooped up, absorbed in his research.\n(Source: @holostars website)",
    agency: @holostars,
    gender: "male",
    main_language: "English",
    birthday: "2020/02/13",
    debut_date: "2022/07/24",
    yt_channel: "https://www.youtube.com/@NoirVesper",
    active: false
  },
  {
    name: "Josuiji Shinri",
    jp_name: "定水寺シンリ",
    description: "A ronin who is part of Adventurer's Guild TEMPUS.\n\nHas the appearance of a wandering samurai, but was widely renowned as a master of the longbow.\n\nSo famed was his prowess, they would say he could use anything as an arrow and yet never fail to hit his mark.\n\nHe went into isolation for a while, lamenting the futility of war,\n\nbut took up his bow and arrow once again after witnessing the young men fighting a pack of Corruption Beasts.\n\n(Source: @holostars website)",
    agency: @holostars,
    gender: "male",
    main_language: "English",
    birthday: "2020/06/23",
    debut_date: "2023/01/08",
    yt_channel: "https://www.youtube.com/@JosuijiShinri"
  },
  {
    name: "Shiratama Utano",
    jp_name: "白玖ウタノ",
    description: "A virtual utaite.",
    agency: @univirtual,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/09/03",
    yt_channel: "https://www.youtube.com/@UTANOch"
  },
  {
    name: "Kanna Yanagi",
    jp_name: "かんな柳",
    description: "A duck detective, or Ducktective as some would say, Kanna runs the Yanagi Detective Agency. With the help of her trusty Kamogumis, she is sure to uncover any mystery that dares challenge her investigative wits.\n(Source: @pixellink website)",
    agency: @pixellink,
    gender: "female",
    main_language: "English",
    birthday: "2020/09/15",
    debut_date: "2024/05/25",
    yt_channel: "https://www.youtube.com/@KannaYanagi"
  },
  {
    name: "Arisu Oshiro",
    jp_name: "アリス・オシロ",
    description: "An eldritch god turned princess, Arisu rules over a failing kingdom she unwillingly inherited. She now seeks to rebuild this kingdom out of sheer spite.\n(Source: @pixellink website)",
    agency: @pixellink,
    gender: "female",
    main_language: "English",
    birthday: "2020/03/02",
    debut_date: "2024/05/25",
    yt_channel: "https://www.youtube.com/@ArisuOshiro"
  },
  {
    name: "Chio Chompi",
    jp_name: "チオ・チョンピ",
    description: "Chio is a dinosaur.\n(Source: @pixellink website)",
    agency: @pixellink,
    gender: "female",
    main_language: "English",
    birthday: "2020/06/30",
    debut_date: "2024/05/25",
    yt_channel: "https://www.youtube.com/@ChioChompi"
  },
  {
    name: "Daiya Fortuna",
    jp_name: "ダイヤ・フォルトゥナ",
    description: "Owner of the Fortuna's Favor Casino, Daiya Fortuna is an infamous card dealer. She is constantly on the hunt for her next big gamble, ready to risk it all even if the odds aren't in her favor.\n(Source: @pixellink website)",
    agency: @pixellink,
    gender: "female",
    main_language: "English",
    birthday: "2020/08/15",
    debut_date: "2024/05/25",
    yt_channel: "https://www.youtube.com/@DaiyaFortuna"
  },
  {
    name: "MunMosh",
    jp_name: "むんもっしゅ",
    description: "A cat maid who plays guitar.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/04/01",
    debut_date: "2021/06/23",
    yt_channel: "https://www.youtube.com/@DaiyaFortuna"
  },
  {
    name: "Sparkle Kirara",
    jp_name: "閃 キララ",
    description: "A goddess cyborg and member of Vebop Project's Maboroshi Tomodachi Club.",
    agency: @vebop,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/01/31",
    debut_date: "2024/08/11",
    yt_channel: "https://www.youtube.com/@kirara_brdc"
  },
  {
    name: "Sango",
    jp_name: "さんご。",
    description: "A VTuber and illustrator who drew her own VTuber model. She does drawing and karaoke streams. She is also a member of the VTuber idol group SugaRy Ribb♡n.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@35sangosan"
  },
  {
    name: "Hasuki Rui",
    jp_name: "蓮希るい",
    description: "A Siberian husky puppy.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/11/01",
    yt_channel: "https://www.youtube.com/@HasukiCh"
  },
  {
    name: "Momose Hibana",
    jp_name: "百瀬ヒバナ",
    description: "A Virtual singer who lives on the other side of the world and sings songs that breathe life into the dead (those who have fallen).\n\nEmpty existence living in the other world. She not only sings, but also participates in writing lyrics, and is working to make her songs and voice resonate.\n\nCurrently has 10 cover songs and 3 original songs. She won the Grand Prix in an audition for a song by \"Grenge\" author Kayoko Kusano. She has also been selected as a member of the \"Ruminations Singing Project\" organized by Vocaloid P Reruriri.\n(Source: YouTube page)",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@hibanamomose"
  },
  {
    name: "Serenade Oxblood",
    jp_name: "セレナーデ・オックスブラッド",
    description: "A minotaur and member of Varium's 2nd generation.",
    agency: @varium,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/11/29",
    yt_channel: "https://www.youtube.com/@SerenadeOxblood"
  },
  {
    name: "Shinotsuki Lupi",
    jp_name: "紫月るぴ",
    description: "An otaku vampire idol.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    debut_date: "2024/08/02",
    yt_channel: "https://www.youtube.com/@Shinotsuki_Lupi"
  },
  {
    name: "Mochizuki Naco",
    jp_name: "餅月なこ",
    description: "No description available.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/10/10",
    debut_date: "2022/03/13",
    yt_channel: "https://www.youtube.com/@naco_mochizuki"
  },
  {
    name: "Kou Mariya",
    description: "A vampire who accidentally overslept for a few too many thousands of years, Kou Mariya navigates an unknown colorful world full of magic and mystery every single evening. Otaku to her core, Mariya dreams of creating an idol stage of her very own, one that beckons to fans from every world and realm with her songs!\n(Source: V4Mirai website)",
    agency: @v4mirai,
    gender: "female",
    main_language: "English",
    birthday: "2020/06/09",
    yt_channel: "https://www.youtube.com/@Kou_Mariya",
    twitch_channel: "https://twitch.tv/mariya"
  },
  {
    name: "Serina Maiko",
    description: "Far from her home Kingdom \"LeProphis\", Serina Maiko comes to us as a Princess abroad. She's far more invested in pursuing her love of dance and song than carrying out her royal duties. With her fiery passion to entertain, she will convince you why she belongs on stages, not in castles!\n(Source: V4Mirai website)",
    agency: @v4mirai,
    gender: "female",
    main_language: "English",
    birthday: "2020/05/23",
    yt_channel: "https://www.youtube.com/@SerinaMaiko",
    twitch_channel: "https://twitch.tv/serinamaiko"
  },
  {
    name: "Pina Pengin",
    jp_name: "辺銀ピナ",
    description: "A harpy-penguin healer and former member of PRISM Project. After the dissolution of PRISM Project, Pina and the other members of its 3rd generation became known as Requiem. She enjoys singing and writing and mixing songs.",
    agency: @indie,
    gender: "female",
    main_language: "English",
    birthday: "2020/11/06",
    debut_date: "2021/06/27",
    yt_channel: "https://www.youtube.com/@PinaPengin"
  },
  {
    name: "Hoshimachi Suisei",
    jp_name: "星街すいせい",
    description: "A virtual idol with an exceptional love for songs and idols.\n\nShe puts endless amounts of hard work and energy into her dream of performing at the Budokan one day.\n\n(Source: Hololive website)",
    agency: @hololive,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/03/22",
    debut_date: "2018/03/22",
    yt_channel: "https://www.youtube.com/@HoshimachiSuisei"
  },
  {
    name: "Nianyan",
    jp_name: "にあにゃん",
    description: "A cat-human teahouse owner who loves tea.",
    agency: @indie,
    gender: "female",
    main_language: "English",
    birthday: "2020/12/03",
    debut_date: "2022/04/22",
    yt_channel: "https://www.youtube.com/@nianyanch"
  },
  {
    name: "Mari Yume",
    description: "Cat girl and personification of dreams. She is a VTuber model rigger and does tutorials on growing a VTuber channel. Her favorite saying is, \"Everything reminds you of something\"",
    agency: @indie,
    gender: "female",
    main_language: "English",
    yt_channel: "https://www.youtube.com/@MariYumeCh",
    twitch_channel: "https://twitch.tv/mariyume"
  },
  {
    name: "Elia Stellaria",
    description: "No description available.",
    agency: @vdere,
    gender: "female",
    main_language: "English",
    yt_channel: "https://www.youtube.com/@EliaStellaria",
    twitch_channel: "https://twitch.tv/eliastellaria"
  },
  {
    name: "Remilia Nephys",
    jp_name: "レミリア・ネフィス",
    description: "No description available.",
    agency: @phase,
    gender: "female",
    main_language: "English",
    yt_channel: "https://www.youtube.com/@RemiliaNephys",
    twitch_channel: "https://www.twitch.tv/remilianephys"
  },
  {
    name: "Amanogawa Shiina",
    jp_name: "天ノ川 しいな",
    description: "A celestial seamstress and member of Phase Connect's 2nd generation, Alias. She is famous for buying a Yu-Gi-Oh! doujinshi revolving around Obelisk the Tormentor.",
    agency: @phase,
    gender: "female",
    main_language: "English",
    yt_channel: "https://www.youtube.com/@AmanogawaShiina",
    twitch_channel: "https://twitch.tv/amanogawashiina"
  },
  {
    name: "Himemiya Rie",
    jp_name: "姫宮りえ",
    description: "The princess of the Regalia kingdom and member of Phase Connect's 2nd generation, Alias.",
    agency: @phase,
    gender: "female",
    main_language: "English",
    yt_channel: "https://www.youtube.com/@HimemiyaRie",
    twitch_channel: "https://twitch.tv/himemiyarie"
  },
  {
    name: "Komachi Panko",
    jp_name: "小町ぱんこ",
    description: "A red panda who is a member of Phase Connect's 2nd generation, Alias.",
    agency: @phase,
    gender: "female",
    main_language: "English",
    yt_channel: "https://www.youtube.com/@komachipanko",
    twitch_channel: "https://twitch.tv/komachipanko"
  },
  {
    name: "Chisaka Airi",
    jp_name: "千坂 アイリ",
    description: "A wolf and Lieutenant General of the Phase Army. She is a member of Phase Connect's 2nd generation, Alias.",
    agency: @phase,
    gender: "female",
    main_language: "English",
    yt_channel: "https://www.youtube.com/@ChisakaAiri",
    twitch_channel: "https://twitch.tv/chisakaairi"
  },
  {
    name: "Erina Makina",
    jp_name: "エリナ・マキナ",
    description: "A cyborg tiger with no memories of her past life. She is a member of Phase Connect's 2nd generation, Alias.",
    agency: @phase,
    gender: "female",
    main_language: "English",
    yt_channel: "https://www.youtube.com/@ErinaMakina",
    twitch_channel: "https://twitch.tv/erinamakina"
  },
  {
    name: "Pipkin Pippa",
    jp_name: "ピップキン・ピッパ",
    description: "The cutest rabbit in the universe - or so she would like you to thin- \"PIPIPIPI!\"\n(Source: Phase Connect website)",
    agency: @phase,
    gender: "female",
    main_language: "English",
    yt_channel: "https://www.youtube.com/@PipkinPippa",
    twitch_channel: "https://www.twitch.tv/pippa"
  },
  {
    name: "Aki Rosenthal",
    jp_name: "アキ・ローゼンタール",
    description: "A half-elf from another world, she has an insatiable curiosity and cannot resist exploring anything that piques her interest. Her trademark pigtails float due to some sort of supernatural power.\n(Source: Hololive website)",
    agency: @hololive,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/02/17",
    debut_date: "2018/06/01",
    yt_channel: "https://www.youtube.com/@AkiRosenthal"
  },
  {
    name: "Akai Haato",
    jp_name: "赤井はあと",
    description: "A sassy kouhai. She is often prickly, but she'll try to get a lot of attention from those who have made friends with her. She loves red ribbons and heart shapes, and she'll wear them often in her hair and on her clothes.\n(Source: Hololive website)",
    agency: @hololive,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/08/10",
    debut_date: "2018/06/02",
    yt_channel: "https://www.youtube.com/@AkaiHaato"
  },
  {
    name: "Hitsugi Miki",
    jp_name: "火継みき",
    description: "An anime and game enthusiast with a shy and sweet, yet naive personality. She has a chuunibyou persona where she believes she's the Spirit of Fire, although she lacks actual powers.\n(Source: Specialite website)",
    agency: @specialite,
    gender: "female",
    main_language: "English",
    birthday: "2020/10/14",
    debut_date: "2023/12/03",
    yt_channel: "https://www.youtube.com/@MikiHitsugi"
  },
  {
    name: "Akumiya Miu",
    jp_name: "あくみゃみう",
    description: "A student council president who comes off as cold and strict due to rumors about her background, but is not all true. Her secret hobby is gaming and making witty roasts with a straight face after school.\n(Source: Specialite website)",
    agency: @specialite,
    gender: "female",
    main_language: "English",
    birthday: "2020/02/22",
    debut_date: "2023/12/03",
    yt_channel: "https://www.youtube.com/@MiuAkumiya"
  },
  {
    name: "Utahime Mochizuki",
    jp_name: "望月歌姫",
    description: "The daughter of powerful mages who controlled the sun and moon, strives to become a mage capable of controlling weather with the help of her loyal chimera friend.\n(Source: Specialite website)",
    agency: @specialite,
    gender: "female",
    main_language: "English",
    birthday: "2020/08/26",
    debut_date: "2023/12/03",
    yt_channel: "https://www.youtube.com/@UtahimeMochizuki",
    twitch_channel: "https://twitch.tv/utahime_mochi"
  },
  {
    name: "Victoria Valerie",
    jp_name: "ヴィクトリア・ヴァレリー",
    description: "A government agent overseeing the supernatural and extraterrestrial. Recently promoted, she's now responsible for training new recruits.\n(Source: Specialite website)",
    agency: @specialite,
    gender: "female",
    main_language: "English",
    birthday: "2020/04/18",
    debut_date: "2023/12/03",
    yt_channel: "https://www.youtube.com/@Victoria-Valerie",
    twitch_channel: "https://twitch.tv/victoria_valerie"
  },
  {
    name: "Lucien Lunaris",
    jp_name: "ルシエン・ルナリス",
    description: "A vampire who has lived for hundreds of years, he has somehow lost his memories and can only vaguely remember his past. He wanders the world searching for peace and a place to call home.\n\n(Source: FSP EN website)",
    agency: @fspen,
    gender: "male",
    main_language: "English",
    birthday: "2020/10/19",
    debut_date: "2024/01/28",
    yt_channel: "https://www.youtube.com/@LucienLunaris"
  },
  {
    name: "Rosco Graves",
    jp_name: "ロスコ・グレイヴス",
    description: "A zombie boy who was thrust into a new world near the start of his undeath. Even though he’s a corpse, his rowdiness and quick-wit would convince you otherwise.\n\n(Source: FSP EN website)",
    agency: @fspen,
    gender: "male",
    main_language: "English",
    birthday: "2020/07/08",
    debut_date: "2024/01/28",
    yt_channel: "https://www.youtube.com/@roscograves"
  },
  {
    name: "Zander Netherbrand",
    jp_name: "ザンダー・ネザーブランド",
    description: "An alluring incubus who seeks freedom, power, and to live as he desires. No matter the consequences.\n\n(Source: FSP EN website)",
    agency: @fspen,
    gender: "male",
    main_language: "English",
    birthday: "2020/04/07",
    debut_date: "2024/01/28",
    yt_channel: "https://www.youtube.com/@ZanderNetherbrand"
  },
  {
    name: "Gale Galleon",
    jp_name: "ゲイル・ガレオン",
    description: "A charismatic captain and leader of the most feared pirate crew of his time. During the Age of Discovery, he was a wanted man who crossed swords with many dangerous pirates and amassed bountiful treasures.\n\n(Source: FSP EN website)",
    agency: @fspen,
    gender: "male",
    main_language: "English",
    birthday: "2020/12/09",
    debut_date: "2024/01/28",
    yt_channel: "https://www.youtube.com/@galegalleon"
  },
  {
    name: "Cassian Floros",
    jp_name: "ゲイル・ガレオン",
    description: "A narcissistic elf whose strength lies in combat and magic. He seeks for a greater destiny in life and is willing to associate himself with lower beings to pursue such a purpose.\n\n(Source: FSP EN website)",
    agency: @fspen,
    gender: "male",
    main_language: "English",
    birthday: "2020/11/19",
    debut_date: "2024/01/28",
    yt_channel: "https://www.youtube.com/@CassianFloros"
  },
  {
    name: "Shirakawa Shirase",
    jp_name: "白河しらせ",
    description: "A VTuber part of the group Blitz Wing from Riot Music.",
    agency: @riot,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/11/28",
    debut_date: "2023/06/24",
    yt_channel: "https://www.youtube.com/@SHIRASESHIRAKAWA"
  },
  {
    name: "Matsunaga Iori",
    jp_name: "松永依織",
    description: "A VTuber part of the group Blitz Wing from Riot Music. She joined Riot Music in November 2020 after passing the Riot Music Artist Audition Vol. 1.",
    agency: @riot,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/02/02",
    yt_channel: "https://www.youtube.com/@IORIMATSUNAGA"
  },
  {
    name: "Raifa",
    jp_name: "ライファ",
    description: "A shy cat with a fish plushie named Zane-kun. Loves noodles.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/12/07",
    yt_channel: "https://www.youtube.com/@Raifa_ch"
  },
  {
    name: "Kotoha",
    jp_name: "ライファ",
    description: "A supporting member of the Vocaloid group HoneyWorks and part of the vocal unit Hakoniwa Lily.",
    agency: @aice,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/06/10",
    yt_channel: "https://www.youtube.com/@Kotoha_ktnh",
    twitch_channel: "https://twitch.tv/kotoha_hkll"
  },
  {
    name: "Ibara Muan",
    jp_name: "茨むあん",
    description: "No description available.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    debut_date: "2021/05/02",
    yt_channel: "https://www.youtube.com/@ibaramuan"
  },
  {
    name: "Tomori Manaka",
    jp_name: "灯里愛夏",
    description: "No description available.",
    agency: @valiv,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/07/01",
    yt_channel: "https://www.youtube.com/@TomoriManaka"
  },
  {
    name: "mei",
    jp_name: "芽唯",
    description: "The princess of the chickens. Likes fried chicken.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/07/27",
    debut_date: "2021/05/02",
    yt_channel: "https://www.youtube.com/@-mei-9020"
  },
  {
    name: "Aimee",
    description: "A plague doctor.",
    agency: @indie,
    gender: "female",
    main_language: "English",
    yt_channel: "https://www.youtube.com/@Aimee_exe"
  },
  {
    name: "Kai Saikota",
    description: "A dragon god.",
    agency: @idolen,
    gender: "female",
    main_language: "English",
    birthday: "2020/07/27",
    debut_date: "2021/05/02",
    yt_channel: "https://www.youtube.com/@KaiSaikota",
    twitch_channel: "https://twitch.tv/kaisaikota"
  },
  {
    name: "Amiya Aranha",
    description: "A spider VTuber and former member of Tsunderia.",
    agency: @indie,
    gender: "female",
    main_language: "English",
    yt_channel: "https://www.youtube.com/@AmiyaAranha",
    twitch_channel: "https://twitch.tv/amiyaaranha"
  },
  {
    name: "Sukitou Luccica",
    jp_name: "透々ルチカ",
    description: "No description available.",
    agency: @noripro,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@SukitouLuccica",
  },
  {
    name: "Nova Aokami",
    description: "A frost dragon who does a lot of Yu-Gi-Oh! TCG streams, including many collabs with other VTubers.",
    agency: @vreverie,
    gender: "female",
    main_language: "English",
    yt_channel: "https://www.youtube.com/@NovaAokami",
    twitch_channel: "https://twitch.tv/novaaokami"
  },
  {
    name: "Taiga Toragami",
    description: "A white tiger.",
    agency: @idoles,
    gender: "female",
    main_language: "Spanish",
    yt_channel: "https://www.youtube.com/@TaigaToragami",
    twitch_channel: "https://twitch.tv/TaigaToragami"
  },
  {
    name: "FalseEyeD",
    description: "The host of Things VTubers Say, a channel that covers VTubers news and drama.",
    agency: @indie,
    gender: "male",
    main_language: "English",
    yt_channel: "https://www.youtube.com/@FalseEyeD",
    twitch_channel: "https://twitch.tv/falseeyed"
  },
  {
    name: "Maisaki Berry",
    jp_name: "苺咲べりぃ",
    description: "An idol VTuber from Strawberry Land.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/08/15",
    debut_date: "2020/09/05",
    yt_channel: "https://www.youtube.com/@MaisakiBerry"
  },
  {
    name: "Sakusu Mayo",
    jp_name: "朔栖まよ",
    description: "A VTuber who plays the saxophone on livestreams. She plays songs of various genres, including jazz and vocaloid songs.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@asaxmayo"
  },
  {
    name: "Washu Asuka",
    jp_name: "鷲羽アスカ",
    description: "No description available.",
    agency: @noripro,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/08/11",
    debut_date: "2024/03/07",
    yt_channel: "https://www.youtube.com/@WashuAsuka"
  },
  {
    name: "Huejima Kotori",
    jp_name: "笙嶋ことり",
    description: "No description available.",
    agency: @noripro,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/08/13",
    debut_date: "2024/04/23",
    yt_channel: "https://www.youtube.com/@huejimakotori"
  },
  {
    name: "Inuyama Tamaki",
    jp_name: "犬山たまき",
    description: "An otoko no ko (crossdressing boy) VTuber.",
    agency: @noripro,
    gender: "male",
    main_language: "Japanese",
    birthday: "2020/06/01",
    debut_date: "2018/09/22",
    yt_channel: "https://www.youtube.com/@noripro",
    twitch_channel: "https://www.twitch.tv/noripro_"
  },
  {
    name: "Tsukudani Norio",
    jp_name: "佃煮のりお",
    description: "A manga artist and the president of NoriPro.",
    agency: @noripro,
    gender: "male",
    main_language: "Japanese",
    birthday: "2020/04/16",
    debut_date: "2011/11/25",
    yt_channel: "https://www.youtube.com/@noripro",
  },
  {
    name: "Aoi Sui",
    jp_name: "蒼星すい",
    description: "No description available.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/11/03",
    debut_date: "2023/02/25",
    yt_channel: "https://www.youtube.com/@aoisui_",
  },
  {
    name: "MiCosmiC baby",
    jp_name: "ミコズミック ベイビー",
    description: "The princess of the Panipani Kingdom.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@micosmicbaby3173"
  },
  {
    name: "Nyamakumo Fuwari",
    jp_name: "若魔雲ふわり",
    description: "A Norwegian cat.",
    agency: @nyantasia,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/01/23",
    debut_date: "2023/12/01",
    yt_channel: "https://www.youtube.com/@nyamakumofuwari",
  },
  {
    name: "Nyamafuji Anzu",
    jp_name: "若魔藤あんず",
    description: "A calico cat.",
    agency: @nyantasia,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/04/19",
    debut_date: "2024/05/24",
    yt_channel: "https://www.youtube.com/@nyamafujianzu",
  },
  {
    name: "dtto.",
    description: "A Thai VTuber part of the esports organization REJECT.",
    agency: @reject,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/08/19",
    debut_date: "2022/07/03",
    yt_channel: "https://www.youtube.com/@dttodot",
    twitch_channel: "https://twitch.tv/dttodot"
  },
  {
    name: "Amami Kurine",
    jp_name: "天海くりね",
    description: "The weakest angel VTuber. She can control cleones.",
    agency: @haconect,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/08/27",
    yt_channel: "https://www.youtube.com/@kurine"
  },
  {
    name: "Tachibana Shiena",
    jp_name: "橘シエナ",
    description: "An idol in training.",
    agency: @haconect,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/11/03",
    yt_channel: "https://www.youtube.com/@shienaJP"
  },
  {
    name: "Urameshi Conta",
    jp_name: "うら飯紺汰",
    description: "A 170-year-old half-Jiangshi, half-fox VTuber straddling the border of this world and the next.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/10/30",
    debut_date: "2023/06/24",
    yt_channel: "https://www.youtube.com/@urameshi_conta"
  },
  {
    name: "Mochi Hiyoko",
    jp_name: "もちひよこ",
    description: "No description available.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    debut_date: "2018/01/05",
    yt_channel: "https://www.youtube.com/@mochi8hiyoko"
  },
  {
    name: "Rokuri Shao",
    jp_name: "緑李しゃお",
    description: "A dragon whose dream is to be the No. 1 in the dragon world.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    debut_date: "2022/11/20",
    yt_channel: "https://www.youtube.com/@syaorkr"
  },
  {
    name: "Kouzuki Miya",
    jp_name: "神月都",
    description: "A Kaguyahime who descended from the moon.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    debut_date: "2022/11/25",
    yt_channel: "https://www.youtube.com/@miya_czk"
  },
  {
    name: "Ci-chan",
    jp_name: "Ciちゃん",
    description: "The former vocalist of the music duo BOOGEY VOXX.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/11/13",
    yt_channel: "https://www.youtube.com/@cichanofficial"
  },
  {
    name: "Kumanui Miel",
    jp_name: "熊縫ミエル",
    description: "A French otaku bear who can speak French, English, Japanese, Southern Vietnamese, Mandarin Chinese, and Latin American Spanish.",
    agency: @globie,
    gender: "female",
    main_language: "English",
    debut_date: "2023/11/01",
    yt_channel: "https://www.youtube.com/@KumanuiMiel"
  },
  {
    name: "Pippa Pebblesworth",
    jp_name: "ピッパ　ペブルスワース",
    description: "A hungry penguin.",
    agency: @globie,
    gender: "female",
    main_language: "English",
    debut_date: "2023/11/17",
    yt_channel: "https://www.youtube.com/@PippaPebblesworth"
  },
  {
    name: "Gaochan",
    jp_name: "ガオちゃん",
    description: "A 5-year-old monster child from Tokyo.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/02/09",
    debut_date: "2024/08/11",
    yt_channel: "https://www.youtube.com/@gaochan-vtuber"
  },
  {
    name: "Inuzuki Ren",
    jp_name: "戌月れん",
    description: "A dog idol VTuber.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/09/23",
    debut_date: "2024/03/03",
    yt_channel: "https://www.youtube.com/@inuzuki_vt"
  },
  {
    name: "Nagino Mashiro",
    jp_name: "凪乃ましろ",
    description: "No description available.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/04/06",
    debut_date: "2022/09/10",
    yt_channel: "https://www.youtube.com/@naginomashiro",
    twitch_channel: "https://twitch.tv/nagino_mashiro"
  },
  {
    name: "Nanami Urara",
    jp_name: "七海うらら",
    description: "A parallel singer who travels between the real and virtual worlds.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@773urara"
  },
  {
    name: "Mashiro Meronya",
    jp_name: "愛白めろにゃ",
    description: "No description available.",
    agency: @lapis,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/06/25",
    yt_channel: "https://www.youtube.com/@mashiro_meronya"
  },
  {
    name: "Aoi",
    jp_name: "蒼",
    description: "A rabbit that likes drawing and playing piano and guitar. She does acoustic singing streams.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@nemgorochan"
  },
  {
    name: "Mirea Sheltzs",
    jp_name: "ミレア・シェルツ",
    description: "A snow fairy/long-tailed tit VTuber.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@MireaSheltzs"
  },
  {
    name: "Uchi Fifi",
    jp_name: "羽芝扉扉",
    description: "A wifi fairy and member of Nekumo Project, now a part of EnVision. She does singing and ASMR streams.",
    agency: @envision,
    gender: "female",
    main_language: "Chinese",
    yt_channel: "https://www.youtube.com/@uchififi",
    twitch_channel: "https://www.twitch.tv/uchififi"
  },
  {
    name: "YOSHIKA",
    description: "A VTuber-in-training aiming to be a singing sweet potato idol.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    debut_date: "2021/03/14",
    yt_channel: "https://www.youtube.com/@YOSHIKA-Ch"
  },
  {
    name: "Samui",
    jp_name: "冬雲凜",
    description: "No description available.",
    agency: Agency.find_by_name("CY Future"),
    gender: "female",
    main_language: "Chinese",
    yt_channel: "https://www.youtube.com/@Samui_vtuberTW",
    twitch_channel: "https://www.twitch.tv/samui_cyfuture"
  },
  {
    name: "Echigoya Tokina",
    jp_name: "越後屋ときな",
    description: "A crested ibis VTuber born and raised in Niigata.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@tokinachannel5478"
  },
  {
    name: "Amahane Miran",
    jp_name: "天羽音みらん",
    description: "A unicorn utahime from the astral world.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    debut_date: "2022/12/09",
    yt_channel: "https://www.youtube.com/@AmahaneMiran"
  },
  {
    name: "Mizuki",
    jp_name: "浠",
    description: "No description available.",
    agency: @meridian,
    gender: "female",
    main_language: "Chinese",
    yt_channel: "https://www.youtube.com/@%E6%B5%A0Mizuki"
  },
  {
    name: "Rima Evenstar",
    description: "A VTuber who does deep dives on VTubers and VTuber drama.",
    agency: @indie,
    gender: "female",
    main_language: "English",
    yt_channel: "https://www.youtube.com/@rimaevenstar",
    twitch_channel: "https://twitch.tv/rima_evenstar"
  },
  {
    name: "Shairu",
    jp_name: "しゃいる",
    description: "No description available.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@Shairu.ch_0801"
  },
  {
    name: "Miyamori Yuri",
    jp_name: "宮守ゆり",
    description: "No description available.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    debut_date: "2023/07/07",
    yt_channel: "https://www.youtube.com/@Miyavi_udon",
    twitch_channel: "https://twitch.tv/miyamori_yuri/about"
  },
  {
    name: "Berry-chan",
    jp_name: "ベリーちゃん",
    agency: @indie,
    description: "A 5-year-old penguin who came to Japan from the Penguin World. She lives in an aquarium in Ikebukuro.",
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@Berrych0623"
  },
  {
    name: "nyaruchuuu",
    agency: @indie,
    description: "No description available.",
    gender: "female",
    main_language: "English",
    yt_channel: "https://www.youtube.com/@nyaruchuuu",
    twitch_channel: "https://https://twitch.tv/nyaruchuuu"
  },
  {
    name: "Anya Kumori",
    jp_name: "杏夜くもり",
    agency: @indie,
    description: "No description available.",
    gender: "female",
    main_language: "Japanese",
    debut_date: "2022/08/13",
    yt_channel: "https://www.youtube.com/@anyakumori"
  },
  {
    name: "Akama Azato",
    jp_name: "赤魔アザト",
    agency: @airy,
    description: "No description available.",
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@AzatoAkama"
  },
  {
    name: "Nekome Milk",
    jp_name: "猫目ミルク",
    agency: @indie,
    description: "A cat idol from Virtual Cat Island.",
    gender: "female",
    birthday: "2020/09/03",
    debut_date: "2022/11/22",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@nekomemilk"
  },
  {
    name: "Mao Ura",
    jp_name: "舞弦ウラ",
    agency: @indie,
    description: "A member of the musician team Riot Blue.",
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@maoura_RB",
    twitch_channel: "https://twitch.tv/maoura_rb"
  },
  {
    name: "Usahane Mia",
    jp_name: "うさ羽みあ",
    agency: @indie,
    description: "A gaming angel VTuber.",
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@usahane_mia430",
    twitch_channel: "https://twitch.tv/miia_angel_"
  },
  {
    name: "Sakura Rina",
    jp_name: "サクラリナ",
    agency: @indie,
    description: "An anthropomorphic meat VTuber. Loves singing and eating.",
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/02/09",
    debut_date: "2023/07/14",
    yt_channel: "https://www.youtube.com/@v_sakurarina",
    twitch_channel: "https://twitch.tv/sakurarina_v"
  },
  {
    name: "Island Fox",
    jp_name: "シマハイイロギツネ",
    agency: @kemov,
    description: "Island Fox from Japari Park.",
    gender: "female",
    main_language: "Japanese",
    debut_date: "2021/12/05",
    yt_channel: "https://www.youtube.com/@islandfox6864"
  },
  {
    name: "Abyss Song Syndrome",
    jp_name: "アビス ソング シンドローム",
    agency: @trillion,
    description: "A kraken whose goal is to captivate all of humanity with her singing and turn them into her underlings.",
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@A_S_Syndrome"
  },
  {
    name: "Sakune Shion",
    jp_name: "咲音しおん",
    agency: @indie,
    description: "A singing bunny-eared VTuber",
    gender: "female",
    main_language: "Japanese",
    debut_date: "2023/06/29",
    yt_channel: "https://www.youtube.com/@sakune_shion"
  },
  {
    name: "Yuzuki Risa",
    description: "A singer and voice actress who has released albums and recorded songs for several rhythm games.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/02/16",
    yt_channel: "https://www.youtube.com/@Yuzurisa"
  },
  {
    name: "Nemupipi",
    jp_name: "ねむぴぴ",
    description: "A fluffy VTuber who plays piano and games.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    debut_date: "2022/05/15",
    birthday: "2020/07/31",
    yt_channel: "https://www.youtube.com/@nemupipi"
  },
  {
    name: "Morino Merun",
    jp_name: "森野めるん",
    description: "A little red riding hood. She is studying Spanish and has many Spanish-speaking fans.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    debut_date: "2022/07/23",
    yt_channel: "https://www.youtube.com/@MerunCh",
    twitch_channel: "https://twitch.tv/merunmorino"
  },
  {
    name: "Tokiwa Aino",
    jp_name: "時羽あいの",
    description: "An observer of time from the future and a spy from a secret society.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    debut_date: "2022/06/07",
    yt_channel: "https://www.youtube.com/@tokiwaaino"
  },
  {
    name: "Azumalim",
    jp_name: "アズマリム",
    description: "A motorcycler and motoblogger VTuber.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@Azumalim"
  },
  {
    name: "Usatama Amyu",
    jp_name: "兎彷魂あみゅ",
    description: "An Angora rabbit and shinigami idol VTuber.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    debut_date: "2023/06/02",
    yt_channel: "https://www.youtube.com/@UsatamaAmyu"
  },
  {
    name: "Mizushiro Akua",
    jp_name: "水城あくあ",
    description: "No description available.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    debut_date: "2020/06/06",
    yt_channel: "https://www.youtube.com/@ch.9857"
  },
  {
    name: "Rina Asteria",
    description: "The Royal of Rebellion Raised by the chains of nobility and a thirst for freedom, Rina became The Royal of Rebellion.\n\n(Source: OshiLink website)",
    agency: @oshilink,
    gender: "female",
    main_language: "English",
    debut_date: "2024/05/10",
    yt_channel: "https://www.youtube.com/@RinaAstera",
    twitch_channel: "https://twitch.tv/rinaastera"
  },
  {
    name: "Takanashi Kobato",
    jp_name: "小鳥遊こばと",
    description: "A maid idol.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    debut_date: "2022/04/30",
    yt_channel: "https://www.youtube.com/@TakanashiKobato"
  },
  {
    name: "Eva Ananova",
    description: "A computer virus digital oni VTuber.",
    agency: @vyvid,
    gender: "female",
    main_language: "English",
    birthday: "2020/12/12",
    debut_date: "2024/05/11",
    yt_channel: "https://www.youtube.com/@EvaAnanova",
    twitch_channel: "https://www.twitch.tv/evaananova"
  },
  {
    name: "Noa Polaris",
    jp_name: "ノア・ポラリス",
    description: "An angel that controls the north star and guides wandering travelers.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    debut_date: "2022/04/30",
    yt_channel: "https://www.youtube.com/@noa_polaris",
    twitch_channel: "https://www.twitch.tv/noa_polaris"
  },
  {
    name: "Takanashi Rara",
    jp_name: "小鳥遊らら",
    description: "No description available.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@RaraTakanashi"
  },
  {
    name: "Fairy Rilm",
    jp_name: "春風りるむ",
    description: "A fairy VTuber.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@rilmu"
  },
  {
    name: "Kakushaku Rin",
    jp_name: "赫灼燐",
    description: "No description available.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/01/22",
    debut_date: "2021/06/21",
    yt_channel: "https://www.youtube.com/@KakushakuRin"
  },
  {
    name: "Rin Penrose",
    description: "A prince who loves sharks.",
    agency: @idolen,
    gender: "female",
    main_language: "English",
    birthday: "2020/02/04",
    debut_date: "2022/11/20",
    yt_channel: "https://www.youtube.com/@rinpenrose",
    twitch_channel: "https://twitch.tv/rinpenrose"
  },
  {
    name: "Ayunda Risu",
    jp_name: "アユンダ・リス",
    description: "A squirrel girl from a magical forest.\nShe was lost in the human world, but due to certain circumstances, she ends up living in the home of a kind older sister.\nTo return the favor, she decides to become a VTuber.\nRisu act, most of the time, just like a squirrel she is. She loves to do subtle pranks on people, shy with new people, and love to tease her viewer. Her laugh is also one of her unique characterictic.\n\n(Source: Hololive website)",
    agency: @holoid,
    gender: "female",
    main_language: "Indonesian",
    birthday: "2020/01/15",
    debut_date: "2020/04/10",
    yt_channel: "https://www.youtube.com/@AyundaRisu"
  },
  {
    name: "Airani Iofifteen",
    jp_name: "アイラニ・イオフィフティーン",
    description: "An alien princess who ran away from home and come to the earth and fell in love with earth’s culture, sometimes like to tease the viewers and being a nice iomama if her fans needs it. Sometimes got crazy over gacha game.\n\n(Source: Hololive website)",
    agency: @holoid,
    gender: "female",
    main_language: "Indonesian",
    birthday: "2020/07/15",
    debut_date: "2020/04/12",
    yt_channel: "https://www.youtube.com/@AiraniIofifteen"
  },
  {
    name: "Moona Hoshinova",
    jp_name: "ムーナ・ホシノヴァ",
    description: "A college girl who works as a model and idol, but later got interested to become a VTuber too.\nOn some rare occasion, Moona’s stream might be visited by Moona’s “another personality,”Hoshinova. That has deeper big sister-like voices and sadistic tendesion. Pay attention to her streams to meet Hoshinova!\n\n(Source: Hololive website)",
    agency: @holoid,
    gender: "female",
    main_language: "Indonesian",
    birthday: "2020/02/15",
    debut_date: "2020/04/11",
    yt_channel: "https://www.youtube.com/@MoonaHoshinova"
  },
  {
    name: "Metorial",
    description: "A siren reborn as a lotus goddess.",
    agency: @indie,
    gender: "female",
    main_language: "English",
    debut_date: "2024/05/26",
    yt_channel: "https://www.youtube.com/@Metorial",
    twitch_channel: "https://twitch.tv/metorial"
  },
  {
    name: "Hinoshita Kaho",
    jp_name: "日野下花帆",
    description: "A member of the Hasunosora Girls' High School Idol Club. Like the other members of Hasunosora, she does livestreams via the Link! Like! Love Live! mobile app.",
    agency: @hasunosora,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/05/22",
    yt_channel: "https://www.youtube.com/@lovelive_hasu"
  },
  {
    name: "Miyanaga Nonoka",
    jp_name: "宮永ののか",
    description: "Plays guitar in Mugendai Mewtype.",
    agency: @mugendai,
    gender: "female",
    main_language: "Japanese",
    debut_date: "2023/11/19",
    birthday: "2020/04/17",
    yt_channel: "https://www.youtube.com/@nonoka_yumemita"
  },
  {
    name: "Tousui Yayu",
    jp_name: "透睡やゆ",
    description: "A jiraikei joshi VTuber.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@Tousui_Yayu"
  },
  {
    name: "Goho Batsuko Chan",
    jp_name: "合法‼バツ子ﾁｬﾝ",
    description: "A legal drug VTuber ingested by seeing and hearing.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@Batsuko825"
  },
  {
    name: "rurudoLION",
    jp_name: "るるどらいおん",
    description: "A mysterious lion that appears when you can't get motivated.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@rurudo_LION"
  },
  {
    name: "Tokusari Kukuri",
    jp_name: "戸鎖くくり",
    description: "No description available.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@tokusari_kukuri"
  },
  {
    name: "Nebasei Cocoro",
    jp_name: "根羽清ココロ",
    description: "The official VTuber of Rohto Pharmaceutical.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@cocoroch0610"
  },
  {
    name: "Kugumi Rui",
    jp_name: "久々湊るい",
    description: "No description available.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@kugumirui/streams"
  },
  {
    name: "shin",
    description: "No description available.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@shingames7857",
    twitch_channel: "https://twitch.tv/shin1616"
  },
  {
    name: "Gomapurin",
    jp_name: "ごまぷりん",
    description: "A clown doll and circus ringleader who came to the human world from Toyland.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@GOMAPURIN_CIRCUS_SHOW"
  },
  {
    name: "Amatsuna Sasaha",
    jp_name: "天絆ささは",
    description: "A clumsy maid VTuber.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/10/27",
    debut_date: "2023/05/27",
    yt_channel: "https://www.youtube.com/@AmatsunaSasaha"
  },
  {
    name: "Somaru",
    jp_name: "水縹そまる",
    description: "A hikikomori princess.",
    agency: @indie,
    gender: "female",
    main_language: "Chinese",
    yt_channel: "https://www.youtube.com/channel/UC3rmrlimhWzTsJ1BxY6-p1w",
    twitch_channel: "https://twitch.tv/somaruriro"
  },
  {
    name: "Omakirara",
    jp_name: "逢魔きらら",
    description: "A baby devil VTuber",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel:"https://www.youtube.com/channel/@omakirara"
  },
  {
    name: "Sakurane Kotori",
    jp_name: "桜音ことり",
    description: "No description available.",
    agency: @parareal,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@KotoriSakurane"
  },
  {
    name: "Lumin Tsukiboshi",
    description: "A supernova-prone celestial VTuber.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@LuminTsukiboshi"
  },
  {
    name: "Tanaka Hime",
    jp_name: "田中ヒメ",
    description: "A member of the duo HIMEHINA.",
    agency: @himehina,
    gender: "female",
    main_language: "Japanese",
    debut_date: "2018/03/18",
    yt_channel: "https://www.youtube.com/@HimeHina/"
  },
  {
    name: "Suzuki Hina",
    jp_name: "鈴木ヒナ",
    description: "A member of the duo HIMEHINA.",
    agency: @himehina,
    gender: "female",
    main_language: "Japanese",
    debut_date: "2018/05/26",
    yt_channel: "https://www.youtube.com/@HimeHina/"
  },
  {
    name: "Quon Tama",
    jp_name: "久遠たま",
    description: "No description available.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    debut_date: "2020/08/22",
    yt_channel: "https://www.youtube.com/@QuonTama"
  },
  {
    name: "Shushu Hikari",
    jp_name: "朱々ヒカリ",
    description: "The official VTuber of esports Challenger's Park.",
    gender: "female",
    agency: @indie,
    main_language: "Japanese",
    debut_date: "2023/07/29",
    yt_channel: "https://www.youtube.com/@ShushuHikari",
    twitch_channel: "https://twitch.tv/shushu_hikari"
  },
  {
    name: "Yuuki Sakuna",
    jp_name: "結城さくな",
    description: "A cat maid. Formerly Minato Aqua of Hololive.",
    gender: "female",
    agency: @indie,
    main_language: "Japanese",
    birthday: "2020/12/02",
    debut_date: "2024/10/27",
    yt_channel: "https://www.youtube.com/@結城さくな"
  },
  {
    name: "Aohi Kawara",
    jp_name: "碧琲かわら",
    description: "A fox who works at a cafe.",
    gender: "female",
    agency: @indie,
    main_language: "Japanese",
    debut_date: "2023/04/01",
    yt_channel: "https://www.youtube.com/@kawara_Vtuber"
  },
  {
    name: "Suimya",
    jp_name: "すいみゃ",
    description: "A VTuber and illustrator who likes drawing girls with twintails.",
    gender: "female",
    agency: @indie,
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@suimya"
  },
  {
    name: "Miyuri Mei",
    description: "An axolotl exorcist.",
    agency: @indie,
    gender: "female",
    main_language: "English",
    yt_channel: "https://www.youtube.com/@yurimouto"
  },
  {
    name: "Noshime Mena",
    jp_name: "熨斗目メナ",
    description: "An ice witch VTuber.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@noshime_mena",
    twitch_channel: "https://twitch.tv/noshime_mena"
  },
  {
    name: "Hanamiya Rica",
    jp_name: "花宮利香",
    description: "A vampire VTuber. Formerly Yozora Mel from Hololive.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/07/28",
    yt_channel: "https://www.youtube.com/@ricaaach.",
  },
  {
    name: "Nekome Milk",
    jp_name:"猫目ミルク",
    description: "A cat idol VTuber from the Virtual Cat Island.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/09/03",
    debut_date: "2022/11/22",
    yt_channel: "https://www.youtube.com/@nekomemilk"
  },
  {
    name: "Otoha Chihane",
    jp_name: "乙葉ちはね",
    description: "A serval cat.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@OtohaChihane"
  },
  {
    name: "Habatake Pipi",
    jp_name: "羽ばたけぴぴ",
    description: "No description available.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@hbtkpipi",
    twitch_channel: "twitch.tv/hbtk_pipi"
  },
  {
    name: "Yumekayo Guu",
    jp_name: "夢通ぐう",
    description: "No description available.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@ymky_zzz"
  },
  {
    name: "Tsukishiro Cecil",
    jp_name: "月城セシル",
    description: "No description available.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@CecilCh"
  },
  {
    name: "Sasaki Saku",
    jp_name: "笹木咲",
    description: "An 11th grade high schooler who loves video games and aquariums.",
    agency: @niji,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/11/11",
    debut_date: "2018/07/07",
    yt_channel: "https://www.youtube.com/@SasakiSaku"
  },
  {
    name: "Shiina Yuika",
    jp_name: "椎名唯華",
    description: "A 10th grade high schooler with a Kansai dialect who loves video games and is secretly a supernaturalist.",
    agency: @niji,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/04/17",
    debut_date: "2018/08/01",
    yt_channel: "https://www.youtube.com/channel/UC_4tXjqecqox5Uc05ncxpxg"
  },
  {
    name: "Koaku Mayo",
    jp_name: "恋惡まよ",
    description: "A little devil who was banished from the netherworld because her powers were too weak.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@koakumayo"
  },
  {
    name: "Chudoku Hera",
    jp_name: "中毒へら",
    description: "A menhera VTuber who sometimes does webcam streams.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@ChudokuHera"
  },
  {
    name: "Uichi Maho",
    jp_name: "羽壱まほ",
    description: "No description available.",
    agency: @vjidai,
    gender: "female",
    main_language: "Japanese",
    birthday: "2020/06/28",
    yt_channel: "https://www.youtube.com/@uichimaho"
  },
  {
    name: "Kousaka Mayu",
    jp_name: "香坂まゆ",
    description: "The student council president of Sakura Gakuen.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@mayu_02_25"
  },
  {
    name: "apriella",
    description: "A VTuber and singer who also does IRL content.",
    agency: @indie,
    gender: "female",
    main_language: "English",
    yt_channel: "https://www.youtube.com/@apriella_",
    twitch_channel: "twitch.tv/apriella"
  },
  {
    name: "Konkon Tamashii",
    jp_name: "魂〃たましぃ",
    description: "No description available.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@__3soul"
  },
  {
    name: "Asakura Anko",
    jp_name: "朝倉杏子",
    description: "A 17-year-old member of Blitz Wing, a sublabel of RIOT MUSIC.",
    agency: @riot,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/channel/UCbbiAbKAOszYbezcIYD4R3Q"
  },
  {
    name: "Tabino Sora",
    jp_name: "旅野そら",
    description: "A cooking hunter aiming to be the number 1 super idol cooking hunter.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@tabino_sora_"
  },
  {
    name: "Sakurami Mao",
    jp_name: "桜巳マオ",
    description: "A half-human, half-snake god VTuber.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@sakuramimao/streams"
  },
  {
    name: "Mikagura Suzume",
    jp_name: "御神楽すずめ",
    description: "No description available.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@suzume_mikagura",
    twitch_channel: "https://twitch.tv/suzume_mikagura"
  },
  {
    name: "Takanashi Hotori",
    jp_name: "小鳥遊ほとり",
    description: "An antlered VTuber, illustrator, and fujoshi.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@takanashi_hotori"
  },
  {
    name: "Inaba Haneru",
    jp_name: "因幡はねる",
    description: "No description available.",
    agency: @nanashi,
    gender: "female",
    main_language: "Japanese",
    debut_date: "2018/06/09",
    yt_channel: "https://www.youtube.com/@Inaba_Haneru"
  },
  {
    name: "Suzumi Nemo",
    jp_name: "涼海ネモ",
    description: "No description available.",
    agency: @nanashi,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@Nemo_Suzumi"
  },
  {
    name: "Musubime Yui",
    jp_name: "結目ユイ",
    description: "No description available.",
    agency: @indie,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@musubimeyui"
  },
  {
    name: "Manase Yua",
    jp_name: "真名瀬ゆあ",
    description: "No description available.",
    agency: @problu,
    gender: "female",
    main_language: "Japanese",
    yt_channel: "https://www.youtube.com/@yua_manase"
  },
  {
    name: "Hinamori Rabi",
    jp_name: "雛森菈比",
    description: "No description available.",
    agency: @silva,
    gender: "female",
    main_language: "Chinese",
    yt_channel: "https://www.youtube.com/@HinamoriRABI",
    twitch_channel: "https://twitch.tv/hinamorirabi/about"
  },
  {
    name: "Asumi Inori",
    jp_name: "明澄祈",
    description: "No description available.",
    agency: @indie,
    gender: "neutral",
    main_language: "Japanese",
    birthday: "2020/12/07",
    yt_channel: "https://www.youtube.com/@Inori_Asumi"
  }
].each do |vtuber|
  if !Vtuber.find_by_name(vtuber[:name])
    puts "#{vtuber[:name]} created" if Vtuber.create!(vtuber)
  end
end
