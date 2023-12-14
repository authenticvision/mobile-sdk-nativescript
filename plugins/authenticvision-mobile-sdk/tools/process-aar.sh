#!/usr/bin/env bash
set -eu

aar=$(realpath "$1")
classJar=$aar.classes.jar
publicJar=$aar.public.jar
classDir=$aar.classes
projDir=$(dirname "$0")/../../..

jar -x -f "$aar" classes.jar
mv classes.jar "$classJar"

# create trimmed-down classes.jar file with just the public SDK interface, and w/o fragment and campaign stuff
(mkdir -p "$classDir" && cd "$classDir" && jar -x -f "$classJar" \
	META-INF \
	com/authenticvision/android/sdk/integration)
find "$classDir" -name '*Campaign*.class' -and -not -name 'AvScanCampaignAction.class' -delete # unused in NativeScript implementation
find "$classDir" -name '*Fragment*.class' -delete # unused in NativeScript implementation
find "$classDir" -name '*IntentKeys*.class' -delete # private API
find "$classDir" -name '*CameraConfig*.class' -delete # private API
find "$classDir" -empty -type d -delete
jar -c -f "$publicJar" -C "$classDir" .

# regenerate typings from makeshift public API jar
"$projDir/tools/nativescript.sh" typings android --jar "$publicJar"
mv "$projDir/typings/android/android.d.ts" "$projDir/plugins/authenticvision-mobile-sdk/typings/android/com.authenticvision.android.d.ts"
"$projDir/plugins/authenticvision-mobile-sdk/tools/shrink-typings.sh"
