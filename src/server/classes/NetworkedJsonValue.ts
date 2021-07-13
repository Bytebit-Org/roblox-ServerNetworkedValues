import { INetworkedValue } from "../interfaces/INetworkedValue";
import { JsonSafe } from "../../types/JsonSafe";
import { t } from "@rbxts/t";
import { HttpService } from "@rbxts/services";
import { ISignal, Signal } from "@rbxts/signals-tooling";
import { NetworkedStringValue } from "./NetworkedStringValue";

export class NetworkedJsonValue<T extends JsonSafe> implements INetworkedValue<T> {
	public readonly valueChanged: ISignal<(newValue: T) => void>;

	private constructor(
		createValueChangedSignal: () => ISignal<(newValue: T) => void>,
		private readonly httpService: HttpService,
		private readonly networkedStringValue: INetworkedValue<string>,
		private readonly tCheck: t.check<T>,
	) {
		this.valueChanged = createValueChangedSignal();
	}

	public static create<T extends JsonSafe>(
		this: void,
		initialValue: T,
		name: string,
		parentInstance: Instance,
		tCheck: t.check<T>,
	): INetworkedValue<T> {
		const serializedInitialValue = initialValue !== undefined ? HttpService.JSONEncode(initialValue) : "";
		const networkedStringValue = NetworkedStringValue.create(serializedInitialValue, name, parentInstance);
		return new NetworkedJsonValue(
			() => new Signal<(newValue: T) => void>(),
			HttpService,
			networkedStringValue,
			tCheck,
		);
	}

	public static getOrCreate<T extends JsonSafe>(
		this: void,
		name: string,
		initialValue: T,
		parentInstance: Instance,
		tCheck: t.check<T>,
	): INetworkedValue<T> {
		const serializedInitialValue = initialValue !== undefined ? HttpService.JSONEncode(initialValue) : "";
		const networkedStringValue = NetworkedStringValue.getOrCreate(serializedInitialValue, name, parentInstance);
		return new NetworkedJsonValue(
			() => new Signal<(newValue: T) => void>(),
			HttpService,
			networkedStringValue,
			tCheck,
		);
	}

	public destroy() {
		this.networkedStringValue.destroy();
		this.valueChanged.destroy();
	}

	public getValue() {
		const serializedValue = this.networkedStringValue.getValue();
		const deserializedValue = serializedValue === "" ? undefined : this.httpService.JSONDecode(serializedValue);
		if (!this.tCheck(deserializedValue)) {
			throw `Cannot get value - current value is invalid`;
		}

		return deserializedValue;
	}

	public setValue(newValue: T) {
		if (newValue === undefined) {
			this.networkedStringValue.setValue("");
		} else {
			const serializedValue = this.httpService.JSONEncode(newValue);
			this.networkedStringValue.setValue(serializedValue);
		}
	}

	public updateValue(updateCallback: (oldValue: T) => T) {
		const serializedCurrentValue = this.networkedStringValue.getValue();
		const deserializedCurrentValue = this.httpService.JSONDecode(serializedCurrentValue);
		if (!this.tCheck(deserializedCurrentValue)) {
			throw `Cannot update value - current value is invalid`;
		}

		const newValue = updateCallback(deserializedCurrentValue);
		const serializedNewValue = this.httpService.JSONEncode(newValue);
		this.networkedStringValue.setValue(serializedNewValue);
	}
}
