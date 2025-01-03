# from-env-factory
A factory function that creates environment variable getters.

## Install

It's an npm package, you know the drill...
```bash
npm install @wetlab/from-env-factory
```

## Usage

### Environment variables

The examples assume the following env var is set...
```bash
export GROWER_REGION="burgundy"
```

### Examples

```javascript
import { fromEnvFactory } from "@wetlab/from-env-factory";

// Regular usage
const getGrowerRegionFromEnv = fromEnvFactory("GROWER_REGION");
const growerRegion = getGrowerRegionFromEnv(); // "burgundy"

// Error when unset
const getUnsetEnvVar = fromEnvFactory("UNSET_ENV_VAR");
const myVar = getUnsetEnvVar(); // ERROR: "UNSET_ENV_VAR env var unset with no fallback"

// Factory fallback value usage
const getFactoryFallbackFromEnv = fromEnvFactory("UNSET_ENV_VAR", "bordeaux");
const growerRegionFactoryFallback = getFactoryFallbackFromEnv(); // "bordeaux"

// Invoked fallback value usage
const getInvokedFallbackFromEnv = fromEnvFactory("UNSET_ENV_VAR");
const growerRegionInvokedFallback = getInvokedFallbackFromEnv("alsace"); // "alsace"
```
