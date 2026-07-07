"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.t = exports.formatMenPo = exports.formatTenStem = exports.formatPattern = void 0;
const index_1 = require("./index");
/**
 * Format Auspicious/Inauspicious Pattern to localized string
 */
const formatPattern = (pattern) => {
    if (pattern.id) {
        // Translate known parameters if possible
        const localizedParams = { ...pattern.params };
        if (localizedParams) {
            // Helper to try translate a value with a prefix
            const tryTranslate = (val, prefix) => {
                if (typeof val === 'string') {
                    const tr = index_1.i18n.t(`${prefix}.${val}`);
                    // If translation returns the key (meaning not found) or same value, checks might be needed
                    // Our i18n.t returns val or key. 
                    // If key was 'stems.丙', and result is 'Bing' (en) or '丙' (zh), it works.
                    // If result is 'stems.丙', it means missing.
                    return tr.startsWith(prefix + '.') ? val : tr;
                }
                return val;
            };
            if (localizedParams.gate)
                localizedParams.gate = tryTranslate(localizedParams.gate, 'gates');
            if (localizedParams.star)
                localizedParams.star = tryTranslate(localizedParams.star, 'stars');
            if (localizedParams.deity)
                localizedParams.deity = tryTranslate(localizedParams.deity, 'deities');
            if (localizedParams.heaven)
                localizedParams.heaven = tryTranslate(localizedParams.heaven, 'stems');
            if (localizedParams.earth)
                localizedParams.earth = tryTranslate(localizedParams.earth, 'stems');
            // 'palace' is tricky because it might include numbers e.g. '巽4宫'. 
            // We can try 'trigrams' if it matches a single trigram char 
            if (localizedParams.palace && typeof localizedParams.palace === 'string' && localizedParams.palace.length === 1) {
                localizedParams.palace = tryTranslate(localizedParams.palace, 'trigrams');
            }
        }
        return index_1.i18n.t(pattern.id, localizedParams);
    }
    return pattern.description || pattern.name || '';
};
exports.formatPattern = formatPattern;
/**
 * Format Ten Stem Response to localized string
 */
const formatTenStem = (item) => {
    if (!item)
        return '';
    if (item.id) {
        return index_1.i18n.t(item.id, item.params);
    }
    return item.description || '无';
};
exports.formatTenStem = formatTenStem;
/**
 * Format Men Po (Gate Pressure) details
 */
const formatMenPo = (item) => {
    if (!item)
        return '';
    if (item.id) {
        return index_1.i18n.t(item.id, item.params);
    }
    return item.description || '';
};
exports.formatMenPo = formatMenPo;
/**
 * Helper to translate simple keys if they exist, fallback to original
 */
const t = (key, params) => {
    return index_1.i18n.t(key, params);
};
exports.t = t;
