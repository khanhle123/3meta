"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QimenChart = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const lunar_typescript_1 = require("lunar-typescript");
const calculator_1 = require("./calculator");
const constants_1 = require("../data/constants");
const analysis_1 = require("../analysis");
const VERSION = '2.0.0';
const TIME_NAME = { 子: '子时', 丑: '丑时', 寅: '寅时', 卯: '卯时', 辰: '辰时', 巳: '巳时', 午: '午时', 未: '未时', 申: '申时', 酉: '酉时', 戌: '戌时', 亥: '亥时' };
class QimenChart {
    constructor() {
        this.version = VERSION;
        this.season = '冬';
        this.monthElement = '水';
        this.palaces = [];
        this.specialPatterns = {};
        this.hiddenStems = new Map();
    }
    static byDatetime(datetime, opts) {
        var _a, _b, _c, _d, _e;
        const d = (0, dayjs_1.default)(datetime);
        if (!d.isValid()) {
            throw new Error(`QimenChart.byDatetime: 无法解析的日期时间 ${JSON.stringify(datetime)}`);
        }
        // 0 保留作为「自动定局」语义（与下方 `|| getJuShu` 兼容），其余必须是 1-9 整数
        if ((opts === null || opts === void 0 ? void 0 : opts.juNumber) !== undefined && opts.juNumber !== 0 && (!Number.isInteger(opts.juNumber) || opts.juNumber < 1 || opts.juNumber > 9)) {
            throw new Error(`QimenChart.byDatetime: juNumber 必须是 1-9 的整数，收到 ${opts.juNumber}`);
        }
        if ((opts === null || opts === void 0 ? void 0 : opts.isYangdun) !== undefined && typeof opts.isYangdun !== 'boolean') {
            throw new Error(`QimenChart.byDatetime: isYangdun 必须是布尔值，收到 ${typeof opts.isYangdun} (${JSON.stringify(opts.isYangdun)})`);
        }
        const dateStr = d.format('YYYY-MM-DD');
        const solar = lunar_typescript_1.Solar.fromYmdHms(d.year(), d.month() + 1, d.date(), d.hour(), d.minute(), d.second());
        const lunar = solar.getLunar();
        const yearDivide = (opts === null || opts === void 0 ? void 0 : opts.yearDivide) === 'normal' ? 'normal' : 'exact';
        const getYearByLiChun = (_a = lunar.getYearInGanZhiByLiChun) === null || _a === void 0 ? void 0 : _a.bind(lunar);
        const yearGZ = yearDivide === 'exact'
            ? (getYearByLiChun ? getYearByLiChun() : lunar.getYearInGanZhiExact())
            : lunar.getYearInGanZhi();
        const monthGZ = lunar.getMonthInGanZhiExact();
        const dayGZ = lunar.getDayInGanZhiExact();
        const hourGZ = lunar.getTimeInGanZhi();
        const split = (gz) => ({ stem: gz[0], branch: gz[1] });
        const fourPillars = {
            year: split(yearGZ),
            month: split(monthGZ),
            day: split(dayGZ),
            hour: split(hourGZ),
        };
        const xunShou = (0, calculator_1.getXunShou)(hourGZ);
        const yuan = (0, calculator_1.getYuan)(dayGZ);
        const detectedSolarTerm = ((_c = (_b = lunar.getPrevJieQi(false)) === null || _b === void 0 ? void 0 : _b.getName) === null || _c === void 0 ? void 0 : _c.call(_b)) || '';
        const solarTerm = (opts === null || opts === void 0 ? void 0 : opts.solarTerm) || detectedSolarTerm;
        const isYangdun = (opts === null || opts === void 0 ? void 0 : opts.isYangdun) !== undefined
            ? opts.isYangdun
            : ['冬至', '小寒', '大寒', '立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种'].includes(solarTerm);
        const juNumRaw = (opts === null || opts === void 0 ? void 0 : opts.juNumber) || (0, calculator_1.getJuShu)(solarTerm, yuan, isYangdun);
        const juNum = juNumRaw === 0 ? (0, calculator_1.getJuShu)(((_e = (_d = lunar.getPrevJieQi(true)) === null || _d === void 0 ? void 0 : _d.getName) === null || _e === void 0 ? void 0 : _e.call(_d)) || solarTerm, yuan, isYangdun) || 1 : juNumRaw;
        const ju = { type: isYangdun ? '阳遁' : '阴遁', number: juNum };
        // 八门九星旺衰所用季节，按月建（节气历）月支判定，而非公历月份。
        // 四季月概念属阴历/节气历，「阳历没有这种说法」。
        const monthBranch = fourPillars.month.branch;
        const season = (0, analysis_1.getSeasonByMonthBranch)(monthBranch);
        const monthElement = (0, analysis_1.getMonthElementByBranch)(monthBranch);
        const diPan = (0, calculator_1.arrangeDiPan)(ju.number, isYangdun);
        const zhiFuInfo = (0, calculator_1.getZhiFuInfo)(xunShou, diPan);
        const { position: zhiFuLuoGong, timeStem: actualTimeStem } = (0, calculator_1.getZhiFuLuoGong)(hourGZ, xunShou, diPan);
        const zhiShi = (0, calculator_1.getZhiShiInfo)(hourGZ, zhiFuInfo.position, isYangdun);
        const tianPan = (0, calculator_1.arrangeTianPan)(zhiFuInfo.star, zhiFuLuoGong, diPan);
        const deities = (0, calculator_1.arrangeDeities)(zhiFuLuoGong, isYangdun);
        const gates = (0, calculator_1.arrangeGates)(zhiShi.position, zhiShi.gate);
        // 计算暗干排布
        const hiddenStems = (0, calculator_1.calculateHiddenStems)(zhiShi.position, actualTimeStem, isYangdun, hourGZ[0], zhiFuLuoGong, diPan);
        const palaces = [];
        Object.keys(constants_1.PALACE_POSITIONS).forEach((tri) => {
            const pos = constants_1.PALACE_POSITIONS[tri];
            const earthBranch = constants_1.PALACE_BRANCHES[pos];
            const tian = tianPan.get(pos);
            const di = diPan.get(pos);
            palaces.push({
                position: pos,
                trigram: tri,
                gate: gates.get(pos) || '无门',
                star: tian ? tian.star : (pos === 5 ? '天禽' : '无'),
                deity: deities.get(pos) || '无神',
                heavenlyStem: tian ? tian.heavenlyStem : '无',
                earthlyStem: di,
                earthBranch: earthBranch.length === 0 ? '无' : (earthBranch.length === 1 ? earthBranch[0] : earthBranch),
                isZhiFu: pos === zhiFuLuoGong,
                isZhiShi: pos === zhiShi.position,
                voidness: { voidBranches: constants_1.XUN_SHOU_VOIDNESS[xunShou], palaceBranches: earthBranch.length === 0 ? ['无'] : earthBranch, voidInPalace: [], hasVoidness: false },
                fiveElements: constants_1.PALACE_FIVE_ELEMENTS[tri],
                status: { star: '无', gate: '无' },
                innerOuter: pos === 5 ? '无' : (pos % 2 === 0 ? '内盘' : '外盘'),
                gatePressure: '无',
                growthInfo: { heavenlyStem: '无', earthlyStem: '无', timeStem: '无', dayStem: '无' },
                liuYiJiXing: { hasJiXing: false },
                tombInfo: { heavenlyStemInTomb: [], earthlyStemInTomb: [] },
                tenStemResponse: { heavenlyToEarthly: { relation: '无', description: '无' } },
                isPostHorse: false,
                auspiciousPatterns: [],
                inauspiciousPatterns: [],
            });
        });
        const handled = (0, calculator_1.handleMiddlePalace)(isYangdun, palaces);
        const timeInfo = {
            solarDate: dateStr,
            lunarDate: lunar.toString(),
            chineseYear: yearGZ,
            chineseMonth: monthGZ,
            chineseDay: dayGZ,
            chineseTime: hourGZ,
            timeEarthlyBranch: hourGZ[1],
            timeName: TIME_NAME[hourGZ[1]],
            solarTerm,
            xunShou,
            voidness: constants_1.XUN_SHOU_VOIDNESS[xunShou],
        };
        const chart = new QimenChart();
        chart.timeInfo = timeInfo;
        chart.fourPillars = fourPillars;
        chart.ju = ju;
        chart.yuan = yuan;
        chart.season = season;
        chart.monthElement = monthElement;
        chart.zhiFu = { star: zhiFuInfo.star, position: zhiFuLuoGong, heavenlyStem: zhiFuInfo.heavenlyStem };
        chart.zhiShi = { gate: zhiShi.gate, position: zhiShi.position };
        chart.postHorse = (0, analysis_1.getPostHorse)(hourGZ[1]);
        chart.hiddenStems = hiddenStems;
        const menPo = [];
        chart.palaces = handled.map((p) => {
            const innerOuter = (0, analysis_1.getInnerOuter)(isYangdun, p.position);
            const voidness = (0, analysis_1.buildVoidness)(xunShou, p.earthBranch);
            const growthInfo = {
                heavenlyStem: (0, analysis_1.calcGrowth)(p.heavenlyStem, p.earthBranch),
                earthlyStem: (0, analysis_1.calcGrowth)(p.earthlyStem, p.earthBranch),
                timeStem: (0, analysis_1.calcGrowth)(actualTimeStem, p.earthBranch),
                dayStem: (0, analysis_1.calcGrowth)(dayGZ[0], p.earthBranch),
            };
            const tombInfo = (0, analysis_1.calcTombInfo)(p.heavenlyStem, p.earthlyStem, p.earthBranch, hourGZ[0], dayGZ[0]);
            const tenStemResponse = (0, analysis_1.calcTenStemResponse)(p.heavenlyStem, p.earthlyStem, actualTimeStem, dayGZ[0]);
            const gatePressure = (0, analysis_1.calcGatePressure)(p.gate, p.fiveElements);
            const status = (0, analysis_1.calcStatus)(p.star, p.gate, season);
            const patterns = (0, analysis_1.detectPatterns)(p, zhiShi.gate, fourPillars);
            const isPostHorse = chart.postHorse.position === p.position;
            const menPoItem = (0, analysis_1.calcMenPo)(p, gatePressure);
            if (menPoItem)
                menPo.push(menPoItem);
            // 为每个宫位计算六仪击刑
            const liuYiJiXing = (0, calculator_1.calculateLiuYiJiXing)(p.position, p.heavenlyStem);
            const extraInauspicious = gatePressure === '制' && p.gate !== '无门'
                ? [{ name: '门受制', type: '门受制', position: p.position, description: `宫(${p.fiveElements})克${p.gate}(${constants_1.GATE_FIVE_ELEMENTS[p.gate]})` }]
                : [];
            const menPoInauspicious = gatePressure === '迫' && p.gate !== '无门'
                ? [{ name: '门迫', type: '门迫', position: p.position, description: `门迫：${p.gate}克宫` }]
                : [];
            // 如果有六仪击刑，添加到凶格中
            const liuYiJiXingInauspicious = liuYiJiXing.hasJiXing ?
                [{ name: '六仪击刑', type: liuYiJiXing.type, position: p.position, description: liuYiJiXing.description }] : [];
            return {
                ...p,
                innerOuter,
                voidness,
                growthInfo,
                liuYiJiXing,
                tombInfo,
                tenStemResponse,
                gatePressure,
                status,
                isPostHorse,
                auspiciousPatterns: patterns.auspicious,
                inauspiciousPatterns: [...patterns.inauspicious, ...extraInauspicious, ...menPoInauspicious, ...liuYiJiXingInauspicious],
            };
        });
        const globalPatterns = (0, analysis_1.detectGlobalPatterns)(fourPillars);
        const allAuspicious = [...chart.palaces.flatMap((p) => p.auspiciousPatterns || []), ...globalPatterns.auspicious];
        const allInauspicious = [...chart.palaces.flatMap((p) => p.inauspiciousPatterns || []), ...globalPatterns.inauspicious];
        const wuBuYuShiPattern = globalPatterns.inauspicious.find(p => p.type === '五不遇时');
        const wuBuYuShi = {
            isWuBuYuShi: !!wuBuYuShiPattern,
            description: wuBuYuShiPattern === null || wuBuYuShiPattern === void 0 ? void 0 : wuBuYuShiPattern.description
        };
        chart.specialPatterns = { menPo, auspiciousPatterns: allAuspicious, inauspiciousPatterns: allInauspicious, wuBuYuShi };
        return chart;
    }
    /**
     * 快捷方法：直接用公历年月日时分秒生成排盘
     */
    static fromSolar(yyyy, MM, dd, hh = 0, mm = 0, ss = 0, opts) {
        // 逐个字段校验，避免越界数值被 dayjs 静默进位成另一个日期（如 month=13 -> 次年一月）
        const checkRange = (name, value, min, max) => {
            if (!Number.isInteger(value) || value < min || value > max) {
                throw new Error(`QimenChart.fromSolar: ${name} 必须是 ${min}-${max} 的整数，收到 ${value}`);
            }
        };
        checkRange('year', yyyy, 1, 9999);
        checkRange('month', MM, 1, 12);
        checkRange('day', dd, 1, 31);
        checkRange('hour', hh, 0, 23);
        checkRange('minute', mm, 0, 59);
        checkRange('second', ss, 0, 59);
        const iso = `${yyyy.toString().padStart(4, '0')}-${MM.toString().padStart(2, '0')}-${dd.toString().padStart(2, '0')}T${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
        // 防止合法范围内但日历不存在的日期（如 4 月 31、平年 2 月 29）被 dayjs 静默进位
        const parsed = (0, dayjs_1.default)(iso);
        if (parsed.year() !== yyyy || parsed.month() + 1 !== MM || parsed.date() !== dd) {
            throw new Error(`QimenChart.fromSolar: 日历中不存在该日期 ${yyyy}-${MM}-${dd}`);
        }
        return QimenChart.byDatetime(iso, opts);
    }
    /**
     * 获取版权信息
     */
    static getCopyright() {
        return {
            ...QimenChart.COPYRIGHT,
            generatedAt: new Date().toISOString()
        };
    }
    /**
     * 转换为 JSON 对象（包含版权信息和暗干）
     */
    toJSON() {
        return {
            version: this.version,
            timeInfo: this.timeInfo,
            fourPillars: this.fourPillars,
            ju: this.ju,
            yuan: this.yuan,
            season: this.season,
            monthElement: this.monthElement,
            zhiFu: this.zhiFu,
            zhiShi: this.zhiShi,
            postHorse: this.postHorse,
            palaces: this.palaces,
            hiddenStems: Object.fromEntries(this.hiddenStems),
            specialPatterns: this.specialPatterns,
            copyright: QimenChart.getCopyright()
        };
    }
}
exports.QimenChart = QimenChart;
/**
 * 版权信息（静态）
 */
QimenChart.COPYRIGHT = {
    library: '3meta',
    version: VERSION,
    author: '3metaJun',
    license: 'MIT',
    repository: 'https://github.com/3metaJun/3meta',
    homepage: 'https://3meta.pub'
};
exports.default = QimenChart;
