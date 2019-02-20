defmodule PhrasesWithPhriends.Game do
  def new_game() do
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
      turn: 0,
      board: List.duplicate(nil, 255),
      number_of_players: 0,
      hands: [],
      scores: [0, 0, 0, 0]
    }
  end

  def update_submit(game, payload, player_num) do
    new_turn =
      if player_num == 3 do
        0
      else
        player_num + 1
      end

    new_player_score = Enum.fetch(game[:scores], player_num) + payload[:word_value]
    new_scores = List.insert_at(game[:scores], player_num, new_player_score)

    amt_missing_from_hand = 7 - length(payload[:hand])
    new_hand = Enum.slice(game[:tile_bag], 0, amt_missing_from_hand)
    new_hands = List.insert_at(game[:hands], player_num, new_hand)
    new_tile_bag = Enum.slice(game[:tile_bag], amt_missing_from_hand, 999999)

    %{
      tile_bag: new_tile_bag,
      turn: new_turn,
      board: payload[:new_board],
      number_of_players: game[:number_of_players],
      hands: new_hands,
      scores: new_scores
    }
  end
end
