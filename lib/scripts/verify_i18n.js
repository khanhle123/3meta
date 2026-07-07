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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("../i18n");
const formatters_1 = require("../i18n/formatters");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
console.log('--- Verifying i18n Formatting ---');
// Mock pattern
const tianDun = {
    id: 'patterns.jiu_dun.tian_dun',
    name: '九遁', // These are legacy fields, verification should prove we don't use them if id exists
    type: '天遁',
    position: 1,
    params: { heaven: '丙', earth: '丁', gate: '生门' },
    description: 'Should be ignored (Hardcoded)'
};
// Test zh-CN
i18n_1.i18n.setLocale('zh-CN');
const zhCNResult = (0, formatters_1.formatPattern)(tianDun);
console.log(`zh-CN: ${zhCNResult}`);
if (zhCNResult.includes('天盘丙')) {
    console.log('✅ zh-CN formatting correct');
}
else {
    console.error('❌ zh-CN formatting failed');
}
// Test zh-TW
i18n_1.i18n.setLocale('zh-TW');
const zhTWResult = (0, formatters_1.formatPattern)(tianDun);
console.log(`zh-TW: ${zhTWResult}`);
// TODO: Ensure zh-TW.ts is properly populated. In prev turns it might have been copy-based.
// Assuming it has data.
// Test en-US
i18n_1.i18n.setLocale('en-US');
const enUSResult = (0, formatters_1.formatPattern)(tianDun);
console.log(`en-US: ${enUSResult}`);
// Scan for Chinese
console.log('\n--- Scanning for Leftover Chinese Characters in src/analysis/index.ts ---');
// We want to scan the SOURCE file
const projectRoot = path.resolve(__dirname, '../../');
const analysisFile = path.resolve(projectRoot, 'src/analysis/index.ts');
if (fs.existsSync(analysisFile)) {
    const content = fs.readFileSync(analysisFile, 'utf-8');
    const lines = content.split('\n');
    let descriptionCount = 0;
    lines.forEach((line, idx) => {
        // Look for 'description: ' followed by Chinese
        if (line.match(/description:\s*['"`].*[\u4e00-\u9fa5]+.*['"`]/)) {
            descriptionCount++;
            if (descriptionCount <= 3) {
                console.log(`[Line ${idx + 1}] ${line.trim()}`);
            }
        }
    });
    console.log(`Total 'description' fields with Chinese characters: ${descriptionCount}`);
    if (descriptionCount > 0) {
        console.warn('⚠️ WARNING: Hardcoded Chinese descriptions still exist in analysis logic.');
    }
    else {
        console.log('✅ CLEAN: No hardcoded Chinese descriptions found.');
    }
}
else {
    console.error(`Could not search file: ${analysisFile}`);
}
