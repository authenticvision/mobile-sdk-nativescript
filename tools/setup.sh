#!/bin/sh
set -eu

# Install NativeScript
npm install

# Install platform tools (sans Android SDK)
bundle install
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
