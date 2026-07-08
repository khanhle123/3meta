/**
 * i18n 国际化主入口
 */
import { Locale, LocaleMessages, NestedKeyOf } from './types';
declare class I18n {
    private locale;
    private messages;
    constructor();
    /**
     * 设置当前语言
     */
    setLocale(locale: Locale): void;
    /**
     * 获取当前语言
     */
    getLocale(): Locale;
    /**
     * 获取所有可用语言
     */
    getAvailableLocales(): Locale[];
    /**
     * 翻译单个键
     * @param key 支持嵌套路径，如 'stems.甲', 'gates.开门', 'fields.position'
     * @param params 模板参数（可选）
     */
    t(key: NestedKeyOf<LocaleMessages> | (string & {}), params?: Record<string, any>): string;
    /**
     * 注册自定义语言包
     */
    registerLocale(locale: Locale, messages: LocaleMessages): void;
    /**
     * 获取当前语言包
     */
    getCurrentMessages(): LocaleMessages;
}
/**
 * 全局 i18n 实例
 */
export declare const i18n: I18n;
/**
 * 导出类型
 */
export * from './types';
export { zhCN } from './locales/zh-CN';
export { zhTW } from './locales/zh-TW';
export { enUS } from './locales/en-US';
export { viVN } from './locales/vi-VN';
export * from './formatters';
