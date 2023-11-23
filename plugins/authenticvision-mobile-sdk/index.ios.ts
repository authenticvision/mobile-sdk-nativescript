// Authentic Vision iOS SDK wrapper for NativeScript
/// <reference path="./typings/libext.d.ts" />
/// <reference path="./typings/ios/objc!AuthenticVisionSDK.d.ts" />

import { Utils } from '@nativescript/core';
import {
  BrandingConfig,
  Compatibility,
  ErrorCause,
  ScanConfig,
  Scanner as IScanner,
  ScanResult as IScanResult,
  VersionInfo,
} from './index.common';

export enum AttestationMode {
  None = AVKAttestationMode.None,
  Managed = AVKAttestationMode.Managed,
  CMS = AVKAttestationMode.CMS,
}

export enum AuthResult {
  Authentic = AVKCoreAuthenticationResult.Authentic,
  Counterfeit = AVKCoreAuthenticationResult.Counterfeit,
  Standard2DCode = AVKCoreAuthenticationResult.Standard2DCode,
  UnsupportedLabel = AVKCoreAuthenticationResult.UnsupportedLabel,
  Timeout = AVKCoreAuthenticationResult.Timeout,
  Other = AVKCoreAuthenticationResult.Other,
}

export enum CampaignAction {
  Undefined = AVKScanCampaignAction.Undefined,
  Skip = AVKScanCampaignAction.Skip,
  Website = AVKScanCampaignAction.InAppBrowser,
  Video = AVKScanCampaignAction.InAppVideo,
  SystemBrowser = AVKScanCampaignAction.OpenSafari,
}

export enum CodeRawType {
  Undefined = AVKCoreCodeRawType.Undefined,
  QR = AVKCoreCodeRawType.QR,
  DM = AVKCoreCodeRawType.DM,
}

export enum CompatibilityLevel {
  Incompatible = AVKCompatibilityLevel.Incompatible,
  Limited = AVKCompatibilityLevel.Limited,
  Full = AVKCompatibilityLevel.Full,
}

export enum Design {
  GenericScanAssist = AVKScanDesign.GenericScanAssist,
  GenericManual = AVKScanDesign.GenericManual,
  ChequeCard = AVKScanDesign.ChequeCard,
}

export enum LabelLayout {
  Generic = AVKLabelLayout.Generic,
  Horizontal = AVKLabelLayout.Horizontal,
  Vertical = AVKLabelLayout.Vertical,
}

export enum ResultAction {
  Undefined = AVKScanResultAction.Undefined,
  Skip = AVKScanResultAction.Skip,
  Static = AVKScanResultAction.Static,
  Website = AVKScanResultAction.URL,
}

export enum ErrorCode {
  Unknown = AVKScanError.Unknown,
  Config = AVKScanError.Config,
  Network = AVKScanError.Network,
  CameraUnavailable = AVKScanError.CameraUnavailable,
  CameraPermissionDeniedOnce = "_CameraPermissionDeniedOnce", // Android only
  CameraPermissionDeniedPermanently = "_CameraPermissionDeniedPermanently", // Android only
  Outdated = AVKScanError.Outdated,
  InvalidAPIKey = AVKScanError.InvalidAPIKey,
  PolicyViolation = AVKScanError.PolicyViolation,
}

class ScanResult implements IScanResult {
  #native: AVKScanResult;

