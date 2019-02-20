defmodule PhrasesWithPhriendsWeb.GamesChannel do
  use PhrasesWithPhriendsWeb, :channel

  def join("games:" <> name, payload, socket) do
    if authorized?(name) do
      game = PhrasesWithPhriends.BackupAgent.get(name) || PhrasesWithPhriends.Game.new_game()
      game = Map.put(game, :number_of_players, game[:number_of_players] + 1)
      num = game[:number_of_players] - 1
      hand = Enum.slice(game[:tile_bag], 0, 7)
      game = Map.put(game, :tile_bag, Enum.slice(game[:tile_bag], 7, 999999))
      hands =
        if num == 0 do
          [hand]
        else
          game[:hands] ++ [hand]
        end
      game = Map.put(game, :hands, hands)
      socket = socket
      |> assign(:game, game)
      |> assign(:name, name)
      |> assign(:num, num)
      PhrasesWithPhriends.BackupAgent.put(name, game)
      sender_new_state =
        %{
          player: %{
            number: num,
            hand: hand
          },
          board: game.board,
          scores: game.scores,
          turn: game.turn
        }
      {:ok, sender_new_state, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client

  def handle_in("submit", payload, socket) do
    name = socket.assigns[:name]
    num = socket.assigns[:num]
    game = PhrasesWithPhriends.Game.update_submit(socket.assigns[:game], payload, num)
    socket = assign(socket, :game, game)
    PhrasesWithPhriends.BackupAgent.put(name, game)
    others_new_state =
      %{
        board: game.board,
        scores: game.scores,
        turn: game.whose_turn
      }
    sender_new_state =
      %{
        player: %{
          number: num,
          hand: game.hands[num]
        },
        scores: game.scores,
        turn: game.whose_turn
      }
    broadcast_from(socket, "other_submit", others_new_state)
    {:reply, {:ok, sender_new_state, socket}}
  end

  # Add authorization logic here as required.
  defp authorized?(name) do
    PhrasesWithPhriends.BackupAgent.get(name)[:number_of_players] == nil
    || PhrasesWithPhriends.BackupAgent.get(name)[:number_of_players] < 4
  end
end
