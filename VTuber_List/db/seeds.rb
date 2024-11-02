# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Vtuber.destroy_all
Agency.destroy_all
List.destroy_all
User.destroy_all
Tag.destroy_all
# VtuberMarker.destroy_all

tags = ["singer", "rap", "guitar", "Minecraft", "FPS", "League of Legends", "big chest", "deep singing voice",
        "baby girl failure", "baby", "violin", "flute", "small chest", "heavy metal", "thighs", "piano", "cooking",
        "French", "British", "Spanish", "Chinese", "Korean", "Italian", "Brazilian", "Indonesian", "German", "Australian",
        "Filipino", "Malaysian", "hag", "kusogaki", "fluffy", "animal ears", "mom", "comedian", "fortune telling",
        "ASMR", "art", "VTuber rigger", "VTuber artist", "voice actor", "cosplayer", "tutorials", "not anime", "scream",
        "furry", "adult content", "short", "tall", "drama", "alcohol", "Japanese and English", "menhera", "pon", "Thai"]

tags.each do |tag|
  Tag.create!(
    name: tag
  )
end

puts "Tags created"


indie = Agency.create!(
  name: "Indie"
)

hololive = Agency.create!(
  name: "Hololive",
  location: "Japan"
)

holoen = Agency.create!(
  name: "Hololive EN",
  location: "Japan"
)

holoid = Agency.create!(
  name: "Hololive Indonesia",
  location: "Japan"
)

holostars = Agency.create!(
  name: "Holostars",
  location: "Japan"
)

holostarsen = Agency.create!(
  name: "Holostars EN",
  location: "Japan"
)

pixellink = Agency.create!(
  name: "PixelLink",
  location: "United States"
)

phase = Agency.create!(
  name: "Phase Connect",
  location: "Canada"
)

niji = Agency.create!(
  name: "Nijisanji",
  location: "Japan"
)

nijien = Agency.create!(
  name: "Nijisanji EN",
  location: "Japan"
)

kawaii = Agency.create!(
  name: "Production Kawaii",
  location: "United States"
)

vshojo = Agency.create!(
  name: "VShojo",
  location: "United States"
)

idol = Agency.create!(
  name: "idol-EN",
  location: "Japan"
)

vlash = Agency.create!(
  name: "Vlash",
  location: "Japan"
)

fsp = Agency.create!(
  name: "First Stage Production",
  location: "United States"
)

globie = Agency.create!(
  name: "globie",
  location: "Japan"
)

v4mirai = Agency.create!(
  name: "V4Mirai",
  location: "Japan"
)

mixst = Agency.create!(
  name: "Mixst",
  location: "Japan",
  website: "https://mixstgirls.com/"
)

vdere = Agency.create!(
  name: "V-Dere",
  location: "United States"
)

vallure = Agency.create!(
  name: "VAllure",
  location: "United States"
)

univirtual = Agency.create!(
  name: "UniVIRTUAL",
  location: "Japan",
  website: "https://univirtual.jp/"
)

dotlive = Agency.create!(
  name: ".LIVE",
  location: "Japan",
  website: "https://appland.co.jp/talents/",
  yt_channel: "https://www.youtube.com/channel/UC7-YM5BhR-FCZloquRE7XGw",
  description: "A VTuber agency owned by Appland, Inc. It includes the VTuber group VPI (Pronounced \"Vee-pai\")",
)

rkmusic = Agency.create!(
  name: "RK Music",
  location: "Japan",
  website: "https://liveunion.jp/",
  yt_channel: "https://www.youtube.com/c/RKMusic_inc",
  description: "A music label and production company that specializes in virtual artists."
)

react = Agency.create!(
  name: "Re:Act",
  location: "Japan",
  website: "https://v-react.com/",
  yt_channel: "https://www.youtube.com/@react3709",
  description: "A VTuber agency owned by mikai inc."
)

nebula = Agency.create!(
  name: "Project Nebula",
  location: "Japan",
  website: "https://www.project-nebula.com/",
  yt_channel: "https://www.youtube.com/@PROJECTNEBULA",
  description: "A VTuber agency owned by RISEUP Inc."
)

neoporte = Agency.create!(
  name: "Neo-Porte",
  location: "Japan",
  website: "https://neo-porte.jp/",
  yt_channel: "https://www.youtube.com/@neoporte-office",
  description: "No description available."
)

nextopia = Agency.create!(
  name: "Nextopia",
  location: "Japan",
  website: "https://nextopia.jp/",
  yt_channel: "https://www.youtube.com/@nextopia_jp",
  description: "No description available."
)

shinengumi = Agency.create!(
  name: "Shinengumi",
  location: "Japan",
  website: "https://shinengumi.com/",
  yt_channel: "https://www.youtube.com/@shinengumivtg",
  description: "No description available."
)

siropro = Agency.create!(
  name: "Siropro",
  location: "Japan",
  website: "https://siragamico.com/siroproduction/",
  yt_channel: "https://www.youtube.com/@siro_pro",
  description: "A VTuber agency operated by siragami."
)

# palepro = Agency.create!(
#   name: "Palette Project",
#   location: "Japan"
# )


puts "Agencies created"




sora = Vtuber.create!(
  name: "Tokino Sora",
  description: "monkey",
  agency: hololive,
  gender: "female",
  main_language: "Japanese"
)
["singer"].each do |tag|
  sora.add_tag(tag)
end

roboco = Vtuber.create!(
  name: "Robocosan",
  jp_name: "ロボ子さん",
  description: "Hellobo! It's me, the high-spec hololive VTuber Roboco! I showed up from a faraway wasteland having lost all my memories.\n\n
    I believe I'm pretty high-spec, but some rumors say that it'd be more accurate to call me \"broken\"... lol. I'm a gamer gal whose defining trait is a very human, emotional singing voice!\n\n
    Am I really a robot? Whoops, looks like my arm came off...\n\n(Source: Hololive website)",
  agency: hololive,
  gender: "female",
  main_language: "Japanese"
)
["singer"].each do |tag|
  roboco.add_tag(tag)
end

mel = Vtuber.create!(
  name: "Yozora Mel",
  description: "monkey",
  agency: hololive,
  gender: "female",
  main_language: "Japanese",
  active: false
)
["singer"].each do |tag|
  mel.add_tag(tag)
end

subaru = Vtuber.create!(
  name: "Oozora Subaru",
  description: "monkey",
  agency: hololive,
  gender: "female",
  main_language: "Japanese"
)

ayame = Vtuber.create!(
  name: "Nakiri Ayame",
  description: "monkey",
  agency: hololive,
  gender: "female",
  main_language: "Japanese"
)
["singer"].each do |tag|
  ayame.add_tag(tag)
end

