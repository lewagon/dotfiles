require "sinatra"
require "rabl"
require "active_support/core_ext"
require "active_support/inflector"
require "bundler"
require "sequel"

Rabl.configure do |config|
  config.include_json_root = false
  config.include_child_root = false
end

DB = Sequel.sqlite('sessions.sqlite3')

class Session < Sequel::Model
  one_to_many :games

  def started_game_ids
    games_dataset.where(status: 'started').select_map(:id)
  end

  def completed_game_ids
    games_dataset.where(status: 'completed').select_map(:id)
  end
end
Session.plugin :timestamps, update_on_create: true

class Game < Sequel::Model
  many_to_one :session
  one_to_many :players
end

class Player < Sequel::Model
  many_to_one :game
end

class API < Sinatra::Base
  get '/' do
    redirect '/index.html'
  end

  post '/sessions', provides: [:json] do
    @session = Session.create
    rabl :'sessions/create'
  end

  get '/sessions/:id/games', provides: [:json] do
    @session = Session[params[:id]]
    if @session
      rabl :'sessions/games'
    else
      status 404
      { error: 'Session not found' }.to_json
    end
  end

  get '/games/:id/results', provides: [:json] do
    @game = Game[params[:id]]
    if @game
      rabl :'games/game'
    else
      status 404
      { error: 'Game not found' }.to_json
    end
  end

  post '/sessions/:id/games', provides: [:json] do
    session = Session[params[:id]]
    @game = session.add_game(Game.new)

    payload = JSON.parse(request.body.read)
    @game.add_player(name: payload["player1"])
    @game.add_player(name: payload["player2"])

    rabl :'games/game'
  end

  patch '/games/:id/finish', provides: [:json] do
    @game = Game[params[:id]]
    payload = JSON.parse(request.body.read)
    @game.update(winner: payload['winner'],
                 elapsed_time: payload['elapsed_time'],
                 status: 'completed')
    @game.save
    rabl :'games/game'
  end
end

API.run! if __FILE__ == $PROGRAM_NAME
