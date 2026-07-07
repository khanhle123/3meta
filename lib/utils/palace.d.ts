import { EarthlyBranch, Position } from '../qimen-types';
export declare const getClockwisePalaces: (startPos: Position) => Position[];
export declare const getCounterClockwisePalaces: (startPos: Position) => Position[];
export declare const getBranchIndex: (branch: EarthlyBranch) => number;
export declare const findPalaceByBranch: (branch: EarthlyBranch) => Position | undefined;
export declare const fixIndex: (index: number, max?: number) => number;
