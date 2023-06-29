/// <reference path="../../../../node_modules/@nativescript/types-android/index.d.ts" />

declare module com.authenticvision.android.nativescript {
	export class ScanConfig extends com.authenticvision.android.sdk.integration.configs.AvScanConfig {
		public static class: java.lang.Class<com.authenticvision.android.sdk.integration.configs.AvScanConfig>;
		constructor(intent: globalAndroid.content.Intent);
	}
	export class ScanActivity extends androidx.appcompat.app.AppCompatActivity {
		public static class: java.lang.Class<com.authenticvision.android.nativescript.ScanActivity>;
	}
}

declare module com.authenticvision.android.sdk {
	export module commons {
		export module compatibility {
			export class CompatibilityHelper {
				public static class: java.lang.Class<com.authenticvision.android.sdk.commons.compatibility.CompatibilityHelper>;
				public static INSTANCE: com.authenticvision.android.sdk.commons.compatibility.CompatibilityHelper;
				public isDeviceCompatible(param0: globalAndroid.content.Context, param1: com.authenticvision.android.sdk.integration.configs.AvScanConfig): com.authenticvision.android.sdk.integration.AvCompatibility.CompatibilityLevel;
			}
		}
	}
	export module integration {
		export class AvCompatibility {
			public static class: java.lang.Class<com.authenticvision.android.sdk.integration.AvCompatibility>;
			public static INSTANCE: com.authenticvision.android.sdk.integration.AvCompatibility;
			public isDeviceCompatible(param0: globalAndroid.content.Context, param1: com.authenticvision.android.sdk.integration.configs.AvScanConfig): com.authenticvision.android.sdk.integration.AvCompatibility.CompatibilityLevel;
			public isAttestationSupported(param0: globalAndroid.content.Context, param1: com.authenticvision.android.sdk.integration.configs.AvScanConfig): boolean;
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
			public coreVersion(): string;
			public coreGitHash(): string;
		}
		export class IAvFlowDelegate {
			public static class: java.lang.Class<com.authenticvision.android.sdk.integration.IAvFlowDelegate>;
			public constructor(implementation: {
				avUnrecoverableError(param0: com.authenticvision.android.sdk.integration.IAvFlowDelegate.AvScanError, param1: java.net.URL): void;
				avScanDidCompleteWithResult(param0: com.authenticvision.android.sdk.integration.dtos.AvScanResult): void;
				avReadyToScan(): void;
				avScanningLabel(param0: string): void;
			});
			public constructor();
			public avUnrecoverableError(param0: com.authenticvision.android.sdk.integration.IAvFlowDelegate.AvScanError, param1: java.net.URL): void;
			public avScanningLabel(param0: string): void;
			public avScanDidCompleteWithResult(param0: com.authenticvision.android.sdk.integration.dtos.AvScanResult): void;
			public avReadyToScan(): void;
		}
		export module IAvFlowDelegate {
			export class AvScanCampaignAction {
				public static class: java.lang.Class<com.authenticvision.android.sdk.integration.IAvFlowDelegate.AvScanCampaignAction>;
				public static UNDEFINED: com.authenticvision.android.sdk.integration.IAvFlowDelegate.AvScanCampaignAction;
				public static SKIP: com.authenticvision.android.sdk.integration.IAvFlowDelegate.AvScanCampaignAction;
				public static IN_APP_BROWSER: com.authenticvision.android.sdk.integration.IAvFlowDelegate.AvScanCampaignAction;
				public static values(): androidNative.Array<com.authenticvision.android.sdk.integration.IAvFlowDelegate.AvScanCampaignAction>;
				public static valueOf(param0: string): com.authenticvision.android.sdk.integration.IAvFlowDelegate.AvScanCampaignAction;
			}
			export class AvScanError {
				public static class: java.lang.Class<com.authenticvision.android.sdk.integration.IAvFlowDelegate.AvScanError>;
				public static UNKNOWN: com.authenticvision.android.sdk.integration.IAvFlowDelegate.AvScanError;
				public static CAMERA_UNAVAILABLE: com.authenticvision.android.sdk.integration.IAvFlowDelegate.AvScanError;
				public static CAMERA_PERMISSION_DENIED_ONCE: com.authenticvision.android.sdk.integration.IAvFlowDelegate.AvScanError;
				public static CAMERA_PERMISSION_DENIED_PERMANENTLY: com.authenticvision.android.sdk.integration.IAvFlowDelegate.AvScanError;
				public static OUTDATED: com.authenticvision.android.sdk.integration.IAvFlowDelegate.AvScanError;
				public static INVALID_API_KEY: com.authenticvision.android.sdk.integration.IAvFlowDelegate.AvScanError;
				public static POLICY_VIOLATION: com.authenticvision.android.sdk.integration.IAvFlowDelegate.AvScanError;
				public static valueOf(param0: string): com.authenticvision.android.sdk.integration.IAvFlowDelegate.AvScanError;
				public static values(): androidNative.Array<com.authenticvision.android.sdk.integration.IAvFlowDelegate.AvScanError>;
			}
			export class AvScanResultAction {
				public static class: java.lang.Class<com.authenticvision.android.sdk.integration.IAvFlowDelegate.AvScanResultAction>;
				public static UNDEFINED: com.authenticvision.android.sdk.integration.IAvFlowDelegate.AvScanResultAction;
				public static SKIP: com.authenticvision.android.sdk.integration.IAvFlowDelegate.AvScanResultAction;
				public static STATIC: com.authenticvision.android.sdk.integration.IAvFlowDelegate.AvScanResultAction;
				public static URL: com.authenticvision.android.sdk.integration.IAvFlowDelegate.AvScanResultAction;
				public static values(): androidNative.Array<com.authenticvision.android.sdk.integration.IAvFlowDelegate.AvScanResultAction>;
				public static valueOf(param0: string): com.authenticvision.android.sdk.integration.IAvFlowDelegate.AvScanResultAction;
			}
			export class DefaultImpls {
				public static class: java.lang.Class<com.authenticvision.android.sdk.integration.IAvFlowDelegate.DefaultImpls>;
				public static avReadyToScan(param0: com.authenticvision.android.sdk.integration.IAvFlowDelegate): void;
				public static avScanningLabel(param0: com.authenticvision.android.sdk.integration.IAvFlowDelegate, param1: string): void;
			}
		}
		export module configs {
			export class AvScanConfig {
				public static class: java.lang.Class<com.authenticvision.android.sdk.integration.configs.AvScanConfig>;
				// method omitted, see AuthenticVision.kt for native implementation instead
			}
		}
		export module dtos {
			export class AvScanResult {
				public static class: java.lang.Class<com.authenticvision.android.sdk.integration.dtos.AvScanResult>;
				public toString(): string;
				public equals(param0: any): boolean;
				public getAttestationToken(): string;
				public getAuthenticationResult(): com.authenticvision.avcore.dtos.AuthenticationResult;
				public getCampaignAction(): com.authenticvision.android.sdk.integration.IAvFlowDelegate.AvScanCampaignAction;
				public getCampaignUrl(): string;
				public getCodeRawData(): androidNative.Array<number>;
				public getCodeRawText(): string;
				// TODO: AVI-15787: public getCodeRawType(): com.authenticvision.avcore.legacy.CoreLegacy.CodeRawType;
				public getResultAction(): com.authenticvision.android.sdk.integration.IAvFlowDelegate.AvScanResultAction;
				public getResultUrl(): string;
				public getSessionId(): string;
				public getSlid(): string;
				public isAuthentic(): boolean;
			}
		}
	}
}

