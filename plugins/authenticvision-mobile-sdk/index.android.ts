// Authentic Vision Android SDK wrapper for NativeScript
/// <reference path="./typings/libext.d.ts" />
/// <reference path="./typings/android/com.authenticvision.android.d.ts" />

import { Application, Utils } from '@nativescript/core';
import {
  Compatibility,
  ErrorCause,
  ScanConfig,
  Scanner as IScanner,
  ScanResult as IScanResult,
  VersionInfo,
} from './index.common';

export enum AttestationMode {
  None = "NONE",
  Managed = "MANAGED",
  CMS = "CMS",
}

export enum AuthResult {
  Authentic = "AUTHENTIC",
  Counterfeit = "COUNTERFEIT",
  Standard2DCode = "STANDARD_2D_CODE",
  UnsupportedLabel = "UNSUPPORTED_LABEL",
  Timeout = "TIME_OUT",
  Other = "OTHER",
  // "ERROR" and "CANCELED" cannot appear in results
}

export enum CampaignAction {
  Undefined = "UNDEFINED",
  Skip = "SKIP",
  Website = "IN_APP_BROWSER",
  Video = "_Video", // TODO: not exposed via API, Website is set with prefix instead (AVI-15777)
  SystemBrowser = "_SystemBrowser", // TODO: likewise
}

export enum CodeRawType {
  Undefined = "Undefined",
  QR = "QR",
  DM = "DM",
}

export enum CompatibilityLevel {
  Incompatible = "INCOMPATIBLE",
  Limited = "LIMITED",
  Full = "FULL",
}

export enum Design {
  GenericScanAssist = "GENERIC_WITH_SCAN_ASSISTANT",
  GenericManual = "GENERIC",
  ChequeCard = "CHEQUE_CARD_BACK",
}

export enum LabelType {
  Generic = "GENERIC",
  QTag = "Q_TAG",
  DTag = "D_TAG",
  UTagGeneric = "_UTagGeneric", // TODO: not implemented, only used by classic interface though
  UTagQR = "_UTagQR", // likewise
  UTagDM = "_UTagDM", // likewise
}

export enum LabelLayout {
  Generic = "_Generic", // TODO: not implemented, discuss
  Horizontal = "HORIZONTAL",
  Vertical = "VERTICAL",
}

export enum ResultAction {
  Undefined = "UNDEFINED",
  Skip = "SKIP",
  Static = "STATIC",
  Website = "URL",
}

export enum ErrorCode {
  Unknown = "UNKNOWN",
  Config = "_Config", // not implemented nor needed, constructor throws instead
  Network = "_Network", // not implemented nor needed, scan activity reconnects forever
  CameraUnavailable = "CAMERA_UNAVAILABLE",
  CameraPermissionDeniedOnce = "CAMERA_PERMISSION_DENIED_ONCE",
  CameraPermissionDeniedPermanently = "CAMERA_PERMISSION_DENIED_PERMANENTLY",
  Outdated = "OUTDATED",
  InvalidAPIKey = "INVALID_API_KEY",
  PolicyViolation = "POLICY_VIOLATION",
}

class ScanResult implements IScanResult {
  #intent: android.content.Intent;

  constructor(intent: android.content.Intent) {
    this.#intent = intent;
  }

  public get SLID(): string {
    return this.#intent.getStringExtra("slid");
  }
  public get sessionID(): string {
    return this.#intent.getStringExtra("sessionID") || "";
  }
  public get attestationToken(): string {
    return this.#intent.getStringExtra("attestationToken");
  }

  public get authentic(): boolean {
    return this.#intent.getBooleanExtra("authentic", false);
  }
  public get authResult(): AuthResult {
    return this.#intent.getStringExtra("authResult") as AuthResult;
  }

  // TODO: code raw data is not implemented for core 8, and has a different interface for core 6 (AVI-15787)
  public get codeRawData(): ArrayBuffer|null {
    return null;
  }
  public get codeRawText(): string {
    return "";
  }
  public get codeRawType(): CodeRawType {
    return CodeRawType.Undefined;
  }

  public get resultAction(): ResultAction {
    return this.#intent.getStringExtra("resultAction") as ResultAction;
  }
  public get resultURL(): string {
    if (this.resultAction === ResultAction.Website) {
      return this.#intent.getStringExtra("resultURL");
    } else {
      return "";
    }
  }

  public get campaignAction(): CampaignAction {
    return this.#intent.getStringExtra("campaignAction") as CampaignAction;
  }
  public get campaignURL(): string {
    return this.#intent.getStringExtra("campaignURL");
  }
}

