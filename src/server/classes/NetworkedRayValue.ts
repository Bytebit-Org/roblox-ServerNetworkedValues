import { NetworkedValue } from "./BaseNetworkedValue";
import { INetworkedValue } from "../interfaces/INetworkedValue";
import { getOrCreateValueObjectInstance } from "../functions/GetOrCreateValueObjectInstance";

export class NetworkedRayValue extends NetworkedValue<Ray> {
	public static create(this: void, initialValue: Ray, name: string, parentInstance: Instance): INetworkedValue<Ray> {
		const valueObjectInstance = getOrCreateValueObjectInstance(
			"RayValue",
			true,
			initialValue,
			name,
			parentInstance,
		);
		return new NetworkedRayValue(valueObjectInstance);
	}
	public static getOrCreate(
		this: void,
		initialValue: Ray,
		name: string,
		parentInstance: Instance,
	): INetworkedValue<Ray> {
		const valueObjectInstance = getOrCreateValueObjectInstance(
			"RayValue",
			false,
			initialValue,
			name,
			parentInstance,
		);
		return new NetworkedRayValue(valueObjectInstance);
	}
}
