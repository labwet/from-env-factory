import test from "node:test";
import assert from "node:assert/strict";
import fromEnvFactory from ".";

const ENV_VAR_KEY_PORT = "PORT";
const ENV_VAR_KEY_NODE_ENV = "NODE_ENV";
const ENV_VAR_KEY_DOES_NOT_EXIST = "DOES_NOT_EXIST";
const EXPECTED_VALUE_PORT = "8080";
const EXPECTED_VALUE_NODE_ENV = "test";

test("returns expected env vars", () => {
  const getPortFromEnv = fromEnvFactory(ENV_VAR_KEY_PORT);
  const port = getPortFromEnv();
  assert.strictEqual(port, EXPECTED_VALUE_PORT);

  const getNodeEnvFromEnv = fromEnvFactory(ENV_VAR_KEY_NODE_ENV);
  const nodeEnv = getNodeEnvFromEnv();
  assert.strictEqual(nodeEnv, EXPECTED_VALUE_NODE_ENV);
});

test("throws when env var is unset with no fallback", () => {
  const getUnsetVarFromEnv = fromEnvFactory(ENV_VAR_KEY_DOES_NOT_EXIST);
  assert.throws(
    () => getUnsetVarFromEnv(),
    Error,
    `${ENV_VAR_KEY_DOES_NOT_EXIST} env var unset with no fallback`
  );
});

test("returns fallback value when set at factory", () => {
  const FACTORY_FALLBACK_VALUE = "FACTORY_FALLBACK";

  const getPortFromEnv = fromEnvFactory(
    ENV_VAR_KEY_PORT,
    FACTORY_FALLBACK_VALUE
  );
  const port = getPortFromEnv();
  assert.strictEqual(port, EXPECTED_VALUE_PORT);

  const getUnsetVarFromEnv = fromEnvFactory(
    ENV_VAR_KEY_DOES_NOT_EXIST,
    FACTORY_FALLBACK_VALUE
  );
  const unsetVarFallback = getUnsetVarFromEnv();
  assert.strictEqual(unsetVarFallback, FACTORY_FALLBACK_VALUE);
});

test("returns fallback value when set at invocation", () => {
  const INVOKED_FALLBACK_VALUE = "INVOKED_FALLBACK";

  const getPortFromEnv = fromEnvFactory(ENV_VAR_KEY_PORT);
  const port = getPortFromEnv(INVOKED_FALLBACK_VALUE);
  assert.strictEqual(port, EXPECTED_VALUE_PORT);

  const getUnsetVarFromEnv = fromEnvFactory(ENV_VAR_KEY_DOES_NOT_EXIST);
  const unsetVarFallback = getUnsetVarFromEnv(INVOKED_FALLBACK_VALUE);
  assert.strictEqual(unsetVarFallback, INVOKED_FALLBACK_VALUE);
});
