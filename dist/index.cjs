var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var index_exports = {};
__export(index_exports, {
  validateAadhaar: () => validateAadhaar,
  validateGST: () => validateGST,
  validateIFSC: () => validateIFSC,
  validatePAN: () => validatePAN
});
module.exports = __toCommonJS(index_exports);

// src/validators/pan.js
var PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
var PAN_TYPES = {
  P: "Individual",
  C: "Company",
  H: "Hindu Undivided Family (HUF)",
  F: "Firm",
  A: "Association of Persons (AOP)",
  B: "Body of Individuals (BOI)",
  G: "Government",
  J: "Artificial Juridical Person",
  L: "Local Authority",
  T: "Trust"
};
function validatePAN(pan) {
  if (!pan || typeof pan !== "string") {
    return { valid: false, error: "PAN is required" };
  }
  const cleaned = pan.trim().toUpperCase();
  if (cleaned.length !== 10) {
    return { valid: false, error: "PAN must be exactly 10 characters" };
  }
  if (!PAN_REGEX.test(cleaned)) {
    return { valid: false, error: "Invalid PAN format. Expected: AAAAA9999A" };
  }
  const typeChar = cleaned[3];
  const type = PAN_TYPES[typeChar] || "Unknown";
  return { valid: true, type, pan: cleaned };
}

// src/validators/aadhaar.js
var VERHOEFF_D = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
];
var VERHOEFF_P = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
];
function verhoeffCheck(num) {
  let c = 0;
  const digits = num.split("").reverse().map(Number);
  for (let i = 0; i < digits.length; i++) {
    c = VERHOEFF_D[c][VERHOEFF_P[i % 8][digits[i]]];
  }
  return c === 0;
}
function validateAadhaar(aadhaar) {
  if (!aadhaar) {
    return { valid: false, error: "Aadhaar number is required" };
  }
  const cleaned = String(aadhaar).replace(/\s/g, "");
  if (!/^\d{12}$/.test(cleaned)) {
    return { valid: false, error: "Aadhaar must be exactly 12 digits" };
  }
  if (["0", "1"].includes(cleaned[0])) {
    return { valid: false, error: "Aadhaar cannot start with 0 or 1" };
  }
  if (!verhoeffCheck(cleaned)) {
    return { valid: false, error: "Invalid Aadhaar number (checksum failed)" };
  }
  const masked = `XXXX XXXX ${cleaned.slice(8)}`;
  return { valid: true, masked };
}

// src/validators/gst.js
var GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
var STATE_CODES = {
  "01": "Jammu & Kashmir",
  "02": "Himachal Pradesh",
  "03": "Punjab",
  "04": "Chandigarh",
  "05": "Uttarakhand",
  "06": "Haryana",
  "07": "Delhi",
  "08": "Rajasthan",
  "09": "Uttar Pradesh",
  "10": "Bihar",
  "11": "Sikkim",
  "12": "Arunachal Pradesh",
  "13": "Nagaland",
  "14": "Manipur",
  "15": "Mizoram",
  "16": "Tripura",
  "17": "Meghalaya",
  "18": "Assam",
  "19": "West Bengal",
  "20": "Jharkhand",
  "21": "Odisha",
  "22": "Chhattisgarh",
  "23": "Madhya Pradesh",
  "24": "Gujarat",
  "26": "Dadra and Nagar Haveli and Daman and Diu",
  "27": "Maharashtra",
  "28": "Andhra Pradesh",
  "29": "Karnataka",
  "30": "Goa",
  "31": "Lakshadweep",
  "32": "Kerala",
  "33": "Tamil Nadu",
  "34": "Puducherry",
  "35": "Andaman and Nicobar Islands",
  "36": "Telangana",
  "37": "Andhra Pradesh (New)",
  "38": "Ladakh",
  "97": "Other Territory",
  "99": "Centre Jurisdiction"
};
function validateGST(gst) {
  if (!gst || typeof gst !== "string") {
    return { valid: false, error: "GST number is required" };
  }
  const cleaned = gst.trim().toUpperCase();
  if (cleaned.length !== 15) {
    return { valid: false, error: "GST number must be exactly 15 characters" };
  }
  if (!GST_REGEX.test(cleaned)) {
    return { valid: false, error: "Invalid GST format" };
  }
  const stateCode = cleaned.substring(0, 2);
  const pan = cleaned.substring(2, 12);
  const state = STATE_CODES[stateCode];
  if (!state) {
    return { valid: false, error: `Invalid state code: ${stateCode}` };
  }
  return { valid: true, state, pan, stateCode };
}

// src/validators/ifsc.js
var IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;
var KNOWN_BANKS = {
  SBIN: "State Bank of India",
  HDFC: "HDFC Bank",
  ICIC: "ICICI Bank",
  AXIS: "Axis Bank",
  KKBK: "Kotak Mahindra Bank",
  PUNB: "Punjab National Bank",
  UBIN: "Union Bank of India",
  BARB: "Bank of Baroda",
  CNRB: "Canara Bank",
  IOBA: "Indian Overseas Bank",
  BKID: "Bank of India",
  IDBI: "IDBI Bank",
  YESB: "Yes Bank",
  INDB: "IndusInd Bank",
  FDRL: "Federal Bank",
  IDFB: "IDFC First Bank",
  RATN: "RBL Bank",
  UTIB: "Axis Bank (alternate)",
  MAHB: "Bank of Maharashtra"
};
function validateIFSC(ifsc) {
  if (!ifsc || typeof ifsc !== "string") {
    return { valid: false, error: "IFSC code is required" };
  }
  const cleaned = ifsc.trim().toUpperCase();
  if (cleaned.length !== 11) {
    return { valid: false, error: "IFSC must be exactly 11 characters" };
  }
  if (!IFSC_REGEX.test(cleaned)) {
    return { valid: false, error: "Invalid IFSC format. Expected: AAAA0NNNNNN" };
  }
  const bankCode = cleaned.substring(0, 4);
  const branchCode = cleaned.substring(5);
  const bank = KNOWN_BANKS[bankCode] || null;
  return {
    valid: true,
    bankCode,
    branchCode,
    ...bank && { bank }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  validateAadhaar,
  validateGST,
  validateIFSC,
  validatePAN
});
