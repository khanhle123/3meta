"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../analysis/index");
const zh_CN_1 = require("../i18n/locales/zh-CN");
describe('Phase 2: I18N Structure Refactoring', () => {
    // Test Helpers
    const mockFourPillars = {
        year: { stem: '甲', branch: '子' },
        month: { stem: '乙', branch: '丑' },
        day: { stem: '丙', branch: '寅' },
        hour: { stem: '丁', branch: '卯' },
    };
    const basePalace = {
        position: 1,
        trigram: '坎',
        gate: '休门',
        star: '天蓬',
        deity: '值符',
        heavenlyStem: '甲',
        earthlyStem: '乙',
        earthBranch: '子',
        voidness: {
            voidBranches: ['子', '丑'],
            palaceBranches: ['子'],
            voidInPalace: ['子'],
            hasVoidness: true
        },
        fiveElements: '水',
        growthInfo: {},
        liuYiJiXing: {},
        tombInfo: {},
        tenStemResponse: {},
        innerOuter: '内盘',
        gatePressure: '无',
    };
    describe('detectPatterns', () => {
        it('should return structured data for Tian Dun (Heavenly Dun)', () => {
            // 天遁：天盘丙+地盘丁+生门
            const palace = {
                ...basePalace,
                heavenlyStem: '丙',
                earthlyStem: '丁',
                gate: '生门',
                deity: '无神', // Ensure no other random patterns trigger
            };
            const result = (0, index_1.detectPatterns)(palace, '开门', mockFourPillars);
            const tianDun = result.auspicious.find(a => a.name === '九遁');
            expect(tianDun).toBeDefined();
            expect(tianDun === null || tianDun === void 0 ? void 0 : tianDun.id).toBe('patterns.jiu_dun.tian_dun');
            expect(tianDun === null || tianDun === void 0 ? void 0 : tianDun.params).toEqual({
                heaven: '丙',
                earth: '丁',
                gate: '生门'
            });
            // Ensure description is still present for legacy compatibility
            expect(tianDun === null || tianDun === void 0 ? void 0 : tianDun.description).toContain('天盘丙+地盘丁+生门');
        });
        it('should return structured data for Men Gong He Yi (Harmony)', () => {
            // 门生宫: 金生水
            const palace = {
                ...basePalace,
                position: 1, // 坎宫 水
                fiveElements: '水',
                gate: '开门', // 金
                heavenlyStem: '戊',
                earthlyStem: '己',
            };
            const result = (0, index_1.detectPatterns)(palace, '休门', mockFourPillars);
            const pattern = result.auspicious.find(a => a.name === '门宫和义');
            expect(pattern).toBeDefined();
            expect(pattern === null || pattern === void 0 ? void 0 : pattern.id).toBe('patterns.common.men_gong_sheng');
            expect(pattern === null || pattern === void 0 ? void 0 : pattern.params).toEqual({
                gate: '开门',
                palace: 1
            });
        });
        it('should return structured data for Bad Pattern (e.g. Qing Long Tao Zou)', () => {
            // 青龙逃走：天盘乙+地盘辛
            const palace = {
                ...basePalace,
                heavenlyStem: '乙',
                earthlyStem: '辛',
            };
            const result = (0, index_1.detectPatterns)(palace, '开门', mockFourPillars);
            const pattern = result.inauspicious.find(a => a.name === '青龙逃走');
            expect(pattern).toBeDefined();
            expect(pattern === null || pattern === void 0 ? void 0 : pattern.id).toBe('patterns.bad.qing_long_tao_zou');
            expect(pattern === null || pattern === void 0 ? void 0 : pattern.params).toEqual({
                heaven: '乙',
                earth: '辛'
            });
        });
    });
    describe('calcTenStemResponse', () => {
        it('should return structured keys and params', () => {
            const res = (0, index_1.calcTenStemResponse)('甲', '甲');
            expect(res.heavenlyToEarthly.id).toBe('patterns.ten_stem.template');
            expect(res.heavenlyToEarthly.params).toEqual({
                h: '甲',
                hEle: '木',
                rel: '比和',
                e: '甲',
                eEle: '木'
            });
        });
    });
    describe('calcMenPo', () => {
        it('should return keys for Men Po (Gate Pressure)', () => {
            // 开门 (金) 迫 震3宫 (木) -> 金克木
            const palace = {
                ...basePalace,
                position: 3,
                fiveElements: '木',
                gate: '开门',
            };
            // Directly testing calcMenPo, needs '迫' passed in
            const res = (0, index_1.calcMenPo)(palace, '迫');
            expect(res).toBeDefined();
            expect(res === null || res === void 0 ? void 0 : res.id).toBe('patterns.bad.men_po');
            expect(res === null || res === void 0 ? void 0 : res.params).toEqual({
                gate: '开门',
                palace: 3,
                gateElement: '金',
                palaceElement: '木'
            });
        });
    });
    describe('Locale Consistency', () => {
        it('should have matching keys in zh-CN for used patterns', () => {
            // Verify a few critical paths
            expect(zh_CN_1.zhCN.patterns).toBeDefined();
            // Jiu Dun
            expect(zh_CN_1.zhCN.patterns.jiu_dun).toBeDefined();
            expect(zh_CN_1.zhCN.patterns.jiu_dun.tian_dun).toBeDefined();
            // Bad
            expect(zh_CN_1.zhCN.patterns.bad).toBeDefined();
            expect(zh_CN_1.zhCN.patterns.bad.qing_long_tao_zou).toBeDefined();
            // Ten Stem
            expect(zh_CN_1.zhCN.patterns.ten_stem.template).toBeDefined();
        });
    });
});
