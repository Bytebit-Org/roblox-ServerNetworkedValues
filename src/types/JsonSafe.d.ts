export type JsonSafe =
	| string
	| number
	| boolean
	| ReadonlyArray<JsonSafe>
	| ReadonlyMap<string, JsonSafe>
	| {
			[index: string]: JsonSafe;
	  }
	| undefined;
