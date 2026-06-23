declare function describe(name: string, fn: () => void): void;
declare function it(name: string, fn: () => void | Promise<void>): void;
declare function test(name: string, fn: () => void | Promise<void>): void;
declare function beforeAll(fn: () => void | Promise<void>): void;
declare function afterAll(fn: () => void | Promise<void>): void;
declare function beforeEach(fn: () => void | Promise<void>): void;
declare function afterEach(fn: () => void | Promise<void>): void;

interface TestExpect<T> {
  toBe(expected: T): void;
  toEqual(expected: unknown): void;
  toMatchObject(expected: unknown): void;
  toBeDefined(): void;
  toContain(expected: unknown): void;
  toBeInstanceOf(expected: new (...args: any[]) => unknown): void;
  toBeGreaterThan(expected: number): void;
  toThrow(expected?: string | RegExp): void;
}

declare function expect<T>(actual: T): TestExpect<T>;
