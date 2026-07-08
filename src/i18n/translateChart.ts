/**
 * translateChart
 * ---------------
 * `QimenChart.byDatetime()` lưu dữ liệu thô bằng tiếng Trung (甲, 子, 开门, 天蓬...)
 * ngay trong các field của object. `i18n.setLocale()` + `formatPattern()` chỉ dịch
 * phần mô tả cách cục (auspicious/inauspicious patterns), KHÔNG đụng vào các field
 * gốc như `heavenlyStem`, `earthBranch`, `gate`, `star`, `deity`...
 *
 * Hàm này duyệt toàn bộ object `chart` và trả về một bản sao đã được dịch,
 * để `console.log(translateChart(chart, 'vi-VN'))` in ra tiếng Việt.
 */

import { i18n } from './index';
import { formatPattern } from './formatters';
import { Locale } from './types';

// Một vài token "无*" không nằm trong các dict chính (stems/gates/stars/deities...)
// vì chúng là giá trị mặc định/placeholder do QimenChart.ts tự chèn, không phải
// thuật ngữ Kỳ Môn thật sự. Bổ sung fallback riêng ở đây thay vì sửa các file locale.
const NONE_FALLBACK: Partial<Record<Locale, Record<string, string>>> = {
  'vi-VN': { '无': 'Không', '无门': 'Vô Môn', '无神': 'Vô Thần' },
  'en-US': { '无': 'None', '无门': 'No Gate', '无神': 'No Deity' },
  'zh-TW': { '无': '無', '无门': '無門', '无神': '無神' },
  'zh-CN': {},
};

/** Dịch một giá trị (hoặc mảng giá trị) theo một "category" trong locale dict. */
function tr(category: string, val: any, locale: Locale): any {
  if (val === undefined || val === null) return val;
  if (Array.isArray(val)) return val.map((v) => tr(category, v, locale));
  if (typeof val !== 'string') return val;

  const key = `${category}.${val}`;
  const result = i18n.t(key);
  if (result !== key) return result; // dịch thành công

  const fallback = NONE_FALLBACK[locale]?.[val];
  return fallback ?? val; // không tìm thấy -> giữ nguyên giá trị gốc
}

function translateGanZhi(gz: string | undefined, locale: Locale): string | undefined {
  if (!gz || gz.length < 2) return gz;
  const stem = tr('stems', gz[0], locale);
  const branch = tr('branches', gz.slice(1), locale); // phòng trường hợp chuỗi > 2 ký tự
  return `${stem} ${branch}`;
}

function translateTimeInfo(t: any, locale: Locale): any {
  if (!t) return t;
  return {
    ...t,
    chineseYear: translateGanZhi(t.chineseYear, locale),
    chineseMonth: translateGanZhi(t.chineseMonth, locale),
    chineseDay: translateGanZhi(t.chineseDay, locale),
    chineseTime: translateGanZhi(t.chineseTime, locale),
    timeEarthlyBranch: tr('branches', t.timeEarthlyBranch, locale),
    xunShou: translateGanZhi(t.xunShou, locale),
    voidness: Array.isArray(t.voidness) ? t.voidness.map((b: string) => tr('branches', b, locale)) : t.voidness,
    // Ghi chú: `timeName` ("子时"), `solarTerm` ("冬至"), `lunarDate` đến từ thư viện
    // `lunar-typescript` / literal tiếng Trung ngoài phạm vi locale của 3meta,
    // nên tạm giữ nguyên. Muốn dịch nốt thì cần tự bổ sung dict cho các giá trị này.
  };
}

function translateFourPillars(fp: any, locale: Locale): any {
  if (!fp) return fp;
  const one = (pillar: any) =>
    pillar ? { stem: tr('stems', pillar.stem, locale), branch: tr('branches', pillar.branch, locale) } : pillar;
  return { year: one(fp.year), month: one(fp.month), day: one(fp.day), hour: one(fp.hour) };
}

function translateVoidness(v: any, locale: Locale): any {
  if (!v) return v;
  return {
    ...v,
    voidBranches: Array.isArray(v.voidBranches) ? v.voidBranches.map((b: string) => tr('branches', b, locale)) : v.voidBranches,
    palaceBranches: Array.isArray(v.palaceBranches)
      ? v.palaceBranches.map((b: string) => (b === '无' ? NONE_FALLBACK[locale]?.['无'] ?? b : tr('branches', b, locale)))
      : v.palaceBranches,
    voidInPalace: Array.isArray(v.voidInPalace) ? v.voidInPalace.map((b: string) => tr('branches', b, locale)) : v.voidInPalace,
  };
}