// Scanner's activity com.authenticvision.android.nativescript.ScanActivity is implemented in
// native code at App_Resources/Android/src/main/kotlin/AuthenticVisionSDK.kt.

export class Scanner implements IScanner {
  #config: ScanConfig;
  #compatibility: Compatibility|null = null;

  constructor(config: ScanConfig) {
    this.#config = config;
  }

  public scanOneLabel(): Promise<ScanResult> {
    const requestCode = 1000; // value is arbitrary, only relevant when there are multiple activities
    return new Promise((resolve, reject) => {
      Application.android.on("activityResult", (args) => {
        if (args.requestCode === requestCode) {
          if (args.resultCode === android.app.Activity.RESULT_OK) {
            resolve(new ScanResult(args.intent));
          } else if (args.resultCode === android.app.Activity.RESULT_CANCELED) {
            let cause: ErrorCause = {canceled: true};
            reject(new Error("The scan was canceled by the user.", {cause}));
          } else if (args.resultCode === android.app.Activity.RESULT_FIRST_USER) {
            let cause: ErrorCause = {canceled: false, code: args.intent.getStringExtra("errorCode")};
            let url = args.intent.getStringExtra("errorURL");
            if (url) {
              cause.url = url;
            }
            reject(new Error("AV SDK error: " + cause.code, {cause}));
            // TODO: Human readable text per error would be nice, like with NSError on iOS.
          } else {
            reject(new Error("The scan returned with an unhandled activity result code."));
          }
        }
      });
      let currentActivity = Application.android.foregroundActivity;
      let intent = new android.content.Intent(currentActivity,
        com.authenticvision.android.nativescript.ScanActivity.class);
      this.configureIntent(intent);
      currentActivity.startActivityForResult(intent, requestCode);
    });
  }

  public get compatibility(): Compatibility {
    let scanConfig = this.scanConfig;
    let context = Utils.android.getApplicationContext();
    let native = com.authenticvision.android.sdk.integration.AvCompatibility.INSTANCE;

    // Computation is somewhat expensive, so cache results. They won't change once available.
    let compatibility: Compatibility = this.#compatibility || (this.#compatibility = {});

    if (compatibility.attestationSupported === undefined) {
      compatibility.attestationSupported = native.isAttestationSupported(context, scanConfig);
    }

    if (compatibility.level === undefined) {
      if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
        if (context.checkSelfPermission(android.Manifest.permission.CAMERA) === android.content.pm.PackageManager.PERMISSION_GRANTED) {
          compatibility.level = String(native.isDeviceCompatible(context, this.scanConfig)) as any;
        }
      } else {
        console.warn("AV SDK: Camera compatibility was not checked on Android older than 6.0 due to missing APIs.");
      }
    }

    return compatibility;
  }

  private get scanConfig() {
    let intent = new android.content.Intent();
    this.configureIntent(intent);
    return new com.authenticvision.android.nativescript.ScanConfig(intent);
  }

  private configureIntent(intent: android.content.Intent): void {
    for (let key in this.#config) {
      if (this.#config.hasOwnProperty(key)) {
        // TypeScript wants the cases individually to select an overload, mhm
        let value = this.#config[key];
        switch (typeof value) {
          case "boolean":
            intent.putExtra(key, value);
            break;
          case "number":
            intent.putExtra(key, value);
            break;
          case "string":
            intent.putExtra(key, value);
            break;
        }
      }
    }

    if (this.#config.feedback !== undefined) {
      let feedback = this.#config.feedback;
      if (feedback.acoustic) {
        intent.putExtra("feedbackAcoustic", true);
      }
      if (feedback.haptic) {
        intent.putExtra("feedbackHaptic", true);
      }
      if (feedback.visual) {
        intent.putExtra("feedbackVisual", true);
      }
    }

    if (this.#config.branding !== undefined) {
      let branding = this.#config.branding;
      if (branding.primaryColor) {
        intent.putExtra("brandingPrimaryColor", branding.primaryColor.hex);
      }
      if (branding.secondaryColor) {
        intent.putExtra("brandingSecondaryColor", branding.secondaryColor.hex);
      }
      if (branding.scanLogoImage) {
        intent.putExtra("brandingScanLogoImage", branding.scanLogoImage.android);
      }
    }
  }
}

export function getVersionInfo(): VersionInfo {
  const sdkInfo = com.authenticvision.android.sdk.integration.AvInfo.INSTANCE;
  let versionInfo: VersionInfo = {
    platform: "Android",
    sdkVersion: sdkInfo.version(),
    sdkGitHash: sdkInfo.gitHash(),
    coreVersion: sdkInfo.coreVersion(),
    coreGitHash: sdkInfo.coreGitHash(),
  };
  return versionInfo;
}
