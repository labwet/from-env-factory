export function fromEnvFactory<T extends string>(
  key: string,
  factoryFallbackValue?: T
) {
  return (invokedFallbackValue = factoryFallbackValue) => {
    const value = process.env[key] as T | undefined;
    if (value !== undefined) {
      return value;
    } else if (invokedFallbackValue !== undefined) {
      return invokedFallbackValue;
    } else {
      throw new Error(`${key} env var unset with no fallback`);
    }
  };
}

export default fromEnvFactory;
