import { ValueType } from "./ValueType";

/** A generic type to define ValueObjects of any type (e.g. IntValue, Color3Value) */
export type ValueObjectInstance<T extends ValueType> = Instance & {
	/** Fired whenever the value is changed */
	readonly Changed: RBXScriptSignal<(value: T) => void>;

	/** Gets or sets the value */
	Value: T;
};
