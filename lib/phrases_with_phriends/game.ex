defmodule PhrasesWithPhriends.Game do
  def new_game() do
    %{
      tiles: List.duplicate(" ", 2) ++
            List.duplicate("E", 12) ++
            List.duplicate("A", 9) ++
            List.duplicate("I", 9) ++
            List.duplicate("O", 8) ++
            List.duplicate("N", 6) ++
            List.duplicate("R", 6) ++
            List.duplicate("T", 6) ++
            List.duplicate("L", 4) ++
            List.duplicate("S", 4) ++
            List.duplicate("U", 4) ++
            List.duplicate("D", 4) ++
            List.duplicate("G", 3) ++
            List.duplicate("B", 2) ++
            List.duplicate("C", 2) ++
            List.duplicate("M", 2) ++
            List.duplicate("P", 2) ++
            List.duplicate("F", 2) ++
            List.duplicate("H", 2) ++
            List.duplicate("V", 2) ++
            List.duplicate("W", 2) ++
            List.duplicate("Y", 2) ++
            List.duplicate("K", 1) ++
            List.duplicate("J", 1) ++
            List.duplicate("X", 1) ++
            List.duplicate("Q", 1) ++
            List.duplicate("Z", 1) |> Enum.shuffle(),
      turn: 0,
      board: [],
      players: [],
    }
  end

  def client_view(game) do
    %{
      players: game.players,
      tiles: game.tiles,
      board: game.board,
      turn: game.turn
    }
  end

  def player_join(name, game) do
    %{
      players: game.players ++ [
        %{
          name: name,
          hand: [],
          score: 0
        }
      ],
      tiles: game.tiles,
      board: game.board,
      turn: game.turn
    }
  end

  def player_state(game) do
    game.players
  end

  def board_state(game) do
    game.board
  end

  def reset(game) do
    new_game()
  end
end
