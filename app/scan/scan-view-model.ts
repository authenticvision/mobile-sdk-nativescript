import { Color, Dialogs, ImageSource, Observable } from '@nativescript/core';
import {
  AuthResult,
  CompatibilityLevel,
  Design,
  ErrorCause,
  Scanner,
  ScanConfig,
  ScanResult,
  VersionInfo,
  getVersionInfo,
} from '@authenticvision/mobile-sdk-nativescript';

// Your Authentic Vision API key is imported from .env:
// AVSDK_API_KEY=clientkey:abcdef...
const scanConfig: ScanConfig = {
  apiKey: process?.env.AVSDK_API_KEY,
  feedback: {acoustic: false, haptic: true, visual: true},
  testingEnvironment: process?.env.AVSDK_USE_TESTING_ENVIRONMENT === "1", // private to Authentic Vision
  design: Design.GenericScanAssist,
  branding: {
    primaryColor: new Color("#3C5AFD"), // NativeScript logo blue
    scanLogoImage: ImageSource.fromFileSync("~/scan/scan-logo-nativescript.png"),
  },
};

const versions = getVersionInfo();
console.log("Using Authentic Vision Mobile SDK for", versions.platform);
console.log("- AV SDK version:", versions.sdkVersion, versions.sdkGitHash);
console.log("- AV libavcore version:", versions.coreVersion, versions.coreGitHash);

if (!scanConfig.apiKey) {
  console.log('ERROR: Please set AVSDK_API_KEY. See README.md for details. AV SDK scans will fail.');
}

export class ScanViewModel extends Observable {
  #scanner: Scanner;
  #result: ScanResult;

  constructor() {
    super();
    this.#scanner = new Scanner(scanConfig);
    this.#result = null;
  }

  get result(): ScanResult {
    return this.#result
  }

  set result(result: ScanResult) {
    this.#result = result;
    this.notifyPropertyChange("result", result);
    this.notifyPropertyChange("authResult", this.authResult);
  }

  get authResult(): string {
    return this.result ? enumKey(this.result.authResult, AuthResult) : "";
  }

  get compatDevice(): string {
    let level = this.#scanner.compatibility.level;
    if (level !== undefined) {
      return enumKey(level, CompatibilityLevel);
    } else if (global.isAndroid) {
      return "Needs camera permissions";
    } else {
      return "Unknown";
    }
  }

  get versions(): VersionInfo {
    return versions;
  }

  async startButtonTapped() {
    try {
      console.log("scan start");
      this.result = await this.#scanner.scanOneLabel();
      console.log("scan done:", this.result.SLID, this.result.authentic ? "authentic" : "rejected");
    }
    catch (error) {
      console.log("scan error:", error.message);
      setTimeout(() => {
        // XXX: Dialog is not shown when invoked from activityResult callback.
        // It's beyond me why that happens, nor did I investigate further.
        // Scheduling a block to be run in the next event loop iteration works.
        const cause: ErrorCause = error.cause;
        if (!cause?.canceled) {
          Dialogs.alert({
            title: "Scan Failed",
            message: error.message,
            okButtonText: "Dismiss",
            cancelable: false
          });
        }
      }, 0);
    }

    // On Android the user might have granted camera permissions through the scan screen,
    // so refresh compatibility information just in case they are available now.
    if (global.isAndroid) {
      this.notifyPropertyChange("compatDevice", this.compatDevice);
    }
  }
}

function enumKey<Enum>(value: number|string, enumType: Enum): keyof Enum {
  // TypeScript doesn't have a built-in way to get an enum key from its value.
  if (typeof value === "number") {
    return enumType[value];
  } else {
    // https://stackoverflow.com/a/62215827
    return Object.keys(enumType)[Object.values(enumType).indexOf(value)] as keyof Enum;
  }
}
