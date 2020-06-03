import { NetworkedValue } from "./BaseNetworkedValue";
import { INetworkedValue } from "../interfaces/INetworkedValue";
import { getOrCreateValueObjectInstance } from "../functions/GetOrCreateValueObjectInstance";

export class NetworkedInstanceValue extends NetworkedValue<Instance | undefined> {
	public static create(
		this: void,
		initialValue: Instance | undefined,
		name: string,
		parentInstance: Instance,
	): INetworkedValue<Instance | undefined> {
		const valueObjectInstance = getOrCreateValueObjectInstance(
			"ObjectValue",
			true,
			initialValue,
			name,
			parentInstance,
		);
		return new NetworkedInstanceValue(valueObjectInstance);
	}
	public static getOrCreate(
		this: void,
		initialValue: Instance | undefined,
		name: string,
		parentInstance: Instance,
	): INetworkedValue<Instance | undefined> {
		const valueObjectInstance = getOrCreateValueObjectInstance(
			"ObjectValue",
			false,
			initialValue,
			name,
			parentInstance,
		);
		return new NetworkedInstanceValue(valueObjectInstance);
	}
}
