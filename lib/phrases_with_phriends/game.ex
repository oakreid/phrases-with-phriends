defmodule PhrasesWithPhriends.Game do
  def new_game do
    %{}
  end

<<<<<<< HEAD
  def client_view(game) do
    %{
      players: game.players,
      tiles: game.tiles,
      board: game.board,
      turn: game.turn
    }
  end

  def reset(game) do
    new_game()
=======
  def hand_state(game) do
    %{}
  end

  def board_state(game) do
    %{}
  end

  def update_submit(game, payload) do
    %{}
>>>>>>> server
  end
end
