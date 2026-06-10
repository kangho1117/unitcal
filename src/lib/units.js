/**
 * Unit conversion library.
 *
 * Each category has a base unit. Every other unit defines a `toBase` factor
 * (or functions for non-linear conversions like temperature).
 *
 * convert(value, fromUnit, toUnit, category):
 *   1. Convert value from `fromUnit` to the base unit.
 *   2. Convert from the base unit to `toUnit`.
 */

export const categories = [
  'weight',
  'length',
  'temperature',
  'volume',
  'area',
  'speed',
  'time',
  'data',
  'pressure',
  'energy',
];

export const categoryIcons = {
  weight: '⚖️',
  length: '📏',
  temperature: '🌡️',
  volume: '🧪',
  area: '📐',
  speed: '🏎️',
  time: '⏱️',
  data: '💾',
  pressure: '🔧',
  energy: '⚡',
};

// ---------------------------------------------------------------------------
// Unit definitions
// ---------------------------------------------------------------------------

const unitData = {
  weight: {
    base: 'kg',
    units: {
      kg:    { factor: 1 },
      g:     { factor: 1e-3 },
      mg:    { factor: 1e-6 },
      lb:    { factor: 0.45359237 },
      oz:    { factor: 0.028349523125 },
      ton:   { factor: 1000 },
      stone: { factor: 6.35029318 },
    },
  },
  length: {
    base: 'm',
    units: {
      m:    { factor: 1 },
      cm:   { factor: 0.01 },
      mm:   { factor: 0.001 },
      km:   { factor: 1000 },
      inch: { factor: 0.0254 },
      ft:   { factor: 0.3048 },
      yard: { factor: 0.9144 },
      mile: { factor: 1609.344 },
    },
  },
  temperature: {
    base: 'celsius',
    units: {
      celsius:    { toBase: (v) => v,                fromBase: (v) => v },
      fahrenheit: { toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
      kelvin:     { toBase: (v) => v - 273.15,        fromBase: (v) => v + 273.15 },
    },
  },
  volume: {
    base: 'l',
    units: {
      l:         { factor: 1 },
      ml:        { factor: 0.001 },
      gallon_us: { factor: 3.785411784 },
      gallon_uk: { factor: 4.54609 },
      cup:       { factor: 0.2365882365 },
      fl_oz:     { factor: 0.0295735295625 },
      pint:      { factor: 0.473176473 },
      quart:     { factor: 0.946352946 },
    },
  },
  area: {
    base: 'sqm',
    units: {
      sqm:     { factor: 1 },
      sqft:    { factor: 0.09290304 },
      sqkm:    { factor: 1e6 },
      sqmile:  { factor: 2589988.110336 },
      acre:    { factor: 4046.8564224 },
      hectare: { factor: 10000 },
      pyeong:  { factor: 3.305785 },
    },
  },
  speed: {
    base: 'ms',
    units: {
      ms:   { factor: 1 },
      kmh:  { factor: 1 / 3.6 },
      mph:  { factor: 0.44704 },
      knot: { factor: 0.514444 },
    },
  },
  time: {
    base: 'second',
    units: {
      second: { factor: 1 },
      minute: { factor: 60 },
      hour:   { factor: 3600 },
      day:    { factor: 86400 },
      week:   { factor: 604800 },
      month:  { factor: 2629746 },
      year:   { factor: 31556952 },
    },
  },
  data: {
    base: 'byte',
    units: {
      bit:  { factor: 0.125 },
      byte: { factor: 1 },
      kb:   { factor: 1024 },
      mb:   { factor: 1048576 },
      gb:   { factor: 1073741824 },
      tb:   { factor: 1099511627776 },
      pb:   { factor: 1125899906842624 },
    },
  },
  pressure: {
    base: 'pa',
    units: {
      pa:   { factor: 1 },
      bar:  { factor: 100000 },
      atm:  { factor: 101325 },
      psi:  { factor: 6894.757293168 },
      mmhg: { factor: 133.322387415 },
    },
  },
  energy: {
    base: 'j',
    units: {
      j:    { factor: 1 },
      kj:   { factor: 1000 },
      cal:  { factor: 4.184 },
      kcal: { factor: 4184 },
      wh:   { factor: 3600 },
      kwh:  { factor: 3600000 },
      btu:  { factor: 1055.05585262 },
    },
  },
};

// ---------------------------------------------------------------------------
// Public helpers
// ---------------------------------------------------------------------------

/**
 * Get an array of unit keys for a given category.
 */
export function getUnitsForCategory(category) {
  const cat = unitData[category];
  if (!cat) return [];
  return Object.keys(cat.units);
}

/**
 * Convert `value` from `fromUnit` to `toUnit` within the given `category`.
 * Returns a number (may be NaN for invalid input).
 */
export function convert(value, fromUnit, toUnit, category) {
  const cat = unitData[category];
  if (!cat) return NaN;

  const from = cat.units[fromUnit];
  const to   = cat.units[toUnit];
  if (!from || !to) return NaN;

  const num = parseFloat(value);
  if (isNaN(num)) return NaN;

  // Non-linear (temperature)
  if (typeof from.toBase === 'function') {
    const baseValue = from.toBase(num);
    return to.fromBase(baseValue);
  }

  // Linear
  const baseValue = num * from.factor;
  return baseValue / to.factor;
}

/**
 * Format a number for display.
 * - Up to 10 significant digits.
 * - Removes trailing zeros.
 */
export function formatResult(num) {
  if (isNaN(num) || !isFinite(num)) return '—';
  if (num === 0) return '0';

  // Use toPrecision for significant digits, then clean up
  const formatted = Number(num.toPrecision(10));
  return formatted.toLocaleString('en-US', {
    maximumFractionDigits: 10,
    useGrouping: true,
  });
}

/**
 * Get the default pair [fromUnit, toUnit] for a category.
 */
export function getDefaultPair(category) {
  const defaults = {
    weight:      ['kg', 'lb'],
    length:      ['cm', 'inch'],
    temperature: ['celsius', 'fahrenheit'],
    volume:      ['l', 'gallon_us'],
    area:        ['sqm', 'sqft'],
    speed:       ['kmh', 'mph'],
    time:        ['hour', 'minute'],
    data:        ['mb', 'gb'],
    pressure:    ['atm', 'psi'],
    energy:      ['kcal', 'kj'],
  };
  return defaults[category] || ['', ''];
}
