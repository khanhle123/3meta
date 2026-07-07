import { QimenChart as IQimenChart, Palace, FourPillars, TimeInfo, Yuan, JuType, Position, HeavenlyStem } from '../qimen-types';
/**
 * 版权信息接口
 */
export interface CopyrightInfo {
    library: string;
    version: string;
    author: string;
    license: string;
    repository: string;
    homepage: string;
    generatedAt: string;
}
export declare class QimenChart implements IQimenChart {
    /**
     * 版权信息（静态）
     */
    private static readonly COPYRIGHT;
    version: string;
    timeInfo: TimeInfo;
    fourPillars: FourPillars;
    ju: JuType;
    yuan: Yuan;
    season: any;
    monthElement: any;
    zhiFu: {
        star: any;
        position: any;
        heavenlyStem: any;
    };
    zhiShi: {
        gate: any;
        position: any;
    };
    postHorse: any;
    palaces: Palace[];
    specialPatterns: any;
    hiddenStems: Map<Position, HeavenlyStem>;
    static byDatetime(datetime: string | Date, opts?: {
        solarTerm?: string;
        isYangdun?: boolean;
        juNumber?: number;
        yearDivide?: 'normal' | 'exact';
    }): QimenChart;
    /**
     * 快捷方法：直接用公历年月日时分秒生成排盘
     */
    static fromSolar(yyyy: number, MM: number, dd: number, hh?: number, mm?: number, ss?: number, opts?: {
        solarTerm?: string;
        isYangdun?: boolean;
        juNumber?: number;
        yearDivide?: 'normal' | 'exact';
    }): QimenChart;
    /**
     * 获取版权信息
     */
    static getCopyright(): CopyrightInfo;
    /**
     * 转换为 JSON 对象（包含版权信息和暗干）
     */
    toJSON(): any;
}
export default QimenChart;