shion = Vtuber.create!(
  name: "Murasaki Shion",
  description: "monkey",
  agency: hololive,
  gender: "female",
  main_language: "Japanese"
)
["singer", "kusogaki", "loli", "small chest"].each do |tag|
  shion.add_tag(tag)
end

okayu = Vtuber.create!(
  name: "Nekomata Okayu",
  description: "monkey",
  agency: hololive,
  gender: "female",
  main_language: "Japanese"
)

miko = Vtuber.create!(
  name: "Sakura Miko",
  description: "A shrine maiden from the Virtual Sakura Shrine. With a vivid admiration for idols, she constantly pushes herself to greater heights to become a top elite shrine maiden-idol like no other!\n\nWell... a self-proclaimed 'elite,' to be exact. Fans would think \"clutz\" fits her better...",
  agency: hololive,
  gender: "female",
  main_language: "Japanese",
  photo_url: "https://hololive.hololivepro.com/wp-content/uploads/2023/02/Sakura-Miko_pr-img_01.png"
)
["singer", "baby", "pon"].each do |tag|
  miko.add_tag(tag)
end

pekora = Vtuber.create!(
  name: "Usada Pekora",
  jp_name: "兎田ぺこら",
  description: "A lonely rabbit-eared girl who loves carrots. She loves them so much that she always brings a few anywhere she goes.\n\n(Source: Hololive website)",
  agency: hololive,
  gender: "female",
  main_language: "Japanese",
  birthday: "2023/01/12",
  debut_date: "2019/07/17",
  yt_channel: "https://www.youtube.com/@usadapekora",
  twitch_channel: "https://www.twitch.tv/usadapekora_hololive",
  photo_url: "https://hololive.hololivepro.com/wp-content/uploads/2023/04/Usada-Pekora_pr-img_01-718x1440.png"
)
["singer", "comedian", "animal ears"].each do |tag|
  pekora.add_tag(tag)
end

aqua = Vtuber.create!(
  name: "Minato Aqua",
  jp_name: "湊あくあ",
  description: "A marine maid-styled virtual maid. She is trying her very best, yet is still sometimes awkward and clumsy.",
  agency: hololive,
  gender: "female",
  birthday: "2023/12/01",
  debut_date: "2018/08/08",
  yt_channel: "https://www.youtube.com/@MinatoAqua",
  main_language: "Japanese",
  photo_url: "https://hololive.hololivepro.com/wp-content/uploads/2023/04/Minato-Aqua_pr-img_01b-762x1440.png",
  active: false
)
["singer", "pon"].each do |tag|
  aqua.add_tag(tag)
end

korone = Vtuber.create!(
  name: "Inugami Korone",
  description: "A dog from a bakery in the city. She likes to play games during her free time while watchdogging.",
  agency: hololive,
  gender: "female",
  main_language: "Japanese"
)
["singer", "animal ears", "fluffy"].each do |tag|
  korone.add_tag(tag)
end

raki = Vtuber.create!(
  name: "Raki Kazuki",
  jp_name: "ラキ・カズキ",
  description: "Formally a raccoon familiar, Raki is a witch who attends a prestigious magical academy. When she isn’t studying, she spends her free time singing or dumpster diving, and despite her clumsy nature, works hard every day.",
  agency: pixellink,
  gender: "female",
  main_language: "English",
  photo_url: "https://cdn.sanity.io/images/2ihqd0kb/production/e43d6f92c16e26bf1c3a18ed3fe8011d2eda199e-3000x5000.png",
  yt_channel: "https://www.youtube.com/@RakiKazuki",
  birthday: "2023/08/24",
  debut_date: "2023/06/16"
)
["baby girl failure", "thighs", "Southern accent", "ASMR", "animal ears", "heavy metal", "pon"].each do |tag|
  raki.add_tag(tag)
end

ami = Vtuber.create!(
  name: "Ami Amami",
  jp_name: "雨海あみ",
  description: "The cutest frog idol",
  agency: indie,
  gender: "female",
  main_language: "English",
  yt_channel: "https://www.youtube.com/@amamiAmi",
  twitch_channel: "https://twitch.tv/amiamami",
  photo_url: "https://vtubernewsdrop.com/content/images/2023/04/Ami-Amami.jpg",
  debut_date: "2023/04/29",
  birthday: "2023/04/03"
)
["baby", "loli", "small chest", "Filipino", "short", "voice actor"].each do |tag|
  ami.add_tag(tag)
end

calli = Vtuber.create!(
  name: "Mori Calliope",
  jp_name: "森カリオペ",
  description: "The Grim Reaper's first apprentice. Due to modern medical care causing a decline in the reaping business, Calliope decided to become a VTuber to harvest souls instead. It seems that the ascended souls of the people who are vaporized by the wholesome interactions between VTubers go to her as well.\n\nThat being said, despite the image her hardcore vocals and manner of speech gives off, she's actually a gentle-hearted girl who cares greatly for her friends.",
  agency: hololive,
  gender: "female",
  main_language: "English",
  yt_channel: "https://www.youtube.com/channel/UCL_qhgtOy0dy1Agp8vkySQg",
  photo_url: "https://hololive.hololivepro.com/wp-content/uploads/2022/04/4001_Mori-Calliope.png",
  debut_date: "2020/09/12",
  birthday: "2023/04/04"
)
["singer", "rap", "big chest", "Southern accent"].each do |tag|
  calli.add_tag(tag)
end

axel = Vtuber.create!(
  name: "Axel Syrios",
  jp_name: "アクセル・シリオス",
  description: "The chief of human resources in Adventurer's Guild TEMPUS. He is the owner of the combat arena, and a gladiator himself. He joined TEMPUS on a whim, only to take a real liking to it. Has always swiftly resolved any problems he has faced by sheer instinct, and thus considers himself somewhat of a doctor.\n\n(Source: Holostars website)",
  agency: holostars,
  gender: "male",
  main_language: "English",
  yt_channel: "https://www.youtube.com/@AxelSyrios",
  photo_url: "https://holostars.hololivepro.com/wp-content/uploads/2021/12/Axel-Syrios_pr-img_01.png",
  debut_date: "2022/07/24",
  birthday: "2023/11/01"
)
["singer", "FPS", "Australian"].each do |tag|
  axel.add_tag(tag)
end

bettel = Vtuber.create!(
  name: "Gavis Bettel",
  jp_name: "ガビス・ベッテル",
  description: "The jester of Adventurer's Guild TEMPUS. Visited Xenokuni in the past to learn its traditional performing arts, and used that experience to draw up and lead the expedition into the land eventually.\n\nCurrently performs in the combat arena, but is planning to take his talents global someday. His diverse clientele has given him an undeniably keen eye for aesthetics, and he can sometimes be a wise guy who goes straight for the jugular.\n\n(Source: Holostars website)",
  agency: holostars,
  gender: "male",
  main_language: "English",
  yt_channel: "https://www.youtube.com/@GavisBettel",
  photo_url: "https://holostars.hololivepro.com/wp-content/uploads/2024/06/Gavis-Bettel_pr-img_02.png",
  debut_date: "2023/01/08",
  birthday: "2023/05/17"
)
["singer", "comedian", "baby girl failure", "guitar"].each do |tag|
  bettel.add_tag(tag)
