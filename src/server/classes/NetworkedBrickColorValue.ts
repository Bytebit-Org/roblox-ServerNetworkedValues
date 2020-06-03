import { NetworkedValue } from "./BaseNetworkedValue";
import { INetworkedValue } from "../interfaces/INetworkedValue";
import { getOrCreateValueObjectInstance } from "../functions/GetOrCreateValueObjectInstance";

export class NetworkedBrickColorValue extends NetworkedValue<BrickColor> {
	public static create(
		this: void,
		initialValue: BrickColor,
		name: string,
		parentInstance: Instance,
	): INetworkedValue<BrickColor> {
		const valueObjectInstance = getOrCreateValueObjectInstance(
			"BrickColorValue",
			true,
			initialValue,
			name,
			parentInstance,
		);
		return new NetworkedBrickColorValue(valueObjectInstance);
	}
	public static getOrCreate(
		this: void,
		initialValue: BrickColor,
		name: string,
		parentInstance: Instance,
	): INetworkedValue<BrickColor> {
		const valueObjectInstance = getOrCreateValueObjectInstance(
			"BrickColorValue",
			false,
			initialValue,
			name,
			parentInstance,
		);
		return new NetworkedBrickColorValue(valueObjectInstance);
	}
}
