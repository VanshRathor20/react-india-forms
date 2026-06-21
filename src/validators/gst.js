/**
 * GST (Goods and Services Tax) Number Validator
 * Format: 22AAAAA0000A1Z5 (15 characters)
 * Structure:
 *   - 2 digits: State code (01-38)
 *   - 10 chars: PAN number
 *   - 1 digit: Entity number (1-9, A-Z)
 *   - 1 char:  'Z' (default)
 *   - 1 char:  Checksum digit
 */

const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

const STATE_CODES = {
  '01': 'Jammu & Kashmir', '02': 'Himachal Pradesh', '03': 'Punjab',
  '04': 'Chandigarh', '05': 'Uttarakhand', '06': 'Haryana',
  '07': 'Delhi', '08': 'Rajasthan', '09': 'Uttar Pradesh',
  '10': 'Bihar', '11': 'Sikkim', '12': 'Arunachal Pradesh',
  '13': 'Nagaland', '14': 'Manipur', '15': 'Mizoram',
  '16': 'Tripura', '17': 'Meghalaya', '18': 'Assam',
  '19': 'West Bengal', '20': 'Jharkhand', '21': 'Odisha',
  '22': 'Chhattisgarh', '23': 'Madhya Pradesh', '24': 'Gujarat',
  '26': 'Dadra and Nagar Haveli and Daman and Diu', '27': 'Maharashtra',
  '28': 'Andhra Pradesh', '29': 'Karnataka', '30': 'Goa',
  '31': 'Lakshadweep', '32': 'Kerala', '33': 'Tamil Nadu',
  '34': 'Puducherry', '35': 'Andaman and Nicobar Islands',
  '36': 'Telangana', '37': 'Andhra Pradesh (New)', '38': 'Ladakh',
  '97': 'Other Territory', '99': 'Centre Jurisdiction',
};

/**
 * Validates a GST number
 * @param {string} gst - GST number to validate
 * @returns {{ valid: boolean, error?: string, state?: string, pan?: string }}
 */
export function validateGST(gst) {
  if (!gst || typeof gst !== 'string') {
    return { valid: false, error: 'GST number is required' };
  }

  const cleaned = gst.trim().toUpperCase();

  if (cleaned.length !== 15) {
    return { valid: false, error: 'GST number must be exactly 15 characters' };
  }

  if (!GST_REGEX.test(cleaned)) {
    return { valid: false, error: 'Invalid GST format' };
  }

  const stateCode = cleaned.substring(0, 2);
  const pan = cleaned.substring(2, 12);
  const state = STATE_CODES[stateCode];

  if (!state) {
    return { valid: false, error: `Invalid state code: ${stateCode}` };
  }

  return { valid: true, state, pan, stateCode };
}