end

hakka = Vtuber.create!(
  name: "Banzoin Hakka",
  jp_name: "万象院ハッカ",
  description: "The exorcist of Adventurer's Guild TEMPUS. Dual wielding spears, he is the latest of a long line of exorcists who have defended Xenokuni from the evils of the world.\n\nHe fights not only out of a sense of duty, but also because he feels a special kind of excitement when on the frontlines. Unfortunately, his right hand is being eroded by the scourge of Records Corruption. Has inherited Karasutengu data, and thus possesses otherworldly leaping ability and endurance.\n\nJoined TEMPUS after the battle in Xenokuni.\n\n(Source: Holostars website)",
  agency: holostars,
  gender: "male",
  main_language: "English",
  yt_channel: "https://www.youtube.com/@BanzoinHakka",
  photo_url: "https://holostars.hololivepro.com/wp-content/uploads/2024/01/Banzoin-Hakka_pr-img_02.png",
  debut_date: "2023/01/08",
  birthday: "2023/04/21"
)
["singer", "heavy metal", "Spanish"].each do |tag|
  hakka.add_tag(tag)
end

iguchi = Vtuber.create!(
  name: "Iguchi Sun",
  jp_name: "井口さん",
  description: "No description available.",
  agency: siropro,
  gender: "female",
  main_language: "Japanese",
  debut_date: "2024/01/28",
  birthday: "2020/09/29",
  yt_channel: "https://www.youtube.com/@iguchisun",
  photo_url: "https://pbs.twimg.com/media/GXCrBH6aEAA5g0t?format=jpg&name=large"
)
["singer"].each do |tag|
  iguchi.add_tag(tag)
end

ironmouse = Vtuber.create!(
  name: "Iron Mouse",
  description: "monkey",
  agency: vshojo,
  gender: "female",
  main_language: "English"
)
["Spanish", "singer", "deep singing voice"].each do |tag|
  ironmouse.add_tag(tag)
end

igasaki = Vtuber.create!(
  name: "Igasaki Ayaka",
  description: "ASMR artist and hentai voice actress.",
  agency: indie,
  gender: "female",
  main_language: "Japanese"
)
["ASMR", "lewd", "voice actor"].each do |tag|
  igasaki.add_tag(tag)
end

amana = Vtuber.create!(
  name: "Amana Nia",
  jp_name: "天満ニア",
  description: "monkey",
  agency: indie,
  gender: "female",
  main_language: "Japanese",
  yt_channel: "https://www.youtube.com/channel/UC3KldSym-HTLMkvitStsNTw",
  photo_url: "https://yt3.googleusercontent.com/VhPEjVw-A4NsYYHE5Ol-V9bZP2UcCZ1oBAzgQ5-LAR8KDekApywdlq6SCX5w5NAW0Kc1V0Im1A=s900-c-k-c0x00ffffff-no-rj",
  birthday: "2023/10/05",
  debut_date: "2020/02/02"
)
["singer"].each do |tag|
  amana.add_tag(tag)
end

amelie = Vtuber.create!(
  name: "Amelie Kanon",
  description: "A bilingual tea fairy.",
  agency: indie,
  gender: "female",
  main_language: "Japanese",
  yt_channel: "https://www.youtube.com/@AmelieKanon",
  twitch_channel: "https://www.twitch.tv/ameliekanon",
  debut_date: "2023/5/21",
  photo_url: "https://ameliekanon.carrd.co/assets/images/image07.jpg?v=44bc4152"
)


ririsya = Vtuber.create!(
  name: "Ririsya",
  description: "A zombie Vsinger",
  agency: indie,
  gender: "female",
  main_language: "Japanese"
)
["singer", "guitar"].each do |tag|
  ririsya.add_tag(tag)
end

hoshimiya = Vtuber.create!(
  name: "Hoshimiya Choco",
  description: "A cosplayer who gained fame by cosplaying as Usada Pekora in Pekora's 2023 April Fool's video.",
  agency: vlash,
  gender: "female",
  main_language: "Japanese"
)
["cosplayer"].each do |tag|
  hoshimiya.add_tag(tag)
end

ray = Vtuber.create!(
  name: "Otsuka Ray",
  description: "A mom VTuber",
  agency: indie,
  gender: "female",
  main_language: "Japanese"
)
["singer", "mom", "baby"].each do |tag|
  ray.add_tag(tag)
end

lottie = Vtuber.create!(
  name: "Lottie Shinju",
  jp_name: "ロッティ・真珠",
  description: "A silly axolotl with a bubbly personality and a fiery kaiju enthusiast, Lottie strives to spread positivity in the human world—for now...",
  agency: pixellink,
  gender: "female",
  main_language: "English",
  yt_channel: "https://www.youtube.com/@LottieShinju",
  photo_url: "https://cdn.sanity.io/images/2ihqd0kb/production/437363011d1cb341efbd90b7587a8a796e73f364-4093x5787.png",
  birthday: "2023/08/23",
  debut_date: "2023/06/16"
)

delutaya = Vtuber.create!(
  name: "DELUTAYA Δ.",
  description: "monkey",
  agency: indie,
  gender: "female",
  main_language: "Japanese",
  yt_channel: "https://www.youtube.com/@delutaya",
  twitch_channel: "https://www.twitch.tv/delutaya_ch"
)
["singer"].each do |tag|
  delutaya.add_tag(tag)
end

nuino = Vtuber.create!(
  name: "Kohaku Nuino",
  jp_name: "心羽白ぬいの",
  description: "monkey",
  agency: univirtual,
  gender: "female",
  main_language: "Japanese",
  birthday: "2020/04/08",
  yt_channel: "https://www.youtube.com/@KOHAKU_NUINO",
  photo_url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.youtube.com%2F%40KOHAKU_NUINO&psig=AOvVaw1iTxSrKZmYqqgMrFwYV3nz&ust=1725179725532000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMD6rrvpnogDFQAAAAAdAAAAABAE",
  debut_date: "2022/08/22"
)
["singer"].each do |tag|
  nuino.add_tag(tag)
end

yutoha = Vtuber.create!(
  name: "Takanashi Yutoha",
  jp_name: "小鳥遊ゆとは",
  description: "monkey",
  agency: indie,
  gender: "female",
  main_language: "Japanese",
  yt_channel: "https://www.youtube.com/@yutoha",
  twitch_channel: "https://www.twitch.tv/yutohatakanashi",
  photo_url: "https://yt3.googleusercontent.com/RlFlN3aZ1-CMwrtYLrAStjzLIL601gFeyrQ64VDdPoJFG-PTsxSXLpJaqH1Ky2O8nHk6oylEzw=s160-c-k-c0x00ffffff-no-rj"
)
["singer"].each do |tag|
  yutoha.add_tag(tag)
