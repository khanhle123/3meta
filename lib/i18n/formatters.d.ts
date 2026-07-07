import { AuspiciousPattern, InauspiciousPattern } from '../qimen-types';
type Pattern = AuspiciousPattern | InauspiciousPattern;
/**
 * Format Auspicious/Inauspicious Pattern to localized string
 */
export declare const formatPattern: (pattern: Pattern) => string;
/**
 * Format Ten Stem Response to localized string
 */
export declare const formatTenStem: (item: {
    id?: string;
    params?: any;
    description?: string;
} | undefined) => string;
/**
 * Format Men Po (Gate Pressure) details
 */
export declare const formatMenPo: (item: {
    id?: string;
    params?: any;
    description?: string;
} | undefined) => string;
/**
 * Helper to translate simple keys if they exist, fallback to original
 */
export declare const t: (key: string, params?: Record<string, any>) => string;
export {};
