require "spec_helper"
require_relative "../app/queries"

describe "Challenges in app/queries.rb" do
  describe 'reversed_sorted_artists' do

    it 'returns the artists sorted alphabetically in reverse order' do
      artists = ["A Cor Do Som", "AC/DC", "Aaron Copland & London Symphony Orchestra", "Aaron Goldberg", "Academy of St. Martin in the Fields & Sir Neville Marriner", "Academy of St. Martin in the Fields Chamber Ensemble & Sir Neville Marriner", "Academy of St. Martin in the Fields, John Birch, Sir Neville Marriner & Sylvia McNair", "Academy of St. Martin in the Fields, Sir Neville Marriner & Thurston Dart", "Academy of St. Martin in the Fields, Sir Neville Marriner & William Bennett", "Accept", "Adrian Leaper & Doreen de Feis", "Aerosmith", "Aerosmith & Sierra Leone's Refugee Allstars", "Aisha Duo", "Alanis Morissette", "Alberto Turco & Nova Schola Gregoriana", "Alice In Chains", "Amy Winehouse", "Anne-Sophie Mutter, Herbert Von Karajan & Wiener Philharmoniker", "Antal Doráti & London Symphony Orchestra", "Antônio Carlos Jobim", "Apocalyptica", "Aquaman", "Audioslave", "Avril Lavigne", "Azymuth", "Baby Consuelo", "BackBeat", "Banda Black Rio", "Barry Wordsworth & BBC Concert Orchestra", "Barão Vermelho", "Battlestar Galactica", "Battlestar Galactica (Classic)", "Bebel Gilberto", "Ben Harper", "Berliner Philharmoniker & Hans Rosbaud", "Berliner Philharmoniker & Herbert Von Karajan", "Berliner Philharmoniker, Claudio Abbado & Sabine Meyer", "Big & Rich", "Billy Cobham", "Black Eyed Peas", "Black Label Society", "Black Sabbath", "Body Count", "Boston Symphony Orchestra & Seiji Ozawa", "Britten Sinfonia, Ivor Bolton & Lesley Garrett", "Bruce Dickinson", "Buddy Guy", "C. Monteverdi, Nigel Rogers - Chiaroscuro; London Baroque; London Cornett & Sackbu", "Caetano Veloso", "Cake", "Calexico", "Charles Dutoit & L'Orchestre Symphonique de Montréal", "Charlie Brown Jr.", "Chicago Symphony Chorus, Chicago Symphony Orchestra & Sir Georg Solti", "Chicago Symphony Orchestra & Fritz Reiner", "Chico Buarque", "Chico Science & Nação Zumbi", "Choir Of Westminster Abbey & Simon Preston", "Chor der Wiener Staatsoper, Herbert Von Karajan & Wiener Philharmoniker", "Chris Cornell", "Christina Aguilera featuring BigElf", "Christopher O'Riley", "Cidade Negra", "Cláudio Zoli", "Corinne Bailey Rae", "Creedence Clearwater Revival", "Cássia Eller", "DJ Dolores & Orchestra Santa Massa", "David Coverdale", "Deep Purple", "Def Leppard", "Dennis Chambers", "Dhani Harrison & Jakob Dylan", "Djavan", "Dread Zeppelin", "Ed Motta", "Edo de Waart & San Francisco Symphony", "Edson, DJ Marky & DJ Patife Featuring Fernanda Porto", "Elis Regina", "Emanuel Ax, Eugene Ormandy & Philadelphia Orchestra", "Emerson String Quartet", "English Concert & Trevor Pinnock", "Equale Brass Ensemble, John Eliot Gardiner & Munich Monteverdi Orchestra and Choir", "Eric Clapton", "Eugene Ormandy", "Faith No More", "Falamansa", "Felix Schmidt, London Symphony Orchestra & Rafael Frühbeck de Burgos", "Fernanda Porto", "Foo Fighters", "Frank Sinatra", "Frank Zappa & Captain Beefheart", "Fretwork", "Funk Como Le Gusta", "Gene Krupa", "Gerald Moore", "Gilberto Gil", "Godsmack", "Gonzaguinha", "Green Day", "Guns N' Roses", "Gustav Mahler", "Gustavo & Andres Veiga & Salazar", "Göteborgs Symfoniker & Neeme Järvi", "Habib Koité and Bamada", "Herbert Von Karajan, Mirella Freni & Wiener Philharmoniker", "Hermeto Pascoal", "Heroes", "Hilary Hahn, Jeffrey Kahane, Los Angeles Chamber Orchestra & Margaret Batjer", "House Of Pain", "Incognito", "Instituto", "Iron Maiden", "Itzhak Perlman", "JET", "Jack Johnson", "Jack's Mannequin & Mick Fleetwood", "Jackson Browne", "Jaguares", "James Brown", "James Levine", "Jamiroquai", "Jimi Hendrix", "Joe Satriani", "Jorge Ben", "Jorge Vercilo", "Jota Quest", "João Gilberto", "João Suplicy", "Judas Priest", "Julian Bream", "Karsh Kale", "Kent Nagano and Orchestre de l'Opéra de Lyon", "Kid Abelha", "Kiss", "Led Zeppelin", "Legião Urbana", "Lenny Kravitz", "Leonard Bernstein & New York Philharmonic", "Les Arts Florissants & William Christie", "London Symphony Orchestra & Sir Charles Mackerras", "Los Hermanos", "Los Lonely Boys", "Lost", "Luciana Souza/Romero Lubambo", "Luciano Pavarotti", "Luiz Melodia", "Lulu Santos", "Marcos Valle", "Marillion", "Marisa Monte", "Martin Roscoe", "Marvin Gaye", "Matisyahu", "Maurizio Pollini", "Mela Tenenbaum, Pro Musica Prague & Richard Kapp", "Men At Work", "Metallica", "Michael Tilson Thomas & San Francisco Symphony", "Michele Campanella", "Miles Davis", "Milton Nascimento", "Milton Nascimento & Bebeto", "Motörhead", "Motörhead & Girlschool", "Mundo Livre S/A", "Mônica Marianno", "Mötley Crüe", "Nando Reis", "Nash Ensemble", "Nação Zumbi", "Nega Gizza", "Ney Matogrosso", "Nicolaus Esterhazy Sinfonia", "Nirvana", "O Rappa", "O Terço", "Olodum", "Orchestra of The Age of Enlightenment", "Orchestre Révolutionnaire et Romantique & John Eliot Gardiner", "Os Cariocas", "Os Mutantes", "Os Paralamas Do Sucesso", "Otto", "Otto Klemperer & Philharmonia Orchestra", "Ozzy Osbourne", "Page & Plant", "Passengers", "Paul D'Ianno", "Pearl Jam", "Pedro Luís & A Parede", "Pedro Luís E A Parede", "Peter Tosh", "Philharmonia Orchestra & Sir Neville Marriner", "Philip Glass Ensemble", "Pink Floyd", "Planet Hemp", "Queen", "R.E.M.", "R.E.M. Feat. KRS-One", "R.E.M. Feat. Kate Pearson", "Raimundos", "Raul Seixas", "Red Hot Chili Peppers", "Regina Spektor", "Richard Marlow & The Choir of Trinity College, Cambridge", "Rodox", "Roger Norrington, London Classical Players", "Royal Philharmonic Orchestra & Sir Thomas Beecham", "Rush", "Sabotage E Instituto", "Sandra De Sá", "Santana", "Santana Feat. Dave Matthews", "Santana Feat. Eagle-Eye Cherry", "Santana Feat. Eric Clapton", "Santana Feat. Everlast", "Santana Feat. Lauryn Hill & Cee-Lo", "Santana Feat. Maná", "Santana Feat. Rob Thomas", "Santana Feat. The Project G&B", "Scholars Baroque Ensemble", "Scorpions", "Sergei Prokofiev & Yuri Temirkanov", "Seu Jorge", "Simply Red", "Sir Georg Solti & Wiener Philharmoniker", "Sir Georg Solti, Sumi Jo & Wiener Philharmoniker", "Skank", "Smashing Pumpkins", "Snow Patrol", "Soundgarden", "Spyro Gyra", "Stereo Maracana", "Stevie Ray Vaughan & Double Trouble", "Stone Temple Pilots", "System Of A Down", "Temple of the Dog", "Terry Bozzio, Tony Levin & Steve Stevens", "The 12 Cellists of The Berlin Philharmonic", "The Black Crowes", "The Clash", "The Cult", "The Doors", "The Flaming Lips", "The King's Singers", "The Office", "The Police", "The Posies", "The Postal Service", "The Rolling Stones", "The Tea Party", "The Who", "Tim Maia", "Titãs", "Ton Koopman", "Toquinho & Vinícius", "U2", "UB40", "Van Halen", "Various Artists", "Velvet Revolver", "Vinicius, Toquinho & Quarteto Em Cy", "Vinícius De Moraes", "Vinícius De Moraes & Baden Powell", "Vinícius E Odette Lara", "Vinícius E Qurteto Em Cy", "Whitesnake", "Wilhelm Kempff", "Xis", "Yehudi Menuhin", "Yo-Yo Ma", "Youssou N'Dour", "Zeca Pagodinho"]
      artists.reverse!
      result = reversed_sorted_artists.map &:name

      expect(result.length).to eq(artists.length)
      artists.each_with_index do |a, idx|
        expect(result).to include(a)
        expect(result.index(a)).to eq(idx)
      end
    end

    it 'should be an ActiveRecord Relation' do
      expect(reversed_sorted_artists).to be_kind_of(ActiveRecord::Relation)
    end
  end

  describe 'love_tracks' do
    it 'returns tracks with names containing "love"' do

      tracks = [
        "(I Can't Help) Falling In Love With You",
        "(There Is) No Greater Love (Teo Licks)",
        "Ain't Talkin' 'Bout Love",
        "Ain't Talkin' 'bout Love",
        "All My Love",
        "All My Love",
        "Arms Around Your Love",
        "Believe in Love",
        "Calling Dr. Love",
        "Cascades : I'm Not Your Lover",
        "Crazy Little Thing Called Love",
        "Cry For Love",
        "Dirty Love",
        "Do You Feel Loved",
        "Do You Have Other Loves?",
        "Do You Love Me",
        "Do You Love Me",
        "Don't Take Your Love From Me",
        "Everlasting Love",
        "Feel Your Love Tonight",
        "Freestyle Love",
        "Get Down, Make Love",
        "Give Me Love",
        "Gonna Give Her All The Love I've Got",
        "Gonna Keep On Tryin' Till I Win Your Love",
        "Good Old-Fashioned Lover Boy",
        "Heavy Love Affair",
        "House Of Love",
        "I Heard Love Is Blind",
        "I Need Love",
        "I Still Love You",
        "Is This Love",
        "Is This Love (Live)",
        "It's Only Love",
        "Jesus Of Suburbia / City Of The Damned / I Don't Care / Dearly Beloved / Tales Of Another Broken Home",
        "Let Love Rule",
        "Let Me Love You Baby",
        "Let Me Love You Baby",
        "Living On Love",
        "Looking For Love",
        "Loud Love",
        "Love",
        "Love Ain't No Stranger",
        "Love And Marriage",
        "Love And Peace Or Else",
        "Love Bites",
        "Love Boat Captain",
        "Love Child",
        "Love Comes",
        "Love Comes Tumbling",
        "Love Conquers All",
        "Love Don't Mean a Thing",
        "Love Gun",
        "Love In An Elevator",
        "Love Is Blind",
        "Love Is Blindness",
        "Love Is Strong",
        "Love Is The Colour",
        "Love Is a Losing Game",
        "Love Me Darlin'",
        "Love Me Like A Reptile",
        "Love Of My Life",
        "Love Or Confusion",
        "Love Removal Machine",
        "Love Rescue Me",
        "Love, Hate, Love",
        "Loverman",
        "Loves Been Good To Me",
        "Luminous Times (Hold On To Love)",
        "Make Love Like A Man",
        "May This Be Love",
        "My Love",
        "My Lovely Man",
        "New Love",
        "Nothing But Love",
        "Oh, My Love",
        "Old Love",
        "Pride (In The Name Of Love)",
        "Pride (In The Name Of Love)",
        "Real Love",
        "Real Love",
        "Rhythm of Love",
        "Rollover D.J.",
        "She Loves Me Not",
        "Somebody To Love",
        "Stand Inside Your Love",
        "Summer Love",
        "Sunshine Of Your Love",
        "Talk About Love",
        "The Deeper The Love",
        "The Girl I Love She Got Long Black Wavy Hair",
        "The One I Love",
        "The Thin Line Between Love & Hate",
        "This Velvet Glove",
        "Too Fast For Love",
        "Turbo Lover",
        "Um Love",
        "Underwater Love",
        "Wasting Love",
        "Wasting Love",
        "Wasting Love",
        "What Now My Love",
        "When I Had Your Love",
        "When It's Love",
        "When Love & Hate Collide",
        "When Love Comes To Town",
        "When Love Comes To Town",
        "Whole Lotta Love",
        "Whole Lotta Love",
        "Whole Lotta Love",
        "Whole Lotta Love (Medley)",
        "Why Can't This Be Love",
        "You Can't Do it Right (With the One You Love)",
        "You Sure Love To Ball"
      ]
      result = love_tracks.map &:name

      expect(result.length).to eq(tracks.length)
      tracks.each { |t| expect(result).to include(t) }
    end

    it 'should be an ActiveRecord Relation' do
      expect(love_tracks).to be_kind_of(ActiveRecord::Relation)
    end
  end

  describe 'long_tracks' do

    it 'returns songs with duration greater than the minimum' do
      tracks = [
        "Occupation / Precipice",
        "Hero",
        "Crossroads, Pt. 2",
        "Maternity Leave",
        "Dave",
        "\"?\"",
        "Three Minutes",
        "Through a Looking Glass",
        "Battlestar Galactica, Pt. 1",
        "Battlestar Galactica, Pt. 2",
        "Battlestar Galactica, Pt. 3",
        "Lost Planet of the Gods, Pt. 1",
        "Lost Planet of the Gods, Pt. 2",
        "The Lost Warrior",
        "The Long Patrol",
        "The Gun On Ice Planet Zero, Pt. 1",
        "The Gun On Ice Planet Zero, Pt. 2",
        "The Magnificent Warriors",
        "The Young Lords",
        "The Living Legend, Pt. 1",
        "The Living Legend, Pt. 2",
        "Fire In Space",
        "War of the Gods, Pt. 1",
        "War of the Gods, Pt. 2",
        "The Man With Nine Lives",
        "Murder On the Rising Star",
        "Greetings from Earth, Pt. 1",
        "Greetings from Earth, Pt. 2",
        "Baltar's Escape",
        "Experiment In Terra",
        "Take the Celestra",
        "The Hand of God"
      ]

      result = long_tracks(45).map &:name

      expect(result.length).to eq(tracks.length)
      tracks.each { |t| expect(result).to include(t) }
    end

    it 'should be an ActiveRecord Relation' do
      expect(long_tracks(45)).to be_kind_of(ActiveRecord::Relation)
    end
  end

  describe 'top_five_artists' do
    before(:all) do
      @top_5_rock = top_five_artists('Rock')
    end

    it 'returns a list of artists' do
      expect(@top_5_rock).to be_kind_of(ActiveRecord::Relation)
      expect(@top_5_rock.first).to be_a Artist
    end

    it 'returns the TOP 5 artists for Rock' do
      expect(@top_5_rock[0].name).to eq 'Led Zeppelin'
      expect(@top_5_rock[1].name).to eq 'U2'
      expect(@top_5_rock[2].name).to eq 'Deep Purple'
      expect(@top_5_rock[3].name).to eq 'Iron Maiden'
      expect(@top_5_rock[4].name).to eq 'Pearl Jam'
    end

    it 'only returns 5 artists, no more or less' do
      expect(@top_5_rock.length).to eq 5
    end

    it 'returns the TOP 5 artists for Pop' do
      top_5_pop = top_five_artists('Pop')
      expect(top_5_pop[0].name).to eq 'U2'
      expect(top_5_pop[1].name).to eq 'Various Artists'
      expect(top_5_pop[2].name).to eq 'Amy Winehouse'
      # Only 3 artists have POP songs in the DB.
    end
  end
end
