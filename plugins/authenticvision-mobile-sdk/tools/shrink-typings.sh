#!/bin/sh
set -eu
sed -i.bak '/^$/d' 'typings/ios/objc!AuthenticVisionSDK.d.ts'
