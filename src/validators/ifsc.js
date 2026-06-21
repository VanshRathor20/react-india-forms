/**
 * IFSC (Indian Financial System Code) Validator
 * Format: AAAA0NNNNNN (11 characters)
 * Structure:
 *   - 4 chars:  Bank code (letters only)
 *   - 1 char:   Always '0' (reserved)
 *   - 6 chars:  Branch code (alphanumeric)
 */

const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

// Common bank codes for extra validation hints
const KNOWN_BANKS = {
  SBIN: 'State Bank of India',
  HDFC: 'HDFC Bank',
  ICIC: 'ICICI Bank',
  AXIS: 'Axis Bank',
  KKBK: 'Kotak Mahindra Bank',
  PUNB: 'Punjab National Bank',
  UBIN: 'Union Bank of India',
  BARB: 'Bank of Baroda',
  CNRB: 'Canara Bank',
  IOBA: 'Indian Overseas Bank',
  BKID: 'Bank of India',
  IDBI: 'IDBI Bank',
  YESB: 'Yes Bank',
  INDB: 'IndusInd Bank',
  FDRL: 'Federal Bank',
  IDFB: 'IDFC First Bank',
  RATN: 'RBL Bank',
  UTIB: 'Axis Bank (alternate)',
  MAHB: 'Bank of Maharashtra',
};

/**
 * Validates an IFSC code
 * @param {string} ifsc - IFSC code to validate
 * @returns {{ valid: boolean, error?: string, bank?: string, bankCode?: string, branchCode?: string }}
 */
export function validateIFSC(ifsc) {
  if (!ifsc || typeof ifsc !== 'string') {
    return { valid: false, error: 'IFSC code is required' };
  }

  const cleaned = ifsc.trim().toUpperCase();

  if (cleaned.length !== 11) {
    return { valid: false, error: 'IFSC must be exactly 11 characters' };
  }

  if (!IFSC_REGEX.test(cleaned)) {
    return { valid: false, error: 'Invalid IFSC format. Expected: AAAA0NNNNNN' };
  }

  const bankCode = cleaned.substring(0, 4);
  const branchCode = cleaned.substring(5);
  const bank = KNOWN_BANKS[bankCode] || null;

  return {
    valid: true,
    bankCode,
    branchCode,
    ...(bank && { bank }),
  };
}