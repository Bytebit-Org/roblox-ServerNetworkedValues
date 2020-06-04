import { ValueObjectInstance } from "../../types/ValueObjectInstance";
import { ValueObjectClassName } from "../../types/ValueObjectClassName";
import { ValueObjectClassNameToValueType } from "../../types/ValueObjectClassNameToValueType";

function isInstanceOfCorrespondingValueObjectType<T extends ValueObjectClassName>(
	className: T,
	value: unknown,
): value is ValueObjectInstance<ValueObjectClassNameToValueType<T>> {
	return typeIs(value, "Instance") && value.IsA(className);
}

export function getOrCreateValueObjectInstance<T extends ValueObjectClassName>(
	className: T,
	createOnly: boolean,
	initialValue: ValueObjectClassNameToValueType<T>,
	name: string,
	parentInstance: Instance,
): ValueObjectInstance<ValueObjectClassNameToValueType<T>> {
	const existingChildWithName = parentInstance.FindFirstChild(name);
	if (existingChildWithName !== undefined) {
		if (createOnly) {
			throw `Cannot create a new value object with name ${name} under ${parentInstance.GetFullName()} as a child with the same name already exists`;
		}

		if (isInstanceOfCorrespondingValueObjectType(className, existingChildWithName)) {
			return existingChildWithName;
		} else {
			throw `A child with name ${name} under ${parentInstance.GetFullName()} already exists but is not of the correct type. Expected an object which is a ${className} but got ${
				existingChildWithName.ClassName
			}`;
		}
	} else {
		const newChild = new Instance(className);
		newChild.Name = name;
		newChild.Value = initialValue;
		newChild.Parent = parentInstance;

		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		return (newChild as unknown) as ValueObjectInstance<ValueObjectClassNameToValueType<T>>;
	}
}
