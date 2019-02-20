defmodule PhrasesWithPhriends.Game do
  def new_game() do
    # TODO: fix initialization
    %{
      tile_bag: List.duplicate(' ', 2) ++
            List.duplicate('E', 12) ++
            List.duplicate('A', 9) ++
            List.duplicate('I', 9) ++
            List.duplicate('O', 8) ++
            List.duplicate('N', 6) ++
            List.duplicate('R', 6) ++
            List.duplicate('T', 6) ++
            List.duplicate('L', 4) ++
            List.duplicate('S', 4) ++
            List.duplicate('U', 4) ++
            List.duplicate('D', 4) ++
            List.duplicate('G', 3) ++
            List.duplicate('B', 2) ++
            List.duplicate('C', 2) ++
            List.duplicate('M', 2) ++
            List.duplicate('P', 2) ++
            List.duplicate('F', 2) ++
            List.duplicate('H', 2) ++
            List.duplicate('V', 2) ++
            List.duplicate('W', 2) ++
            List.duplicate('Y', 2) ++
            List.duplicate('K', 1) ++
            List.duplicate('J', 1) ++
            List.duplicate('X', 1) ++
            List.duplicate('Q', 1) ++
            List.duplicate('Z', 1) |> Enum.shuffle(),
      whose_turn: 1,
      board: [],
      number_of_players: 0,
      hands: [[], [], [], []],
      scores: []
    }
  end

  def update_submit(game, payload) do
    # TODO: add logic for when a player submits a word

    %{
      tile_bag: [],
      turn: 0,
      board: [],
      number_of_players: 0,
      hands: [[], [], [], []],
    }
  end
end
