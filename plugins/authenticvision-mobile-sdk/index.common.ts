// File contains common types and enums used by platform-specific scanner implementations.

import { Color, ImageSource } from '@nativescript/core';

export declare enum AttestationMode { None, Managed, CMS }
export declare enum AuthResult { Authentic, Counterfeit, Standard2DCode, UnsupportedLabel, Timeout }
export declare enum CampaignAction { Undefined, Skip, Website, Video, SystemBrowser }
export declare enum CodeRawType { Undefined, QR, DM }
export declare enum CompatibilityLevel { Incompatible, Limited, Full }
export declare enum Design { GenericScanAssist, GenericManual, ChequeCard }
export declare enum LabelType { Generic, QTag, DTag, UTagGeneric, UTagQR, UTagDM }
export declare enum LabelLayout { Generic, Horizontal, Vertical }
export declare enum ResultAction { Undefined, Skip, Static, Website }

export declare enum ErrorCode {
  Unknown,
  Config,
  Network,
  CameraUnavailable,
  CameraPermissionDeniedOnce, // Android only, concept does not exist on iOS
  CameraPermissionDeniedPermanently, // Android only (TODO: iOS)
  Outdated,
  InvalidAPIKey, // SDKs with core 8 only, others return "Outdated" for invalid API keys
  PolicyViolation,
}

export interface ErrorCause {
  canceled: boolean;
  code?: ErrorCode; // omitted for errors outside of the AV SDK's control
  url?: string;
  nativeError?: any;
}

export interface BrandingConfig {
  primaryColor?: Color;
  secondaryColor?: Color;
  scanLogoImage?: ImageSource;
}

export interface ScanConfig {
  apiKey: string
  locale?: string; // RFC 5646, e.g. de-AT, defaults to app/system locale
  design?: Design;
  feedback?: {acoustic: boolean, haptic: boolean, visual: boolean};
  labelType?: LabelType;
  labelLayout?: LabelLayout;
  attestation?: AttestationMode;
  attestationCert?: string;
  geoLocation?: boolean;
  debugOverlay?: boolean // iOS only
  testingEnvironment?: boolean // private SDK builds only
  branding?: BrandingConfig;
}

export interface ScanResult {
  readonly SLID: string;
  readonly sessionID: string;
  readonly attestationToken: string;

  readonly authentic: boolean;
  readonly authResult: AuthResult;

  readonly codeRawType: CodeRawType;
  readonly codeRawData: ArrayBuffer|null;
  readonly codeRawText: string;

  readonly resultAction: ResultAction;
  readonly resultURL: string;
  readonly campaignAction: CampaignAction;
  readonly campaignURL: string;
}

export interface Compatibility {
  level?: CompatibilityLevel; // not set on Android if camera permissions are not yet granted
  attestationSupported?: boolean;
}

export declare class Scanner {
  constructor(config: ScanConfig);
  scanOneLabel(): Promise<ScanResult>;
  readonly compatibility: Compatibility;
}

export interface VersionInfo {
  platform: string
  sdkVersion: string
  sdkGitHash: string
  coreVersion: string
  coreGitHash: string
}

export declare function getVersionInfo(): VersionInfo;