end

meimi = Vtuber.create!(
  name: "Majokko Meimi",
  jp_name: "魔女っ子めいみ",
  description: "monkey",
  agency: kawaii,
  gender: "female",
  main_language: "English",
  yt_channel: "https://www.youtube.com/@MajokkoMeimi",
  photo_url: "https://yt3.googleusercontent.com/gNIwRzrllQnbVJUr85xsoX1jWpkI1DCR39th93XM96iu4wfT_KAarwZaMugWS3mmDavuyshTbw=s160-c-k-c0x00ffffff-no-rj"
)
["singer", "thighs", "fortune telling", "Chinese"].each do |tag|
  meimi.add_tag(tag)
end

toi = Vtuber.create!(
  name: "Itoi Toi",
  jp_name: "絲依とい",
  description: "No description available.",
  agency: neoporte,
  gender: "female",
  main_language: "Japanese",
  yt_channel: "https://www.youtube.com/@itoitoi_Q",
  photo_url: "https://neo-porte.jp/wp-content/uploads/2023/09/ccd772d1067b93d933bd42005cbd3527.png"
)
["singer", "FPS"].each do |tag|
  toi.add_tag(tag)
end

sanso = Vtuber.create!(
  name: "Sanso-chan",
  jp_name: "さんそちゃん",
  description: "monkey",
  agency: indie,
  gender: "female",
  main_language: "Japanese",
  yt_channel: "https://www.youtube.com/@Sansochan",
  photo_url: "https://pbs.twimg.com/media/GVvAzvMa8AQocYM?format=jpg&name=large"
)
["singer"].each do |tag|
  sanso.add_tag(tag)
end

phoebe = Vtuber.create!(
  name: "Phoebe Chan",
  description: "A 2.5-D idol based in Los Angeles. She performs IRL concerts and can transform into her VTuber self in the virtual world. She temporarily went on a hiatus from her YouTube activities when she became Ami Amami from Prism Project. After the dissolution of Prism Project, she returned to being Phoebe Chan and now switches between being Phoebe and Ami, who she treats as two different people.",
  agency: indie,
  gender: "female",
  main_language: "English",
  yt_channel: "https://www.youtube.com/@feebeechanchibi"
)
["singer", "Filipino"].each do |tag|
  phoebe.add_tag(tag)
end

iku = Vtuber.create!(
  name: "Hoshifuri Iku",
  jp_name: "星降いく",
  description: "A former member of PRISM Project's 1st gen.",
  agency: indie,
  gender: "female",
  main_language: "English",
  birthday: "2023/10/01",
  debut_date: "2021/01/30",
  yt_channel: "https://www.youtube.com/@IkuHoshifuri",
  photo_url: "https://pbs.twimg.com/media/Erk3Z1MVcAAGPbL?format=jpg&name=large"
)
["singer"].each do |tag|
  iku.add_tag(tag)
end

himaji = Vtuber.create!(
  name: "Himaji Pane",
  jp_name: "秘間慈ぱね",
  description: "No description available.",
  agency: dotlive,
  gender: "female",
  main_language: "Japanese",
  birthday: "2023/08/30",
  debut_date: "2023/06/16",
  yt_channel: "https://www.youtube.com/@HimajiPane-qt3zv",
  photo_url: "https://appland.co.jp/wp-content/uploads/2023/06/talent_pane.png"
)
["singer"].each do |tag|
  himaji.add_tag(tag)
end

usagi = Vtuber.create!(
  name: "Usagi Sora",
  jp_name: "宇佐木そら",
  description: "No description available.",
  agency: indie,
  gender: "female",
  main_language: "Japanese",
  birthday: "2023/09/06",
  debut_date: "2020/05/21",
  yt_channel: "https://www.youtube.com/@usagisora",
  photo_url: "https://pbs.twimg.com/media/GPn78HHbcAAwEy8?format=jpg&name=large"
)
["singer"].each do |tag|
  usagi.add_tag(tag)
end

amagami = Vtuber.create!(
  name: "Amagami Ame",
  jp_name: "甘噛あめ",
  description: "No description available.",
  agency: dotlive,
  gender: "female",
  main_language: "Japanese",
  yt_channel: "https://www.youtube.com/@AmagamiAme-my2uv",
  photo_url: "https://appland.co.jp/wp-content/uploads/2023/06/talent_ame.png"
)
["singer"].each do |tag|
  amagami.add_tag(tag)
end

shiro = Vtuber.create!(
  name: "Dennou Shojo Shiro",
  jp_name: "電脳少女シロ",
  description: "No description available.",
  agency: dotlive,
  gender: "female",
  main_language: "Japanese",
  debut_date: "2017/06/28",
  birthday: "2023/08/12",
  yt_channel: "https://www.youtube.com/@CyberGirlSiro",
  photo_url: "https://appland.co.jp/wp-content/uploads/2023/06/talent_siro.png"
)
["singer"].each do |tag|
  shiro.add_tag(tag)
end

eve = Vtuber.create!(
  name: "EvE Varlaine",
  jp_name: "イヴ・ヴァルレーヌ",
  description: "A succubus-in-training who is known for her lewd ASMR and JOI videos. In 2021, she privated all of her videos to avoid being banned on YouTube. Around the same time, she made an account on Fantia where she uploads lewd voice recordings and another channel on YouTube where she does normal game and ASMR livestreams.",
  agency: indie,
  gender: "female",
  main_language: "Japanese",
  debut_date: "2018/05/31",
  yt_channel: "https://www.youtube.com/@user-eg6us6os5r",
  photo_url: "https://yt3.ggpht.com/a/AGF-l79cAh97L_rSW7kigUUEtiC6Qdak5Puaxhco6g=s200"
)
["ASMR", "lewd"].each do |tag|
  eve.add_tag(tag)
end

enma = Vtuber.create!(
  name: "Enma Ruri",
  jp_name: "焔魔るり",
  description: "A VSinger part of RK Music's Live Union project.",
  agency: rkmusic,
  gender: "female",
  main_language: "Japanese",
  birthday: "2023/09/03",
  yt_channel: "https://www.youtube.com/@EnmaRuri",
  photo_url: "https://liveunion.jp/assets/img/page/home/picture-RuriEnma-large.png"
)
["singer"].each do |tag|
  enma.add_tag(tag)
end

hachi = Vtuber.create!(
  name: "HACHI",
  jp_name: "ハチ",
  description: "No description available.",
  agency: rkmusic,
  gender: "female",
  main_language: "Japanese",
  birthday: "2023/01/16",
  yt_channel: "https://www.youtube.com/@HACHIVSinger",
  photo_url: "https://liveunion.jp/assets/img/page/home/picture-HACHI-large.png"
)
["singer"].each do |tag|
  hachi.add_tag(tag)
