require 'bundler'
Bundler.setup

require 'json'
require 'rabl'
require 'sequel'
require 'sinatra'

Rabl.configure do |config|
  config.include_json_root = false
  config.include_child_root = false
end

DB = Sequel.sqlite('sessions.sqlite3')

begin
  DB.create_table :sessions do
    primary_key :id
    column :created_at, :datetime
    column :updated_at, :datetime
  end

  DB.create_table :games do
    primary_key :id
    column :session_id,   :integer
    column :winner,       :integer
    column :status,       :string, default: 'started'
    column :elapsed_time, :integer
  end

  DB.create_table :players do
    primary_key :id
    column :game_id, :integer
    column :name,    :string
  end
rescue

end

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
    json_params = JSON.parse(request.env['rack.input'].read)
    session = Session[params[:id]]
    @game = session.add_game(Game.new)
    player1 = @game.add_player(name: json_params['players'][0]['name'])
    player2 = @game.add_player(name: json_params['players'][1]['name'])
    rabl :'games/game'
  end

  patch '/games/:id/finish', provides: [:json] do
    json_params = JSON.parse(request.env['rack.input'].read)
    @game = Game[params[:id]]
    @game.update(winner: json_params['winner'],
                 elapsed_time: json_params['elapsed_time'],
                 status: 'completed')
    @game.save
    rabl :'games/game'
  end
end

API.run! if __FILE__ == $0
