import { AuspiciousPattern, EarthlyBranch, FiveElements, FourPillars, Gate, GatePressure, HeavenlyStem, InauspiciousPattern, Palace, PostHorse, Season, Star, StarStatus, GateStatus, TwelveGrowth, XunShou, Position, TenStemResponse } from '../qimen-types';
export declare const getSeasonByMonthBranch: (branch: EarthlyBranch) => Season;
export declare const getMonthElementByBranch: (branch: EarthlyBranch) => FiveElements;
export declare const getInnerOuter: (isYangdun: boolean, position: Position) => "\u5185\u76D8" | "\u5916\u76D8" | "\u65E0";
export declare const buildVoidness: (xunShou: XunShou, palaceBranches: EarthlyBranch | EarthlyBranch[] | "\u65E0") => {
    voidBranches: [EarthlyBranch, EarthlyBranch];
    palaceBranches: string[];
    voidInPalace: string[];
    hasVoidness: boolean;
};
export declare const getPostHorse: (timeBranch: EarthlyBranch) => PostHorse;
export declare const calcGrowth: (stems: HeavenlyStem | HeavenlyStem[] | "\u65E0", palaceBranches: EarthlyBranch | EarthlyBranch[] | "\u65E0") => TwelveGrowth | TwelveGrowth[] | "无";
export declare const calcTombInfo: (heavenlyStems: HeavenlyStem | HeavenlyStem[] | "\u65E0", earthlyStems: HeavenlyStem | HeavenlyStem[] | "\u65E0", palaceBranches: EarthlyBranch | EarthlyBranch[] | "\u65E0", timeStem?: HeavenlyStem, dayStem?: HeavenlyStem) => {
    heavenlyStemInTomb: HeavenlyStem[];
    earthlyStemInTomb: HeavenlyStem[];
    timeStemInTomb: boolean;
    dayStemInTomb: boolean;
    tombBranch: EarthlyBranch | undefined;
};
export declare const calcTenStemResponse: (heavenly: HeavenlyStem | HeavenlyStem[] | "\u65E0", earthly: HeavenlyStem | HeavenlyStem[] | "\u65E0", timeStem?: HeavenlyStem, dayStem?: HeavenlyStem) => TenStemResponse;
export declare const calcGatePressure: (gate: Gate | "\u65E0\u95E8", palaceElement: FiveElements) => GatePressure | "\u65E0";
export declare const calcStatus: (star: Star | Star[] | "\u5929\u79BD" | string, gate: Gate | "\u65E0\u95E8", season: Season) => {
    star: StarStatus | "\u65E0";
    gate: GateStatus | "\u65E0";
};
export declare const detectPatterns: (palace: Palace, zhiShiGate: Gate, fourPillars: FourPillars) => {
    auspicious: AuspiciousPattern[];
    inauspicious: InauspiciousPattern[];
};
export declare const detectGlobalPatterns: (fourPillars: FourPillars) => {
    auspicious: AuspiciousPattern[];
    inauspicious: InauspiciousPattern[];
};
export declare const calcMenPo: (palace: Palace, gatePressure: GatePressure | "\u65E0") => {
    position: Position;
    gate: Gate;
    gatePressure: "迫" | "制";
    id: string;
    params: {
        gate: Gate;
        palace: Position;
        gateElement: FiveElements;
        palaceElement: FiveElements;
    };
    description: string;
} | undefined;
