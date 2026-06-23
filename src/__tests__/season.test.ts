import { QimenChart } from '../qimen/QimenChart';
import { getSeasonByMonthBranch, getMonthElementByBranch } from '../analysis';

// 八门九星旺衰按月建（节气历）月支判定：寅卯=春, 巳午=夏, 申酉=秋, 亥子=冬, 辰戌丑未=四季月。
// 「阳历没有这种说法」——不能用公历月份。
describe('季节判定（旺衰用，按月建月支）', () => {
  it('getSeasonByMonthBranch 按月支五行正确归季', () => {
    expect(getSeasonByMonthBranch('寅')).toBe('春');
    expect(getSeasonByMonthBranch('卯')).toBe('春');
    expect(getSeasonByMonthBranch('巳')).toBe('夏');
    expect(getSeasonByMonthBranch('午')).toBe('夏');
    expect(getSeasonByMonthBranch('申')).toBe('秋');
    expect(getSeasonByMonthBranch('酉')).toBe('秋');
    expect(getSeasonByMonthBranch('亥')).toBe('冬');
    expect(getSeasonByMonthBranch('子')).toBe('冬');
    // 四土月 → 四季月（曾经的 bug：子被当正月→春、戌被当冬）
    expect(getSeasonByMonthBranch('辰')).toBe('四季月');
    expect(getSeasonByMonthBranch('未')).toBe('四季月');
    expect(getSeasonByMonthBranch('戌')).toBe('四季月');
    expect(getSeasonByMonthBranch('丑')).toBe('四季月');
  });

  it('getMonthElementByBranch 返回月支本五行', () => {
    expect(getMonthElementByBranch('寅')).toBe('木');
    expect(getMonthElementByBranch('戌')).toBe('土');
    expect(getMonthElementByBranch('子')).toBe('水');
  });

  it('排盘 season 跟随月建月支而非公历月', () => {
    // 2008-11-04 霜降 → 戌月（寒露至立冬），应为「四季月」，而非公历11月推出的「冬」
    const c1 = QimenChart.byDatetime('2008-11-04T12:30:00', { solarTerm: '霜降', isYangdun: false, juNumber: 2 });
    expect(c1.fourPillars.month.branch).toBe('戌');
    expect(c1.season).toBe('四季月');
    expect(c1.monthElement).toBe('土');

    // 立春前（公历仍是2月初）应仍属丑月 → 四季月，而非「春」
    const c2 = QimenChart.byDatetime('2024-02-02T12:00:00');
    expect(c2.fourPillars.month.branch).toBe('丑');
    expect(c2.season).toBe('四季月');

    // 立春后 → 寅月 → 春
    const c3 = QimenChart.byDatetime('2024-02-10T12:00:00');
    expect(c3.fourPillars.month.branch).toBe('寅');
    expect(c3.season).toBe('春');
  });
});
