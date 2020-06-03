import { NetworkedValue } from "./BaseNetworkedValue";
import { INetworkedValue } from "../interfaces/INetworkedValue";
import { getOrCreateValueObjectInstance } from "../functions/GetOrCreateValueObjectInstance";

export class NetworkedVector3Value extends NetworkedValue<Vector3> {
	public static create(
		this: void,
		initialValue: Vector3,
		name: string,
		parentInstance: Instance,
	): INetworkedValue<Vector3> {
		const valueObjectInstance = getOrCreateValueObjectInstance(
			"Vector3Value",
			true,
			initialValue,
			name,
			parentInstance,
		);
		return new NetworkedVector3Value(valueObjectInstance);
	}
	public static getOrCreate(
		this: void,
		initialValue: Vector3,
		name: string,
		parentInstance: Instance,
	): INetworkedValue<Vector3> {
		const valueObjectInstance = getOrCreateValueObjectInstance(
			"Vector3Value",
			false,
			initialValue,
			name,
			parentInstance,
		);
		return new NetworkedVector3Value(valueObjectInstance);
	}
}
