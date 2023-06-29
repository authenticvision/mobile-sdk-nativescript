interface ErrorConstructor {
	new(message?: string): Error;
	new(message: string, options: {cause?: any}): Error;
	readonly prototype: Error;
}

declare var Error: ErrorConstructor;
