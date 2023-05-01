require 'queries'
DATABASE_PATH = File.join(File.dirname(__FILE__), '../lib/db/jukebox.sqlite')

describe 'Queries methods' do


  let(:db) { SQLite3::Database.new(DATABASE_PATH) }

  describe 'artist_count' do
    it 'returns a Integer' do
      expect(artist_count(db)).to be_a Integer
    end

    it 'returns the number of artists in the DB' do
      expect(artist_count(db)).to eq 275
    end
  end

  describe 'number_of_rows' do

    it 'returns an Integer' do
      expect(number_of_rows(db, 'tracks')).to be_a Integer
    end

    it 'returns the number of records for a given table' do
      rows_count = {
          tracks: 3503,
          albums: 347,
          artists: 275
      }

      rows_count.each do |table, count|
        expect(number_of_rows(db, table)).to eq(count)
      end
    end

  end

  describe 'sorted_artists' do

    it 'returns the artists sorted alphabetically' do
      artists = ["A Cor Do Som", "AC/DC", "Aaron Copland & London Symphony Orchestra", "Aaron Goldberg", "Academy of St. Martin in the Fields & Sir Neville Marriner", "Academy of St. Martin in the Fields Chamber Ensemble & Sir Neville Marriner", "Academy of St. Martin in the Fields, John Birch, Sir Neville Marriner & Sylvia McNair", "Academy of St. Martin in the Fields, Sir Neville Marriner & Thurston Dart", "Academy of St. Martin in the Fields, Sir Neville Marriner & William Bennett", "Accept", "Adrian Leaper & Doreen de Feis", "Aerosmith", "Aerosmith & Sierra Leone's Refugee Allstars", "Aisha Duo", "Alanis Morissette", "Alberto Turco & Nova Schola Gregoriana", "Alice In Chains", "Amy Winehouse", "Anne-Sophie Mutter, Herbert Von Karajan & Wiener Philharmoniker", "Antal Doráti & London Symphony Orchestra", "Antônio Carlos Jobim", "Apocalyptica", "Aquaman", "Audioslave", "Avril Lavigne", "Azymuth", "Baby Consuelo", "BackBeat", "Banda Black Rio", "Barry Wordsworth & BBC Concert Orchestra", "Barão Vermelho", "Battlestar Galactica", "Battlestar Galactica (Classic)", "Bebel Gilberto", "Ben Harper", "Berliner Philharmoniker & Hans Rosbaud", "Berliner Philharmoniker & Herbert Von Karajan", "Berliner Philharmoniker, Claudio Abbado & Sabine Meyer", "Big & Rich", "Billy Cobham", "Black Eyed Peas", "Black Label Society", "Black Sabbath", "Body Count", "Boston Symphony Orchestra & Seiji Ozawa", "Britten Sinfonia, Ivor Bolton & Lesley Garrett", "Bruce Dickinson", "Buddy Guy", "C. Monteverdi, Nigel Rogers - Chiaroscuro; London Baroque; London Cornett & Sackbu", "Caetano Veloso", "Cake", "Calexico", "Charles Dutoit & L'Orchestre Symphonique de Montréal", "Charlie Brown Jr.", "Chicago Symphony Chorus, Chicago Symphony Orchestra & Sir Georg Solti", "Chicago Symphony Orchestra & Fritz Reiner", "Chico Buarque", "Chico Science & Nação Zumbi", "Choir Of Westminster Abbey & Simon Preston", "Chor der Wiener Staatsoper, Herbert Von Karajan & Wiener Philharmoniker", "Chris Cornell", "Christina Aguilera featuring BigElf", "Christopher O'Riley", "Cidade Negra", "Cláudio Zoli", "Corinne Bailey Rae", "Creedence Clearwater Revival", "Cássia Eller", "DJ Dolores & Orchestra Santa Massa", "David Coverdale", "Deep Purple", "Def Leppard", "Dennis Chambers", "Dhani Harrison & Jakob Dylan", "Djavan", "Dread Zeppelin", "Ed Motta", "Edo de Waart & San Francisco Symphony", "Edson, DJ Marky & DJ Patife Featuring Fernanda Porto", "Elis Regina", "Emanuel Ax, Eugene Ormandy & Philadelphia Orchestra", "Emerson String Quartet", "English Concert & Trevor Pinnock", "Equale Brass Ensemble, John Eliot Gardiner & Munich Monteverdi Orchestra and Choir", "Eric Clapton", "Eugene Ormandy", "Faith No More", "Falamansa", "Felix Schmidt, London Symphony Orchestra & Rafael Frühbeck de Burgos", "Fernanda Porto", "Foo Fighters", "Frank Sinatra", "Frank Zappa & Captain Beefheart", "Fretwork", "Funk Como Le Gusta", "Gene Krupa", "Gerald Moore", "Gilberto Gil", "Godsmack", "Gonzaguinha", "Green Day", "Guns N' Roses", "Gustav Mahler", "Gustavo & Andres Veiga & Salazar", "Göteborgs Symfoniker & Neeme Järvi", "Habib Koité and Bamada", "Herbert Von Karajan, Mirella Freni & Wiener Philharmoniker", "Hermeto Pascoal", "Heroes", "Hilary Hahn, Jeffrey Kahane, Los Angeles Chamber Orchestra & Margaret Batjer", "House Of Pain", "Incognito", "Instituto", "Iron Maiden", "Itzhak Perlman", "JET", "Jack Johnson", "Jack's Mannequin & Mick Fleetwood", "Jackson Browne", "Jaguares", "James Brown", "James Levine", "Jamiroquai", "Jimi Hendrix", "Joe Satriani", "Jorge Ben", "Jorge Vercilo", "Jota Quest", "João Gilberto", "João Suplicy", "Judas Priest", "Julian Bream", "Karsh Kale", "Kent Nagano and Orchestre de l'Opéra de Lyon", "Kid Abelha", "Kiss", "Led Zeppelin", "Legião Urbana", "Lenny Kravitz", "Leonard Bernstein & New York Philharmonic", "Les Arts Florissants & William Christie", "London Symphony Orchestra & Sir Charles Mackerras", "Los Hermanos", "Los Lonely Boys", "Lost", "Luciana Souza/Romero Lubambo", "Luciano Pavarotti", "Luiz Melodia", "Lulu Santos", "Marcos Valle", "Marillion", "Marisa Monte", "Martin Roscoe", "Marvin Gaye", "Matisyahu", "Maurizio Pollini", "Mela Tenenbaum, Pro Musica Prague & Richard Kapp", "Men At Work", "Metallica", "Michael Tilson Thomas & San Francisco Symphony", "Michele Campanella", "Miles Davis", "Milton Nascimento", "Milton Nascimento & Bebeto", "Motörhead", "Motörhead & Girlschool", "Mundo Livre S/A", "Mônica Marianno", "Mötley Crüe", "Nando Reis", "Nash Ensemble", "Nação Zumbi", "Nega Gizza", "Ney Matogrosso", "Nicolaus Esterhazy Sinfonia", "Nirvana", "O Rappa", "O Terço", "Olodum", "Orchestra of The Age of Enlightenment", "Orchestre Révolutionnaire et Romantique & John Eliot Gardiner", "Os Cariocas", "Os Mutantes", "Os Paralamas Do Sucesso", "Otto", "Otto Klemperer & Philharmonia Orchestra", "Ozzy Osbourne", "Page & Plant", "Passengers", "Paul D'Ianno", "Pearl Jam", "Pedro Luís & A Parede", "Pedro Luís E A Parede", "Peter Tosh", "Philharmonia Orchestra & Sir Neville Marriner", "Philip Glass Ensemble", "Pink Floyd", "Planet Hemp", "Queen", "R.E.M.", "R.E.M. Feat. KRS-One", "R.E.M. Feat. Kate Pearson", "Raimundos", "Raul Seixas", "Red Hot Chili Peppers", "Regina Spektor", "Richard Marlow & The Choir of Trinity College, Cambridge", "Rodox", "Roger Norrington, London Classical Players", "Royal Philharmonic Orchestra & Sir Thomas Beecham", "Rush", "Sabotage E Instituto", "Sandra De Sá", "Santana", "Santana Feat. Dave Matthews", "Santana Feat. Eagle-Eye Cherry", "Santana Feat. Eric Clapton", "Santana Feat. Everlast", "Santana Feat. Lauryn Hill & Cee-Lo", "Santana Feat. Maná", "Santana Feat. Rob Thomas", "Santana Feat. The Project G&B", "Scholars Baroque Ensemble", "Scorpions", "Sergei Prokofiev & Yuri Temirkanov", "Seu Jorge", "Simply Red", "Sir Georg Solti & Wiener Philharmoniker", "Sir Georg Solti, Sumi Jo & Wiener Philharmoniker", "Skank", "Smashing Pumpkins", "Snow Patrol", "Soundgarden", "Spyro Gyra", "Stereo Maracana", "Stevie Ray Vaughan & Double Trouble", "Stone Temple Pilots", "System Of A Down", "Temple of the Dog", "Terry Bozzio, Tony Levin & Steve Stevens", "The 12 Cellists of The Berlin Philharmonic", "The Black Crowes", "The Clash", "The Cult", "The Doors", "The Flaming Lips", "The King's Singers", "The Office", "The Police", "The Posies", "The Postal Service", "The Rolling Stones", "The Tea Party", "The Who", "Tim Maia", "Titãs", "Ton Koopman", "Toquinho & Vinícius", "U2", "UB40", "Van Halen", "Various Artists", "Velvet Revolver", "Vinicius, Toquinho & Quarteto Em Cy", "Vinícius De Moraes", "Vinícius De Moraes & Baden Powell", "Vinícius E Odette Lara", "Vinícius E Qurteto Em Cy", "Whitesnake", "Wilhelm Kempff", "Xis", "Yehudi Menuhin", "Yo-Yo Ma", "Youssou N'Dour", "Zeca Pagodinho"]
      result = sorted_artists(db)

      expect(result.length).to eq(artists.length)
      artists.each_with_index do |a, idx|
        expect(result).to include(a)
        expect(result.index(a)).to eq(idx)
      end
    end

  end

  describe 'love_tracks' do

    it 'returns track names containing "love"' do
      expected_tracks = [
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

      result = love_tracks(db)

      expect(result).to be_kind_of(Array)
      expect(result.length).to eq(expected_tracks.length)

      sorted_result = result.sort

      expected_tracks.each_with_index do |expected_track, index|
        expect(sorted_result[index]).to eq(expected_track)
      end
    end
  end

  describe 'long_tracks' do

    it 'returns songs with duration greater than a minimum' do
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

      result = long_tracks(db, 45)
      expect(result.length).to eq(tracks.length)
      tracks.each { |t| expect(result).to include(t) }
    end

    it 'returns tracks sorted by length' do
      tracks = [
                                        "Hero",
                                        "Three Minutes",
                                        "Maternity Leave",
                                        "\"?\"",
                                        "Dave",
                                        "The Young Lords",
                                        "Crossroads, Pt. 2",
                                        "Greetings from Earth, Pt. 2",
                                        "The Gun On Ice Planet Zero, Pt. 1",
                                        "Lost Planet of the Gods, Pt. 2",
                                        "The Lost Warrior",
                                        "Baltar's Escape",
                                        "Lost Planet of the Gods, Pt. 1",
                                        "War of the Gods, Pt. 1",
                                        "The Living Legend, Pt. 2",
                                        "War of the Gods, Pt. 2",
                                        "Experiment In Terra",
                                        "The Hand of God",
                                        "The Gun On Ice Planet Zero, Pt. 2",
                                        "The Living Legend, Pt. 1",
                                        "The Magnificent Warriors",
                                        "The Long Patrol",
                                        "Fire In Space",
                                        "Take the Celestra",
                                        "Battlestar Galactica, Pt. 3",
                                        "Murder On the Rising Star",
                                        "Battlestar Galactica, Pt. 1",
                                        "Battlestar Galactica, Pt. 2",
                                        "The Man With Nine Lives",
                                        "Greetings from Earth, Pt. 1",
                                        "Through a Looking Glass",
                                        "Occupation / Precipice"
                                      ]
      result = long_tracks(db, 45)
      tracks.each_with_index { |t, idx| expect(result.index(t)).to eq(idx) }
    end
  end

  describe 'albums_per_artist' do
    it 'returns every artist with their album count, sorted alphabetically' do
      artist_album_info = [
        ["AC/DC", 2],
        ["Aaron Copland & London Symphony Orchestra", 1],
        ["Aaron Goldberg", 1],
        ["Academy of St. Martin in the Fields & Sir Neville Marriner", 1],
        ["Academy of St. Martin in the Fields Chamber Ensemble & Sir Neville Marriner", 1],
        ["Academy of St. Martin in the Fields, John Birch, Sir Neville Marriner & Sylvia McNair", 1],
        ["Academy of St. Martin in the Fields, Sir Neville Marriner & Thurston Dart", 1],
        ["Accept", 2],
        ["Adrian Leaper & Doreen de Feis", 1],
        ["Aerosmith", 1],
        ["Aisha Duo", 1],
        ["Alanis Morissette", 1],
        ["Alberto Turco & Nova Schola Gregoriana", 1],
        ["Alice In Chains", 1],
        ["Amy Winehouse", 2],
        ["Anne-Sophie Mutter, Herbert Von Karajan & Wiener Philharmoniker", 1],
        ["Antal Doráti & London Symphony Orchestra", 1],
        ["Antônio Carlos Jobim", 2],
        ["Apocalyptica", 1],
        ["Aquaman", 1],
        ["Audioslave", 3],
        ["BackBeat", 1],
        ["Barry Wordsworth & BBC Concert Orchestra", 1],
        ["Battlestar Galactica", 2],
        ["Battlestar Galactica (Classic)", 1],
        ["Berliner Philharmoniker & Hans Rosbaud", 1],
        ["Berliner Philharmoniker & Herbert Von Karajan", 3],
        ["Berliner Philharmoniker, Claudio Abbado & Sabine Meyer", 1],
        ["Billy Cobham", 1],
        ["Black Label Society", 2],
        ["Black Sabbath", 2],
        ["Body Count", 1],
        ["Boston Symphony Orchestra & Seiji Ozawa", 1],
        ["Britten Sinfonia, Ivor Bolton & Lesley Garrett", 1],
        ["Bruce Dickinson", 1],
        ["Buddy Guy", 1],
        ["C. Monteverdi, Nigel Rogers - Chiaroscuro; London Baroque; London Cornett & Sackbu", 1],
        ["Caetano Veloso", 2],
        ["Cake", 1],
        ["Calexico", 1],
        ["Charles Dutoit & L'Orchestre Symphonique de Montréal", 1],
        ["Chicago Symphony Chorus, Chicago Symphony Orchestra & Sir Georg Solti", 1],
        ["Chicago Symphony Orchestra & Fritz Reiner", 1],
        ["Chico Buarque", 1],
        ["Chico Science & Nação Zumbi", 2],
        ["Choir Of Westminster Abbey & Simon Preston", 1],
        ["Chor der Wiener Staatsoper, Herbert Von Karajan & Wiener Philharmoniker", 1],
        ["Chris Cornell", 1],
        ["Christopher O'Riley", 1],
        ["Cidade Negra", 2],
        ["Cláudio Zoli", 1],
        ["Creedence Clearwater Revival", 2],
        ["Cássia Eller", 2],
        ["David Coverdale", 1],
        ["Deep Purple", 11],
        ["Def Leppard", 1],
        ["Dennis Chambers", 1],
        ["Djavan", 2],
        ["Dread Zeppelin", 1],
        ["Ed Motta", 1],
        ["Edo de Waart & San Francisco Symphony", 1],
        ["Elis Regina", 1],
        ["Emanuel Ax, Eugene Ormandy & Philadelphia Orchestra", 1],
        ["Emerson String Quartet", 1],
        ["English Concert & Trevor Pinnock", 2],
        ["Equale Brass Ensemble, John Eliot Gardiner & Munich Monteverdi Orchestra and Choir", 1],
        ["Eric Clapton", 2],
        ["Eugene Ormandy", 3],
        ["Faith No More", 4],
        ["Falamansa", 1],
        ["Felix Schmidt, London Symphony Orchestra & Rafael Frühbeck de Burgos", 1],
        ["Foo Fighters", 4],
        ["Frank Sinatra", 1],
        ["Frank Zappa & Captain Beefheart", 1],
        ["Fretwork", 1],
        ["Funk Como Le Gusta", 1],
        ["Gene Krupa", 1],
        ["Gerald Moore", 1],
        ["Gilberto Gil", 3],
        ["Godsmack", 1],
        ["Gonzaguinha", 1],
        ["Green Day", 2],
        ["Guns N' Roses", 3],
        ["Gustav Mahler", 1],
        ["Göteborgs Symfoniker & Neeme Järvi", 1],
        ["Habib Koité and Bamada", 1],
        ["Herbert Von Karajan, Mirella Freni & Wiener Philharmoniker", 1],
        ["Heroes", 1],
        ["Hilary Hahn, Jeffrey Kahane, Los Angeles Chamber Orchestra & Margaret Batjer", 1],
        ["House Of Pain", 1],
        ["Incognito", 1],
        ["Iron Maiden", 21],
        ["Itzhak Perlman", 1],
        ["JET", 1],
        ["James Brown", 1],
        ["James Levine", 1],
        ["Jamiroquai", 3],
        ["Jimi Hendrix", 1],
        ["Joe Satriani", 1],
        ["Jorge Ben", 1],
        ["Jota Quest", 1],
        ["João Suplicy", 1],
        ["Judas Priest", 1],
        ["Julian Bream", 1],
        ["Karsh Kale", 1],
        ["Kent Nagano and Orchestre de l'Opéra de Lyon", 1],
        ["Kiss", 2],
        ["Led Zeppelin", 14],
        ["Legião Urbana", 2],
        ["Lenny Kravitz", 1],
        ["Leonard Bernstein & New York Philharmonic", 1],
        ["Les Arts Florissants & William Christie", 1],
        ["London Symphony Orchestra & Sir Charles Mackerras", 1],
        ["Lost", 4],
        ["Luciana Souza/Romero Lubambo", 1],
        ["Luciano Pavarotti", 1],
        ["Lulu Santos", 2],
        ["Marcos Valle", 1],
        ["Marillion", 1],
        ["Marisa Monte", 1],
        ["Martin Roscoe", 1],
        ["Marvin Gaye", 1],
        ["Maurizio Pollini", 1],
        ["Mela Tenenbaum, Pro Musica Prague & Richard Kapp", 1],
        ["Men At Work", 1],
        ["Metallica", 10],
        ["Michael Tilson Thomas & San Francisco Symphony", 2],
        ["Michele Campanella", 1],
        ["Miles Davis", 3],
        ["Milton Nascimento", 2],
        ["Motörhead", 1],
        ["Mônica Marianno", 1],
        ["Mötley Crüe", 1],
        ["Nash Ensemble", 1],
        ["Nicolaus Esterhazy Sinfonia", 1],
        ["Nirvana", 2],
        ["O Rappa", 1],
        ["O Terço", 1],
        ["Olodum", 1],
        ["Orchestra of The Age of Enlightenment", 1],
        ["Orchestre Révolutionnaire et Romantique & John Eliot Gardiner", 1],
        ["Os Mutantes", 1],
        ["Os Paralamas Do Sucesso", 3],
        ["Otto Klemperer & Philharmonia Orchestra", 1],
        ["Ozzy Osbourne", 6],
        ["Page & Plant", 1],
        ["Passengers", 1],
        ["Paul D'Ianno", 1],
        ["Pearl Jam", 5],
        ["Philharmonia Orchestra & Sir Neville Marriner", 1],
        ["Philip Glass Ensemble", 1],
        ["Pink Floyd", 1],
        ["Planet Hemp", 1],
        ["Queen", 3],
        ["R.E.M.", 3],
        ["R.E.M. Feat. Kate Pearson", 1],
        ["Raimundos", 1],
        ["Raul Seixas", 1],
        ["Red Hot Chili Peppers", 3],
        ["Richard Marlow & The Choir of Trinity College, Cambridge", 1],
        ["Roger Norrington, London Classical Players", 1],
        ["Royal Philharmonic Orchestra & Sir Thomas Beecham", 1],
        ["Rush", 1],
        ["Santana", 3],
        ["Scholars Baroque Ensemble", 1],
        ["Scorpions", 1],
        ["Sergei Prokofiev & Yuri Temirkanov", 1],
        ["Sir Georg Solti & Wiener Philharmoniker", 1],
        ["Sir Georg Solti, Sumi Jo & Wiener Philharmoniker", 1],
        ["Skank", 2],
        ["Smashing Pumpkins", 2],
        ["Soundgarden", 1],
        ["Spyro Gyra", 2],
        ["Stevie Ray Vaughan & Double Trouble", 1],
        ["Stone Temple Pilots", 1],
        ["System Of A Down", 1],
        ["Temple of the Dog", 1],
        ["Terry Bozzio, Tony Levin & Steve Stevens", 1],
        ["The 12 Cellists of The Berlin Philharmonic", 1],
        ["The Black Crowes", 2],
        ["The Clash", 1],
        ["The Cult", 2],
        ["The Doors", 1],
        ["The King's Singers", 1],
        ["The Office", 3],
        ["The Police", 1],
        ["The Posies", 1],
        ["The Rolling Stones", 3],
        ["The Tea Party", 2],
        ["The Who", 1],
        ["Tim Maia", 2],
        ["Titãs", 2],
        ["Ton Koopman", 1],
        ["Toquinho & Vinícius", 1],
        ["U2", 10],
        ["UB40", 1],
        ["Van Halen", 4],
        ["Various Artists", 4],
        ["Velvet Revolver", 1],
        ["Vinícius De Moraes", 1],
        ["Wilhelm Kempff", 1],
        ["Yehudi Menuhin", 1],
        ["Yo-Yo Ma", 1],
        ["Zeca Pagodinho", 1]
      ]

      result = albums_per_artist(db)
      expect(result).to be_kind_of(Array)
      expect(result.first).to be_kind_of(Array)
      expect(result.length).to eq(artist_album_info.length)
      artist_album_info.each_with_index do |info, idx|
        expect(result.index(info)).to eq(idx)
        expect(result[idx].last).to eq(info.last)
      end
    end
  end
end
