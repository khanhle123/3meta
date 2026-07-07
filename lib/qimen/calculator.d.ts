import { Deity, Gate, HeavenlyStem, Palace, Position, Star, XunShou, Yuan } from '../qimen-types';
export declare const getXunShou: (ganzhi: string) => XunShou;
export declare const getYuan: (riGanZhi: string) => Yuan;
export declare const getJuShu: (jieqi: string, yuan: Yuan, isYangdun: boolean) => number;
export declare const arrangeDiPan: (juShu: number, isYangdun: boolean) => Map<Position, HeavenlyStem>;
export declare const getZhiFuInfo: (xunShou: XunShou, diPan: Map<Position, HeavenlyStem>) => {
    star: Star;
    position: Position;
    heavenlyStem: HeavenlyStem;
};
export declare const getZhiFuLuoGong: (shiGanZhi: string, xunShou: XunShou, diPan: Map<Position, HeavenlyStem>) => {
    position: Position;
    timeStem: HeavenlyStem;
};
export declare const getZhiShiInfo: (shiZhi: string, zhiFuGong: Position, isYangdun: boolean) => {
    gate: Gate;
    position: Position;
    rawPosition: Position;
};
export declare const arrangeTianPan: (zhiFuStar: Star, zhiFuLuoGong: Position, diPan: Map<Position, HeavenlyStem>) => Map<Position, {
    star: Star;
    heavenlyStem: HeavenlyStem;
}>;
export declare const arrangeDeities: (zhiFuLuoGong: Position, isYangdun: boolean) => Map<Position, Deity>;
export declare const handleMiddlePalace: (isYangdun: boolean, palaces: Palace[]) => Palace[];
export declare const arrangeGates: (zhiShiGong: Position, zhiShiGate: Gate) => Map<Position, Gate>;
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
export declare const calculateHiddenStems: (valueDoorPalace: Position, hourStem: HeavenlyStem, isYangdun: boolean, originalHourStem: HeavenlyStem, zhiFuPalace: Position, diPan: Map<Position, HeavenlyStem>) => Map<Position, HeavenlyStem>;
export declare const calculateLiuYiJiXing: (position: Position, tianGan: HeavenlyStem) => {
    hasJiXing: boolean;
    type?: "\u7532\u5B50\u620A" | "\u7532\u620C\u5DF1" | "\u7532\u7533\u5E9A" | "\u7532\u5348\u8F9B" | "\u7532\u8FB0\u58EC" | "\u7532\u5BC5\u7678";
    description?: string;
};
