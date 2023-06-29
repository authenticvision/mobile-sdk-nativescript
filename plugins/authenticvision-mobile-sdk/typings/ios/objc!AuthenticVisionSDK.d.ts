/// <reference path="../../../../node_modules/@nativescript/types-ios/index.d.ts" />
declare const enum AVKAttestationMode {
	None = 0,
	Managed = 1,
	CMS = 2
}
interface AVKBrandingDelegate extends NSObjectProtocol {
	colorNamedCompatibleWithTraitCollection?(name: string, traitCollection: UITraitCollection): UIColor|null;
	dataNamed?(name: string): NSDataAsset|null;
	fontWithDescriptorSize?(fontDescriptor: UIFontDescriptor, pointSize: number): UIFont|null;
	imageNamedCompatibleWithTraitCollection?(name: string, traitCollection: UITraitCollection): UIImage|null;
}
declare var AVKBrandingDelegate: {
	prototype: AVKBrandingDelegate;
}
declare class AVKCampaignScanFlow extends NSObject implements AVKScanViewControllerDelegate {
	static alloc(): AVKCampaignScanFlow; // inherited from NSObject
	static new(): AVKCampaignScanFlow; // inherited from NSObject
	appStoreURL: NSURL;
	delegate: AVKCampaignScanFlowDelegate;
	isAuthenticResultAutoContinueEnabled: boolean;
	readonly debugDescription: string; // inherited from NSObjectProtocol
	readonly description: string; // inherited from NSObjectProtocol
	readonly hash: number; // inherited from NSObjectProtocol
	readonly isProxy: boolean; // inherited from NSObjectProtocol
	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol
	readonly  // inherited from NSObjectProtocol
	class(): typeof NSObject;
	conformsToProtocol(aProtocol: any /* Protocol */): boolean;
	isEqual(object: any): boolean;
	isKindOfClass(aClass: typeof NSObject): boolean;
	isMemberOfClass(aClass: typeof NSObject): boolean;
	performSelector(aSelector: string): any;
	performSelectorWithObject(aSelector: string, object: any): any;
	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;
	respondsToSelector(aSelector: string): boolean;
	retainCount(): number;
	scanViewControllerReadyToScan(controller: AVKScanViewController): void;
	scanViewControllerScanDidCompleteWithResult(controller: AVKScanViewController, result: AVKScanResult): void;
	scanViewControllerScanWillCompleteWithResult(controller: AVKScanViewController, result: AVKScanResult): void;
	scanViewControllerScanningLabel(controller: AVKScanViewController, SLID: string): void;
	scanViewControllerUnrecoverableError(controller: AVKScanViewController, error: NSError): void;
	self(): this;
}
interface AVKCampaignScanFlowDelegate extends NSObjectProtocol {
	campaignScanFlowContactRequest?(scanCampaignFlow: AVKCampaignScanFlow): void;
	campaignScanFlowGuideRequest?(scanCampaignFlow: AVKCampaignScanFlow): void;
}
declare var AVKCampaignScanFlowDelegate: {
	prototype: AVKCampaignScanFlowDelegate;
}
declare class AVKCampaignViewController extends UIViewController {
	static alloc(): AVKCampaignViewController; // inherited from NSObject
	static campaignViewControllerWithCampaignURLCampaignActionResultURL(campaignURL: NSURL, campaignAction: AVKScanCampaignAction, resultURL: NSURL): AVKCampaignViewController;
	static new(): AVKCampaignViewController; // inherited from NSObject
	campaignAction: AVKScanCampaignAction;
	campaignURL: NSURL;
	delegate: AVKCampaignViewControllerDelegate;
	resultURL: NSURL;
}
interface AVKCampaignViewControllerDelegate extends NSObjectProtocol {
	campaignViewControllerContinue(controller: AVKCampaignViewController): void;
	campaignViewControllerDismissAndContactUs(controller: AVKCampaignViewController): void;
	campaignViewControllerDismissAndReportIncident(controller: AVKCampaignViewController): void;
}
declare var AVKCampaignViewControllerDelegate: {
	prototype: AVKCampaignViewControllerDelegate;
}
declare class AVKCompatibility extends NSObject {
	static compatibilityLevelForConfig(config: AVKScanConfig): AVKCompatibilityLevel;
	static isAttestationSupported(): boolean;
	static isAttestationSupportedForConfig(config: AVKScanConfig): boolean;
	static isDeviceCompatible(): boolean;
}
declare const enum AVKCompatibilityLevel {
	Incompatible = 0,
	Limited = 1,
	Full = 2
}
declare const enum AVKCoreAuthenticationResult {
	Authentic = 1,
	Counterfeit = 2,
	ContradictingEvidence = 3,
	Standard2DCode = 4,
	UnsupportedLabel = 5,
	Timeout = 6
}
declare const enum AVKCoreCodeRawType {
	Undefined = 0,
	QR = 1,
	DM = 2
}
declare class AVKCoreSLID extends NSObject {
	static alloc(): AVKCoreSLID; // inherited from NSObject
	static new(): AVKCoreSLID; // inherited from NSObject
	static slidFromBase36(slid36: string): AVKCoreSLID;
	static slidFromInt(slid10: number): AVKCoreSLID;
	readonly asBase36: string;
	readonly asInt: number;
	readonly isValid: boolean;
	constructor(o: { base36: string; });
	constructor(o: { int: number; });
	initWithBase36(slid36: string): this;
	initWithInt(slid10: number): this;
}
declare class AVKEndpointConfig extends NSObject implements NSCopying {
	static alloc(): AVKEndpointConfig; // inherited from NSObject
	static endpointConfigFromPlistAtPath(path: string): AVKEndpointConfig;
	static endpointConfigNamed(name: string): AVKEndpointConfig;
	static new(): AVKEndpointConfig; // inherited from NSObject
	apiKey: string;
	readonly isComplete: boolean;
	name: string;
	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}
