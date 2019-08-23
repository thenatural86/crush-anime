# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(name: "Philip", favorite_anime: "My Hero Academia")

Anime.create(title: "My Hero Academia",
image_url:"https://img1.ak.crunchyroll.com/i/spire1/281089c6a9e64236a10e3b4232474e411532451975_full.jpg",
main_character:"Izuku Midoriya",
description: "In a world where people with superpowers (known as 'Quirks' (個性 Kosei)) are the norm, Izuku Midoriya has dreams of one day becoming a Hero, despite being bullied by his classmates for not having a Quirk.",
likes: 0)

Anime.create(title: "Cowboy Bebop",
image_url:"https://derf9v1xhwwx1.cloudfront.net/image/upload/c_fill,q_60,h_750,w_1920/oth/FunimationStoreFront/1319362/Japanese/1319362_Japanese_ShowDetailHeroSite_880ae821-e3f3-e611-8175-020165574d09.jpg",
main_character:"Spike Spiegel",
description: "In 2071, roughly fifty years after an accident with a hyperspace gateway made the Earth almost uninhabitable, humanity has colonized most of the rocky planets and moons of the Solar System.",
likes: 0)

Anime.create(title: "Ghost in the Shell",
image_url:"https://cdn.animeuknews.net/app/uploads/2018/06/Ghost-in-the-Shell.jpg",
main_character:"Major Motoko Kusanagi",
description: "In this post-cyberpunk iteration of a possible future, computer technology has advanced to the point that many members of the public possess cyberbrains, technology that allows them to interface their biological brain with various networks.",
likes: 0)

Anime.create(title: "Hunter x Hunter",
image_url:"https://art-s.nflximg.net/ff621/3f5856a91a4a610161e0106fbc68aee595bff621.jpg",
main_character:"Gon Freecss",
description: " The story begins with a young boy named Gon Freecss, who one day discovers that the father who he thought was dead, is in fact alive and well. Gon becomes determined to follow in his father's footsteps, pass the rigorous Hunter Examination, and eventually find his father to become a Hunter in his own right.",
likes: 0)

Anime.create(title: "Neon Genesis Evanlion",
image_url:"https://assets1.ignimgs.com/2019/06/27/end-of-evangelion-br-1561679366459.jpg",
main_character:"Shinji Ikari",
description: "Evangelion is set fifteen years after a worldwide cataclysm, particularly in the futuristic fortified city of Tokyo-3. The protagonist is Shinji, a teenage boy who was recruited by his father to the shadowy organization Nerv to pilot a giant bio-machine mecha called an 'Evangelion' into combat with alien beings called 'Angels'.",
likes: 0)

(1..5).to_a.each do |useranime|
UserAnime.create(user_id: 1, anime_id: useranime)
end