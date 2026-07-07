"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GONG_NAME = exports.PALACE_FIVE_ELEMENTS = exports.STAR_FIVE_ELEMENTS = exports.GATE_FIVE_ELEMENTS = exports.BRANCH_FIVE_ELEMENTS = exports.STEM_FIVE_ELEMENTS = exports.BRANCH_TRIPLE_HARMONY = exports.BRANCH_CONFLICT = exports.POST_HORSE_MAP = exports.XUN_SHOU_VOIDNESS = exports.PALACE_BRANCHES = exports.PALACE_POSITIONS = exports.PALACE_COUNTER_CLOCKWISE = exports.PALACE_CLOCKWISE = exports.GATE_SEQUENCE = exports.STAR_SEQUENCE = exports.DEITIES = exports.GATE_ORIGINAL_POSITIONS = exports.STAR_ORIGINAL_POSITIONS = exports.LIUJIA_XUN = exports.SANQI_LIUYI = exports.YINDUN_JIEQI = exports.YANGDUN_JIEQI = exports.XIAYUAN = exports.ZHONGYUAN = exports.SHANGYUAN = exports.JIAZI = exports.DIZHI = exports.TIANGAN = exports.QimenChart = void 0;
var QimenChart_1 = require("./qimen/QimenChart");
Object.defineProperty(exports, "QimenChart", { enumerable: true, get: function () { return QimenChart_1.QimenChart; } });
__exportStar(require("./qimen-types"), exports);
__exportStar(require("./analysis"), exports);
__exportStar(require("./i18n"), exports);
var constants_1 = require("./data/constants");
Object.defineProperty(exports, "TIANGAN", { enumerable: true, get: function () { return constants_1.TIANGAN; } });
Object.defineProperty(exports, "DIZHI", { enumerable: true, get: function () { return constants_1.DIZHI; } });
Object.defineProperty(exports, "JIAZI", { enumerable: true, get: function () { return constants_1.JIAZI; } });
Object.defineProperty(exports, "SHANGYUAN", { enumerable: true, get: function () { return constants_1.SHANGYUAN; } });
Object.defineProperty(exports, "ZHONGYUAN", { enumerable: true, get: function () { return constants_1.ZHONGYUAN; } });
Object.defineProperty(exports, "XIAYUAN", { enumerable: true, get: function () { return constants_1.XIAYUAN; } });
Object.defineProperty(exports, "YANGDUN_JIEQI", { enumerable: true, get: function () { return constants_1.YANGDUN_JIEQI; } });
Object.defineProperty(exports, "YINDUN_JIEQI", { enumerable: true, get: function () { return constants_1.YINDUN_JIEQI; } });
Object.defineProperty(exports, "SANQI_LIUYI", { enumerable: true, get: function () { return constants_1.SANQI_LIUYI; } });
Object.defineProperty(exports, "LIUJIA_XUN", { enumerable: true, get: function () { return constants_1.LIUJIA_XUN; } });
Object.defineProperty(exports, "STAR_ORIGINAL_POSITIONS", { enumerable: true, get: function () { return constants_1.STAR_ORIGINAL_POSITIONS; } });
Object.defineProperty(exports, "GATE_ORIGINAL_POSITIONS", { enumerable: true, get: function () { return constants_1.GATE_ORIGINAL_POSITIONS; } });
Object.defineProperty(exports, "DEITIES", { enumerable: true, get: function () { return constants_1.DEITIES; } });
Object.defineProperty(exports, "STAR_SEQUENCE", { enumerable: true, get: function () { return constants_1.STAR_SEQUENCE; } });
Object.defineProperty(exports, "GATE_SEQUENCE", { enumerable: true, get: function () { return constants_1.GATE_SEQUENCE; } });
Object.defineProperty(exports, "PALACE_CLOCKWISE", { enumerable: true, get: function () { return constants_1.PALACE_CLOCKWISE; } });
Object.defineProperty(exports, "PALACE_COUNTER_CLOCKWISE", { enumerable: true, get: function () { return constants_1.PALACE_COUNTER_CLOCKWISE; } });
Object.defineProperty(exports, "PALACE_POSITIONS", { enumerable: true, get: function () { return constants_1.PALACE_POSITIONS; } });
Object.defineProperty(exports, "PALACE_BRANCHES", { enumerable: true, get: function () { return constants_1.PALACE_BRANCHES; } });
Object.defineProperty(exports, "XUN_SHOU_VOIDNESS", { enumerable: true, get: function () { return constants_1.XUN_SHOU_VOIDNESS; } });
Object.defineProperty(exports, "POST_HORSE_MAP", { enumerable: true, get: function () { return constants_1.POST_HORSE_MAP; } });
Object.defineProperty(exports, "BRANCH_CONFLICT", { enumerable: true, get: function () { return constants_1.BRANCH_CONFLICT; } });
Object.defineProperty(exports, "BRANCH_TRIPLE_HARMONY", { enumerable: true, get: function () { return constants_1.BRANCH_TRIPLE_HARMONY; } });
Object.defineProperty(exports, "STEM_FIVE_ELEMENTS", { enumerable: true, get: function () { return constants_1.STEM_FIVE_ELEMENTS; } });
Object.defineProperty(exports, "BRANCH_FIVE_ELEMENTS", { enumerable: true, get: function () { return constants_1.BRANCH_FIVE_ELEMENTS; } });
Object.defineProperty(exports, "GATE_FIVE_ELEMENTS", { enumerable: true, get: function () { return constants_1.GATE_FIVE_ELEMENTS; } });
Object.defineProperty(exports, "STAR_FIVE_ELEMENTS", { enumerable: true, get: function () { return constants_1.STAR_FIVE_ELEMENTS; } });
Object.defineProperty(exports, "PALACE_FIVE_ELEMENTS", { enumerable: true, get: function () { return constants_1.PALACE_FIVE_ELEMENTS; } });
Object.defineProperty(exports, "GONG_NAME", { enumerable: true, get: function () { return constants_1.GONG_NAME; } });