end

meda = Vtuber.create!(
  name: "MEDA",
  agency: rkmusic,
  description: "No description available.",
  gender: "female",
  main_language: "Japanese",
  yt_channel: "https://www.youtube.com/@MEDAzcd",
  photo_url: "https://pbs.twimg.com/media/GWeZW6QXwAM06SU?format=jpg&name=large"
)
["singer", "guitar"].each do |tag|
  meda.add_tag(tag)
end

neun = Vtuber.create!(
  name: "NEUN",
  jp_name: "ノイン",
  agency: rkmusic,
  description: "No description available.",
  gender: "female",
  main_language: "Japanese",
  debut_date: "2024/05/25",
  yt_channel: "https://www.youtube.com/@NEUN09",
  photo_url: "https://pbs.twimg.com/media/GPn84K8aMAAM_16?format=jpg&name=medium"
)
["singer"].each do |tag|
  neun.add_tag(tag)
end

neno = Vtuber.create!(
  name: "Aoi Neno",
  jp_name: "碧生ねの",
  agency: indie,
  description: "A virtual siren. Her full name is Neonoah S. Valentine.",
  gender: "female",
  main_language: "Japanese",
  debut_date: "2023/11/11",
  yt_channel: "https://www.youtube.com/@aoineno",
  twitch_channel: "https://www.twitch.tv/aoineno",
  photo_url: "https://pbs.twimg.com/media/GIefBAFbQAEfCIJ?format=jpg&name=large"
)
["singer"].each do |tag|
  neno.add_tag(tag)
end

leona = Vtuber.create!(
  name: "Shishigami Leona",
  jp_name: "獅子神レオナ",
  agency: react,
  description: "No description available.",
  gender: "female",
  main_language: "Japanese",
  yt_channel: "https://www.youtube.com/@Leona_Shishigami",
  twitch_channel: "https://twitch.tv/leona_shishigami",
  photo_url: "https://www.v-react.com/wp-content/uploads/2022/07/8c05d65eae34d5bd961818d88863c3c5.png"
)
["singer", "animal ears"].each do |tag|
  leona.add_tag(tag)
end

kaf = Vtuber.create!(
  name: "KAF",
  jp_name: "花譜",
  agency: indie,
  description: "A VSinger signed with the creative label Kamitsubaki Studio. She is a member of the VSinger group V.W.P -Virtual Witch Phenomenon-. In August 2022, she became the first VTuber to perform at the Nippon Budokan.",
  gender: "female",
  main_language: "Japanese",
  yt_channel: "https://www.youtube.com/@virtual_kaf",
  photo_url: "https://kaf3rdanniversary.kamitsubaki.jp/assets/img/common/kaf.png"
)
["singer"].each do |tag|
  kaf.add_tag(tag)
end

rim = Vtuber.create!(
  name: "RIM",
  jp_name: "理芽",
  agency: indie,
  description: "No description available.",
  gender: "female",
  main_language: "Japanese",
  yt_channel: "https://www.youtube.com/@RIM_virtual",
  photo_url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpiapro.jp%2Fcharacters%2Frim&psig=AOvVaw1LK7H0y9fyZtsXhRaIkP1q&ust=1726289269154000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLiF8-iOv4gDFQAAAAAdAAAAABAE"
)
["singer"].each do |tag|
  rim.add_tag(tag)
end

yayamugi = Vtuber.create!(
  name: "yayamugi",
  jp_name: "稍麦",
  agency: indie,
  description: "A shumai reborn as a VTuber. She was born in China and knows some Chinese.",
  gender: "female",
  main_language: "Japanese",
  yt_channel: "https://www.youtube.com/@yayamugi222",
  photo_url: "https://pbs.twimg.com/media/GQk4DKxakAAqzJM?format=jpg&name=large"
)
["singer", "Chinese"].each do |tag|
  yayamugi.add_tag(tag)
end

nina = Vtuber.create!(
  name: "Momose Nina",
  jp_name: "桃瀬にな",
  agency: nebula,
  description: "No description available.",
  gender: "female",
  main_language: "Japanese",
  debut_date: "2022/07/16",
  yt_channel: "https://www.youtube.com/@MomoseNina",
  photo_url: "https://www.project-nebula.com/static/Nina2-d9cae35830a1e0d7cec43baf5f6d08c2.png"
)
["singer"].each do |tag|
  nina.add_tag(tag)
end

yura = Vtuber.create!(
  name: "Usui Yura",
  jp_name: "碓氷ゆら",
  agency: nebula,
  description: "No description available.",
  gender: "female",
  main_language: "Japanese",
  yt_channel: "https://www.youtube.com/@yurayurausui",
  photo_url: "https://www.project-nebula.com/static/yura_key-01c09a7e6e8d2f3fbb7c88313ce4dc29.png"
)
["singer"].each do |tag|
  yura.add_tag(tag)
end

suzuri = Vtuber.create!(
  name: "Suzuri Ren",
  jp_name: "鈴莉れん",
  agency: nebula,
  description: "No description available.",
  gender: "female",
  main_language: "Japanese",
  yt_channel: "https://www.youtube.com/@RenSuzuri",
  photo_url: "https://www.project-nebula.com/static/ren_key-9a07bbb77a0e5620f69f1d01876994d8.png"
)

hinatori = Vtuber.create!(
  name: "Hinata Natori",
  jp_name: "菜鳥ひなた",
  agency: nebula,
  description: "No description available.",
  gender: "female",
  main_language: "Japanese",
  yt_channel: "https://www.youtube.com/@natori_hinata",
  photo_url: "https://pbs.twimg.com/media/GW--yHDaIAAJLCd?format=jpg&name=4096x4096"
)

sorakana = Vtuber.create!(
  name: "Sorakana Ito",
  jp_name: "空奏イト",
  agency: mixst,
  description: "No description available.",
  gender: "female",
  main_language: "Japanese",
  birthday: "2023/10/01",
  debut_date: "2024/06/23",
  yt_channel: "https://www.youtube.com/@Ito_Mixstgirls",
  photo_url: "https://mixstgirls.com/wp/wp-content/uploads/2024/06/%E7%AB%8B%E3%81%A1%E7%B5%B5_%E7%A9%BA%E5%A5%8F%E3%82%A4%E3%83%88-2.png"
)
["singer"].each do |tag|
  sorakana.add_tag(tag)
end

shichi = Vtuber.create!(
  name: "Nagisawa Shichi",
  jp_name: "渚沢シチ",
  agency: mixst,
  description: "No description available.",
  gender: "female",
  main_language: "Japanese",
  birthday: "2023/11/07",
  debut_date: "2024/06/23",
  yt_channel: "https://www.youtube.com/@Shichi_Mixstgirls",
  photo_url: "https://mixstgirls.com/wp/wp-content/uploads/2024/06/%E7%AB%8B%E3%81%A1%E7%B5%B5_%E6%B8%9A%E6%B2%A2%E3%82%B7%E3%83%81-2.png"
)

