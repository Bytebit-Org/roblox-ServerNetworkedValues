import { ISignal, Signal } from "@rbxts/signals-tooling";
import { INetworkedValue } from "../interfaces/INetworkedValue";
import { RunService } from "@rbxts/services";
import { ValueObjectInstance } from "../../types/ValueObjectInstance";
import { ValueType } from "../../types/ValueType";

const defaultCreateValueChangedSignal = <T extends ValueType>() => new Signal<(newValue: T) => void>();

export abstract class NetworkedValue<T extends ValueType> implements INetworkedValue<T> {
	public readonly valueChanged: ISignal<(newValue: T) => void>;

	public constructor(
		private readonly valueObjectInstance: ValueObjectInstance<T>,
		createValueChangedSignal?: () => ISignal<(newValue: T) => void>,
	) {
		if (!RunService.IsServer()) {
			throw `Cannot create unless on server`;
		}

		this.valueChanged =
			createValueChangedSignal === undefined ? defaultCreateValueChangedSignal<T>() : createValueChangedSignal();
	}

	public destroy() {
		this.valueChanged.disconnectAll();
		this.valueObjectInstance.Destroy();
	}

	public getValue(): T {
		return this.valueObjectInstance.Value;
	}

	public setValue(newValue: T) {
		if (newValue === this.valueObjectInstance.Value) {
			return;
		}

		this.valueObjectInstance.Value = newValue;
		this.valueChanged.fire(newValue);
	}

	public updateValue(updateCallback: (oldValue: T) => T) {
		const newValue = updateCallback(this.valueObjectInstance.Value);
		this.setValue(newValue);
	}
}
