/**
 * Aadhaar Number Validator
 * Format: 12 digits, first digit cannot be 0 or 1
 * Uses Verhoeff algorithm for checksum validation
 */

// Verhoeff algorithm tables
const VERHOEFF_D = [
  [0,1,2,3,4,5,6,7,8,9],
  [1,2,3,4,0,6,7,8,9,5],
  [2,3,4,0,1,7,8,9,5,6],
  [3,4,0,1,2,8,9,5,6,7],
  [4,0,1,2,3,9,5,6,7,8],
  [5,9,8,7,6,0,4,3,2,1],
  [6,5,9,8,7,1,0,4,3,2],
  [7,6,5,9,8,2,1,0,4,3],
  [8,7,6,5,9,3,2,1,0,4],
  [9,8,7,6,5,4,3,2,1,0],
];

const VERHOEFF_P = [
  [0,1,2,3,4,5,6,7,8,9],
  [1,5,7,6,2,8,3,0,9,4],
  [5,8,0,3,7,9,6,1,4,2],
  [8,9,1,6,0,4,3,5,2,7],
  [9,4,5,3,1,2,6,8,7,0],
  [4,2,8,6,5,7,3,9,0,1],
  [2,7,9,3,8,0,6,4,1,5],
  [7,0,4,6,9,1,3,2,5,8],
];

const VERHOEFF_INV = [0,4,3,2,1,9,8,7,6,5];

function verhoeffCheck(num) {
  let c = 0;
  const digits = num.split('').reverse().map(Number);
  for (let i = 0; i < digits.length; i++) {
    c = VERHOEFF_D[c][VERHOEFF_P[i % 8][digits[i]]];
  }
  return c === 0;
}

/**
 * Validates an Aadhaar number
 * @param {string|number} aadhaar - Aadhaar number (12 digits, spaces allowed)
 * @returns {{ valid: boolean, error?: string, masked?: string }}
 */
export function validateAadhaar(aadhaar) {
  if (!aadhaar) {
    return { valid: false, error: 'Aadhaar number is required' };
  }

  // Remove spaces (common formatting: XXXX XXXX XXXX)
  const cleaned = String(aadhaar).replace(/\s/g, '');

  if (!/^\d{12}$/.test(cleaned)) {
    return { valid: false, error: 'Aadhaar must be exactly 12 digits' };
  }

  if (['0', '1'].includes(cleaned[0])) {
    return { valid: false, error: 'Aadhaar cannot start with 0 or 1' };
  }

  if (!verhoeffCheck(cleaned)) {
    return { valid: false, error: 'Invalid Aadhaar number (checksum failed)' };
  }

  // Mask for display: XXXX XXXX 1234
  const masked = `XXXX XXXX ${cleaned.slice(8)}`;

  return { valid: true, masked };
}