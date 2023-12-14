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
  Website = "WEBSITE",
  Video = "VIDEO",
  SystemBrowser = "SYSTEM_BROWSER",
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
  GenericScanAssist = "GENERIC_SCAN_ASSIST",
  GenericManual = "GENERIC_MANUAL",
  ChequeCard = "CHEQUE_CARD",
}

export enum LabelLayout {
  Generic = "GENERIC",
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
  Outdated = "OUTDATED",
  InvalidAPIKey = "INVALID_API_KEY",
  PolicyViolation = "POLICY_VIOLATION",
}

class ScanResult implements IScanResult {
  #result: com.authenticvision.android.sdk.integration.AvScanResult;

  constructor(intent: android.content.Intent) {
    let mapper = new com.authenticvision.android.sdk.integration.AvScanResultIntent(intent);
    this.#result = mapper.mapFromIntent();
  }

  public get SLID(): string {
    return this.#result?.getSlid() || "";
  }
  public get sessionID(): string {
    return this.#result?.getSessionId() || "";
  }
  public get attestationToken(): string {
    return this.#result?.getAttestationToken() || "";
  }

  public get authentic(): boolean {
    return this.#result.isAuthentic();
  }
  public get authResult(): AuthResult {
    return this.#result.getAuthenticationResult().toString() as AuthResult;
  }

  public get codeRawData(): ArrayBuffer|null {
    let rawData = this.#result.getCodeRawData();
    if (rawData) {
      let result = new ArrayBuffer(rawData.length);
      let resultView = new Uint8Array(result);
      for (let i = 0; i < rawData.length; i++) {
          resultView[i] = rawData[i];
      }
      return result;
    } else {
      return null;
    }
  }
  public get codeRawText(): string {
    return this.#result.getCodeRawText();
  }
  public get codeRawType(): CodeRawType {
    return this.#result.getCodeRawType().toString() as CodeRawType;
  }

  public get resultAction(): ResultAction {
    return this.#result.getResultAction().toString() as ResultAction;
  }
  public get resultURL(): string {
    return this.#result.getResultUrl();
  }

  public get campaignAction(): CampaignAction {
    return this.#result.getCampaignAction().toString() as CampaignAction;
  }
  public get campaignURL(): string {
    return this.#result.getCampaignUrl();
  }
}

export class Scanner implements IScanner {
  #config: ScanConfig;
  #compatibility: Compatibility|null = null;

  constructor(config: ScanConfig) {
    this.#config = config;
  }

  public scanOneLabel(): Promise<ScanResult> {
    const requestCode = 100;
    return new Promise((resolve, reject) => {
      Application.android.on("activityResult", (args) => {
        if (args.requestCode === requestCode) {
          if (args.resultCode === android.app.Activity.RESULT_OK) {
            resolve(new ScanResult(args.intent));
          } else if (args.resultCode === android.app.Activity.RESULT_CANCELED) {
            if (args.intent) {
              let mapper = new com.authenticvision.android.sdk.integration.AvScanErrorResultIntent(args.intent);
              let errorResult = mapper.mapFromIntent();
              let cause: ErrorCause = {canceled: false, code: errorResult.getScanError().toString() as any};
              let url = args.intent.getStringExtra("errorURL");
              if (url) {
                cause.url = url;
              }
              let message = errorResult.getMessage();
              if (message) {
                reject(new Error(`AV SDK error: ${message} (${cause.code})`, {cause}));
              } else {
                reject(new Error(`AV SDK error: ${cause.code}`, {cause}));
              }
            } else {
              let cause: ErrorCause = {canceled: true};
              reject(new Error("The scan was canceled by the user.", {cause}));
            }
          } else {
            reject(new Error("The scan ended with an unhandled activity result code."));
          }
        }
      });
      let currentActivity = Application.android.foregroundActivity;
      let intent = new android.content.Intent(currentActivity,
        com.authenticvision.android.sdk.integration.AvScanActivity.class);
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

    if (compatibility.level === undefined) {
      let havePermission = true
      if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
        havePermission = (context.checkSelfPermission(android.Manifest.permission.CAMERA) === android.content.pm.PackageManager.PERMISSION_GRANTED);
      }
      if (havePermission) {
        compatibility.level = String(native.isDeviceCompatible(context, this.scanConfig)) as any;
      }
    }

    return compatibility;
  }

  private get scanConfig() {
    return this.configureIntent(new android.content.Intent());
  }

  private configureIntent(intent: android.content.Intent): com.authenticvision.android.sdk.integration.AvScanConfig {
    let configIntent = new com.authenticvision.android.sdk.integration.AvScanConfigIntent(intent);

    configIntent.setApiKey(this.#config.apiKey);

    if (this.#config.locale !== undefined) {
      configIntent.setLocale(new java.util.Locale(this.#config.locale));
    }

    if (this.#config.design !== undefined) {
      let scanDesign = com.authenticvision.android.sdk.integration.AvScanConfig.AvScanDesign.valueOf(this.#config.design as any);
      configIntent.setScanDesign(scanDesign);
    }

    if (this.#config.feedback !== undefined) {
      let feedback = this.#config.feedback;
      configIntent.setIsAcousticFeedbackEnabled(!!feedback.acoustic);
      configIntent.setIsHapticFeedbackEnabled(!!feedback.haptic);
      configIntent.setIsVisualFeedbackEnabled(!!feedback.visual);
    }

    if (this.#config.labelLayout !== undefined) {
      let labelLayout = com.authenticvision.android.sdk.integration.AvScanConfig.AvLabelLayout.valueOf(this.#config.labelLayout as any);
      configIntent.setLabelLayout(labelLayout);
    }

    if (this.#config.attestation !== undefined) {
      let attestationMode = com.authenticvision.android.sdk.integration.AvScanConfig.AvAttestationMode.valueOf(this.#config.attestation as any);
      configIntent.setAttestationMode(attestationMode);
    }

    if (this.#config.attestationCert !== undefined) {
      configIntent.setAttestationCert(this.#config.attestationCert);
    }

    if (this.#config.geoLocation !== undefined) {
      configIntent.setIsGeoLocationEnabled(this.#config.geoLocation);
    }

    if (this.#config.debugOverlay !== undefined) {
      // LATER: The AV Android SDK does not have a debug overlay
    }

    if (this.#config.testingEnvironment) {
      configIntent.setEndpoints(com.authenticvision.android.sdk.integration.AvScanConfig.getENDPOINTS_TESTING());
    }

    configIntent.setIsCampaignFlowEnabled(false);

    // It's possible to dump intent details for debugging:
    // console.log("XXX bundle:", intent.getExtras().toString());

    if (this.#config.branding !== undefined) {
      let brandingIntent = new com.authenticvision.android.sdk.integration.AvBrandingIntent(intent);
      let branding = this.#config.branding;
      if (branding.primaryColor) { brandingIntent.setPrimaryColor(branding.primaryColor.android); }
      if (branding.secondaryColor) { brandingIntent.setSecondaryColor(branding.secondaryColor.android); }
      if (branding.scanLogoImage) { brandingIntent.setScanLogo(branding.scanLogoImage.android); }
    }

    return configIntent;
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
