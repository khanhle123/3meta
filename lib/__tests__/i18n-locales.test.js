"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../i18n/index");
const translateChart_1 = __importDefault(require("../i18n/translateChart"));
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
        it('should translate pattern names and descriptions to Vietnamese in translateChart output', () => {
            const chart = {
                version: '2.0.0',
                timeInfo: {},
                fourPillars: {},
                ju: {},
                yuan: '元',
                season: '冬',
                monthElement: '水',
                zhiFu: {},
                zhiShi: {},
                postHorse: {},
                palaces: [
                    {
                        position: 1,
                        trigram: '坎',
                        gate: '开门',
                        star: '天蓬',
                        deity: '值符',
                        heavenlyStem: '戊',
                        earthlyStem: '丙',
                        earthBranch: '子',
                        voidness: {},
                        fiveElements: '水',
                        status: { star: '无', gate: '无' },
                        innerOuter: '内盘',
                        gatePressure: '无',
                        growthInfo: {},
                        tombInfo: {},
                        tenStemResponse: {},
                        auspiciousPatterns: [{ type: '欢怡', name: '欢怡', id: 'patterns.common.huan_yi', params: { earth: '丙', deity: '值符' }, description: '地盘乙/丙/丁+值符' }],
                        inauspiciousPatterns: [{ type: '螣蛇夭矫', name: '螣蛇夭矫', id: 'patterns.bad.teng_she_yao_jiao', params: { heaven: '癸', earth: '丁' }, description: '天盘癸+地盘丁' }],
                    },
                ],
                hiddenStems: new Map(),
                specialPatterns: {
                    menPo: [],
                    auspiciousPatterns: [{ type: '门宫和义', name: '门宫和义', id: 'patterns.common.men_gong_sheng', params: { gate: '开门', palace: 1 }, description: '和：门生宫 (开门生1宫)' }],
                    inauspiciousPatterns: [{ type: '玉女守门', name: '玉女守门', id: 'patterns.common.yu_nu_shou_men', params: { earth: '丁' }, description: '地盘丁落值使门，主贵人' }],
                },
            };
            const result = (0, translateChart_1.default)(chart, 'vi-VN');
            expect(result.palaces[0].auspiciousPatterns[0].name).toBe('Hoan Nhi');
            expect(result.palaces[0].auspiciousPatterns[0].description).toContain('Địa bàn');
            expect(result.palaces[0].inauspiciousPatterns[0].name).toBe('Đằng Xà Yêu Kiều');
            expect(result.specialPatterns.auspiciousPatterns[0].name).toBe('Môn Cung Hòa Nghĩa');
            expect(result.specialPatterns.inauspiciousPatterns[0].name).toBe('Ngọc Nữ Thủ Môn');
        });
    });
});
