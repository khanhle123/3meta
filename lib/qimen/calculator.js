"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateLiuYiJiXing = exports.calculateHiddenStems = exports.arrangeGates = exports.handleMiddlePalace = exports.arrangeDeities = exports.arrangeTianPan = exports.getZhiShiInfo = exports.getZhiFuLuoGong = exports.getZhiFuInfo = exports.arrangeDiPan = exports.getJuShu = exports.getYuan = exports.getXunShou = void 0;
const constants_1 = require("../data/constants");
const palace_1 = require("../utils/palace");
const getXunShou = (ganzhi) => {
    const idx = constants_1.JIAZI.indexOf(ganzhi);
    if (idx === -1) {
        throw new Error(`getXunShou: 非法干支 "${ganzhi}"，必须是六十甲子之一`);
    }
    const xunIdx = Math.floor(idx / 10) * 10;
    return constants_1.JIAZI[xunIdx];
};
exports.getXunShou = getXunShou;
const getYuan = (riGanZhi) => {
    if (['甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己卯', '庚辰', '辛巳', '壬午', '癸未', '甲午', '乙未', '丙申', '丁酉', '戊戌', '己酉', '庚戌', '辛亥', '壬子', '癸丑'].includes(riGanZhi))
        return '上元';
    if (['己巳', '庚午', '辛未', '壬申', '癸酉', '甲申', '乙酉', '丙戌', '丁亥', '戊子', '己亥', '庚子', '辛丑', '壬寅', '癸卯', '甲寅', '乙卯', '丙辰', '丁巳', '戊午'].includes(riGanZhi))
        return '中元';
    return '下元';
};
exports.getYuan = getYuan;
const getJuShu = (jieqi, yuan, isYangdun) => {
    const table = isYangdun ? constants_1.YANGDUN_JIEQI : constants_1.YINDUN_JIEQI;
    const row = table[jieqi];
    if (!row)
        return 0;
    if (yuan === '上元')
        return row[0];
    if (yuan === '中元')
        return row[1];
    return row[2];
};
exports.getJuShu = getJuShu;
const arrangeDiPan = (juShu, isYangdun) => {
    if (!Number.isInteger(juShu) || juShu < 1 || juShu > 9) {
        throw new Error(`arrangeDiPan: 局数必须是 1-9 的整数，收到 ${juShu}`);
    }
    const result = new Map();
    if (isYangdun) {
        constants_1.SANQI_LIUYI.forEach((stem, i) => {
            const pos = ((juShu - 1 + i) % 9) + 1;
            result.set(pos, stem);
        });
    }
    else {
        constants_1.SANQI_LIUYI.forEach((stem, i) => {
            let pos = juShu - i;
            while (pos < 1)
                pos += 9;
            result.set(pos, stem);
        });
    }
    return result;
};
exports.arrangeDiPan = arrangeDiPan;
const getZhiFuInfo = (xunShou, diPan) => {
    const zhiFuStem = constants_1.LIUJIA_XUN[xunShou];
    let position = 5;
    for (const [pos, stem] of diPan.entries()) {
        if (stem === zhiFuStem) {
            position = pos;
            break;
        }
    }
    const star = Object.keys(constants_1.STAR_ORIGINAL_POSITIONS).find((s) => constants_1.STAR_ORIGINAL_POSITIONS[s] === position);
    return { star, position, heavenlyStem: zhiFuStem };
};
exports.getZhiFuInfo = getZhiFuInfo;
const getZhiFuLuoGong = (shiGanZhi, xunShou, diPan) => {
    const timeStemRaw = shiGanZhi[0];
    const actualTimeStem = timeStemRaw === '甲' ? constants_1.LIUJIA_XUN[xunShou] : timeStemRaw;
    let position = 5;
    for (const [pos, stem] of diPan.entries()) {
        if (stem === actualTimeStem) {
            position = pos;
            break;
        }
    }
    if (position === 5)
        position = 2;
    return { position, timeStem: actualTimeStem };
};
exports.getZhiFuLuoGong = getZhiFuLuoGong;
const getZhiShiInfo = (shiZhi, zhiFuGong, isYangdun) => {
    const actualZhiFuGong = zhiFuGong === 5 ? 2 : zhiFuGong;
    const zhiShiMen = Object.keys(constants_1.GATE_ORIGINAL_POSITIONS).find((g) => constants_1.GATE_ORIGINAL_POSITIONS[g] === actualZhiFuGong);
    const xunShou = (0, exports.getXunShou)(shiZhi);
    const xunBranch = xunShou[1];
    const shiBranch = shiZhi[1];
    const steps = ((0, palace_1.getBranchIndex)(shiBranch) - (0, palace_1.getBranchIndex)(xunBranch) + 12) % 12;
    let position = constants_1.GATE_ORIGINAL_POSITIONS[zhiShiMen];
    for (let i = 0; i < steps; i += 1) {
        if (isYangdun) {
            position += 1;
            if (position > 9)
                position = 1;
        }
        else {
            position -= 1;
            if (position < 1)
                position = 9;
        }
    }
    const rawPosition = position;
    if (position === 5)
        position = isYangdun ? 8 : 2;
    return { gate: zhiShiMen, position: position, rawPosition };
};
exports.getZhiShiInfo = getZhiShiInfo;
const arrangeTianPan = (zhiFuStar, zhiFuLuoGong, diPan) => {
    const tianPan = new Map();
    // 当值符星是天禽时（旬首六仪在中5宫），天禽跟随天芮
    // 此时应以天芮作为基准排布天盘
    const effectiveStar = zhiFuStar === '天禽' ? '天芮' : zhiFuStar;
    const zhiFuIdx = constants_1.STAR_SEQUENCE.indexOf(effectiveStar);
    const startIdx = constants_1.PALACE_CLOCKWISE.indexOf(zhiFuLuoGong === 5 ? 2 : zhiFuLuoGong);
    for (let i = 0; i < 8; i += 1) {
        const palace = constants_1.PALACE_CLOCKWISE[(startIdx + i) % 8];
        const star = constants_1.STAR_SEQUENCE[(zhiFuIdx + i) % 8];
        const originPalace = constants_1.STAR_ORIGINAL_POSITIONS[star];
        const stem = diPan.get(originPalace);
        tianPan.set(palace, { star, heavenlyStem: stem });
    }
    // 中宫始终设置天禽及其地盘天干
    tianPan.set(5, { star: '天禽', heavenlyStem: diPan.get(5) });
    // 如果值符星是天禽，需要在值符落宫额外设置天禽星和中5宫的天干
    // 这样天禽就跟随天芮一起出现在落宫
    if (zhiFuStar === '天禽' && zhiFuLuoGong !== 5) {
        const existing = tianPan.get(zhiFuLuoGong);
        if (existing) {
            // 天禽跟随天芮，携带中5宫的天干
            tianPan.set(zhiFuLuoGong, {
                star: [existing.star, '天禽'],
                heavenlyStem: [existing.heavenlyStem, diPan.get(5)]
            });
        }
    }
    return tianPan;
};
exports.arrangeTianPan = arrangeTianPan;
const arrangeDeities = (zhiFuLuoGong, isYangdun) => {
    const deities = new Map();
    const seq = isYangdun ? constants_1.PALACE_CLOCKWISE : constants_1.PALACE_COUNTER_CLOCKWISE;
    const startIdx = seq.indexOf(zhiFuLuoGong === 5 ? 2 : zhiFuLuoGong);
    ['值符', '腾蛇', '太阴', '六合', '白虎', '玄武', '九地', '九天'].forEach((shen, i) => {
        deities.set(seq[(startIdx + i) % 8], shen);
    });
    return deities;
};
exports.arrangeDeities = arrangeDeities;
const handleMiddlePalace = (isYangdun, palaces) => {
    const result = palaces.map((p) => ({ ...p }));
    const center = result.find((p) => p.position === 5);
    if (!center)
        return result;
    const targetPos = isYangdun ? 8 : 2;
    const target = result.find((p) => p.position === targetPos);
    if (target) {
        const extra = center.earthlyStem;
        target.isJiGong = { isJi: true, type: isYangdun ? '阳遁寄艮八' : '阴遁寄坤二', extraHeavenlyStem: extra, extraStar: '' };
        const existing = Array.isArray(target.earthlyStem) ? target.earthlyStem : [target.earthlyStem];
        target.earthlyStem = [existing[0], extra];
    }
    const tianRui = result.find((p) => Array.isArray(p.star) ? p.star.includes('天芮') : p.star === '天芮');
    // 只有当天芮所在宫位还没有天禽时才添加（避免与天禽作为值符星时的重复）
    if (tianRui && tianRui.position !== 5) {
        const hasQinAlready = Array.isArray(tianRui.star) && tianRui.star.includes('天禽');
        if (!hasQinAlready) {
            const addStem = center.earthlyStem;
            const stars = Array.isArray(tianRui.star) ? tianRui.star.slice(0, 1) : [tianRui.star];
            tianRui.star = [stars[0], '天禽'];
            const stems = Array.isArray(tianRui.heavenlyStem) ? tianRui.heavenlyStem.slice(0, 1) : [tianRui.heavenlyStem];
            tianRui.heavenlyStem = [stems[0], addStem];
        }
    }
    return result;
};
exports.handleMiddlePalace = handleMiddlePalace;
const arrangeGates = (zhiShiGong, zhiShiGate) => {
    const gates = new Map();
    const startIdx = constants_1.PALACE_CLOCKWISE.indexOf(zhiShiGong === 5 ? 2 : zhiShiGong);
    const gateIdx = constants_1.GATE_SEQUENCE.indexOf(zhiShiGate);
    for (let i = 0; i < 8; i += 1) {
        gates.set(constants_1.PALACE_CLOCKWISE[(startIdx + i) % 8], constants_1.GATE_SEQUENCE[(gateIdx + i) % 8]);
    }
    return gates;
};
exports.arrangeGates = arrangeGates;
/**
 * 计算暗干排布
 * @param valueDoorPalace 值使门所在宫位
 * @param hourStem 时干（转换后的实际天干，甲时用遁干代替）
 * @param isYangdun 是否阳遁
 * @param originalHourStem 原始时干
 * @param zhiFuPalace 值符所在宫位
 * @param diPan 地盘
 * @returns Map<宫位, 暗干>
 */
