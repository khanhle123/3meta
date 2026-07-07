"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QimenChart_1 = require("../qimen/QimenChart");
const calculator_1 = require("../qimen/calculator");
describe('排盘健壮性 / 边界校验', () => {
    describe('byDatetime 输入校验', () => {
        it('无法解析的日期字符串应抛出清晰错误', () => {
            expect(() => QimenChart_1.QimenChart.byDatetime('not-a-date')).toThrow('无法解析的日期时间');
        });
        it('空字符串应抛出清晰错误', () => {
            expect(() => QimenChart_1.QimenChart.byDatetime('')).toThrow('无法解析的日期时间');
        });
        it('无效 Date 对象应抛出清晰错误', () => {
            expect(() => QimenChart_1.QimenChart.byDatetime(new Date('garbage'))).toThrow('无法解析的日期时间');
        });
        it('juNumber 超出 1-9 应抛错', () => {
            expect(() => QimenChart_1.QimenChart.byDatetime('2008-11-04T12:30:00', { juNumber: 10 })).toThrow('juNumber');
            expect(() => QimenChart_1.QimenChart.byDatetime('2008-11-04T12:30:00', { juNumber: -3 })).toThrow('juNumber');
            expect(() => QimenChart_1.QimenChart.byDatetime('2008-11-04T12:30:00', { juNumber: 2.5 })).toThrow('juNumber');
            expect(() => QimenChart_1.QimenChart.byDatetime('2008-11-04T12:30:00', { juNumber: NaN })).toThrow('juNumber');
        });
        it('juNumber=0 仍按自动定局处理（向后兼容）', () => {
            const c = QimenChart_1.QimenChart.byDatetime('2008-11-04T12:30:00', { juNumber: 0, solarTerm: '霜降', isYangdun: false });
            expect(c.ju).toEqual({ type: '阴遁', number: 2 });
        });
        it('isYangdun 非布尔值应抛错（防止字符串 "false" 被当真值）', () => {
            expect(() => QimenChart_1.QimenChart.byDatetime('2008-11-04T12:30:00', { isYangdun: 'false' })).toThrow('isYangdun');
        });
        it('合法输入仍正常排盘', () => {
            const c = QimenChart_1.QimenChart.byDatetime('2008-11-04T12:30:00', { solarTerm: '霜降', isYangdun: false, juNumber: 2 });
            expect(c.ju).toEqual({ type: '阴遁', number: 2 });
        });
    });
    describe('fromSolar 字段范围校验', () => {
        it('月份越界应抛错而非静默进位', () => {
            expect(() => QimenChart_1.QimenChart.fromSolar(2024, 13, 1)).toThrow('month');
            expect(() => QimenChart_1.QimenChart.fromSolar(2024, 0, 1)).toThrow('month');
        });
        it('日期越界应抛错', () => {
            expect(() => QimenChart_1.QimenChart.fromSolar(2024, 1, 32)).toThrow('day');
        });
        it('小时越界应抛错', () => {
            expect(() => QimenChart_1.QimenChart.fromSolar(2024, 1, 1, 25)).toThrow('hour');
        });
        it('日历中不存在的日期应抛错（4 月 31 日 / 平年 2 月 29 日）', () => {
            expect(() => QimenChart_1.QimenChart.fromSolar(2024, 4, 31)).toThrow('不存在');
            expect(() => QimenChart_1.QimenChart.fromSolar(2023, 2, 29)).toThrow('不存在');
        });
        it('闰年 2 月 29 日合法', () => {
            const c = QimenChart_1.QimenChart.fromSolar(2024, 2, 29, 12);
            expect(c.timeInfo.solarDate).toBe('2024-02-29');
        });
        it('非整数参数应抛错', () => {
            expect(() => QimenChart_1.QimenChart.fromSolar(2024, 1.5, 1)).toThrow('month');
        });
    });
    describe('底层函数防御', () => {
        it('getXunShou 对非法干支抛错而非返回 undefined', () => {
            expect(() => (0, calculator_1.getXunShou)('XX')).toThrow('非法干支');
            expect((0, calculator_1.getXunShou)('甲子')).toBe('甲子');
            expect((0, calculator_1.getXunShou)('癸亥')).toBe('甲寅');
        });
        it('arrangeDiPan 对越界局数抛错而非产出负/小数宫位', () => {
            expect(() => (0, calculator_1.arrangeDiPan)(0, true)).toThrow('局数');
            expect(() => (0, calculator_1.arrangeDiPan)(10, true)).toThrow('局数');
            expect(() => (0, calculator_1.arrangeDiPan)(-3, false)).toThrow('局数');
            expect(() => (0, calculator_1.arrangeDiPan)(2.5, true)).toThrow('局数');
        });
        it('arrangeDiPan 对合法 1-9 局产出完整 9 宫', () => {
            for (let ju = 1; ju <= 9; ju++) {
                const yang = (0, calculator_1.arrangeDiPan)(ju, true);
                const yin = (0, calculator_1.arrangeDiPan)(ju, false);
                expect(yang.size).toBe(9);
                expect(yin.size).toBe(9);
                expect(new Set(yang.values()).size).toBe(9);
                expect(new Set(yin.values()).size).toBe(9);
            }
        });
    });
});
