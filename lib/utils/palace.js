"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixIndex = exports.findPalaceByBranch = exports.getBranchIndex = exports.getCounterClockwisePalaces = exports.getClockwisePalaces = void 0;
const constants_1 = require("../data/constants");
const getClockwisePalaces = (startPos) => {
    const idx = constants_1.PALACE_CLOCKWISE.indexOf(startPos);
    if (idx === -1)
        return [...constants_1.PALACE_CLOCKWISE];
    return [...constants_1.PALACE_CLOCKWISE.slice(idx), ...constants_1.PALACE_CLOCKWISE.slice(0, idx)];
};
exports.getClockwisePalaces = getClockwisePalaces;
const getCounterClockwisePalaces = (startPos) => {
    const idx = constants_1.PALACE_COUNTER_CLOCKWISE.indexOf(startPos);
    if (idx === -1)
        return [...constants_1.PALACE_COUNTER_CLOCKWISE];
    return [...constants_1.PALACE_COUNTER_CLOCKWISE.slice(idx), ...constants_1.PALACE_COUNTER_CLOCKWISE.slice(0, idx)];
};
exports.getCounterClockwisePalaces = getCounterClockwisePalaces;
const getBranchIndex = (branch) => {
    const branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    return branches.indexOf(branch);
};
exports.getBranchIndex = getBranchIndex;
const findPalaceByBranch = (branch) => {
    return Object.keys(constants_1.PALACE_BRANCHES).find((p) => constants_1.PALACE_BRANCHES[p].includes(branch));
};
exports.findPalaceByBranch = findPalaceByBranch;
const fixIndex = (index, max = 12) => {
    let result = index % max;
    if (result < 0)
        result += max;
    return result;
};
exports.fixIndex = fixIndex;
