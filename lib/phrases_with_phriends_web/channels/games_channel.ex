defmodule PhrasesWithPhriendsWeb.GamesChannel do
  use PhrasesWithPhriendsWeb, :channel

  def join("games:" <> name, payload, socket) do
    if authorized?(name) do
      temp = PhrasesWithPhriends.BackupAgent.get(name) || PhrasesWithPhriends.Game.new_game()
      game = Map.put(temp, :number_of_players, temp[:number_of_players] + 1)
      socket = socket
      |> assign(:game, game)
      |> assign(:name, name)
      |> assign(:num, game.number_of_players)
      PhrasesWithPhriends.BackupAgent.put(name, game)
      if socket.assigns[:num] > 1 do
        others_new_state =
          %{
            "scores" => game.scores
          }
        broadcast_from(socket, :game, others_new_state)
      end
      sender_new_state =
        %{
          "player_num" => socket.assigns[:num],
          "join" => name,
          "board" => game.board,
          "scores" => game.scores,
          "hand" => game.hands[socket.assigns[:num] - 1],
          "whose_turn" => game.whose_turn
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
        "board" => game.board,
        "scores" => game.scores,
        "whose_turn" => game.whose_turn
      }
    sender_new_state =
      %{
        "scores" => game.scores,
        "hand" => game.hands[num - 1],
        "whose_turn" => game.whose_turn
      }
    broadcast_from(socket, :game, others_new_state)
    {:reply, {:ok, sender_new_state, socket}}
  end

  # Add authorization logic here as required.
  defp authorized?(name) do
    PhrasesWithPhriends.BackupAgent.get(name)[:number_of_players] == nil
    || PhrasesWithPhriends.BackupAgent.get(name)[:number_of_players] < 4
  end
end
