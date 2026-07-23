export function optionalNumber(value, name, options = {}) {
  if (value === undefined || value === "") return undefined;

  const number = Number(value);
  if (!Number.isFinite(number)) {
    const error = new Error(`${name} must be a valid number`);
    error.status = 400;
    throw error;
  }

  if (options.min !== undefined && number < options.min) {
    const error = new Error(`${name} must be at least ${options.min}`);
    error.status = 400;
    throw error;
  }

  if (options.max !== undefined && number > options.max) {
    const error = new Error(`${name} must not exceed ${options.max}`);
    error.status = 400;
    throw error;
  }

  return number;
}

export function positiveInteger(value, name, fallback) {
  if (value === undefined || value === "") return fallback;
  const number = Number(value);

  if (!Number.isInteger(number) || number < 1) {
    const error = new Error(`${name} must be a positive integer`);
    error.status = 400;
    throw error;
  }

  return number;
}

export const rounded = (value) =>
  value === null || value === undefined ? null : Number(Number(value).toFixed(2));
