# AV SDK NativeScript PoC

This is an early proof of concept implementation that demonstrates the integration of AV's mobile SDKs with NativeScript. It is feature-complete, but there are integration troubles to be addressed (see limitations/caveats section below).

This may eventually become a ready-made NPM package, but we're not quite there yet. Until then this repository serves as template for wrapping our SDK without a ready-made plugin.

## Requirements

* An Authentic Vision SDK API key and sample labels
* AV Android SDK 8.2.2 or later
* AV iOS SDK 8.0.1 or later

## Example

A full example is in [app/scan/scan-view-model.ts](app/scan/scan-view-model.ts#). Here is a minimal excerpt:
```ts
import { Scanner } from '@authenticvision/mobile-sdk-nativescript'; // part of this repo
let scanner = new Scanner({apiKey: "clientkey:abcdef..."})
let result = await scanner.scanOneLabel();
if (result.authentic) {
    console.log("Authentic label scanned:", result.slid);
    // Access result's properties to get label details, e.g. result.campaignURL for its
    // web content configuration. Let's talk if you need more properties here!
} else {
    console.log("Label scanned but authenticity not confirmed:", result.slid);
}
```

## Usage

1. Add your AV API key `AVSDK_API_KEY=clientkey:abcdef...` to `.env`
2. Download the AV Android SDK .aar and iOS .xcframework. A download link is provided to you along with a link to this repository. Place the files into `plugins/authenticvision-mobile-sdk/platforms/{android,ios}` respectively. You probably want to extract them as part of your build process or store them in Git LFS. In the future we will offer some package manager integration to download SDKs.
3. Set your Apple team ID at `App_Resources/iOS/build.xcconfig`
4. `tools/setup.sh`
5. `tools/nativescript.sh run android` or `tools/nativescript.sh run ios`
6. Scan an AV label from your device. The result is printed to console and visible on screen.

## Implementation Overview

* An AV SDK wrapper is available at `plugins/`. It implements a custom scan only, where the AV SDK returns label details to the host application. The wrapper implementation dismisses the scan screen after a single label is scanned.
* Wrappers are implemented separately for Android and iOS, but provide a common interface.
* The iOS wrapper is pure TypeScript. It simply spawns the SDK's built-in controller with a bit of customization, and marshals the results back to JavaScript. The file `App_Resources/iOS/Info.plist` is extended with `NSAppTransportSecurity` required by AV libavcore 6.
* The Android wrapper is a bit more involved:
    1. `App_Resources/Android/gradle.properties` enables Kotlin compilation
    2. `App_Resources/Android/src/kotlin/AuthenticVision.kt` implements a scan activity
    3. `App_Resources/Android/AdnroidManifest.xml` exports the scan activity
    4. `plugins/authenticvision-mobile-sdk/index.android.ts` can now spawn this activity
    5. Scan configuration and result data is passed through Android's Intent interface. Every scan config and result property must be listed in `ScanConfig` and explicitly copied in `AuthenticVision.kt`.
* The frontend's `scan-view-model.ts` accesses the platform-agnostic interface in `index.common.ts`, which is implemented by either `index.android.ts` or `index.ios.ts`.

## Limitations and Caveats

* "Custom scan" mode only, this won't display websites after a scan has completed. Applications that integrate the AV SDK tend to handle this by themselves anyway.
* The AV SDK will request permission from the OS as fallback here, but for user flow and error handling it is usually better to do it within your application.
* The setup script `tools/setup.sh` contains a workaround for Android where NativeScript's shared C++ library is deleted, so that Authentic Vision's distribution file is used. This workaround must be re-run with every npm install/update operation. We are working on removing the dependency of our SDK on libc++_shared.so.
* Code raw API is not implemented for Android wrapper yet. A future Android SDK and wrapper update will provide the functionality.
