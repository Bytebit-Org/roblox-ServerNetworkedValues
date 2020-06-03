import { NetworkedValue } from "./BaseNetworkedValue";
import { INetworkedValue } from "../interfaces/INetworkedValue";
import { getOrCreateValueObjectInstance } from "../functions/GetOrCreateValueObjectInstance";

export class NetworkedNumberValue extends NetworkedValue<number> {
	public static create(
		this: void,
		initialValue: number,
		name: string,
		parentInstance: Instance,
	): INetworkedValue<number> {
		const valueObjectInstance = getOrCreateValueObjectInstance(
			"NumberValue",
			true,
			initialValue,
			name,
			parentInstance,
		);
		return new NetworkedNumberValue(valueObjectInstance);
	}
	public static getOrCreate(
		this: void,
		initialValue: number,
		name: string,
		parentInstance: Instance,
	): INetworkedValue<number> {
		const valueObjectInstance = getOrCreateValueObjectInstance(
			"NumberValue",
			false,
			initialValue,
			name,
			parentInstance,
		);
		return new NetworkedNumberValue(valueObjectInstance);
	}
}
