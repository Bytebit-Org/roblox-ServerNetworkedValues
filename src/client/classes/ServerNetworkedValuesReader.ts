import { ISignal, ISignalConnection, Signal } from "@rbxts/signals-tooling";
import { RunService, HttpService } from "@rbxts/services";
import { JsonSafe } from "../../types/JsonSafe";
import { t } from "@rbxts/t";
import { ValueObjectClassName } from "../../types/ValueObjectClassName";

function mustGetValueObjectInstance(name: string, parentInstance: Instance) {
	const valueObjectInstance = parentInstance.FindFirstChild(name);
	if (valueObjectInstance === undefined) {
		throw `Networked value instance does not yet exist: ${name}`;
	}

	return valueObjectInstance;
}

function assertValueObjectInstanceType<T extends ValueObjectClassName>(
	valueObjectInstance: Instance,
	className: T,
): asserts valueObjectInstance is Instances[T] {
	assert(
		valueObjectInstance.IsA(className),
		`Expected networked value instance to be of type ${className}, got ${valueObjectInstance.ClassName}`,
	);
}

function assertValuePassesCheck<T>(value: unknown, tCheck: t.check<T>): asserts value is T {
	assert(tCheck(value), "Cannot deserialize value - serialized value is invalid");
}

function defaultCreateSignal(): ISignal {
	return new Signal();
}

export class ServerNetworkedValuesReader {
	private constructor(
		private readonly createSignal: () => ISignal,
		private readonly httpService: HttpService,
		private readonly runService: RunService,
	) {}

	public static create(this: void) {
		if (!RunService.IsClient()) {
			throw `Cannot create unless on client`;
		}

		return new ServerNetworkedValuesReader(defaultCreateSignal, HttpService, RunService);
	}

	public doesNetworkedValueExist(name: string, parentInstance: Instance): boolean {
		try {
			const valueObject = mustGetValueObjectInstance(name, parentInstance);
			return valueObject.IsA("ValueBase");
		} catch {
			return false;
		}
	}

	public getCurrentBooleanValue(name: string, parentInstance: Instance): boolean {
		const valueObjectInstance = mustGetValueObjectInstance(name, parentInstance);
		assertValueObjectInstanceType(valueObjectInstance, "BoolValue");
		return valueObjectInstance.Value;
	}

	public getCurrentBrickColorValue(name: string, parentInstance: Instance): BrickColor {
		const valueObjectInstance = mustGetValueObjectInstance(name, parentInstance);
		assertValueObjectInstanceType(valueObjectInstance, "BrickColorValue");
		return valueObjectInstance.Value;
	}

	public getCurrentCFrameValue(name: string, parentInstance: Instance): CFrame {
		const valueObjectInstance = mustGetValueObjectInstance(name, parentInstance);
		assertValueObjectInstanceType(valueObjectInstance, "CFrameValue");
		return valueObjectInstance.Value;
	}

	public getCurrentColor3Value(name: string, parentInstance: Instance): Color3 {
		const valueObjectInstance = mustGetValueObjectInstance(name, parentInstance);
		assertValueObjectInstanceType(valueObjectInstance, "Color3Value");
		return valueObjectInstance.Value;
	}

	public getCurrentEnumValue<T extends number>(name: string, parentInstance: Instance): T {
		const valueObjectInstance = mustGetValueObjectInstance(name, parentInstance);
		assertValueObjectInstanceType(valueObjectInstance, "IntValue");
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		return valueObjectInstance.Value as T;
	}

	public getCurrentInstanceValue(name: string, parentInstance: Instance): Instance | undefined {
		const valueObjectInstance = mustGetValueObjectInstance(name, parentInstance);
		assertValueObjectInstanceType(valueObjectInstance, "ObjectValue");
		return valueObjectInstance.Value;
	}

	public getCurrentJsonValue<T extends JsonSafe>(name: string, parentInstance: Instance, tCheck: t.check<T>): T {
		const valueObjectInstance = mustGetValueObjectInstance(name, parentInstance);
		assertValueObjectInstanceType(valueObjectInstance, "StringValue");

		const serializedValue = valueObjectInstance.Value;
		const deserializedValue = serializedValue === "" ? undefined : this.httpService.JSONDecode(serializedValue);
		assertValuePassesCheck(deserializedValue, tCheck);

		return deserializedValue;
	}

	public getCurrentNumberValue(name: string, parentInstance: Instance): number {
		const valueObjectInstance = mustGetValueObjectInstance(name, parentInstance);
		assertValueObjectInstanceType(valueObjectInstance, "NumberValue");
		return valueObjectInstance.Value;
	}

	public getCurrentRayValue(name: string, parentInstance: Instance): Ray {
		const valueObjectInstance = mustGetValueObjectInstance(name, parentInstance);
		assertValueObjectInstanceType(valueObjectInstance, "RayValue");
		return valueObjectInstance.Value;
	}

	public getCurrentStringValue(name: string, parentInstance: Instance): string {
		const valueObjectInstance = mustGetValueObjectInstance(name, parentInstance);
		assertValueObjectInstanceType(valueObjectInstance, "StringValue");
		return valueObjectInstance.Value;
	}

	public getCurrentVector3Value(name: string, parentInstance: Instance): Vector3 {
		const valueObjectInstance = mustGetValueObjectInstance(name, parentInstance);
		assertValueObjectInstanceType(valueObjectInstance, "Vector3Value");
		return valueObjectInstance.Value;
	}

