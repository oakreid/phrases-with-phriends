#!/bin/bash

# inspired by https://github.com/NatTuck/memory/start.sh

export MIX_ENV=prod
export PORT=4793

echo "Stopping old copy of app, if any..."

_build/prod/rel/memory/bin/memory stop || true

echo "Starting app..."

# Start to run in background from shell.
#_build/prod/rel/memory/bin/memory start

# Foreground for testing and for systemd
_build/prod/rel/memory/bin/memory foreground
