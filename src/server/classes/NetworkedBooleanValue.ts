import { NetworkedValue } from "./BaseNetworkedValue";
import { INetworkedValue } from "../interfaces/INetworkedValue";
import { getOrCreateValueObjectInstance } from "../functions/GetOrCreateValueObjectInstance";

export class NetworkedBooleanValue extends NetworkedValue<boolean> {
	public static create(
		this: void,
		initialValue: boolean,
		name: string,
		parentInstance: Instance,
	): INetworkedValue<boolean> {
		const valueObjectInstance = getOrCreateValueObjectInstance(
			"BoolValue",
			true,
			initialValue,
			name,
			parentInstance,
		);
		return new NetworkedBooleanValue(valueObjectInstance);
	}
	public static getOrCreate(
		this: void,
		initialValue: boolean,
		name: string,
		parentInstance: Instance,
	): INetworkedValue<boolean> {
		const valueObjectInstance = getOrCreateValueObjectInstance(
			"BoolValue",
			false,
			initialValue,
			name,
			parentInstance,
		);
		return new NetworkedBooleanValue(valueObjectInstance);
	}
}