	public subscribeToBooleanValue(
		name: string,
		parentInstance: Instance,
		valueChangedCallback: (newValue: boolean) => void,
	): ISignalConnection {
		const valueObjectInstance = parentInstance.WaitForChild(name);
		assertValueObjectInstanceType(valueObjectInstance, "BoolValue");
		return valueObjectInstance.Changed.Connect(valueChangedCallback);
	}

	public subscribeToBrickColorValue(
		name: string,
		parentInstance: Instance,
		valueChangedCallback: (newValue: BrickColor) => void,
	): ISignalConnection {
		const valueObjectInstance = parentInstance.WaitForChild(name);
		assertValueObjectInstanceType(valueObjectInstance, "BrickColorValue");
		return valueObjectInstance.Changed.Connect(valueChangedCallback);
	}

	public subscribeToCFrameValue(
		name: string,
		parentInstance: Instance,
		valueChangedCallback: (newValue: CFrame) => void,
	): ISignalConnection {
		const valueObjectInstance = parentInstance.WaitForChild(name);
		assertValueObjectInstanceType(valueObjectInstance, "CFrameValue");
		return valueObjectInstance.Changed.Connect(valueChangedCallback);
	}

	public subscribeToColor3Value(
		name: string,
		parentInstance: Instance,
		valueChangedCallback: (newValue: Color3) => void,
	): ISignalConnection {
		const valueObjectInstance = parentInstance.WaitForChild(name);
		assertValueObjectInstanceType(valueObjectInstance, "Color3Value");
		return valueObjectInstance.Changed.Connect(valueChangedCallback);
	}

	public subscribeToEnumValue<T extends number>(
		name: string,
		parentInstance: Instance,
		valueChangedCallback: (newValue: T) => void,
	): ISignalConnection {
		const valueObjectInstance = parentInstance.WaitForChild(name);
		assertValueObjectInstanceType(valueObjectInstance, "IntValue");
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		return valueObjectInstance.Changed.Connect((newValue) => valueChangedCallback(newValue as T));
	}

	public subscribeToInstanceValue(
		name: string,
		parentInstance: Instance,
		valueChangedCallback: (newValue: Instance | undefined) => void,
	): ISignalConnection {
		const valueObjectInstance = parentInstance.WaitForChild(name);
		assertValueObjectInstanceType(valueObjectInstance, "ObjectValue");
		return valueObjectInstance.Changed.Connect(valueChangedCallback);
	}

	public subscribeToJsonValue<T extends JsonSafe>(
		name: string,
		parentInstance: Instance,
		tCheck: t.check<T>,
		valueChangedCallback: (newValue: T) => void,
	): ISignalConnection {
		const valueObjectInstance = mustGetValueObjectInstance(name, parentInstance);
		assertValueObjectInstanceType(valueObjectInstance, "StringValue");

		const deserializeAndFireValueChangedCallback = (serializedValue: string) => {
			const deserializedValue = serializedValue === "" ? undefined : this.httpService.JSONDecode(serializedValue);
			assertValuePassesCheck(deserializedValue, tCheck);

			valueChangedCallback(deserializedValue);
		};

		return valueObjectInstance.Changed.Connect(deserializeAndFireValueChangedCallback);
	}

	public subscribeToNumberValue(
		name: string,
		parentInstance: Instance,
		valueChangedCallback: (newValue: number) => void,
	): ISignalConnection {
		const valueObjectInstance = parentInstance.WaitForChild(name);
		assertValueObjectInstanceType(valueObjectInstance, "NumberValue");
		return valueObjectInstance.Changed.Connect(valueChangedCallback);
	}

	public subscribeToRayValue(
		name: string,
		parentInstance: Instance,
		valueChangedCallback: (newValue: Ray) => void,
	): ISignalConnection {
		const valueObjectInstance = parentInstance.WaitForChild(name);
		assertValueObjectInstanceType(valueObjectInstance, "RayValue");
		return valueObjectInstance.Changed.Connect(valueChangedCallback);
	}

	public subscribeToStringValue(
		name: string,
		parentInstance: Instance,
		valueChangedCallback: (newValue: string) => void,
	): ISignalConnection {
		const valueObjectInstance = parentInstance.WaitForChild(name);
		assertValueObjectInstanceType(valueObjectInstance, "StringValue");
		return valueObjectInstance.Changed.Connect(valueChangedCallback);
	}

	public subscribeToVector3Value(
		name: string,
		parentInstance: Instance,
		valueChangedCallback: (newValue: Vector3) => void,
	): ISignalConnection {
		const valueObjectInstance = parentInstance.WaitForChild(name);
		assertValueObjectInstanceType(valueObjectInstance, "Vector3Value");
		return valueObjectInstance.Changed.Connect(valueChangedCallback);
	}

	public waitForNetworkedValueToExist(name: string, parentInstance: Instance) {
		if (this.doesNetworkedValueExist(name, parentInstance)) {
			return;
		}

		const tempSignal = this.createSignal();

		const steppedConnection = this.runService.Stepped.Connect(() => {
			if (this.doesNetworkedValueExist(name, parentInstance)) {
				steppedConnection.Disconnect();
				tempSignal.fire();
			}
		});

		tempSignal.Wait();
		tempSignal.destroy();
	}
}
