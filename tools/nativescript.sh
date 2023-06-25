#!/bin/sh
# This invokes the local NativeScript instance with all of its wrappers and package managers.
# The environment used here is created by setup.sh.
# You might want to run "alias ns=tools/nativescript.sh" for convenience.
export VIRTUAL_ENV="$(dirname "$0")/../venv"
export PATH="$VIRTUAL_ENV/bin:$PATH"
exec bundle exec npx ns "$@"
