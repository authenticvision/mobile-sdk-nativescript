/// <reference path="../../../../node_modules/@nativescript/types-android/index.d.ts" />

declare module com {
	export module authenticvision {
		export module android {
			export module sdk {
				export module integration {
					export class AvAuthenticationResult {
						public static class: java.lang.Class<com.authenticvision.android.sdk.integration.AvAuthenticationResult>;
						public static AUTHENTIC: com.authenticvision.android.sdk.integration.AvAuthenticationResult;
						public static COUNTERFEIT: com.authenticvision.android.sdk.integration.AvAuthenticationResult;
						public static CONTRADICTING_EVIDENCE: com.authenticvision.android.sdk.integration.AvAuthenticationResult;
						public static STANDARD_2D_CODE: com.authenticvision.android.sdk.integration.AvAuthenticationResult;
						public static UNSUPPORTED_LABEL: com.authenticvision.android.sdk.integration.AvAuthenticationResult;
						public static TIME_OUT: com.authenticvision.android.sdk.integration.AvAuthenticationResult;
						public static OTHER: com.authenticvision.android.sdk.integration.AvAuthenticationResult;
						public static values(): androidNative.Array<com.authenticvision.android.sdk.integration.AvAuthenticationResult>;
						public static valueOf(param0: string): com.authenticvision.android.sdk.integration.AvAuthenticationResult;
					}
					export class AvBranding {
						public static class: java.lang.Class<com.authenticvision.android.sdk.integration.AvBranding>;
						public constructor();
					}
					export module AvBranding {
						export class Companion {
							public static class: java.lang.Class<com.authenticvision.android.sdk.integration.AvBranding.Companion>;
							public adjustBrightness(param0: number, param1: number): number;
							public adjustAlpha(param0: number, param1: number): number;
							public drawable(param0: globalAndroid.content.Context, param1: number): globalAndroid.graphics.drawable.Drawable;
						}
					}
					export class AvBrandingIntent extends com.authenticvision.android.sdk.integration.AvBranding {
						public static class: java.lang.Class<com.authenticvision.android.sdk.integration.AvBrandingIntent>;
						public constructor();
						public constructor(param0: globalAndroid.content.Intent);
						public setScanLogo(param0: globalAndroid.graphics.Bitmap): void;
						public setSecondaryColor(param0: number): void;
						public setPrimaryColor(param0: number): void;
					}
					export class AvCodeRawType {
						public static class: java.lang.Class<com.authenticvision.android.sdk.integration.AvCodeRawType>;
						public static Undefined: com.authenticvision.android.sdk.integration.AvCodeRawType;
						public static QR: com.authenticvision.android.sdk.integration.AvCodeRawType;
						public static DM: com.authenticvision.android.sdk.integration.AvCodeRawType;
						public static values(): androidNative.Array<com.authenticvision.android.sdk.integration.AvCodeRawType>;
						public static valueOf(param0: string): com.authenticvision.android.sdk.integration.AvCodeRawType;
					}
					export class AvCompatibility {
						public static class: java.lang.Class<com.authenticvision.android.sdk.integration.AvCompatibility>;
						public static INSTANCE: com.authenticvision.android.sdk.integration.AvCompatibility;
						public isDeviceCompatible(param0: globalAndroid.content.Context, param1: com.authenticvision.android.sdk.integration.AvScanConfig): com.authenticvision.android.sdk.integration.AvCompatibility.CompatibilityLevel;
					}
					export module AvCompatibility {
						export class CompatibilityLevel {
							public static class: java.lang.Class<com.authenticvision.android.sdk.integration.AvCompatibility.CompatibilityLevel>;
							public static INCOMPATIBLE: com.authenticvision.android.sdk.integration.AvCompatibility.CompatibilityLevel;
							public static LIMITED: com.authenticvision.android.sdk.integration.AvCompatibility.CompatibilityLevel;
							public static FULL: com.authenticvision.android.sdk.integration.AvCompatibility.CompatibilityLevel;
							public static values(): androidNative.Array<com.authenticvision.android.sdk.integration.AvCompatibility.CompatibilityLevel>;
							public static valueOf(param0: string): com.authenticvision.android.sdk.integration.AvCompatibility.CompatibilityLevel;
						}
					}
					export class AvInfo {
						public static class: java.lang.Class<com.authenticvision.android.sdk.integration.AvInfo>;
						public static INSTANCE: com.authenticvision.android.sdk.integration.AvInfo;
						public version(): string;
						public gitHash(): string;
						public buildCode(): string;
						public avasVersion(): string;
						public avasGitHash(): string;
						public coreVersion(): string;
						public coreGitHash(): string;
					}
					export class AvLocale {
						public static class: java.lang.Class<com.authenticvision.android.sdk.integration.AvLocale>;
						public static INSTANCE: com.authenticvision.android.sdk.integration.AvLocale;
						public supportedLocales(): java.util.List<java.util.Locale>;
						public isLocaleSupported(param0: java.util.Locale): boolean;
						public reconfigureContextWithLocale(param0: globalAndroid.content.Context, param1: com.authenticvision.android.sdk.integration.AvLocaleConfig): globalAndroid.content.Context;
					}
					export class AvLocaleConfig {
						public static class: java.lang.Class<com.authenticvision.android.sdk.integration.AvLocaleConfig>;
						public appSupportedLocales(): java.util.List<java.util.Locale>;
						public constructor();
						public describeContents(): number;
						public defaultLocale(): java.util.Locale;
						public locale(): java.util.Locale;
					}
					export class AvScanActivity implements com.authenticvision.android.sdk.integration.AvScanDelegate {
						public static class: java.lang.Class<com.authenticvision.android.sdk.integration.AvScanActivity>;
						public avIncidentRequest(param0: java.util.List<any>): void;
						public constructor();
						public avContactUsRequest(): void;
						public avScanningLabel(param0: string): void;
						public avScanDidCompleteWithResult(param0: com.authenticvision.android.sdk.integration.AvScanResult): void;
						public getRequiredPermissions(): androidNative.Array<string>;
						public avReadyToScan(): void;
						public avGuideRequest(): void;
						public avUnrecoverableError(param0: com.authenticvision.android.sdk.integration.AvScanErrorResult): void;
					}
					export class AvScanCampaignAction {
						public static class: java.lang.Class<com.authenticvision.android.sdk.integration.AvScanCampaignAction>;
						public static UNDEFINED: com.authenticvision.android.sdk.integration.AvScanCampaignAction;
						public static SKIP: com.authenticvision.android.sdk.integration.AvScanCampaignAction;
						public static WEBSITE: com.authenticvision.android.sdk.integration.AvScanCampaignAction;
						public static VIDEO: com.authenticvision.android.sdk.integration.AvScanCampaignAction;
						public static SYSTEM_BROWSER: com.authenticvision.android.sdk.integration.AvScanCampaignAction;
						public static values(): androidNative.Array<com.authenticvision.android.sdk.integration.AvScanCampaignAction>;
						public static valueOf(param0: string): com.authenticvision.android.sdk.integration.AvScanCampaignAction;
					}
					export class AvScanConfig {
						public static class: java.lang.Class<com.authenticvision.android.sdk.integration.AvScanConfig>;
						public constructor();
						public describeContents(): number;
						public labelLayout(): com.authenticvision.android.sdk.integration.AvScanConfig.AvLabelLayout;
						public attestationCert(): string;
						public localeConfig(): com.authenticvision.android.sdk.integration.AvLocaleConfig;
						public sessionCert(): java.util.List<string>;
						public endpoints(): java.util.List<string>;
						public isGeoLocationEnabled(): boolean;
						public isHapticFeedbackEnabled(param0: globalAndroid.content.Context): boolean;
						public apiKey(): string;
						public static getENDPOINTS_TESTING(): java.util.List<string>;
						public static getENDPOINTS_PRODUCTION(): java.util.List<string>;
						public isCampaignFlowEnabled(): boolean;
						public isVisualFeedbackEnabled(param0: globalAndroid.content.Context): boolean;
						public attestationMode(): com.authenticvision.android.sdk.integration.AvScanConfig.AvAttestationMode;
						public appStoreURL(): string;
						public scanDesign(param0: globalAndroid.content.Context): com.authenticvision.android.sdk.integration.AvScanConfig.AvScanDesign;
						public isAcousticFeedbackEnabled(param0: globalAndroid.content.Context): boolean;
					}
					export module AvScanConfig {
						export class AvAttestationMode {
							public static class: java.lang.Class<com.authenticvision.android.sdk.integration.AvScanConfig.AvAttestationMode>;
							public static NONE: com.authenticvision.android.sdk.integration.AvScanConfig.AvAttestationMode;
							public static MANAGED: com.authenticvision.android.sdk.integration.AvScanConfig.AvAttestationMode;
							public static CMS: com.authenticvision.android.sdk.integration.AvScanConfig.AvAttestationMode;
							public static values(): androidNative.Array<com.authenticvision.android.sdk.integration.AvScanConfig.AvAttestationMode>;
							public static valueOf(param0: string): com.authenticvision.android.sdk.integration.AvScanConfig.AvAttestationMode;
						}
						export class AvLabelLayout {
							public static class: java.lang.Class<com.authenticvision.android.sdk.integration.AvScanConfig.AvLabelLayout>;
							public static GENERIC: com.authenticvision.android.sdk.integration.AvScanConfig.AvLabelLayout;
							public static HORIZONTAL: com.authenticvision.android.sdk.integration.AvScanConfig.AvLabelLayout;
							public static VERTICAL: com.authenticvision.android.sdk.integration.AvScanConfig.AvLabelLayout;
							public static values(): androidNative.Array<com.authenticvision.android.sdk.integration.AvScanConfig.AvLabelLayout>;
							public static valueOf(param0: string): com.authenticvision.android.sdk.integration.AvScanConfig.AvLabelLayout;
						}
						export class AvScanDesign {
							public static class: java.lang.Class<com.authenticvision.android.sdk.integration.AvScanConfig.AvScanDesign>;
							public static GENERIC_SCAN_ASSIST: com.authenticvision.android.sdk.integration.AvScanConfig.AvScanDesign;
							public static GENERIC_MANUAL: com.authenticvision.android.sdk.integration.AvScanConfig.AvScanDesign;
							public static CHEQUE_CARD: com.authenticvision.android.sdk.integration.AvScanConfig.AvScanDesign;
							public static valueOf(param0: string): com.authenticvision.android.sdk.integration.AvScanConfig.AvScanDesign;
							public static values(): androidNative.Array<com.authenticvision.android.sdk.integration.AvScanConfig.AvScanDesign>;
						}
						export class Companion {
							public static class: java.lang.Class<com.authenticvision.android.sdk.integration.AvScanConfig.Companion>;
							public getENDPOINTS_TESTING(): java.util.List<string>;
							public getENDPOINTS_PRODUCTION(): java.util.List<string>;
						}
					}
					export class AvScanConfigIntent extends com.authenticvision.android.sdk.integration.AvScanConfig {
						public static class: java.lang.Class<com.authenticvision.android.sdk.integration.AvScanConfigIntent>;
						public setIsVisualFeedbackEnabled(param0: boolean): void;
						public setAttestationMode(param0: com.authenticvision.android.sdk.integration.AvScanConfig.AvAttestationMode): void;
						public sessionCert(): java.util.List<string>;
						public endpoints(): java.util.List<string>;
						public isHapticFeedbackEnabled(param0: globalAndroid.content.Context): boolean;
						public setApiKey(param0: string): void;
						public setIsGeoLocationEnabled(param0: boolean): void;
						public setIsAcousticFeedbackEnabled(param0: boolean): void;
						public isCampaignFlowEnabled(): boolean;
						public setSessionCerts(param0: java.util.List<string>): void;
						public attestationMode(): com.authenticvision.android.sdk.integration.AvScanConfig.AvAttestationMode;
						public setLocaleDefault(param0: java.util.Locale): void;
						public isAcousticFeedbackEnabled(param0: globalAndroid.content.Context): boolean;
						public setScanDesign(param0: com.authenticvision.android.sdk.integration.AvScanConfig.AvScanDesign): void;
						public constructor();
						public labelLayout(): com.authenticvision.android.sdk.integration.AvScanConfig.AvLabelLayout;
						public attestationCert(): string;
						public localeConfig(): com.authenticvision.android.sdk.integration.AvLocaleConfig;
						public isGeoLocationEnabled(): boolean;
						public setEndpoints(param0: java.util.List<string>): void;
						public setIsHapticFeedbackEnabled(param0: boolean): void;
						public setLocale(param0: java.util.Locale): void;
						public apiKey(): string;
						public setAttestationCert(param0: string): void;
						public setIsCampaignFlowEnabled(param0: boolean): void;
						public constructor(param0: globalAndroid.content.Intent);
						public setAppStoreURL(param0: string): void;
						public setLabelLayout(param0: com.authenticvision.android.sdk.integration.AvScanConfig.AvLabelLayout): void;
						public isVisualFeedbackEnabled(param0: globalAndroid.content.Context): boolean;
						public scanDesign(param0: globalAndroid.content.Context): com.authenticvision.android.sdk.integration.AvScanConfig.AvScanDesign;
					}
					export class AvScanDelegate {
						public static class: java.lang.Class<com.authenticvision.android.sdk.integration.AvScanDelegate>;
						public constructor(implementation: {
							avUnrecoverableError(param0: com.authenticvision.android.sdk.integration.AvScanErrorResult): void;
							avScanDidCompleteWithResult(param0: com.authenticvision.android.sdk.integration.AvScanResult): void;
							avReadyToScan(): void;
							avScanningLabel(param0: string): void;
						});
						public constructor();
						public avScanningLabel(param0: string): void;
						public avScanDidCompleteWithResult(param0: com.authenticvision.android.sdk.integration.AvScanResult): void;
						public avReadyToScan(): void;
						public avUnrecoverableError(param0: com.authenticvision.android.sdk.integration.AvScanErrorResult): void;
					}
					export module AvScanDelegate {
						export class DefaultImpls {
							public static class: java.lang.Class<com.authenticvision.android.sdk.integration.AvScanDelegate.DefaultImpls>;
							public static avReadyToScan(param0: com.authenticvision.android.sdk.integration.AvScanDelegate): void;
							public static avScanningLabel(param0: com.authenticvision.android.sdk.integration.AvScanDelegate, param1: string): void;
						}
					}
					export class AvScanError extends globalAndroid.os.Parcelable {
						public static class: java.lang.Class<com.authenticvision.android.sdk.integration.AvScanError>;
						public static UNKNOWN: com.authenticvision.android.sdk.integration.AvScanError;
						public static CAMERA_UNAVAILABLE: com.authenticvision.android.sdk.integration.AvScanError;
						public static OUTDATED: com.authenticvision.android.sdk.integration.AvScanError;
						public static INVALID_API_KEY: com.authenticvision.android.sdk.integration.AvScanError;
						public static POLICY_VIOLATION: com.authenticvision.android.sdk.integration.AvScanError;
						public describeContents(): number;
						public static valueOf(param0: string): com.authenticvision.android.sdk.integration.AvScanError;
						public static values(): androidNative.Array<com.authenticvision.android.sdk.integration.AvScanError>;
					}
					export class AvScanErrorResult {
						public static class: java.lang.Class<com.authenticvision.android.sdk.integration.AvScanErrorResult>;
						public getScanError(): com.authenticvision.android.sdk.integration.AvScanError;
						public getMessage(): string;
						public hashCode(): number;
						public equals(param0: any): boolean;
						public constructor(param0: com.authenticvision.android.sdk.integration.AvScanError, param1: string, param2: java.net.URL);
						public toString(): string;
						public getUrl(): java.net.URL;
					}
					export class AvScanErrorResultIntent {
						public static class: java.lang.Class<com.authenticvision.android.sdk.integration.AvScanErrorResultIntent>;
						public constructor(param0: globalAndroid.content.Intent);
						public addToIntent(param0: com.authenticvision.android.sdk.integration.AvScanErrorResult): void;
						public mapFromIntent(): com.authenticvision.android.sdk.integration.AvScanErrorResult;
					}
					export class AvScanResult {
						public static class: java.lang.Class<com.authenticvision.android.sdk.integration.AvScanResult>;
						public getResultUrl(): string;
						public hashCode(): number;
						public equals(param0: any): boolean;
						public getAuthenticationResult(): com.authenticvision.android.sdk.integration.AvAuthenticationResult;
						public setCampaignUrl(param0: string): void;
						public constructor(param0: boolean, param1: string, param2: string, param3: com.authenticvision.android.sdk.integration.AvCodeRawType, param4: androidNative.Array<number>, param5: string, param6: com.authenticvision.android.sdk.integration.AvAuthenticationResult, param7: string, param8: com.authenticvision.android.sdk.integration.AvScanResultAction, param9: string, param10: com.authenticvision.android.sdk.integration.AvScanCampaignAction, param11: string, param12: java.util.List<any>);
						public setAuthenticationResult(param0: com.authenticvision.android.sdk.integration.AvAuthenticationResult): void;
						public getCodeRawText(): string;
						public describeContents(): number;
						public getCampaignAction(): com.authenticvision.android.sdk.integration.AvScanCampaignAction;
						public getCodeRawType(): com.authenticvision.android.sdk.integration.AvCodeRawType;
						public getResultAction(): com.authenticvision.android.sdk.integration.AvScanResultAction;
						public getCampaignUrl(): string;
						public getAttestationToken(): string;
						public setAttestationToken(param0: string): void;
						public toString(): string;
						public setResultUrl(param0: string): void;
						public getSessionId(): string;
						public getSlid(): string;
						public getCodeRawData(): androidNative.Array<number>;
						public isAuthentic(): boolean;
					}
					export class AvScanResultAction {
						public static class: java.lang.Class<com.authenticvision.android.sdk.integration.AvScanResultAction>;
						public static UNDEFINED: com.authenticvision.android.sdk.integration.AvScanResultAction;
						public static SKIP: com.authenticvision.android.sdk.integration.AvScanResultAction;
						public static STATIC: com.authenticvision.android.sdk.integration.AvScanResultAction;
						public static URL: com.authenticvision.android.sdk.integration.AvScanResultAction;
						public static values(): androidNative.Array<com.authenticvision.android.sdk.integration.AvScanResultAction>;
						public static valueOf(param0: string): com.authenticvision.android.sdk.integration.AvScanResultAction;
					}
					export class AvScanResultIntent {
						public static class: java.lang.Class<com.authenticvision.android.sdk.integration.AvScanResultIntent>;
						public constructor(param0: globalAndroid.content.Intent);
						public mapFromIntent(): com.authenticvision.android.sdk.integration.AvScanResult;
						public addToIntent(param0: com.authenticvision.android.sdk.integration.AvScanResult): void;
					}
				}
			}
		}
	}
}
