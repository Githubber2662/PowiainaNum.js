import P, { newOperator } from "../src/index";

/**
 * Regression tests for the bugs fixed in the "fix-verified-bugs" branch.
 *
 * Expectations follow IEEE 754 `pow` semantics, which is what the rest of the
 * library aims at. The one documented deviation in Node is `Math.pow(1, NaN)`,
 * which returns NaN; IEEE 754 specifies 1 for any exponent, and this library
 * follows IEEE.
 */
describe("pow() guard ordering", () => {
  it("x^0 = 1 for every base, including NaN and the infinities", () => {
    expect(new P(NaN).pow(0).toString()).toBe("1");
    expect(new P(Infinity).pow(0).toString()).toBe("1");
    expect(new P(-Infinity).pow(0).toString()).toBe("1");
    expect(new P(0).pow(0).toString()).toBe("1");
  });

  it("1^y = 1 for every exponent", () => {
    expect(new P(1).pow(NaN).toString()).toBe("1");
    expect(new P(1).pow(Infinity).toString()).toBe("1");
    expect(new P(1).pow(-Infinity).toString()).toBe("1");
  });

  it("(-1)^+-Infinity = 1", () => {
    expect(new P(-1).pow(Infinity).toString()).toBe("1");
    expect(new P(-1).pow(-Infinity).toString()).toBe("1");
  });

  it("NaN propagates, but is overridden by an exponent of 0", () => {
    expect(new P(NaN).pow(2).isNaN()).toBe(true);
    expect(new P(0).pow(NaN).isNaN()).toBe(true);
  });

  it("infinite exponent depends on |base| relative to 1", () => {
    expect(new P(0).pow(Infinity).toString()).toBe("0");
    expect(new P(0).pow(-Infinity).toString()).toBe("Infinity");
    expect(new P(2).pow(Infinity).toString()).toBe("Infinity");
    expect(new P(2).pow(-Infinity).toString()).toBe("0");
    expect(new P(0.5).pow(Infinity).toString()).toBe("0");
    expect(new P(0.5).pow(-Infinity).toString()).toBe("Infinity");
    // An infinite exponent is not an odd integer, so a negative base stays positive.
    expect(new P(-2).pow(Infinity).toString()).toBe("Infinity");
    expect(new P(-0.5).pow(Infinity).toString()).toBe("0");
  });

  it("infinite base with a negative exponent reciprocates to 0", () => {
    expect(new P(Infinity).pow(-2).toString()).toBe("0");
    expect(new P(-Infinity).pow(-2).toString()).toBe("0");
  });

  it("(-Infinity)^y keeps its sign only for odd integer y", () => {
    expect(new P(-Infinity).pow(2).toString()).toBe("Infinity");
    expect(new P(-Infinity).pow(3).toString()).toBe("-Infinity");
    expect(new P(-Infinity).pow(0.5).toString()).toBe("Infinity");
    expect(new P(Infinity).pow(0.5).toString()).toBe("Infinity");
  });
});

describe("pow() with a negative base", () => {
  it("has no real value for a non-integer exponent", () => {
    expect(new P(-2).pow(0.5).isNaN()).toBe(true);
    expect(new P(-4).pow(0.5).isNaN()).toBe(true);
    expect(new P(-2).pow(0.25).isNaN()).toBe(true);
    expect(new P(-8).pow(1 / 3).isNaN()).toBe(true);
    expect(new P(-4).sqrt().isNaN()).toBe(true);
  });

  it("still handles integer exponents", () => {
    expect(new P(-8).pow(3).toString()).toBe(new P(-512).toString());
    expect(new P(-8).pow(2).toString()).toBe(new P(64).toString());
    expect(new P(-2).pow(-2).toString()).toBe(new P(0.25).toString());
    expect(new P(-2).pow(-3).toString()).toBe(new P(-0.125).toString());
    expect(new P(-27).cbrt().toString()).toBe(new P(-3).toString());
  });

  it("still handles positive bases", () => {
    expect(new P(4).sqrt().toString()).toBe(new P(2).toString());
    expect(new P(2).pow(3).toString()).toBe("8");
    expect(new P(10).pow(100).toString()).toBe("e100");
  });
});