qalu = Vtuber.create!(
  name: "Yukishiro Qalu",
  jp_name: "雪白キャル",
  agency: mixst,
  description: "No description available.",
  gender: "female",
  main_language: "Japanese",
  birthday: "2023/12/07",
  debut_date: "2024/06/23",
  yt_channel: "https://www.youtube.com/@Qalu_Mixstgirls",
  photo_url: "https://mixstgirls.com/wp/wp-content/uploads/2024/06/%E7%AB%8B%E3%81%A1%E7%B5%B5_%E9%9B%AA%E7%99%BD%E3%82%AD%E3%83%A3%E3%83%AB-2.png"
)

rimu = Vtuber.create!(
  name: "Hoshino Rimu",
  jp_name: "星乃りむ",
  agency: mixst,
  description: "No description available.",
  gender: "female",
  main_language: "Japanese",
  birthday: "2023/09/20",
  debut_date: "2024/06/23",
  yt_channel: "https://www.youtube.com/@Rimu_Mixstgirls",
  photo_url: "https://mixstgirls.com/wp/wp-content/uploads/2024/06/%E7%AB%8B%E3%81%A1%E7%B5%B5_%E6%98%9F%E4%B9%83%E3%82%8A%E3%82%80-2.png"
)

iori_mixst = Vtuber.create!(
  name: "Kotomiya Iori",
  jp_name: "琴宮いおり",
  agency: mixst,
  description: "No description available.",
  gender: "female",
  main_language: "Japanese",
  birthday: "2023/02/22",
  debut_date: "2024/06/23",
  yt_channel: "https://www.youtube.com/@Iori_Mixstgirls",
  photo_url: "https://mixstgirls.com/wp/wp-content/uploads/2024/06/%E7%AB%8B%E3%81%A1%E7%B5%B5_%E7%90%B4%E5%AE%AE%E3%81%84%E3%81%8A%E3%82%8A-2.png"
)

lian = Vtuber.create!(
  name: "Kosuzu Lian",
  jp_name: "小鈴りあん",
  agency: mixst,
  description: "No description available.",
  gender: "female",
  main_language: "Japanese",
  birthday: "2023/01/23",
  debut_date: "2024/06/23",
  yt_channel: "https://www.youtube.com/@Lian_Mixstgirls",
  photo_url: "https://mixstgirls.com/wp/wp-content/uploads/2024/06/%E7%AB%8B%E3%81%A1%E7%B5%B5_%E5%B0%8F%E9%88%B4%E3%82%8A%E3%81%82%E3%82%93-2.png"
)

myao = Vtuber.create!(
  name: "Narumi Myao",
  jp_name: "成海ミャオ",
  agency: mixst,
  description: "No description available.",
  gender: "female",
  main_language: "Japanese",
  birthday: "2023/04/28",
  debut_date: "2024/06/23",
  yt_channel: "https://www.youtube.com/@Myao_Mixstgirls",
  photo_url: "https://mixstgirls.com/wp/wp-content/uploads/2024/06/%E7%AB%8B%E3%81%A1%E7%B5%B5_%E6%88%90%E6%B5%B7%E3%83%9F%E3%83%A3%E3%82%AA-2.png"
)

san = Vtuber.create!(
  name: "Amabuki San",
  jp_name: "天吹サン",
  agency: mixst,
  description: "No description available.",
  gender: "female",
  main_language: "Japanese",
  birthday: "2023/03/20",
  debut_date: "2024/06/23",
  yt_channel: "https://www.youtube.com/@San_Mixstgirls",
  photo_url: "https://mixstgirls.com/wp/wp-content/uploads/2024/06/%E7%AB%8B%E3%81%A1%E7%B5%B5_%E5%A4%A9%E5%90%B9%E3%82%B5%E3%83%B3-2.png"
)

ekopi = Vtuber.create!(
  name: "Himeno Ekopi",
  jp_name: "姫乃えこぴ",
  agency: indie,
  description: "A VTuber who does anime reaction videos. Usually does watchalongs of currently airing anime.",
  gender: "female",
  main_language: "Japanese",
  yt_channel: "https://www.youtube.com/@ekopi"
)

rikako = Vtuber.create!(
  name: "Aida Rikako",
  jp_name: "逢田梨香子",
  agency: indie,
  description: "A voice actress famous for her role as Sakurauchi Riko from Love Live! Sunshine!! She debuted her 2D VTuber model on August 21, 2024 and livestreams games on her channel.",
  gender: "female",
  main_language: "Japanese",
  birthday: "2000/08/08",
  yt_channel: "https://www.youtube.com/@rikakoaida",
  debut_date: "2024/08/01",
  photo_url: "https://pbs.twimg.com/media/GVgjqfbW8AAQW7L?format=jpg&name=large"
)
["singer", "voice actor"].each do |tag|
  rikako.add_tag(tag)
end

figaro = Vtuber.create!(
  name: "Figaro",
  agency: indie,
  description: "No description available.",
  gender: "female",
  main_language: "Japanese",
  yt_channel: "https://www.youtube.com/@Figaro_qpt",
  photo_url: "https://pbs.twimg.com/media/GWWxpBobQAIkiyo?format=jpg&name=large"
)
["singer"].each do |tag|
  figaro.add_tag(tag)
end

misora = Vtuber.create!(
  name: "Misora Sora",
  jp_name: "ミソラソラ",
  agency: indie,
  description: "A singing blue ghost.",
  gender: "female",
  main_language: "Japanese",
  birthday: "2000/08/01",
  debut_date: "2024/07/01",
  yt_channel: "https://www.youtube.com/@misorasoraCH",
  photo_url: "https://pbs.twimg.com/media/GSAj1LDa4AA-w8G?format=jpg&name=large"
)
["singer"].each do |tag|
  misora.add_tag(tag)
end

youri = Vtuber.create!(
  name: "Hiiragi Youri",
  jp_name: "柊木 悠利",
  agency: indie,
  description: "A girl posessed by a 500-year-old fox who has lost her memories.",
  gender: "female",
  main_language: "Japanese",
  birthday: "2000/08/01",
  debut_date: "2024/01/27",
  yt_channel: "https://www.youtube.com/@youriofficialchannel",
  photo_url: "https://pbs.twimg.com/media/GUS_KJ8aQAAqLa2?format=jpg&name=4096x4096"
)
["singer"].each do |tag|
  youri.add_tag(tag)
end

