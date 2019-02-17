defmodule PhrasesWithPhriendsWeb.GamesChannel do
  use PhrasesWithPhriendsWeb, :channel

  def join("games:" <> name, payload, socket) do
    if authorized?(payload) do
      game = PhrasesWithPhriends.Game.new_game()
      socket = socket
      |> assign(:game, game)
      |> assign(:name, name)
      sender_new_state =
        %{
          "join" => name,
          "board" => PhrasesWithPhriends.Game.board_state(game),
          "hand" => PhrasesWithPhriends.Game.hand_state(game)
        }
      {:ok, sender_new_state, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

<<<<<<< HEAD
  def handle_in("reset", payload, socket) do
    game = PhrasesWithPhriends.Game.reset(socket.assigns[:game])
    socket = assign(socket, :game, game)
    {:reply, {:ok, %{"game" => PhrasesWithPhriends.Game.client_view(game)}}, socket}
=======
  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client

  def handle_in("submit", payload, socket) do
    game = PhrasesWithPhriends.Game.update_submit(socket.assigns[:game], payload)
    socket = assign(socket, :game, game)
    others_new_state =
      %{
        "board" => PhrasesWithPhriends.Game.board_state(game),
        "hand" => [] # empty hand received -> no updates to personal tiles
      }
    sender_new_state =
      %{
        "board" => PhrasesWithPhriends.Game.board_state(game),
        "hand" => PhrasesWithPhriends.Game.hand_state(game)
      }
    broadcast_from(socket, :game, sender_new_state)
    {:reply, {:ok, sender_new_state, socket}}
>>>>>>> server
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    # TODO: use Phoenix.Presence to detect if theres < 4 people connected to the channel already
    true
  end
end