describe("shared static constants are not mutated by arithmetic", () => {
  /**
   * pow() used to compute (-x)^y as `let r = abs().pow(y); r.sign = ...`, and
   * abs().pow(y) can return the shared PowiainaNum.ONE singleton whenever the
   * base is 1. Assigning `.sign` therefore corrupted that global constant: after
   * a single (-1)^3 call every later `1`, `x^0` and `P.ONE` came back as -1.
   * These tests pin the constant, not just the immediate result.
   */
  it("(-1)^odd leaves PowiainaNum.ONE intact", () => {
    expect(P.ONE.toString()).toBe("1");
    expect(new P(-1).pow(3).toString()).toBe("-1");
    expect(P.ONE.toString()).toBe("1");
    expect(P.ONE.sign).toBe(1);
  });

  it("(-1)^even leaves PowiainaNum.ONE intact", () => {
    expect(new P(-1).pow(4).toString()).toBe("1");
    expect(P.ONE.toString()).toBe("1");
  });

  it("later results are unaffected by an earlier negative-base power", () => {
    new P(-1).pow(5);
    expect(new P(1).pow(999).toString()).toBe("1");
    expect(new P(7).pow(0).toString()).toBe("1");
    expect(P.ONE.toString()).toBe("1");
    expect(new P(1).toString()).toBe("1");
  });

  it("keeps the other static constants intact too", () => {
    new P(-1).pow(7);
    new P(0).pow(Infinity);
    expect(P.ZERO.toString()).toBe("0");
    expect(new P(0).toString()).toBe("0");
    expect(P.POSITIVE_INFINITY.toString()).toBe("Infinity");
    expect(P.NEGATIVE_INFINITY.toString()).toBe("-Infinity");
  });
});

describe("operator round-tripping", () => {
  it("preserves valuereplaced through the constructor and clone()", () => {
    const source = {
      array: [
        {
          arrow: 0,
          expans: 1,
          megota: 1,
          repeat: 3,
          valuereplaced: 1 as const,
        },
      ],
      small: false,
      sign: 1 as const,
      layer: 0,
    };
    const constructed = new P(source);
    expect(constructed.array[0].valuereplaced).toBe(1);
    expect(constructed.clone().array[0].valuereplaced).toBe(1);
    expect(new P(constructed).array[0].valuereplaced).toBe(1);
  });

  it("keeps valuereplaced from newOperator()", () => {
    const op = newOperator(5, Infinity, 1, 1);
    expect(op.valuereplaced).toBe(0);
    expect(
      new P({ array: [op], small: false, sign: 1, layer: 0 }).clone().array[0]
        .valuereplaced,
    ).toBe(0);
  });
});

describe("toString() output is always re-parseable", () => {
  const samples = [
    "10",
    "1e100",
    "-5",
    "0.5",
    "1e-100",
    "0",
    "1",
    "-1",
    "1e308",
    "1e-308",
    "Infinity",
    "-Infinity",
    "10^^10",
    "10^^^10",
    "10{2}10",
    "10{3}10",
    "10{!}10",
    "10{1,2}10",
    "10{1,514,114}10",
    "/10{1,2}10",
    "ee114514",
    "1e1000000",
    "-1e1000000",
    "P^2 10",
    "P^10 10",
    "1e15",
    "1e16",
  ];

  it.each(samples)("re-parses %s", (source) => {
    const value = new P(source);
    expect(() => new P(value.toString())).not.toThrow();
  });

  /**
   * KNOWN LIMITATION - not fixed on this branch.
   *
   * For values whose operator array was expanded from a layer (e.g. any `P^n x`),
   * toString() -> fromString() does not preserve the value: individual operators
   * come back with different `expans` values and a longer array, so the string
   * grows on every cycle (measured: 313 -> 645 -> 977 chars, value drifting).
   *
   * Root cause: toString_core() renders each operator as `10{arrow,expans,megota}`
   * (with a `(...)^repeat` suffix), but fromString_core() does not read that form
   * back literally - several of its branches re-derive arrow/expans/megota from
   * surrounding context via getOperator()/getOperatorIndex() and rebuild the array
   * around them, and normalize() then re-expands the result differently than the
   * original. Fixing it means making the render/parse pair invertible (and proving
   * it over the whole operator matrix); it is a serialization redesign, not a
   * local patch, so it is deliberately left out of this branch.
   */
  it.skip("preserves value for layered numbers (known failing)", () => {
    const a = new P("P^3 10");
    const b = new P(a.toString());
    expect(a.cmp(b)).toBe(0);
    expect(b.toString().length).toBe(a.toString().length);
  });
});
