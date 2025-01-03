export function fromEnvFactory<T extends string>(
  key: string,
  factoryFallbackValue?: T
) {
  return (invokedFallbackValue = factoryFallbackValue) => {
    const value = process.env[key];
    const envVarIsUnset = value === undefined;
    if (envVarIsUnset && invokedFallbackValue === undefined) {
      throw new Error(`${key} env var unset with no fallback`);
    } else if (envVarIsUnset && invokedFallbackValue !== undefined) {
      return invokedFallbackValue;
    } else {
      return value!;
    }
  };
}

export default fromEnvFactory;