declare module com.authenticvision.avcore {
	export module dtos {
		export class AuthenticationResult {
			public static class: java.lang.Class<com.authenticvision.avcore.dtos.AuthenticationResult>;
			public static AUTHENTIC: com.authenticvision.avcore.dtos.AuthenticationResult;
			public static COUNTERFEIT: com.authenticvision.avcore.dtos.AuthenticationResult;
			public static CONTRADICTING_EVIDENCE: com.authenticvision.avcore.dtos.AuthenticationResult;
			public static STANDARD_2D_CODE: com.authenticvision.avcore.dtos.AuthenticationResult;
			public static UNSUPPORTED_LABEL: com.authenticvision.avcore.dtos.AuthenticationResult;
			public static TIME_OUT: com.authenticvision.avcore.dtos.AuthenticationResult;
			public static ERROR: com.authenticvision.avcore.dtos.AuthenticationResult;
			public static CANCELED: com.authenticvision.avcore.dtos.AuthenticationResult;
			public getIntegerValue(): number;
			public static values(): androidNative.Array<com.authenticvision.avcore.dtos.AuthenticationResult>;
			public static valueOf(param0: string): com.authenticvision.avcore.dtos.AuthenticationResult;
			public static fromInteger(param0: number): com.authenticvision.avcore.dtos.AuthenticationResult;
		}
	}
}
