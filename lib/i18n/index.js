"use strict";
/**
 * i18n 国际化主入口
 */
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
exports.translateChart = exports.viVN = exports.enUS = exports.zhTW = exports.zhCN = exports.i18n = void 0;
const zh_CN_1 = require("./locales/zh-CN");
const zh_TW_1 = require("./locales/zh-TW");
const en_US_1 = require("./locales/en-US");
const vi_VN_1 = require("./locales/vi-VN");
class I18n {
    constructor() {
        this.locale = 'zh-CN';
        this.messages = {
            'zh-CN': zh_CN_1.zhCN,
            'zh-TW': zh_TW_1.zhTW,
            'en-US': en_US_1.enUS,
            'vi-VN': vi_VN_1.viVN,
        };
    }
    /**
     * 设置当前语言
     */
    setLocale(locale) {
        if (this.messages[locale]) {
            this.locale = locale;
        }
        else {
            console.warn(`[i18n] Locale "${locale}" not found, using default "zh-CN"`);
            this.locale = 'zh-CN';
        }
    }
    /**
     * 获取当前语言
     */
    getLocale() {
        return this.locale;
    }
    /**
     * 获取所有可用语言
     */
    getAvailableLocales() {
        return Object.keys(this.messages);
    }
    /**
     * 翻译单个键
     * @param key 支持嵌套路径，如 'stems.甲', 'gates.开门', 'fields.position'
     * @param params 模板参数（可选）
     */
    t(key, params) {
        const keys = key.split('.');
        let value = this.messages[this.locale];
        for (const k of keys) {
            value = value === null || value === void 0 ? void 0 : value[k];
            if (value === undefined)
                break;
        }
        // 如果是对象，尝试获取 name 字段
        if (typeof value === 'object' && value !== null && 'name' in value) {
            value = value.name;
        }
        // 模板替换
        if (typeof value === 'string' && params) {
            return value.replace(/\{(\w+)\}/g, (_, k) => params[k] || '');
        }
        return typeof value === 'string' ? value : key;
    }
    /**
     * 注册自定义语言包
     */
    registerLocale(locale, messages) {
        this.messages[locale] = messages;
    }
    /**
     * 获取当前语言包
     */
    getCurrentMessages() {
        return this.messages[this.locale];
    }
}
/**
 * 全局 i18n 实例
 */
exports.i18n = new I18n();
/**
 * 导出类型
 */
__exportStar(require("./types"), exports);
var zh_CN_2 = require("./locales/zh-CN");
Object.defineProperty(exports, "zhCN", { enumerable: true, get: function () { return zh_CN_2.zhCN; } });
var zh_TW_2 = require("./locales/zh-TW");
Object.defineProperty(exports, "zhTW", { enumerable: true, get: function () { return zh_TW_2.zhTW; } });
var en_US_2 = require("./locales/en-US");
Object.defineProperty(exports, "enUS", { enumerable: true, get: function () { return en_US_2.enUS; } });
var vi_VN_2 = require("./locales/vi-VN");
Object.defineProperty(exports, "viVN", { enumerable: true, get: function () { return vi_VN_2.viVN; } });
__exportStar(require("./formatters"), exports);
var translateChart_1 = require("./translateChart");
Object.defineProperty(exports, "translateChart", { enumerable: true, get: function () { return translateChart_1.translateChart; } });
