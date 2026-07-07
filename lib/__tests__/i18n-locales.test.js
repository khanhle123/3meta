"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../i18n/index");
const zh_TW_1 = require("../i18n/locales/zh-TW");
const en_US_1 = require("../i18n/locales/en-US");
const vi_VN_1 = require("../i18n/locales/vi-VN");
describe('Phase 3: Locale Expansion', () => {
    describe('Locale Registry', () => {
        it('should have zh-CN, zh-TW, en-US, and vi-VN registered', () => {
            const locales = index_1.i18n.getAvailableLocales();
            expect(locales).toContain('zh-CN');
            expect(locales).toContain('zh-TW');
            expect(locales).toContain('en-US');
            expect(locales).toContain('vi-VN');
        });
        it('should switch locales correctly', () => {
            index_1.i18n.setLocale('en-US');
            expect(index_1.i18n.getLocale()).toBe('en-US');
            index_1.i18n.setLocale('zh-TW');
            expect(index_1.i18n.getLocale()).toBe('zh-TW');
            index_1.i18n.setLocale('zh-CN'); // Reset
            expect(index_1.i18n.getLocale()).toBe('zh-CN');
        });
    });
    describe('Locale Content', () => {
        it('should have corresponding keys for zh-TW', () => {
            // Basic check for existence
            expect(zh_TW_1.zhTW.language.name).toBe('Chinese (Traditional)');
            expect(zh_TW_1.zhTW.stems['甲']).toBe('甲');
            expect(zh_TW_1.zhTW.gates['休门']).toBe('休門');
        });
        it('should have corresponding keys for en-US', () => {
            expect(en_US_1.enUS.language.name).toBe('English');
            expect(en_US_1.enUS.stems['甲']).toBe('Jia');
            expect(en_US_1.enUS.gates['休门']).toBe('Rest Gate');
        });
        it('should have corresponding keys for vi-VN', () => {
            expect(vi_VN_1.viVN.language.name).toBe('Vietnamese');
            expect(vi_VN_1.viVN.stems['甲']).toBe('Giáp');
            expect(vi_VN_1.viVN.gates['休门']).toBe('Hưu Môn');
        });
        it('should handle template replacement in en-US', () => {
            index_1.i18n.setLocale('en-US');
            const patternKey = 'patterns.jiu_dun.tian_dun';
            const params = { heaven: 'Bing', earth: 'Ding', gate: 'Life Gate' };
            const text = index_1.i18n.t(patternKey, params);
            // "Heaven Dun: Heaven {heaven} + Earth {earth} + {gate}"
            expect(text).toBe('Heaven Dun: Heaven Bing + Earth Ding + Life Gate');
        });
        it('should handle template replacement in zh-TW', () => {
            index_1.i18n.setLocale('zh-TW');
            const patternKey = 'patterns.jiu_dun.tian_dun';
            const params = { heaven: '丙', earth: '丁', gate: '生門' };
            const text = index_1.i18n.t(patternKey, params);
            // "天遁：天盤{heaven} + 地盤{earth} + {gate}"
            expect(text).toBe('天遁：天盤丙 + 地盤丁 + 生門');
        });
    });
});
