/**
 * Shared Template & Text Utilities
 */

/**
 * Clean company name by stripping common corporate suffixes
 */
export function cleanCompanyName(rawName) {
  if (!rawName) return '';
  let name = rawName.trim();
  const suffixes = [
    /\s+Private\s+Limited\b/gi,
    /\s+Pvt\.?\s+Ltd\.?\b/gi,
    /\s+Pvt\b/gi,
    /\s+Limited\b/gi,
    /\s+Ltd\.?\b/gi,
    /\s+Industries\b/gi,
    /\s+Technologies\b/gi,
    /\s+Technology\b/gi,
    /\s+Enterprises\b/gi,
    /\s+Corporation\b/gi,
    /\s+Corp\.?\b/gi,
    /\s+Services\b/gi,
    /\s+Solutions\b/gi,
    /\s+India\b/gi,
    /\s+International\b/gi,
    /\s+Holdings\b/gi,
    /\s+Capital\b/gi
  ];
  
  for (const regex of suffixes) {
    name = name.replace(regex, '');
  }
  
  name = name.replace(/[,.-]+$/, '').trim();
  return name;
}

/**
 * Generate a CamelCase/PascalCase hashtag from cleaned company name
 */
export function generateHashtag(cleanedName) {
  if (!cleanedName) return 'IPO';
  return cleanedName.replace(/[^a-zA-Z0-9]/g, '');
}

/**
 * Helper to count words in the spoken script only (strips speaker tags and quotes)
 */
export function countWords(text) {
  if (!text) return 0;
  const cleaned = text.replace(/\[.*?\]:?/g, '').replace(/["']/g, '');
  return cleaned.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Clean and format numbers into Indian currency format
 */
export function formatINR(val) {
  const num = Number(val);
  if (isNaN(num)) return '0';
  return num.toLocaleString('en-IN');
}