hanatan = Vtuber.create!(
  name: "HaNaTan",
  jp_name: "花たん",
  agency: indie,
  description: "A VSinger. She performed the ending theme of the anime \"The Do-Over Damsel Conquers the Dragon Emperor\"",
  gender: "female",
  main_language: "Japanese",
  debut_date: "2022/01/22",
  yt_channel: "https://www.youtube.com/@HaNaTaN_MUSiC",
  photo_url: "https://pbs.twimg.com/media/GXHspm8WUAEfMSj?format=jpg&name=medium"
)
["singer"].each do |tag|
  hanatan.add_tag(tag)
end

stronny = Vtuber.create!(
  name: "Stronny Cuttles",
  agency: vallure,
  description: "A siren with a devastating goal to wipe out humanity. Will you fall for her spell (Source: VAllure website)",
  gender: "female",
  main_language: "English",
  yt_channel: "https://www.youtube.com/@StronnyCuttles"
)
["ASMR"].each do |tag|
  stronny.add_tag(tag)
end

azura = Vtuber.create!(
  name: "Azura Dulait",
  agency: vallure,
  description: "A goat goddess from eons before finally returns to humanity that she once created. Will she be accepted or shunned? (Source: VAllure website)",
  gender: "female",
  main_language: "English",
  yt_channel: "https://www.youtube.com/@AzuraDulait"
)
["ASMR"].each do |tag|
  azura.add_tag(tag)
end

icey = Vtuber.create!(
  name: "Icey Snowpaws",
  agency: vallure,
  description: "A feral polar bear finds her way back to civilization. Will she be able to understand humans or give into her wild side? (Source: VAllure website)",
  gender: "female",
  main_language: "English",
  yt_channel: "https://www.youtube.com/@IceySnowpaws"
)
["ASMR"].each do |tag|
  icey.add_tag(tag)
end

immy = Vtuber.create!(
  name: "Immy Bisou",
  agency: vallure,
  description: "A hex maniac whose destiny is tied within a forbidden love. Will you watch over her until the very end? (Source: VAllure website)",
  gender: "female",
  main_language: "English",
  yt_channel: "https://www.youtube.com/@ImmyBisou"
)
["ASMR"].each do |tag|
  immy.add_tag(tag)
end

mercy = Vtuber.create!(
  name: "Mercy Modiste",
  agency: vallure,
  description: "A yandere that truly has no understanding of her deeds. Will she be able to cut through the competition to your heart? (Source: VAllure website)",
  gender: "female",
  main_language: "English",
  yt_channel: "https://www.youtube.com/@MercyModiste"
)
["ASMR"].each do |tag|
  mercy.add_tag(tag)
end

shibi = Vtuber.create!(
  name: "Shibi Cottonbum",
  agency: vallure,
  description: "A madam of a brothel and acceptor of degenerates. Will she take control of your desires? (Source: VAllure website)",
  gender: "female",
  main_language: "English",
  yt_channel: "https://www.youtube.com/@ShibiCottonbum"
)
["ASMR"].each do |tag|
  shibi.add_tag(tag)
end

samayoi = Vtuber.create!(
  name: "Samayoi Suzu",
  jp_name: "彷徨鈴",
  agency: indie,
  description: "A half jiangshi, half demoness VSinger.",
  gender: "female",
  main_language: "Japanese",
  yt_channel: "https://www.youtube.com/@SamayoiSuzu",
  twitch_channel: "https://twitch.tv/samayoisuzu",
  photo_url: "https://pbs.twimg.com/media/F3jr-0_a8AAm58f?format=jpg&name=large"
)
["singer"].each do |tag|
  samayoi.add_tag(tag)
end

nakuru = Vtuber.create!(
  name: "Aitsuki Nakuru",
  jp_name: "藍月なくる",
  agency: indie,
  description: "No description available.",
  gender: "female",
  main_language: "Japanese",
  yt_channel: "https://www.youtube.com/@AitsukiNakuru",
  photo_url: "https://pbs.twimg.com/media/F_S5C-EbYAApaT6?format=jpg&name=small"
)
["singer"].each do |tag|
  nakuru.add_tag(tag)
end

pona = Vtuber.create!(
  name: "Nikoniko Pona",
  jp_name: "笑々ぽな",
  agency: nextopia,
  description: "No description available.",
  gender: "female",
  main_language: "Japanese",
  birthday: "2000/07/03",
  yt_channel: "https://www.youtube.com/@Nikoniko_Pona",
  photo_url: "https://pbs.twimg.com/media/F9_2lcobwAAb8jh?format=jpg&name=large"
)
["singer", "guitar"].each do |tag|
  pona.add_tag(tag)
end

hoshikawa = Vtuber.create!(
  name: "Hoshikawa Sara",
  jp_name: "星川 サラ",
  agency: niji,
  description: "A self-proclaimed influencer aiming to spread her cuteness worldwide.\n\nHalf British and half Japanese, she loves anything new, anything fun, and talking about romance. (Source: Nijisanji Official Store)",
  gender: "female",
  main_language: "Japanese",
  birthday: "2000/08/07",
  debut_date: "2019/10/19",
  yt_channel: "https://www.youtube.com/@HoshikawaSara",
  photo_url: "https://nijisanji-store.com/cdn/shop/collections/ZKmeMsgA1OCaIPQV_x400.jpg?v=1678329347"
)
["singer", "scream"].each do |tag|
  hoshikawa.add_tag(tag)
end

kurumizawa = Vtuber.create!(
  name: "Kurumizawa Momo",
  jp_name: "胡桃澤もも",
  agency: indie,
  description: "A magical girl attending a magical girl school. Formerly a member of NoriPro.",
  gender: "female",
  main_language: "Japanese",
  debut_date: "2021/04/09",
  yt_channel: "https://www.youtube.com/@kurumizawamomo",
  photo_url: "https://www.phsmdcshineresidences.com/wp-content/uploads/2021/04/rxbest_20211525_01.jpg"
)
["singer"].each do |tag|
  kurumizawa.add_tag(tag)
end

hanabasami = Vtuber.create!(
  name: "Hanabasami Kyo",
  jp_name: "花鋏キョウ",
  agency: react,
  description: "No description available.",
  gender: "female",
  main_language: "Japanese",
  yt_channel: "https://www.youtube.com/@Kyo_Hanabasami",
  photo_url: "https://www.v-react.com/wp-content/uploads/2020/05/hanabasamiKyo.jpg"
)
["singer"].each do |tag|
  hanabasami.add_tag(tag)
end

yuni = Vtuber.create!(
  name: "Harusame Yuni",
  jp_name: "春雨ゆに",
  agency: shinengumi,
  description: "A mage with a legendary dragon sealed within her. Enjoys games and alcohol.",
  gender: "female",
  main_language: "Japanese",
  birthday: "2000/09/27",
  yt_channel: "https://www.youtube.com/@harusame_uni",
  photo_url: "https://pbs.twimg.com/media/FuuPj_CaEAAqY-A?format=jpg&name=4096x4096"
)
["singer", "Chinese", "alcohol"].each do |tag|
  yuni.add_tag(tag)
