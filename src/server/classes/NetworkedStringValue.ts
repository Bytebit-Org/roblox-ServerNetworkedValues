import { NetworkedValue } from "./BaseNetworkedValue";
import { INetworkedValue } from "../interfaces/INetworkedValue";
import { getOrCreateValueObjectInstance } from "../functions/GetOrCreateValueObjectInstance";

export class NetworkedStringValue extends NetworkedValue<string> {
	public static create(
		this: void,
		initialValue: string,
		name: string,
		parentInstance: Instance,
	): INetworkedValue<string> {
		const valueObjectInstance = getOrCreateValueObjectInstance(
			"StringValue",
			true,
			initialValue,
			name,
			parentInstance,
		);
		return new NetworkedStringValue(valueObjectInstance);
	}
	public static getOrCreate(
		this: void,
		initialValue: string,
		name: string,
		parentInstance: Instance,
	): INetworkedValue<string> {
		const valueObjectInstance = getOrCreateValueObjectInstance(
			"StringValue",
			false,
			initialValue,
			name,
			parentInstance,
		);
		return new NetworkedStringValue(valueObjectInstance);
	}
}
