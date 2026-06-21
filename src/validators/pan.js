/**
 * PAN (Permanent Account Number) Validator
 * Format: AAAAA9999A (5 letters, 4 digits, 1 letter)
 * 4th character indicates taxpayer type:
 *   P = Individual, C = Company, H = HUF, F = Firm, A = AOP, B = BOI,
 *   G = Govt, J = Artificial Juridical Person, L = Local Authority, T = Trust
 */

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

const PAN_TYPES = {
  P: 'Individual',
  C: 'Company',
  H: 'Hindu Undivided Family (HUF)',
  F: 'Firm',
  A: 'Association of Persons (AOP)',
  B: 'Body of Individuals (BOI)',
  G: 'Government',
  J: 'Artificial Juridical Person',
  L: 'Local Authority',
  T: 'Trust',
};

/**
 * Validates a PAN number
 * @param {string} pan - PAN string to validate
 * @returns {{ valid: boolean, error?: string, type?: string }}
 */
export function validatePAN(pan) {
  if (!pan || typeof pan !== 'string') {
    return { valid: false, error: 'PAN is required' };
  }

  const cleaned = pan.trim().toUpperCase();

  if (cleaned.length !== 10) {
    return { valid: false, error: 'PAN must be exactly 10 characters' };
  }

  if (!PAN_REGEX.test(cleaned)) {
    return { valid: false, error: 'Invalid PAN format. Expected: AAAAA9999A' };
  }

  const typeChar = cleaned[3];
  const type = PAN_TYPES[typeChar] || 'Unknown';

  return { valid: true, type, pan: cleaned };
}