function translateGrowthInfo(g: any, locale: Locale): any {
  if (!g) return g;
  const one = (v: any): any => {
    if (Array.isArray(v)) return v.map(one);
    if (v === '无') return NONE_FALLBACK[locale]?.['无'] ?? v;
    return tr('growth', v, locale);
  };
  return {
    heavenlyStem: one(g.heavenlyStem),
    earthlyStem: one(g.earthlyStem),
    timeStem: g.timeStem !== undefined ? one(g.timeStem) : g.timeStem,
    dayStem: g.dayStem !== undefined ? one(g.dayStem) : g.dayStem,
  };
}

function translateTombInfo(t: any, locale: Locale): any {
  if (!t) return t;
  return {
    ...t,
    heavenlyStemInTomb: Array.isArray(t.heavenlyStemInTomb) ? t.heavenlyStemInTomb.map((s: string) => tr('stems', s, locale)) : t.heavenlyStemInTomb,
    earthlyStemInTomb: Array.isArray(t.earthlyStemInTomb) ? t.earthlyStemInTomb.map((s: string) => tr('stems', s, locale)) : t.earthlyStemInTomb,
    tombBranch: t.tombBranch ? tr('branches', t.tombBranch, locale) : t.tombBranch,
  };
}

function translateRelationEntry(e: any, locale: Locale): any {
  if (!e) return e;
  // `formatTenStem` gốc chèn thẳng params thô (chữ Hán) vào template mà không dịch,
  // nên ở đây tự dịch từng tham số (thiên can, ngũ hành, quan hệ) trước khi build câu.
  let description = e.description;
  if (e.id && e.params) {
    const p = e.params;
    description = i18n.t(e.id, {
      ...p,
      h: tr('stems', p.h, locale),
      e: tr('stems', p.e, locale),
      hEle: tr('fiveElements', p.hEle, locale),
      eEle: tr('fiveElements', p.eEle, locale),
      rel: tr('relationships', p.rel, locale),
    });
  }
  return {
    ...e,
    relation: tr('relationships', e.relation, locale),
    description,
  };
}

function translateTenStemResponse(r: any, locale: Locale): any {
  if (!r) return r;
  return {
    heavenlyToEarthly: translateRelationEntry(r.heavenlyToEarthly, locale),
    timeToDay: r.timeToDay ? translateRelationEntry(r.timeToDay, locale) : r.timeToDay,
    heavenlyToDay: r.heavenlyToDay ? translateRelationEntry(r.heavenlyToDay, locale) : r.heavenlyToDay,
  };
}

/** Dịch tên ngắn (name) của 1 cách cục dựa trên field `type` (tên tiếng Trung gốc). */
function translatePatternName(pat: any): string {
  const auspiciousKey = `auspiciousPatterns.${pat.type}`;
  const auspiciousResult = i18n.t(auspiciousKey);
  if (auspiciousResult !== auspiciousKey) return auspiciousResult;

  const inauspiciousKey = `inauspiciousPatterns.${pat.type}`;
  const inauspiciousResult = i18n.t(inauspiciousKey);
  if (inauspiciousResult !== inauspiciousKey) return inauspiciousResult;

  return pat.name;
}

function translatePattern(pat: any): any {
  if (!pat) return pat;
  return {
    ...pat,
    name: translatePatternName(pat),
    description: formatPattern(pat),
  };
}

function translatePalace(p: any, locale: Locale): any {
  if (!p) return p;
  return {
    ...p,
    trigram: tr('trigrams', p.trigram, locale),
    gate: tr('gates', p.gate, locale),
    star: tr('stars', p.star, locale),
    deity: tr('deities', p.deity, locale),
    heavenlyStem: tr('stems', p.heavenlyStem, locale),
    earthlyStem: tr('stems', p.earthlyStem, locale),
    earthBranch: p.earthBranch === '无' ? NONE_FALLBACK[locale]?.['无'] ?? p.earthBranch : tr('branches', p.earthBranch, locale),
    voidness: translateVoidness(p.voidness, locale),
    fiveElements: tr('fiveElements', p.fiveElements, locale),
    status: p.status
      ? {
          star: p.status.star === '无' ? NONE_FALLBACK[locale]?.['无'] ?? p.status.star : tr('status.star', p.status.star, locale),
          gate: p.status.gate === '无' ? NONE_FALLBACK[locale]?.['无'] ?? p.status.gate : tr('status.gate', p.status.gate, locale),
        }
      : p.status,
    innerOuter: tr('innerOuter', p.innerOuter, locale),
    gatePressure: tr('gatePressure', p.gatePressure, locale),
    growthInfo: translateGrowthInfo(p.growthInfo, locale),
    tombInfo: translateTombInfo(p.tombInfo, locale),
    tenStemResponse: translateTenStemResponse(p.tenStemResponse, locale),
    auspiciousPatterns: Array.isArray(p.auspiciousPatterns) ? p.auspiciousPatterns.map(translatePattern) : p.auspiciousPatterns,
    inauspiciousPatterns: Array.isArray(p.inauspiciousPatterns) ? p.inauspiciousPatterns.map(translatePattern) : p.inauspiciousPatterns,
  };
}

