defmodule PhrasesWithPhriendsWeb.GamesChannel do
  use PhrasesWithPhriendsWeb, :channel

  def join("games:" <> name, payload, socket) do
    if authorized?(name) do
      game = PhrasesWithPhriends.BackupAgent.get(name) || PhrasesWithPhriends.Game.new_game()
      socket = socket
      |> assign(:game, game)
      |> assign(:name, name)
      PhrasesWithPhriends.BackupAgent.put(name, game)
      sender_new_state =
        %{
          "join" => PhrasesWithPhriends.Game.player_join(name, game),
          "board" => PhrasesWithPhriends.Game.board_state(game),
          "players" => PhrasesWithPhriends.Game.player_state(game),
          "game" => PhrasesWithPhriends.Game.client_view(game)
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
    game = PhrasesWithPhriends.Game.update_submit(socket.assigns[:game], payload)
    socket = assign(socket, :game, game)
    PhrasesWithPhriends.Game.put(name, game)
    others_new_state =
      %{
        "board" => PhrasesWithPhriends.Game.board_state(game),
        "players" => [] # empty hand received -> no updates to personal tiles
      }
    sender_new_state =
      %{
        "board" => PhrasesWithPhriends.Game.board_state(game),
        "players" => PhrasesWithPhriends.Game.player_state(game)
      }
    broadcast_from(socket, :game, others_new_state)
    {:reply, {:ok, sender_new_state, socket}}
  end

  # Add authorization logic here as required.
  defp authorized?(name) do
    if PhrasesWithPhriends.BackupAgent.get(name)[:number_of_players] == nil
    || PhrasesWithPhriends.BackupAgent.get(name)[:number_of_players] < 4 do
      true
    else
      false
    end
  end
end
