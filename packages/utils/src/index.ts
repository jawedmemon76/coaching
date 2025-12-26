/**
 * @teacher/utils - Shared utilities for teacher.ac.pk
 */

// ============================================================================
// String Utilities
// ============================================================================

/**
 * Generate a URL-friendly slug from a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Capitalize the first letter of a string
 */
export function capitalize(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Truncate text to a specified length with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

// ============================================================================
// Date Utilities
// ============================================================================

/**
 * Format a date to ISO string without milliseconds
 */
export function formatISODate(date: Date): string {
  return date.toISOString().split('.')[0] + 'Z';
}

/**
 * Get relative time string (e.g., "2 hours ago")
 */
export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
  if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
  if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  if (diffWeek < 4) return `${diffWeek} week${diffWeek > 1 ? 's' : ''} ago`;
  if (diffMonth < 12) return `${diffMonth} month${diffMonth > 1 ? 's' : ''} ago`;
  return `${diffYear} year${diffYear > 1 ? 's' : ''} ago`;
}

/**
 * Format duration in seconds to human-readable string
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

  return parts.join(' ');
}

// ============================================================================
// Number Utilities
// ============================================================================

/**
 * Clamp a number between min and max values
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Calculate percentage
 */
export function percentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

/**
 * Format a number with commas for thousands
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}

// ============================================================================
// Array Utilities
// ============================================================================

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Remove duplicates from an array
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * Group array items by a key
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

// ============================================================================
// Validation Utilities
// ============================================================================

/**
 * Check if a string is a valid email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Check if a string is a valid Pakistani phone number
 */
export function isValidPakistaniPhone(phone: string): boolean {
  // Format: +923XXXXXXXXX or 03XXXXXXXXX
  const phoneRegex = /^(\+92|0)?3[0-9]{9}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ''));
}

/**
 * Check if password meets minimum requirements
 */
export function isStrongPassword(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password)
  );
}

// ============================================================================
// Object Utilities
// ============================================================================

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Pick specific keys from an object
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Omit specific keys from an object
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

// ============================================================================
// Async Utilities
// ============================================================================

/**
 * Sleep for a specified number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry an async function with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt < maxAttempts) {
        const delay = baseDelay * Math.pow(2, attempt - 1);
        await sleep(delay);
      }
    }
  }

  throw lastError;
}

// ============================================================================
// Constants
// ============================================================================

export const EDUCATION_LEVELS = [
  { value: 'LITERACY', label: 'Literacy', labelUr: 'خواندگی' },
  { value: 'MIDDLE_SCHOOL', label: 'Middle School (6-8)', labelUr: 'مڈل سکول' },
  { value: 'MATRIC', label: 'Matriculation (9-10)', labelUr: 'میٹرک' },
  { value: 'INTERMEDIATE', label: 'Intermediate (11-12)', labelUr: 'انٹرمیڈیٹ' },
  { value: 'O_LEVEL', label: 'O-Level', labelUr: 'او لیول' },
  { value: 'A_LEVEL', label: 'A-Level', labelUr: 'اے لیول' },
  { value: 'UNIVERSITY', label: 'University', labelUr: 'یونیورسٹی' },
  { value: 'PROFESSIONAL_EXAM', label: 'Professional Exams', labelUr: 'پیشہ ورانہ امتحانات' },
] as const;

export const EXAM_BOARDS = [
  { value: 'FEDERAL', label: 'Federal Board', labelUr: 'وفاقی بورڈ' },
  { value: 'PUNJAB', label: 'Punjab Board', labelUr: 'پنجاب بورڈ' },
  { value: 'SINDH', label: 'Sindh Board', labelUr: 'سندھ بورڈ' },
  { value: 'KPK', label: 'KPK Board', labelUr: 'خیبر پختونخوا بورڈ' },
  { value: 'BALOCHISTAN', label: 'Balochistan Board', labelUr: 'بلوچستان بورڈ' },
  { value: 'CAMBRIDGE', label: 'Cambridge (CAIE)', labelUr: 'کیمبرج' },
  { value: 'EDEXCEL', label: 'Edexcel', labelUr: 'ایڈیکسل' },
  { value: 'AKU_EB', label: 'AKU-EB', labelUr: 'آغا خان بورڈ' },
] as const;