function translateSpecialPatterns(sp: any, locale: Locale): any {
  if (!sp) return sp;
  return {
    ...sp,
    menPo: Array.isArray(sp.menPo)
      ? sp.menPo.map((m: any) => {
          // `formatMenPo` gốc không dịch `params.gate`/`gateElement`/`palaceElement`
          // trước khi build câu, nên tự dịch ở đây rồi mới nội suy template.
          let description = m.description;
          if (m.id) {
            const p = m.params || {};
            description = i18n.t(m.id, {
              ...p,
              gate: p.gate !== undefined ? tr('gates', p.gate, locale) : p.gate,
              gateElement: p.gateElement !== undefined ? tr('fiveElements', p.gateElement, locale) : p.gateElement,
              palaceElement: p.palaceElement !== undefined ? tr('fiveElements', p.palaceElement, locale) : p.palaceElement,
            });
          }
          return {
            ...m,
            gate: tr('gates', m.gate, locale),
            gatePressure: tr('gatePressure', m.gatePressure, locale),
            description,
          };
        })
      : sp.menPo,
    auspiciousPatterns: Array.isArray(sp.auspiciousPatterns) ? sp.auspiciousPatterns.map(translatePattern) : sp.auspiciousPatterns,
    inauspiciousPatterns: Array.isArray(sp.inauspiciousPatterns) ? sp.inauspiciousPatterns.map(translatePattern) : sp.inauspiciousPatterns,
  };
}

/**
 * Dịch toàn bộ object `chart` (kết quả của `QimenChart.byDatetime(...)`) sang locale
 * chỉ định, trả về một object thuần (plain object) mới — không sửa đổi `chart` gốc.
 *
 * Dùng cho trường hợp muốn `console.log(...)` hoặc lưu JSON và thấy tiếng Việt ngay,
 * thay vì phải tự gọi `formatPattern()` cho từng field.
 *
 * @example
 * import { QimenChart, translateChart } from '3meta';
 *
 * const chart = QimenChart.byDatetime('2023-12-01 12:00:00');
 * console.log(translateChart(chart, 'vi-VN'));
 */
function translateChart(chart: any, locale: Locale): any {
  const previousLocale = i18n.getLocale();
  i18n.setLocale(locale);
  try {
    return {
      version: chart.version,
      timeInfo: translateTimeInfo(chart.timeInfo, locale),
      fourPillars: translateFourPillars(chart.fourPillars, locale),
      ju: chart.ju ? { type: tr('dunType', chart.ju.type, locale), number: chart.ju.number } : chart.ju,
      yuan: tr('yuan', chart.yuan, locale),
      season: tr('season', chart.season, locale),
      monthElement: tr('fiveElements', chart.monthElement, locale),
      zhiFu: chart.zhiFu
        ? { star: tr('stars', chart.zhiFu.star, locale), position: chart.zhiFu.position, heavenlyStem: tr('stems', chart.zhiFu.heavenlyStem, locale) }
        : chart.zhiFu,
      zhiShi: chart.zhiShi ? { gate: tr('gates', chart.zhiShi.gate, locale), position: chart.zhiShi.position } : chart.zhiShi,
      postHorse: chart.postHorse ? { ...chart.postHorse, branch: tr('branches', chart.postHorse.branch, locale) } : chart.postHorse,
      palaces: Array.isArray(chart.palaces) ? chart.palaces.map((p: any) => translatePalace(p, locale)) : chart.palaces,
      hiddenStems:
        chart.hiddenStems instanceof Map
          ? Object.fromEntries(Array.from(chart.hiddenStems.entries()).map(([k, v]: any) => [k, tr('stems', v, locale)]))
          : chart.hiddenStems,
      specialPatterns: translateSpecialPatterns(chart.specialPatterns, locale),
    };
  } finally {
    i18n.setLocale(previousLocale); // không làm rò rỉ locale global ra ngoài phạm vi hàm
  }
}

export { translateChart as default };