declare class AVKFileLogger extends AVKLogger {
	static alloc(): AVKFileLogger; // inherited from NSObject
	static new(): AVKFileLogger; // inherited from NSObject
	readonly logsDirectory: string;
	maxBytesPerLog: number;
	maxLogFiles: number;
	constructor(o: { logsDirectory: string; });
	initWithLogsDirectory(aLogsDirectory: string): this;
}
declare class AVKGlobalLogging extends NSObject {
	static alloc(): AVKGlobalLogging; // inherited from NSObject
	static new(): AVKGlobalLogging; // inherited from NSObject
	static sharedLogging(): AVKGlobalLogging;
	addLogger(logger: AVKLogger): void;
	clearLoggers(): void;
	logWithLevelLayerFileFunctionLineMsg(level: AVKLogLevel, layer: string, file: string, _function: string, line: number, msg: string): void;
}
declare const enum AVKLabelLayout {
	Generic = 0,
	Horizontal = 1,
	Vertical = 2
}
declare const enum AVKLabelType {
	Generic = 0,
	QTag = 1,
	DTag = 2,
	UTagGeneric = 3,
	UTagQR = 4,
	UTagDM = 5
}
declare class AVKLocalization extends NSObject {
	static alloc(): AVKLocalization; // inherited from NSObject
	static new(): AVKLocalization; // inherited from NSObject
	static sharedLocalization(): AVKLocalization;
	baseLocale: string;
	localizationBundle: NSBundle;
	isLocaleSupported(locale: string): boolean;
	localizedStringForKeyValueTable(key: string, value: string, table: string): string;
}
declare const enum AVKLogLevel {
	Fatal = 0,
	Error = 1,
	Warn = 2,
	Info = 3,
	Debug = 4,
	Trace = 5
}
declare class AVKLogMessage extends NSObject {
	static alloc(): AVKLogMessage; // inherited from NSObject
	static new(): AVKLogMessage; // inherited from NSObject
	date: Date;
	function: string;
	layer: string;
	level: AVKLogLevel;
	location: string;
	message: string;
	constructor(o: { message: string; level: AVKLogLevel; date: Date; layer: string; function: string; location: string; });
	initWithMessageLevelDateLayerFunctionLocation(message: string, level: AVKLogLevel, date: Date, layer: string, _function: string, location: string): this;
}
declare class AVKLogger extends NSObject {
	static alloc(): AVKLogger; // inherited from NSObject
	static new(): AVKLogger; // inherited from NSObject
	includeCallerFunction: boolean;
	includeCallerLocation: boolean;
	includeDate: boolean;
	includeLayer: boolean;
	includeLogLevel: boolean;
	logLevel: AVKLogLevel;
	createLineFromMessage(message: AVKLogMessage): string;
	logMessage(message: AVKLogMessage): void;
}
declare class AVKOSLogger extends AVKLogger {
	static alloc(): AVKOSLogger; // inherited from NSObject
	static new(): AVKOSLogger; // inherited from NSObject
}
declare const enum AVKScanCampaignAction {
	Undefined = 0,
	Skip = 1,
	InAppBrowser = 2,
	InAppVideo = 3,
	OpenSafari = 4
}
declare class AVKScanConfig extends NSObject implements NSCopying {
	static alloc(): AVKScanConfig; // inherited from NSObject
	static defaultScanConfig(): AVKScanConfig;
	static new(): AVKScanConfig; // inherited from NSObject
	apiKey: string;
	attestationCert: string;
	attestationMode: AVKAttestationMode;
	brandingBundle: NSBundle;
	brandingDelegate: AVKBrandingDelegate;
	design: AVKScanDesign;
	endpointConfig: AVKEndpointConfig; // private
	feedback: AVKScanFeedback;
	includeGeoLocationData: boolean;
	labelLayout: AVKLabelLayout;
	labelType: AVKLabelType;
	locale: string;
	showDebugViews: boolean;
	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
	prepareToScan(): void;
}
declare const enum AVKScanDesign {
	GenericScanAssist = 0,
	GenericManual = 1,
	ChequeCard = 2,
	Classic = 3
}
declare const enum AVKScanError {
	Unknown = 0,
	Config = 1,
	Network = 2,
	CameraUnavailable = 3,
	Outdated = 4,
	InvalidAPIKey = 5,
	PolicyViolation = 6
}
declare var AVKScanErrorComponentKey: string;
declare var AVKScanErrorDomain: string;
declare var AVKScanErrorServerMessageKey: string;
declare const enum AVKScanFeedback {
	Visual = 1,
	Acoustic = 2,
	Haptic = 4
}
declare class AVKScanResult extends NSObject {
	static alloc(): AVKScanResult; // inherited from NSObject
	static new(): AVKScanResult; // inherited from NSObject
	SLID: string;
	attestationToken: string;
	authResult: AVKCoreAuthenticationResult;
	readonly authentic: boolean;
	campaignAction: AVKScanCampaignAction;
	campaignURL: NSURL;
	codeRawData: NSData;
	readonly codeRawText: string;
	codeRawType: AVKCoreCodeRawType;
	resultAction: AVKScanResultAction;
	resultURL: NSURL;
	sessionID: string;
}
declare const enum AVKScanResultAction {
	Undefined = 0,
	Skip = 1,
	Static = 2,
	URL = 3
}
declare class AVKScanViewController extends UIViewController {
	static scanViewController(): AVKScanViewController;
	static scanViewControllerWithDelegateConfig(delegate: AVKScanViewControllerDelegate, config: AVKScanConfig): AVKScanViewController;
	static scanViewControllerWithDelegateConfigError(delegate: AVKScanViewControllerDelegate, config: AVKScanConfig): AVKScanViewController;
	static scanViewControllerWithDelegateError(delegate: AVKScanViewControllerDelegate): AVKScanViewController;
	config: AVKScanConfig;
	delegate: AVKScanViewControllerDelegate;
	leadingItemView: UIStackView;
	menuItemView: UIStackView;
	trailingItemView: UIStackView;
	clearTrailingItemView(): void;
	restartScanSession(): void;
	startScanSession(): void;
	stopScanSession(): void;
}
interface AVKScanViewControllerDelegate extends NSObjectProtocol {
	scanViewControllerReadyToScan?(controller: AVKScanViewController): void;
	scanViewControllerScanDidCompleteWithResult(controller: AVKScanViewController, result: AVKScanResult): void;
	scanViewControllerScanWillCompleteWithResult?(controller: AVKScanViewController, result: AVKScanResult): void;
	scanViewControllerScanningLabel?(controller: AVKScanViewController, SLID: string): void;
	scanViewControllerUnrecoverableError(controller: AVKScanViewController, error: NSError): void;
}
declare var AVKScanViewControllerDelegate: {
	prototype: AVKScanViewControllerDelegate;
}
declare class AVKStatePersister extends NSObject {
	static alloc(): AVKStatePersister; // inherited from NSObject
	static defaultStatePersister(): AVKStatePersister;
	static new(): AVKStatePersister; // inherited from NSObject
	installID: string;
	recentSLID: string;
	recentSessionID: string;
	v10CoreState: string;
	v10Endpoints: NSArray<string>;
	discardState(): void;
}
declare class AVKVersionInfo extends NSObject {
	static coreBuildHost(): string;
	static coreBuildInformation(): string;
	static coreGitHash(): string;
	static coreThirdPartyLicenses(): string;
	static coreVersion(): string;
	static sdkBuildNum(): string;
	static sdkGitHash(): string;
	static sdkVersion(): string;
}
declare var AuthenticVisionSDKVersionNumber: number;
declare var AuthenticVisionSDKVersionString: interop.Reference<number>;
declare var kAVKScanErrorComponentAVAS: string;
declare var kAVKScanErrorComponentCore: string;
