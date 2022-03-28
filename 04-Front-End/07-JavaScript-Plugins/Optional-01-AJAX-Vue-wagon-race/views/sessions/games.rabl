object @session
attribute id: :session_id

node :games do |session|
  {
    started: session.started_game_ids,
    completed: session.completed_game_ids
  }
end
