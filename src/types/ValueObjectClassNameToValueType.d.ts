import { ValueObjectClassName } from "./ValueObjectClassName";

export type ValueObjectClassNameToValueType<T extends ValueObjectClassName> = T extends "BoolValue"
	? boolean
	: T extends "BrickColorValue"
	? BrickColor
	: T extends "CFrameValue"
	? CFrame
	: T extends "Color3Value"
	? Color3
	: T extends "IntValue"
	? number
	: T extends "NumberValue"
	? number
	: T extends "ObjectValue"
	? Instance | undefined
	: T extends "RayValue"
	? Ray
	: T extends "StringValue"
	? string
	: Vector3;
