#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
sed -E -i.bak '/^$/d;s/^\};$/}/;/\tstatic (alloc|new)/d' 'typings/ios/objc!AuthenticVisionSDK.d.ts'
sed -E -i.bak '/\tpublic (component[0-9]+|copy|init|cameraConfig)\(/d' 'typings/android/com.authenticvision.android.d.ts'
perl -i -p0e 's/\t{4}}\n\t{3}}\n\t{2}}\n\t}\n}\n\ndeclare module com {\n\texport module authenticvision {\n\t{2}export module android {\n\t{3}export module sdk {\n\t{4}export module integration {\n//seg' 'typings/android/com.authenticvision.android.d.ts'
