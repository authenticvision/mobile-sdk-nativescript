#!/bin/sh
set -eu
sed -E -i.bak '/^$/d;s/^\};$/}/;/\tstatic (alloc|new)/d' 'typings/ios/objc!AuthenticVisionSDK.d.ts'