const calculateHiddenStems = (valueDoorPalace, hourStem, isYangdun, originalHourStem, zhiFuPalace, diPan) => {
    const hiddenStems = new Map();
    const stems = ['戊', '己', '庚', '辛', '壬', '癸', '丁', '丙', '乙'];
    const stemIndex = stems.indexOf(hourStem);
    if (stemIndex === -1)
        return hiddenStems;
    let startPalace = valueDoorPalace;
    // 特殊情况1：时干为甲
    if (originalHourStem === '甲') {
        const centerStem = diPan.get(5);
        // 如果旬首天干与中宫地盘天干不同，从中宫开始
        // 否则（相同），从值使门开始（保持默认）
        if (hourStem !== centerStem) {
            startPalace = 5;
        }
    }
    // 特殊情况2：值符值使同宫
    // 仅在非甲时考虑（或者甲时规则未强制指定从中宫开始？这里假设甲时规则优先）
    else if (zhiFuPalace === valueDoorPalace) {
        startPalace = 5;
    }
    // 确定宫位顺序
    // 阳遁顺排：1-2-3-4-5-6-7-8-9
    // 阴遁逆排：9-8-7-6-5-4-3-2-1
    const palaceOrder = isYangdun
        ? [1, 2, 3, 4, 5, 6, 7, 8, 9]
        : [9, 8, 7, 6, 5, 4, 3, 2, 1];
    const startPalaceIdx = palaceOrder.indexOf(startPalace);
    for (let i = 0; i < 9; i++) {
        const currentStem = stems[(stemIndex + i) % 9];
        const palace = palaceOrder[(startPalaceIdx + i) % 9];
        hiddenStems.set(palace, currentStem);
    }
    return hiddenStems;
};
exports.calculateHiddenStems = calculateHiddenStems;
const calculateLiuYiJiXing = (position, tianGan) => {
    // 六仪击刑的判断条件 - 检查指定宫位的天盘天干是否构成击刑
    const liuYiJiXingConditions = [
        { tianGan: '戊', gong: 3, type: '甲子戊', description: '甲子戊+震3宫（子刑卯）' },
        { tianGan: '己', gong: 2, type: '甲戌己', description: '甲戌己+坤2宫（戌刑未）' },
        { tianGan: '庚', gong: 8, type: '甲申庚', description: '甲申庚+艮8宫（申刑寅）' },
        { tianGan: '辛', gong: 9, type: '甲午辛', description: '甲午辛+离9宫（午自刑）' },
        { tianGan: '壬', gong: 4, type: '甲辰壬', description: '甲辰壬+巽4宫（辰自刑）' },
        { tianGan: '癸', gong: 4, type: '甲寅癸', description: '甲寅癸+巽4宫（寅刑巳）' }
    ];
    const condition = liuYiJiXingConditions.find(cond => tianGan === cond.tianGan && position === cond.gong);
    if (condition) {
        return {
            hasJiXing: true,
            type: condition.type,
            description: condition.description
        };
    }
    return { hasJiXing: false };
};
exports.calculateLiuYiJiXing = calculateLiuYiJiXing;
