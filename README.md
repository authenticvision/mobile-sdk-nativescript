<p align="center">
    <img width="716" src="docs/authenticvision.png">
</p>

# Mobile SDK for NativeScript

This is a feature-complete plugin that demonstrates the integration of AV's mobile SDKs with NativeScript.

This may eventually become a ready-made NPM package, but we're not quite there yet. Until then this repository serves as template for wrapping our SDK without a ready-made plugin.

**Expand these to see this project in action:**

<details>
<summary>Demo for iOS (short video)</summary>

https://github.com/authenticvision/mobile-sdk-nativescript/assets/597682/20da3d26-058c-4e69-8d4e-11c7ac51b198
</details>

<details>
<summary>Demo for Android (short video)</summary>

https://github.com/authenticvision/mobile-sdk-nativescript/assets/597682/83564c71-8a1e-4ee1-b052-eda748d92ada
</details>

## Requirements

* An Authentic Vision SDK API key and sample labels
* AV Android SDK 8.3.0 or later
* AV iOS SDK 8.2.0 or later

## Example

A full example is in [app/scan/scan-view-model.ts](app/scan/scan-view-model.ts#). Here is a minimal excerpt:
```ts
import { Scanner } from '@authenticvision/mobile-sdk-nativescript'; // part of this repo
let scanner = new Scanner({apiKey: "clientkey:abcdef..."});
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
* The iOS wrapper is pure TypeScript. It simply spawns the SDK's built-in controller with a bit of customization, and marshals the results back to JavaScript.
* The Android wrapper is likewise pure TypeScript using Android's Intents API for starting the scan and retrieving its results. `App_Resources/Android/AndroidManifest.xml` adds optional permissions.
* The frontend's `scan-view-model.ts` accesses the platform-agnostic interface in `index.common.ts`, which is implemented by either `index.android.ts` or `index.ios.ts`.

## Caveats

* Only the "custom scan" mode is implemented. This plugin won't display websites after a scan has completed. Applications that integrate the AV SDK tend to handle this by themselves anyway.
* The AV SDK will request permission from the OS as fallback here, but for user flow and error handling it is usually better to do it within your application.
