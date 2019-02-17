defmodule PhrasesWithPhriends.Game do
  def new_game do
    %{}
  end

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
  end
end
