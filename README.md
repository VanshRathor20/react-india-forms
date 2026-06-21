# react-india-forms

> India-specific form validators for React — PAN, Aadhaar, GST, IFSC

[![npm version](https://img.shields.io/npm/v/react-india-forms.svg)](https://www.npmjs.com/package/react-india-forms)
[![npm downloads](https://img.shields.io/npm/dm/react-india-forms.svg)](https://www.npmjs.com/package/react-india-forms)
[![license](https://img.shields.io/npm/l/react-india-forms.svg)](LICENSE)

## Why?

Every Indian web app that deals with KYC, payments, or taxes needs to validate PAN, Aadhaar, GST, and IFSC. Writing regex and checksum logic from scratch every time is painful. This package does it for you.

> **Note:** Validators are framework-agnostic — works with plain JS too, not just React.

## Install

```bash
npm install react-india-forms
```

## Usage

### PAN Validator

```js
import { validatePAN } from 'react-india-forms';

validatePAN('ABCPD1234E');
// { valid: true, type: 'Individual', pan: 'ABCPD1234E' }

validatePAN('INVALID');
// { valid: false, error: 'PAN must be exactly 10 characters' }
```

### Aadhaar Validator

```js
import { validateAadhaar } from 'react-india-forms';

validateAadhaar('2345 6789 0126');
// { valid: true, masked: 'XXXX XXXX 0126' }

validateAadhaar('012345678901');
// { valid: false, error: 'Aadhaar cannot start with 0 or 1' }
```

Includes Verhoeff checksum validation — not just format checking.

### GST Validator

```js
import { validateGST } from 'react-india-forms';

validateGST('07ABCDE1234F1Z5');
// { valid: true, state: 'Delhi', pan: 'ABCDE1234F', stateCode: '07' }

validateGST('50ABCDE1234F1Z5');
// { valid: false, error: 'Invalid state code: 50' }
```

Returns the state name and embedded PAN automatically.

### IFSC Validator

```js
import { validateIFSC } from 'react-india-forms';

validateIFSC('SBIN0001234');
// { valid: true, bank: 'State Bank of India', bankCode: 'SBIN', branchCode: '001234' }

validateIFSC('SBIN1001234');
// { valid: false, error: 'Invalid IFSC format. Expected: AAAA0NNNNNN' }
```

Identifies 20+ major Indian banks by code.

## API Reference

All validators return an object with:

| Field | Type | Description |
|-------|------|-------------|
| `valid` | `boolean` | Whether the input is valid |
| `error` | `string?` | Error message if invalid |
| ...extra | varies | Additional parsed data (see per-validator docs above) |

## React Example

```jsx
import { validatePAN } from 'react-india-forms';
import { useState } from 'react';

function PANInput() {
  const [pan, setPan] = useState('');
  const result = validatePAN(pan);

  return (
    <div>
      <input
        value={pan}
        onChange={(e) => setPan(e.target.value)}
        placeholder="Enter PAN"
        maxLength={10}
      />
      {pan && !result.valid && (
        <p style={{ color: 'red' }}>{result.error}</p>
      )}
      {pan && result.valid && (
        <p style={{ color: 'green' }}>✓ Valid {result.type} PAN</p>
      )}
    </div>
  );
}
```

## License

MIT © [Vansh Rathor](https://vanshrathorportfolio.netlify.app/)
