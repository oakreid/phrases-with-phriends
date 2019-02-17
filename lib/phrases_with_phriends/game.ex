defmodule PhrasesWithPhriends.Game do
  def fresh_state() do
    %{
      tile_bag: %{
        ' ': %{ points: 0, count: 2 },
        'E': %{ points: 1, count: 12 },
        'A': %{ points: 1, count: 9 },
        'I': %{ points: 1, count: 9 },
        'O': %{ points: 1, count: 8 },
        'N': %{ points: 1, count: 6 },
        'R': %{ points: 1, count: 6 },
        'T': %{ points: 1, count: 6 },
        'L': %{ points: 1, count: 4 },
        'S': %{ points: 1, count: 4 },
        'U': %{ points: 1, count: 4 },
        'D': %{ points: 2, count: 4 },
        'G': %{ points: 2, count: 3 },
        'B': %{ points: 3, count: 2 },
        'C': %{ points: 3, count: 2 },
        'M': %{ points: 3, count: 2 },
        'P': %{ points: 3, count: 2 },
        'F': %{ points: 4, count: 2 },
        'H': %{ points: 4, count: 2 },
        'V': %{ points: 4, count: 2 },
        'W': %{ points: 4, count: 2 },
        'Y': %{ points: 4, count: 2 },
        'K': %{ points: 5, count: 1 },
        'J': %{ points: 8, count: 1 },
        'X': %{ points: 8, count: 1 },
        'Q': %{ points: 10, count: 1 },
        'Z': %{ points: 10, count: 1 }
      },
      whose_turn: 0,
      players_hands: [[], [], [], []],
      number_of_players: 1
    }
  end

  def hand_state(game) do
    %{}
  end

  def board_state(game) do
    %{}
  end

  def update_submit(game, payload) do
    %{}
  end
end
