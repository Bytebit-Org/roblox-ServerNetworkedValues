import { NetworkedValue } from "./BaseNetworkedValue";
import { INetworkedValue } from "../interfaces/INetworkedValue";
import { getOrCreateValueObjectInstance } from "../functions/GetOrCreateValueObjectInstance";

export class NetworkedEnumValue<T extends number> extends NetworkedValue<T> {
	public static create<T extends number>(
		this: void,
		initialValue: T,
		name: string,
		parentInstance: Instance,
	): INetworkedValue<number> {
		const valueObjectInstance = getOrCreateValueObjectInstance(
			"IntValue",
			true,
			initialValue,
			name,
			parentInstance,
		);
		return new NetworkedEnumValue(valueObjectInstance);
	}

	public static getOrCreate<T extends number>(
		this: void,
		initialValue: T,
		name: string,
		parentInstance: Instance,
	): INetworkedValue<number> {
		const valueObjectInstance = getOrCreateValueObjectInstance(
			"IntValue",
			false,
			initialValue,
			name,
			parentInstance,
		);
		return new NetworkedEnumValue(valueObjectInstance);
	}
}
