# DISCLAIMER: The code in this file was ripped almost directly from Nat's notes with little modification
# http://www.ccs.neu.edu/home/ntuck/courses/2019/01/cs4550/notes/08-server-state/notes.html

defmodule PhrasesWithPhriends.BackupAgent do
  use Agent

  # This is basically just a global mutable map.

  def start_link(_args) do
    Agent.start_link(fn -> %{} end, name: __MODULE__)
  end

  def put(name, val) do
    Agent.update __MODULE__, fn state ->
      Map.put(state, name, val)
    end
  end

  def get(name) do
    Agent.get __MODULE__, fn state ->
      Map.get(state, name)
    end
  end
end
