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

  def handle_in("reset", payload, socket) do
    game = PhrasesWithPhriends.Game.reset(socket.assigns[:game])
    socket = assign(socket, :game, game)
    {:reply, {:ok, %{"game" => PhrasesWithPhriends.Game.client_view(game)}}, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    # TODO: use Phoenix.Presence to detect if theres < 4 people connected to the channel already
    true
  end
end