end

narumi = Vtuber.create!(
  name: "Narumi Koko",
  jp_name: "なるみここ",
  agency: indie,
  description: "A voice actress who has acted in many adult doujin voice works. Also known as Aisaka Narumi.",
  gender: "female",
  main_language: "Japanese",
  yt_channel: "https://www.youtube.com/@narumicoco",
  photo_url: "https://pbs.twimg.com/media/GWnObDFWwAAXJIP?format=jpg&name=small"
)
["lewd", "voice actor", "ASMR"].each do |tag|
  narumi.add_tag(tag)
end

shu = Vtuber.create!(
  name: "Uchida Shu",
  jp_name: "内田秀",
  agency: indie,
  description: "A voice actress who has played characters in various anime, including Mia Taylor from \"Love Live! Nijigasaki School Idol Doukoukai\". She has a YouTube channel on which she sometimes streams with her VTuber model.",
  gender: "female",
  main_language: "Japanese",
  birthday: "1996/05/24",
  debut_date: "2023/01/21",
  yt_channel: "https://www.youtube.com/@ShuUchidaShuTube",
  photo_url: "https://x.com/fujimatakuya/status/1617507063839723522/photo/1"
)
["singer", "voice actor", "Australian", "guitar"].each do |tag|
  shu.add_tag(tag)
end

mokan = Vtuber.create!(
  name: "Mokan",
  jp_name: "もかん",
  agency: indie,
  description: "No description available.",
  gender: "female",
  main_language: "Japanese",
  yt_channel: "https://www.youtube.com/@mokankamo"
)
["singer"].each do |tag|
  mokan.add_tag(tag)
end

ruki = Vtuber.create!(
  name: "Ohga Ruki",
  jp_name: "凰牙るき",
  agency: univirtual,
  description: "No description available.",
  gender: "female",
  main_language: "Japanese",
  yt_channel: "https://www.youtube.com/@OHGARUKIch"
)
["singer", "flute", "piano"].each do |tag|
  ruki.add_tag(tag)
end

jangarian = Vtuber.create!(
  name: "Jyangarian",
  jp_name: "じゃんがりいあん",
  agency: indie,
  description: "No description available.",
  gender: "female",
  main_language: "Japanese",
  yt_channel: "https://www.youtube.com/@jyangaria_n"
)
["singer"].each do |tag|
  jangarian.add_tag(tag)
end

pepero = Vtuber.create!(
  name: "Nekoda Pepero",
  jp_name: "猫田ぺぺろ",
  agency: indie,
  description: "A VTuber from the 2nd generation of Masquerade. Like the other members, she does sexy webcam ASMR streams and posts R18 pictures on Twitter.",
  gender: "female",
  main_language: "Japanese",
  yt_channel: "https://www.youtube.com/@peperoch.6650"
)
["singer", "ASMR", "adult content", "animal ears"].each do |tag|
  pepero.add_tag(tag)
end

nemune = Vtuber.create!(
  name: "Nemuta Nemune",
  jp_name: "音夢多ねむね",
  agency: indie,
  description: "A 222-year-old nekomata VTuber. She loves Hololive and does Hololive-themed karaoke streams and Hololive concert watchalongs.",
  gender: "female",
  main_language: "Japanese",
  birthday: "2000/02/22",
  yt_channel: "https://www.youtube.com/@nemuch.5483"
)
["singer", "animal ears"].each do |tag|
  nemune.add_tag(tag)
end

chiroru = Vtuber.create!(
  name: "Maou Chirorunia",
  jp_name: "魔王チロルニア",
  agency: indie,
  description: "A demon lord voice actress VTuber aiming to be a harem lord. She does work as a voice actress for many doujin voice works under the name Ooyama Chiroru.",
  gender: "female",
  main_language: "Japanese",
  birthday: "2000/02/22",
  yt_channel: "https://www.youtube.com/@nemuch.5483"
)




puts "VTubers created"







user = User.create!(
  username: "Yatsuhashi",
  email: "sunjun.software@gmail.com",
  password: "123123"
)

user2 = User.create!(
  username: "monkey",
  email: "monkey@monkey.com",
  password: "123123",
  role: "admin"
)

puts "Users created"


oshis = List.create!(
  name: "My Oshis",
  user: user2
)

singers = List.create!(
  name: "Great Singers",
  user: user2
)

witches = List.create!(
  name: "Witch Hats",
  user: user2
)

puts "List created: #{oshis.name}"
puts "Users: #{user.username}, #{user2.username}"




[raki, pekora, miko, ami, phoebe, amelie, calli, axel, bettel, kaf].each do |oshi|
  # VtuberMarker.create!(
  #   vtuber: oshi,
  #   list: oshis
  # )
  if oshis.add_vtuber(oshi)
    puts "Added #{oshi.name} to #{oshis.name}"
  else
    puts task.errors.full_messages
  end
end

[nuino, amana, yutoha, himaji, enma, neno, iguchi, sorakana, rim, figaro, misora, youri, hanatan].each do |oshi|
  if singers.add_vtuber(oshi)
    puts "Added #{oshi.name} to #{singers.name}"
  else
    puts task.errors.full_messages
  end
end

[raki, shion, meimi, yuni].each do |oshi|
  if witches.add_vtuber(oshi)
    puts "Added #{oshi.name} to #{witches.name}"
  else
    puts task.errors.full_messages
  end
end


funny = List.create!(
  name: "Funny",
  user: user2
)
[pekora, miko, bettel, axel, raki, lottie].each do |oshi|
  if funny.add_vtuber(oshi)
    puts "Added #{oshi.name} to #{funny.name}"
  else
    puts task.errors.full_messages
  end
end

english = List.create!(
  name: "JP VTubers who know some English",
  user: user2
)

[neno, youri].each do |oshi|
  if english.add_vtuber(oshi)
    puts "Added #{oshi.name} to #{english.name}"
  else
    puts task.errors.full_messages
  end
end

flood = List.create!(
  name: "Flooded Apartment",
  user: user2
)

[bettel, meimi].each do |oshi|
  if flood.add_vtuber(oshi)
    puts "Added #{oshi.name} to #{flood.name}"
  else
    puts task.errors.full_messages
  end
end

lm = ListMarker.new
lm.user = user2
lm.list = oshis
lm.save

puts "List marker created: #{lm.user.username}, #{lm.list.name}"



# raki.thumbnail.attach(
#   io: File.open(Rails.root.join('app', 'assets', 'images', 'avatars', 'sunjun_avatar.png')),
#   filename: 'sunjun_avatar.png',
#   content_type: 'image/png'
# )
# if sunjun.save
#   puts "Sunjun OK"
# else
#   puts sunjun.errors.full_messages
# end
