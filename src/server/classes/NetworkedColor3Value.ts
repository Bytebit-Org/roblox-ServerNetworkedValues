import { NetworkedValue } from "./BaseNetworkedValue";
import { INetworkedValue } from "../interfaces/INetworkedValue";
import { getOrCreateValueObjectInstance } from "../functions/GetOrCreateValueObjectInstance";

export class NetworkedColor3Value extends NetworkedValue<Color3> {
	public static create(
		this: void,
		initialValue: Color3,
		name: string,
		parentInstance: Instance,
	): INetworkedValue<Color3> {
		const valueObjectInstance = getOrCreateValueObjectInstance(
			"Color3Value",
			true,
			initialValue,
			name,
			parentInstance,
		);
		return new NetworkedColor3Value(valueObjectInstance);
	}
	public static getOrCreate(
		this: void,
		initialValue: Color3,
		name: string,
		parentInstance: Instance,
	): INetworkedValue<Color3> {
		const valueObjectInstance = getOrCreateValueObjectInstance(
			"Color3Value",
			false,
			initialValue,
			name,
			parentInstance,
		);
		return new NetworkedColor3Value(valueObjectInstance);
	}
}
