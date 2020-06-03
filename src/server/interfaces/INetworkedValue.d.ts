import { IReadOnlySignal } from "@rbxts/signals-tooling";

/**
 * Defines the server-side interface of a networked value
 */
export interface INetworkedValue<T> {
	/**
	 * Fired when the value changes
	 * @argument newValue The new value
	 */
	readonly valueChanged: IReadOnlySignal<(newValue: T) => void>;

	/**
	 * Destroys the networked value
	 */
	destroy(): void;

	/**
	 * Gets the current value
	 */
	getValue(): T;

	/**
	 * Sets the new value and networks it to all clients
	 * @param newValue The new value
	 */
	setValue(newValue: T): void;

	/**
	 * Updates the value according to the output of a callback function
	 * @param updateCallback The callback function that returns the new value
	 */
	updateValue(updateCallback: (oldValue: T) => T): void;
}
