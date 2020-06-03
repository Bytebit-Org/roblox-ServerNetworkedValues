import { NetworkedValue } from "./BaseNetworkedValue";
import { INetworkedValue } from "../interfaces/INetworkedValue";
import { getOrCreateValueObjectInstance } from "../functions/GetOrCreateValueObjectInstance";

export class NetworkedCFrameValue extends NetworkedValue<CFrame> {
	public static create(
		this: void,
		initialValue: CFrame,
		name: string,
		parentInstance: Instance,
	): INetworkedValue<CFrame> {
		const valueObjectInstance = getOrCreateValueObjectInstance(
			"CFrameValue",
			true,
			initialValue,
			name,
			parentInstance,
		);
		return new NetworkedCFrameValue(valueObjectInstance);
	}
	public static getOrCreate(
		this: void,
		initialValue: CFrame,
		name: string,
		parentInstance: Instance,
	): INetworkedValue<CFrame> {
		const valueObjectInstance = getOrCreateValueObjectInstance(
			"CFrameValue",
			false,
			initialValue,
			name,
			parentInstance,
		);
		return new NetworkedCFrameValue(valueObjectInstance);
	}
}