  constructor(native: AVKScanResult) { this.#native = native; }

  public get SLID(): string {
    return this.#native.SLID || "";
  }
  public get sessionID(): string {
    return this.#native.sessionID || "";
  }
  public get attestationToken(): string {
    return this.#native.attestationToken || "";
  }

  public get authentic(): boolean {
    return this.#native.authentic;
  }
  public get authResult(): AuthResult {
    return this.#native.authResult as number;
  }

  public get codeRawData(): ArrayBuffer|null {
    return this.#native.codeRawData ? interop.bufferFromData(this.#native.codeRawData) : null;
  }
  public get codeRawText(): string {
    return this.#native.codeRawText || "";
  }
  public get codeRawType(): CodeRawType {
    return (this.#native.codeRawType as number) || CodeRawType.Undefined;
  }

  public get resultAction(): ResultAction {
    return (this.#native.resultAction as number) || ResultAction.Undefined;
  }
  public get resultURL(): string {
    if (this.resultAction === ResultAction.Website && this.#native.resultURL) {
      return this.#native.resultURL.absoluteString;
    } else {
      return "";
    }
  }

  public get campaignAction(): CampaignAction {
    return (this.#native.campaignAction as number) || CampaignAction.Undefined;
  }
  public get campaignURL(): string {
    return this.#native.campaignURL ? this.#native.campaignURL.absoluteString : "";
  }
}

@NativeClass()
class ScanDelegate extends NSObject implements AVKScanViewControllerDelegate {
  static ObjCProtocols = [AVKScanViewControllerDelegate];

  // NB: Exposing stuff to objc works with this, but @ObjCMethod() does nothing whatsoever.
  static ObjCExposedMethods = {
    closeButtonTapped: {returns: interop.types.void, params: [interop.types.id, interop.types.id]},
  };

  #resolve: (result: ScanResult | PromiseLike<ScanResult>) => void;
  #reject: (reason?: any) => void;

  constructor(resolve: (result: ScanResult | PromiseLike<ScanResult>) => void, reject: (reason?: any) => void) {
    super();
    this.#resolve = resolve;
    this.#reject = reject;
  }

  public scanViewControllerScanDidCompleteWithResult(controller: AVKScanViewController, objcResult: AVKScanResult): void {
    controller.dismissViewControllerAnimatedCompletion(true, () => {
      this.#resolve(new ScanResult(objcResult));
    });
  }

  public scanViewControllerUnrecoverableError(controller: AVKScanViewController, objcError: NSError): void {
    controller.dismissViewControllerAnimatedCompletion(true, () => {
      let cause: ErrorCause = {canceled: false, nativeError: objcError};
      if (objcError.domain === AVKScanErrorDomain) {
        cause.code = objcError.code;
        let url = objcError.userInfo.objectForKey(NSURLErrorKey);
        if (url) {
          cause.url = url.absoluteString;
        }
      }
      this.#reject(new Error(objcError.localizedDescription, {cause}));
    });
  }

  public closeButtonTapped(sender: any, event: any): void {
    Utils.ios.getRootViewController().dismissViewControllerAnimatedCompletion(true, () => {
      let cause: ErrorCause = {canceled: true};
      this.#reject(new Error("The scan was canceled by the user.", {cause}));
    });
  }

  static CLOSE_SELECTOR = "closeButtonTapped";
}

@NativeClass()
class BrandingDelegate extends NSObject implements AVKBrandingDelegate {
  static ObjCProtocols = [AVKBrandingDelegate];

  #config: BrandingConfig;

  constructor(config: BrandingConfig) {
    super();
    this.#config = config;
  }

	public colorNamedCompatibleWithTraitCollection(name: string, traitCollection: UITraitCollection): UIColor|null {
    // More colors: https://docs.authenticvision.com/sdk/ios/master/branding.html
    switch (name) {
      case "UniversalPrimary":
        return this.#config.primaryColor?.ios;
      case "UniversalSecondary":
        return this.#config.secondaryColor?.ios;
      case "BackgroundScanProgress":
        // for classic and cheque card designs
        return this.#config.primaryColor?.ios;
      default:
        return null;
    }
  }

  public imageNamedCompatibleWithTraitCollection(name: string, traitCollection: UITraitCollection): UIImage|null {
    // More image names: https://docs.authenticvision.com/sdk/ios/master/branding.html
    // Note that image naming is not consistent across Android and iOS AV SDK implementations.
    // Not all images are used for all designs, so your implementation may depend on ScanConfig.design too.
    switch (name) {
      case "ScanLogo":
        return this.#config.scanLogoImage?.ios;
      default:
        return null;
    }
  }
}

function closeButton(controller: AVKScanViewController, target: NSObject, selector: string): UIButton {
  let btn = UIButton.buttonWithType(UIButtonType.Custom);
  btn.frame = controller.leadingItemView.bounds;
  btn.autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
  btn.tintColor = UIColor.whiteColor;
  btn.setImageForState(UIImage.systemImageNamed("xmark"), UIControlState.Normal);
  btn.addTargetActionForControlEvents(target, selector, UIControlEvents.TouchDown);
  return btn;
}

export class Scanner implements IScanner {
  #config: AVKScanConfig;
  #delegate: ScanDelegate|null = null;
  #branding: BrandingDelegate|null = null;

  constructor(params: ScanConfig) {
    this.#config = AVKScanConfig.defaultScanConfig().copy();

    // The default endpoints are production endpoints.
    if (params.testingEnvironment) {
      this.#config.endpoints = AVKScanConfig.endpointsTesting;
    }
    this.#config.apiKey = params.apiKey;

    if (params.locale !== undefined) { this.#config.locale = params.locale; }
    if (params.design !== undefined) { this.#config.design = params.design as number; }
    if (params.labelLayout !== undefined) { this.#config.labelLayout = params.labelLayout as number; }
    if (params.attestation !== undefined) { this.#config.attestationMode = params.attestation as number; }
    if (params.attestationCert !== undefined) { this.#config.attestationCert = params.attestationCert; }
    if (params.geoLocation !== undefined) { this.#config.includeGeoLocationData = params.geoLocation; }
    if (params.debugOverlay !== undefined) { this.#config.showDebugViews = params.debugOverlay; }

    if (params.feedback !== undefined) {
      let feedback = 0;
      if (params.feedback.acoustic) { feedback |= AVKScanFeedback.Acoustic; }
      if (params.feedback.haptic) { feedback |= AVKScanFeedback.Haptic; }
      if (params.feedback.visual) { feedback |= AVKScanFeedback.Visual; }
      this.#config.feedback = feedback;
    }

    if (params.branding !== undefined) {
      this.#branding = new BrandingDelegate(params.branding); // store strong ref. for lifetime of scanner
      this.#config.brandingDelegate = this.#branding;
    }
  }

  public scanOneLabel(): Promise<ScanResult> {
    return new Promise<ScanResult>((resolve, reject) => {
      if (this.#delegate !== null) {
        reject(new Error("Scanner is already active. It is not possible to have concurrent scans."));
        return;
      }
      this.#delegate = new ScanDelegate(resolve, reject); // store strong ref. until promise is resolved
      let controller = AVKScanViewController.scanViewControllerWithDelegateConfigError(this.#delegate, this.#config);
      controller.loadViewIfNeeded();
      controller.leadingItemView.addSubview(closeButton(controller, this.#delegate, ScanDelegate.CLOSE_SELECTOR));
      if (UIDevice.currentDevice.userInterfaceIdiom === UIUserInterfaceIdiom.Pad) {
        // A form sheet nets us a smaller modal on iPad, which increases the area covered by the bracket,
        // and thus passes a larger part of each frame to libavcore. The iPad's CPU can handle this.
        controller.modalPresentationStyle = UIModalPresentationStyle.FormSheet;
      } else {
        controller.modalPresentationStyle = UIModalPresentationStyle.FullScreen;
      }
      Utils.ios.getRootViewController().presentViewControllerAnimatedCompletion(controller, true, null as any);
    }).finally(() => {
      this.#delegate = null;
    });
  }

  public get compatibility(): Compatibility {
    return {
      level: AVKCompatibility.compatibilityLevelForConfig(this.#config) as number,
    }
  }
}

export function getVersionInfo(): VersionInfo {
  return {
    platform: "iOS",
    sdkVersion: AVKVersionInfo.sdkVersion(),
    sdkGitHash: AVKVersionInfo.sdkGitHash(),
    coreVersion: AVKVersionInfo.coreVersion(),
    coreGitHash: AVKVersionInfo.coreGitHash(),
  }
}
