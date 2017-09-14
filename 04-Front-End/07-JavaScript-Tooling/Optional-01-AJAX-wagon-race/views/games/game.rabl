object @game
attribute :session_id

child @game do
  attributes :id, :winner, :status, :elapsed_time

  child :players do
    attributes :id, :name
  end
end
