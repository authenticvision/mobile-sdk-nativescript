#!/bin/sh
set -eu

# Install NativeScript
npm install

# Patch NativeScript to exclude NativeScript's ancient C++ runtime.
# This causes Gradle to the AV SDK's C++ runtime lib from NDK 25c instead, which is backwards-compatible.
# This won't be necessary anymore with AV Android SDK 8.2+, which links the C++ runtime statically.
for flavor in regular optimized optimized-with-inspector; do
	zip -d ./node_modules/@nativescript/android/framework/app/libs/runtime-libs/nativescript-$flavor.aar \
		jni/arm64-v8a/libc++_shared.so \
		jni/armeabi-v7a/libc++_shared.so \
		jni/x86/libc++_shared.so \
		jni/x86_64/libc++_shared.so || true
done

# Install platform tools (sans Android SDK)
bundle install
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
