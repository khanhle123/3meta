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
import { Locale } from './types';
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
export declare function translateChart(chart: any, locale: Locale): any;
export default translateChart;
