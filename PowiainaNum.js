(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.PowiainaNum = {}));
})(this, (function (exports) { 'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }
  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  /* Author: VeryrrDefine 0.2.16*/
  //#endregion
  //#region constants
  var powiainaNumError = "[PowiainaNum 0.2 error]";
  var MSI = 9007199254740991;
  var MSI_LOG10 = 15.954589770191003;
  var MSI_REC = 1.1102230246251568e-16;
  var LONG_STRING_MIN_LENGTH = 17;
  var EXP_E_REC = 1.444667861009766;
  var isPowiainaNum = /^(PN)?[\/\-\+]*(Infinity|NaN|(P+|P\^\d+ )?(10(\^+|\{([1-9]\d*|!)(,([1-9]\d*|!))?(,[1-9]\d*)?\})|\(10(\^+|\{([1-9]\d*|!)(,([1-9]\d*|!))?(,[1-9]\d*)?\})\)\^[1-9]\d*\x20*)*((\d+(\.\d*)?|\d*\.\d+)?([Ee][-\+]*))*(0|\d+(\.\d*)?|\d*\.\d+))$/;
  var BE_REGEX = /^((\d+(\.\d*)?|\d*\.\d+)?([EeFf]([-\+]?)))*(0|\d+(\.\d*)?|\d*\.\d+)$/;
  //#endregion
  //#region some useful functions
  function newOperator(r) {
    var a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var e = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var m = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    return {
      repeat: r,
      arrow: a,
      expans: e,
      megota: m,
      valuereplaced: a == Infinity ? 0 : e == Infinity ? 1 : -1
    };
  }
  function removeCommasOutsideBraces(input) {
    var result = "";
    var inBraces = false;
    for (var i = 0; i < input.length; i++) {
      var _char = input[i];
      if (_char === "{") {
        inBraces = true;
        result += _char;
      } else if (_char === "}") {
        inBraces = false;
        result += _char;
      } else if (_char === ",") {
        // 只有在花括号内部才保留逗号
        if (inBraces) {
          result += _char;
        }
        // 如果在花括号外部，就不添加到结果中（相当于删除）
      } else {
        result += _char;
      }
    }
    return result;
  }
  function isIBreakEternity(obj) {
    if (obj === null || _typeof(obj) !== "object") return false;
    if (!("mag" in obj && typeof obj.mag == "number")) return false;
    if (!("layer" in obj && typeof obj.layer == "number")) return false;
    if (!("sign" in obj && typeof obj.sign == "number")) return false;
    return true;
  }
  // parse 0.1.x PowiainaNum.js string
  function parseLegacyPowiainaNumString(str) {
    var pattern = /l(\d+)\s+s(\d+)\s+a(\[.*\])/;
    var match = str.match(pattern);
    try {
      if (match) {
        return {
          lValue: parseInt(match[1]),
          sValue: parseInt(match[2]),
          array: JSON.parse(match[3])
        };
      }
    } catch (_a) {
      return null;
    }
    return null;
  }
  /**
   * 如果左边小于右边的，返回-1,等于就是0，大于就是1
   * @returns
   */
  function compareTuples() {
    for (var _len = arguments.length, tuples = new Array(_len), _key = 0; _key < _len; _key++) {
      tuples[_key] = arguments[_key];
    }
    for (var i = 0; i < Math.min(tuples[0].length, tuples[1].length); i++) {
      var a = tuples[0][i];
      var b = tuples[1][i];
      if (a < b) return -1;
      if (a > b) return 1;
    }
    return 0;
  }
  function replaceETo10(str) {
    // 使用正则表达式匹配 (e^数字) 的模式
    // 正则解释：\(e\^(\d+)\) 匹配 (e^数字)，其中 \d+ 匹配一个或多个数字
    return str.replace(/\(e\^(\d+)\)/g, "(10^)^$1 ").replace(/(\d+)[Pp][Tt]/g, "(10^)^$1 ");
  }
  /**
   * 把一个字符串很长的数进行以10为底的对数
   * @param str 被进行的字符串
   * @returns 字符串以10为底的对数；
   */
  function log10LongString(str) {
    return Math.log10(Number(str.substring(0, LONG_STRING_MIN_LENGTH))) + (str.length - LONG_STRING_MIN_LENGTH);
  }
  // Code from break_eternity.js
  function f_gamma(n) {
    if (!isFinite(n)) {
      return n;
    }
    if (n < -50) {
      if (n === Math.trunc(n)) {
        return Number.NEGATIVE_INFINITY;
      }
      return 0;
    }
    var scal1 = 1;
    while (n < 10) {
      scal1 = scal1 * n;
      ++n;
    }
    n -= 1;
    var l = 0.9189385332046727; //0.5*Math.log(2*Math.PI)
    l = l + (n + 0.5) * Math.log(n);
    l = l - n;
    var n2 = n * n;
    var np = n;
    l = l + 1 / (12 * np);
    np = np * n2;
    l = l - 1 / (360 * np);
    np = np * n2;
    l = l + 1 / (1260 * np);
    np = np * n2;
    l = l - 1 / (1680 * np);
    np = np * n2;
    l = l + 1 / (1188 * np);
    np = np * n2;
    l = l - 691 / (360360 * np);
    np = np * n2;
    l = l + 7 / (1092 * np);
    np = np * n2;
    l = l - 3617 / (122400 * np);
    return Math.exp(l) / scal1;
  }
  var OMEGA = 0.56714329040978387299997; // W(1, 0)
  //from https://math.stackexchange.com/a/465183
  // The evaluation can become inaccurate very close to the branch point
  // Evaluates W(x, 0) if principal is true, W(x, -1) if principal is false
  function f_lambertw(z) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1e-10;
    var pr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var tol = t;
    var principal = pr;
    var w;
    var wn;
    if (!Number.isFinite(z)) {
      return z;
    }
    if (principal) {
      if (z === 0) {
        return z;
      }
      if (z === 1) {
        return OMEGA;
      }
      if (z < 10) {
        w = 0;
      } else {
        w = Math.log(z) - Math.log(Math.log(z));
      }
    } else {
      if (z === 0) return -Infinity;
      if (z <= -0.1) {
        w = -2;
      } else {
        w = Math.log(-z) - Math.log(-Math.log(-z));
      }
    }
    for (var i = 0; i < 100; ++i) {
      wn = (z * Math.exp(-w) + w * w) / (w + 1);
      if (Math.abs(wn - w) < tol * Math.abs(wn)) {
        return wn;
      } else {
        w = wn;
      }
    }
    throw Error("Iteration failed to converge: ".concat(z.toString())); //return Number.NaN;
  }
  function isTwoLengthArray(x) {
    return x.length == 2;
  }
  function isTwoNumberArray(x) {
    return typeof x[0] === "number" && typeof x[1] === "number";
  }
  function isExpantaNumArray(x) {
    if (!Array.isArray(x)) return false;
    for (var i = 0; i < x.length; i++) {
      var arr = x[i];
      if (!Array.isArray(arr)) return false;
      if (!isTwoLengthArray(arr)) return false;
      if (!isTwoNumberArray(arr)) return false;
    }
    return true;
  }
  function replaceXToInfinity(x) {
    if (x === "x") return Infinity;
    return x;
  }
  function isFourLengthArray(x) {
    return x.length == 4;
  }
  function isFourNumberArray(x) {
    if (typeof x[0] == "number" && typeof x[1] == "number" && typeof x[2] == "number" && typeof x[3] == "number") {
      return true;
    }
    return false;
  }
  function isFourArrayWithFirstTermX(x) {
    if (x[0] === "x" && typeof x[1] == "number" && typeof x[2] == "number" && typeof x[3] == "number") {
      return true;
    }
    return false;
  }
  function isFourArrayWithThirdTermX(x) {
    if (typeof x[0] == "number" && typeof x[1] == "number" && x[2] == "x" && typeof x[3] == "number") {
      return true;
    }
    return false;
  }
  function isPowiainaNum01XArray(x) {
    if (!Array.isArray(x)) return false;
    if (typeof x[0] != "number") return false;
    for (var i = 1; i < x.length; i++) {
      var b = x[i];
      if (!Array.isArray(b)) return false;
      if (!isFourLengthArray(b)) return false;
      if (!isFourNumberArray(b) && !isFourArrayWithFirstTermX(b) && !isFourArrayWithThirdTermX(b)) return false;
    }
    return true;
  }
  function countLeadingZerosAfterDecimal(numStr) {
    var match = numStr.match(/^0\.(0*)[1-9]/);
    return match ? match[1].length : 0;
  }
  /*
  function countLeadingZerosAfterDecimal(numStr) {
      const match = numStr.match(/^0\.(0*)[1-9]/);
      return match ? match[1].length : 0;
  }
  */
  //from https://github.com/scipy/scipy/blob/8dba340293fe20e62e173bdf2c10ae208286692f/scipy/special/lambertw.pxd
  // The evaluation can become inaccurate very close to the branch point
  // at ``-1/e``. In some corner cases, `lambertw` might currently
  // fail to converge, or can end up on the wrong branch.
  // Evaluates W(x, 0) if principal is true, W(x, -1) if principal is false
  function d_lambertw(z) {
    var tol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1e10;
    var principal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    z = new PowiainaNum(z);
    var w;
    if (!z.isFinite()) return z;
    if (principal) {
      if (z.eq(PowiainaNum.ZERO)) return z;
      if (z.eq(PowiainaNum.ONE)) return new PowiainaNum(OMEGA);
      w = PowiainaNum.log(z);
    } else {
      if (z.eq(PowiainaNum.ZERO)) return PowiainaNum.NEGATIVE_INFINITY;
      w = PowiainaNum.log(z.neg());
    }
    for (var i = 0; i < 100; ++i) {
      var ew = w.neg().exp();
      var wewz = w.sub(z.mul(ew));
      var dd = w.add(PowiainaNum.ONE).sub(w.add(2).mul(wewz).div(PowiainaNum.mul(2, w).add(2)));
      if (dd.eq(PowiainaNum.ZERO)) return w;
      var wn = w.sub(wewz.div(dd));
      if (PowiainaNum.abs(wn.sub(w)).lt(PowiainaNum.abs(wn).mul(tol))) return wn;
      w = wn;
    }
    throw Error("Iteration failed to converge: " + z);
  }
  function arraySortFunction(a, b) {
    return compareTuples([a.megota, a.expans, a.arrow], [b.megota, b.expans, b.arrow]);
  }
  /**
   * Merge arrays in arrow,expans,megota is all same.
   * @param x an object has `array` key.
   */
  function mergeSameArrays(x) {
    for (var i = 1; i < x.array.length - 1; ++i) {
      var q = x.array[i];
      var r = x.array[i + 1];
      if (q.arrow == r.arrow && q.expans == r.expans && q.megota == r.megota) {
        // same array's merge
        q.repeat += r.repeat;
        x.array.splice(i + 1, 1);
        --i;
      }
    }
  }
  function arrFracParaInv(x, y, res2) {
    var res = new PowiainaNum(x).pow(new PowiainaNum(res2).sub(y).add(1)).mul(new PowiainaNum(2).pow(new PowiainaNum(y).sub(res2)));
    return res;
  }
  function arrFracPara(x, y, z) {
    var lg2 = new PowiainaNum(2).logBase(x);
    return new PowiainaNum(y).sub(1).add(new PowiainaNum(z).logBase(x).sub(lg2).div(new PowiainaNum(1).sub(lg2)));
  }
  function arrowpsdInv(base, height, res4) {
    var x = new PowiainaNum(base);
    var y = new PowiainaNum(height);
    var z = new PowiainaNum(res4);
    var res = arrFracParaInv(x, y, new PowiainaNum(z).omegalog(x.toNumber()));
    if (z.gt(x)) {
      var add2handled = arrowpsdInv(x, y.add(1), z);
      var handled = add2handled.sub(2);
      var bottom = arrowpsdInv(x, y, x);
      var top = x;
      var anylog2 = handled.pow_base(top.div(bottom)).mul(bottom);
      return arrowpsd(x, y, anylog2);
    }
    return res;
  }
  function arrowpsd(base, height, other) {
    var x = new PowiainaNum(base);
    var y = new PowiainaNum(height);
    var z = new PowiainaNum(other);
    if (y.isInt()) return PowiainaNum.arrow(x, y, z);
    if (z.gt(x)) {
      var anylog2 = arrowpsdInv(x, y, z);
      var bottom = arrowpsdInv(x, y, x);
      var top = x;
      var handled = anylog2.div(bottom).logBase(top.div(bottom));
      return arrowpsd(x, y.add(1), PowiainaNum.add(2, handled));
    }
    return PowiainaNum.arrFrac(x, arrFracPara(x, y, z));
  }
  function log10PosBigInt(input) {
    var exp = BigInt(64);
    while (input >= BigInt(1) << exp) exp *= BigInt(2);
    var expdel = exp / BigInt(2);
    while (expdel > BigInt(0)) {
      if (input >= BigInt(1) << exp) exp += expdel;else exp -= expdel;
      expdel /= BigInt(2);
    }
    var cutbits = exp - BigInt(54);
    var firstbits = input >> cutbits;
    return Math.log10(Number(firstbits)) + Math.LOG10E / Math.LOG2E * Number(cutbits);
  }
  //#endregion
  var arrays = {
    ZERO: [{
      arrow: 0,
      expans: 1,
      megota: 1,
      repeat: Infinity
    }],
    NaN: [{
      arrow: 0,
      expans: 1,
      megota: 1,
      repeat: NaN
    }]
  };
  var PowiainaNum = /*#__PURE__*/function () {
    /**
     * Constructor of PowiainaNum class,
     * If no arguments, return `PowiainaNum.NaN`.
     */
    function PowiainaNum(arg1) {
      _classCallCheck(this, PowiainaNum);
      this.array = arrays.NaN;
      this.small = false;
      this.sign = 0;
      this.layer = 0;
      if (PowiainaNum.blankArgumentConstructorReturnZero) {
        this.array = arrays.ZERO;
        this.small = true;
      }
      if (arg1 !== undefined) {
        try {
          if (typeof arg1 == "undefined") {} else if (typeof arg1 == "number") {
            var obj = PowiainaNum.fromNumber(arg1);
            this.resetFromObject(obj);
          } else if (typeof arg1 == "string") {
            var _obj = PowiainaNum.fromString(arg1);
            this.resetFromObject(_obj);
          } else if (_typeof(arg1) == "object") {
            var _obj2 = PowiainaNum.fromObject(arg1);
            this.resetFromObject(_obj2);
          } else if (typeof arg1 == "bigint") {
            var _obj3 = PowiainaNum.fromBigInt(arg1);
            this.resetFromObject(_obj3);
          } else {
            var isn = arg1;
          }
        } catch (e) {
          console.error("Malformed input");
          console.error(e);
          if (PowiainaNum.throwErrorOnResultNaN && PowiainaNum.isNaN(this)) throw new Error("NaN");
        }
      }
    }
    //#region 4 Basic calculates.
    /**
     * Addition
     * @returns the sum of `this` and `other`
     */
    return _createClass(PowiainaNum, [{
      key: "add",
      value: function add(other) {
        var _a, _b, _c, _d;
        var x = this.normalize();
        var y = new PowiainaNum(other);
        // inf + -inf = nan
        if (x.eq(PowiainaNum.POSITIVE_INFINITY) && y.eq(PowiainaNum.NEGATIVE_INFINITY) || x.eq(PowiainaNum.NEGATIVE_INFINITY) && y.eq(PowiainaNum.POSITIVE_INFINITY)) {
          if (PowiainaNum.throwErrorOnResultNaN) throw new Error("NaN");
          return PowiainaNum.NaN;
        }
        // inf & nan check
        if (!x.isFinite()) return x;
        if (!y.isFinite()) return y;
        // if x or y = 0, return other.
        if (x.isZero()) return y;
        if (y.isZero()) return x;
        // x+ -x = 0
        if (x.sign == -y.sign && function () {
          var a = x.abs();
          var b = y.abs();
          return a.eq(b);
        }()) return PowiainaNum.ZERO;
        // Run pure number calculates in there
        if (x.abs().lt(MSI) && y.abs().lt(MSI)) {
          if (x.abs().gte(MSI_REC) && y.abs().gte(MSI_REC)) return PowiainaNum.fromNumber(x.toNumber() + y.toNumber());
        }
        // calculate anything > e9e15 or <e-9e15, take absval bigger.
        if (x.abs().lt(PowiainaNum.E_MSI_REC) || x.abs().gt(PowiainaNum.E_MSI) || y.abs().lt(PowiainaNum.E_MSI_REC) || y.abs().gt(PowiainaNum.E_MSI)) {
          var _a2 = x.maxabs(y);
          if (x.abs().eq(_a2)) return x;
          if (y.abs().eq(_a2)) return y;
          return y;
        }
        if (x.sign == -1) {
          return x.neg().add(y.neg()).neg();
        }
        // if ((x.sign==1&&y.sign==-1&&x.lt(y.abs()))  ) return y.neg().add(x.neg()).neg();
        var a, b; //a=bigger, b=smaller
        if (x.cmpabs(y) > 0) {
          a = x;
          b = y;
        } else {
          b = x;
          a = y;
        }
        var temp = a.toNumber() + b.toNumber();
        if (isFinite(temp) && temp !== 0) {
          return PowiainaNum.fromNumber(temp);
        }
        var signMult = 1;
        /**Calculate numbers [1, 9e15] (useless) */
        if (!a.small && !b.small && !((_a = a.array[1]) === null || _a === void 0 ? void 0 : _a.repeat) && !((_b = b.array[1]) === null || _b === void 0 ? void 0 : _b.repeat) && a.sign == b.sign) {
          return new PowiainaNum((a.array[0].repeat + b.array[0].repeat) * a.sign);
        }
        // Calculate a & b's 10-logarithm
        var alog10 = (a.small ? -1 : 1) * (((_c = a.array[1]) === null || _c === void 0 ? void 0 : _c.repeat) ? a.array[0].repeat : Math.log10(a.array[0].repeat));
        var blog10 = (b.small ? -1 : 1) * (((_d = b.array[1]) === null || _d === void 0 ? void 0 : _d.repeat) ? b.array[0].repeat : Math.log10(b.array[0].repeat));
        if (alog10 - blog10 > MSI_LOG10) return a;
        /**
         * Offset, a number can make 10^ a+off calculatable not very small or big
         */
        var offset = -Math.floor(alog10); //a number can make a+off in [0,1)
        var resultLogarithm = 0;
        /** 10^(a+off) + 10^(b+off). */
        var offsetedResult = a.sign * Math.pow(10, alog10 + offset) + b.sign * Math.pow(10, blog10 + offset);
        if (offsetedResult > 0) resultLogarithm = Math.log10(offsetedResult) - offset;
        if (offsetedResult < 0) {
          resultLogarithm = Math.log10(-offsetedResult) - offset;
          signMult *= -1;
        }
        if (offsetedResult == 0) return PowiainaNum.ZERO;
        var resultPN = PowiainaNum.NaN;
        resultPN.sign = 1;
        /** abs(resultLogarithm) > 15.9, use 10^x form. */
        if (resultLogarithm > MSI_LOG10 || resultLogarithm < -MSI_LOG10) {
          resultPN.array = [newOperator(resultLogarithm, 0), newOperator(1, 1)];
          /**otherwise, use 10** abs(resultLogarithm) */
        } else {
          resultPN.array = [newOperator(Math.pow(10, Math.abs(resultLogarithm)), 0)];
        }
        resultPN.small = resultLogarithm < 0 ? true : false;
        resultPN.sign *= signMult;
        return resultPN;
      }
    }, {
      key: "plus",
      value: function plus(other) {
        return this.add(other);
      }
    }, {
      key: "sub",
      value: function sub(a) {
        return this.add(new PowiainaNum(a).neg());
      }
    }, {
      key: "minus",
      value: function minus(other) {
        return this.sub(other);
      }
    }, {
      key: "mul",
      value: function mul(other) {
        var x = this;
        var y = new PowiainaNum(other);
        // inf * -inf = -inf
        if (x.eq(PowiainaNum.POSITIVE_INFINITY) && y.eq(PowiainaNum.NEGATIVE_INFINITY) || y.eq(PowiainaNum.POSITIVE_INFINITY) && x.eq(PowiainaNum.NEGATIVE_INFINITY)) return PowiainaNum.NEGATIVE_INFINITY;
        if (x.isInfiNaN() && y.isZero() || y.isInfiNaN() && x.isZero()) {
          if (PowiainaNum.throwErrorOnResultNaN) throw new Error("NaN");
          return PowiainaNum.NaN;
        }
        if (x.eq(PowiainaNum.NEGATIVE_INFINITY) && y.eq(PowiainaNum.NEGATIVE_INFINITY)) return PowiainaNum.POSITIVE_INFINITY;
        // inf & nan check
        if (!x.isFinite()) return x;
        if (!y.isFinite()) return y;
        if (x.isZero() || y.isZero()) return PowiainaNum.ZERO;
        // x* x^-1 = 0
        /* if (x.small==1-y.small&&(function(){
          let a = x.abs();
          let b = y.abs();
          return a.eq(b)
        })()) return (function () {
          let a = new PowiainaNum(1);
          a.sign = x.sign*y.sign as -1|0| 1;
          return a;
        })(); */
        // calculate use number directly using number
        var t = x.toNumber() * y.toNumber();
        if (isFinite(t) && t !== 0) {
          return PowiainaNum.fromNumber(t);
        }
        var r;
        r = x.abs().log10().add(y.abs().log10()).pow10();
        r.sign = x.sign * y.sign;
        return r;
      }
    }, {
      key: "times",
      value: function times(other) {
        return this.mul(other);
      }
    }, {
      key: "div",
      value: function div(other) {
        var x = new PowiainaNum(other).rec();
        return this.mul(x);
      }
    }, {
      key: "divide",
      value: function divide(other) {
        return this.div(other);
      }
    }, {
      key: "mod",
      value: function mod(x) {
        var other = new PowiainaNum(x);
        var division = this.div(other);
        return division.sub(division.floor()).mul(other);
      }
    }, {
      key: "modulus",
      value: function modulus(x) {
        return this.mod(x);
      }
    }, {
      key: "pow10",
      value:
      //#endregion
      //#region power
      /**
       * @returns 10 to the power of `this`
       */
      function pow10() {
        var _a, _b;
        var thisObject = this.clone();
        // inf & nan check
        if (!this.isFinite()) return this;
        /** when 10^(t), t<0, use 10^(-t) reciprocate. */
        if (thisObject.isneg()) {
          // 10^(-x) = 1/(10^x)
          thisObject.sign *= -1;
          return thisObject.pow10().rec();
        }
        /**if t lessthan log10 2^1024, use fromNumber. */
        if (thisObject.lt(308.25471555991675)) {
          return PowiainaNum.fromNumber(Math.pow(10, thisObject.toNumber()));
        }
        /**calculate directly */
        if (thisObject.small) {
          if (thisObject.lt(PowiainaNum.MSI_REC)) return PowiainaNum.ONE;
          return new PowiainaNum(Math.pow(10, Math.pow(thisObject.array[0].repeat, -1)));
        }
        /** indistinguishable above 10^^9e15 */
        if (thisObject.gt(PowiainaNum.TETRATED_MSI)) return thisObject;
        /**otherwise add 10^ directly */
        thisObject.setOperator(((_b = (_a = thisObject.array[1]) === null || _a === void 0 ? void 0 : _a.repeat) !== null && _b !== void 0 ? _b : 0) + 1, 1);
        thisObject.normalize();
        return thisObject;
      }
    }, {
      key: "pow",
      value: function pow(x) {
        var other = new PowiainaNum(x);
        if (this.eq(1)) return PowiainaNum.ONE;
        if (!other.isFinite()) return other;
        if (!this.isFinite()) return this;
        if (this.eq(10)) return other.pow10();
        if (other.isneg()) return this.pow(other.neg()).rec();
        if (this.isneg()) {
          if (!other.isInt()) {
            if (other.small) {
              if (other.rec().div(2).eq(1)) {
                return this.neg().pow(other).neg();
              }
            }
            if (PowiainaNum.throwErrorOnResultNaN) throw new Error("NaN");
            return PowiainaNum.NaN;
          }
          var r = this.abs().pow(other);
          r.sign = function () {
            var a = other.mod(2).round();
            if (a.eq(0) || a.eq(2)) return 1;
            return -1;
          }();
          return r;
        }
        var a = this.toNumber();
        var b = other.toNumber();
        var t = Math.pow(a, b);
        if (isFinite(t) && t !== 0) {
          // optimize?
          return PowiainaNum.fromNumber(t);
        }
        if (this.isZero() && other.isZero()) {
          return PowiainaNum.ONE;
        }
        if (this.isZero()) return PowiainaNum.ZERO;
        if (other.isZero()) return PowiainaNum.ONE;
        // if this<0, check other' rec is oddd
        if (this.gt(0)) {
          // log10(a^b) = b log10(a)
          return this.log10().mul(other).pow10();
        } else if (other.rec().mod(2).eq(1)) {
          return this.neg().log10().mul(other).pow10().neg();
        }
        if (PowiainaNum.throwErrorOnResultNaN) throw new Error("NaN");
        return PowiainaNum.NaN;
      }
    }, {
      key: "pow_base",
      value: function pow_base(x) {
        var a = new PowiainaNum(x);
        return a.pow(this);
      }
    }, {
      key: "root",
      value: function root(x) {
        var other = new PowiainaNum(x);
        return this.pow(other.rec());
      }
    }, {
      key: "sqrt",
      value: function sqrt() {
        return this.pow(0.5);
      }
    }, {
      key: "cbrt",
      value: function cbrt() {
        return this.abs().root(3).mul(this.sign);
      }
    }, {
      key: "log10",
      value: function log10() {
        if (this.isneg()) {
          if (PowiainaNum.throwErrorOnResultNaN) throw new Error("NaN");
          return PowiainaNum.NaN;
        }
        if (this.isZero()) return PowiainaNum.NEGATIVE_INFINITY;
        if (this.small) {
          var _x = this.clone();
          _x.small = !_x.small;
          return _x.log10().neg();
        }
        if (this.array.length == 1) return new PowiainaNum(Math.log10(this.array[0].repeat));
        if (this.gte(PowiainaNum.TETRATED_MSI)) return this;
        var x = this.clone();
        x.array[1].repeat = x.array[1].repeat - 1;
        x.normalize();
        return x;
      }
    }, {
      key: "log",
      value: function log() {
        var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Math.E;
        // log_a b = log_x b / log_x a;
        var other = new PowiainaNum(base);
        return this.log10().div(other.log10());
      }
    }, {
      key: "log2",
      value: function log2() {
        return this.log(2);
      }
    }, {
      key: "logBase",
      value: function logBase(a) {
        return this.log(a);
      }
    }, {
      key: "ln",
      value: function ln() {
        return this.log();
      }
      /**
       * positive-Log10, Returns the base-10 logarithm of nonnegative Decimals, but returns 0 for negative Decimals.
       */
    }, {
      key: "pLog10",
      value: function pLog10() {
        if (this.isneg()) return PowiainaNum.ZERO;
        return this.log10();
      }
      /**
       * positive-Log10
       */
    }, {
      key: "exp",
      value: function exp() {
        return this.pow_base(Math.E);
      }
      //#endregion
      //#region some math functions
      /**
       * For positive integers, X factorial (written as X!) equals X * (X - 1) * (X - 2) *... * 3 * 2 * 1. 0! equals 1.
       * This can be extended to real numbers (except for negative integers) via the gamma function, which is what this function does.
       */
      //[Code from break_eternity.js]
    }, {
      key: "factorial",
      value: function factorial() {
        if (this.abs().lt(MSI)) {
          return this.add(1).gamma();
        } else if (this.abs().lt(PowiainaNum.E_MSI)) {
          return PowiainaNum.exp(this.mul(this.log10().sub(1)));
        } else {
          return PowiainaNum.exp(this);
        }
      }
    }, {
      key: "gamma",
      value:
      /**
       * The gamma function extends the idea of factorials to non-whole numbers using some calculus.
       * Gamma(x) is defined as the integral of t^(x-1) * e^-t dt from t = 0 to t = infinity,
       * and gamma(x) = (x - 1)! for nonnegative integer x, so the factorial for non-whole numbers is defined using the gamma function.
       */
      //[Code from break_eternity.js]
      //from HyperCalc source code
      function gamma() {
        if (this.small) {
          return this.rec();
        } else if (this.lte(MSI)) {
          if (this.lt(24)) {
            return PowiainaNum.fromNumber(f_gamma(this.sign * this.array[0].repeat));
          }
          var t = this.array[0].repeat - 1;
          var l = 0.9189385332046727; //0.5*Math.log(2*Math.PI)
          l = l + (t + 0.5) * Math.log(t);
          l = l - t;
          var n2 = t * t;
          var np = t;
          var lm = 12 * np;
          var adj = 1 / lm;
          var l2 = l + adj;
          if (l2 === l) {
            return PowiainaNum.exp(l);
          }
          l = l2;
          np = np * n2;
          lm = 360 * np;
          adj = 1 / lm;
          l2 = l - adj;
          if (l2 === l) {
            return PowiainaNum.exp(l);
          }
          l = l2;
          np = np * n2;
          lm = 1260 * np;
          var lt = 1 / lm;
          l = l + lt;
          np = np * n2;
          lm = 1680 * np;
          lt = 1 / lm;
          l = l - lt;
          return PowiainaNum.exp(l);
        } else if (this.gt(MSI)) {
          return PowiainaNum.exp(this.mul(this.log().sub(1)));
        } else {
          return PowiainaNum.exp(this);
        }
      }
    }, {
      key: "lambertw",
      value:
      /**
       * The Lambert W function, also called the omega function or product logarithm, is the solution W(x) === x*e^x.
       * https://en.wikipedia.org/wiki/Lambert_W_function
       *
       * This is a multi-valued function in the complex plane, but only two branches matter for real numbers: the "principal branch" W0, and the "non-principal branch" W_-1.
       * W_0 works for any number >= -1/e, but W_-1 only works for nonpositive numbers >= -1/e.
       * The "principal" parameter, which is true by default, decides which branch we're looking for: W_0 is used if principal is true, W_-1 is used if principal is false.
       */
      //Code from break_eternity.js
      //Some special values, for testing: https://en.wikipedia.org/wiki/Lambert_W_function#Special_values
      function lambertw() {
        var princ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var principal = princ;
        if (this.lt(-0.3678794411710499)) {
          if (PowiainaNum.throwErrorOnResultNaN) throw new Error("NaN");
          return PowiainaNum.NaN; //complex
        } else if (principal) {
          if (this.abs().lt("1e-300")) return new PowiainaNum(this);else if (this.small) {
            return PowiainaNum.fromNumber(f_lambertw(this.toNumber()));
          } else if (this.lt(MSI)) {
            return PowiainaNum.fromNumber(f_lambertw(this.sign * this.array[0].repeat));
          } else if (this.lt("eee15")) {
            return d_lambertw(this);
          } else {
            // Numbers this large would sometimes fail to converge using d_lambertw, and at this size this.ln() is close enough
            return this.log();
          }
        } else {
          if (this.sign === -1) {
            if (PowiainaNum.throwErrorOnResultNaN) throw new Error("NaN");
            return PowiainaNum.NaN; //complex
          }
          if (this.lt(9e15)) {
            return PowiainaNum.fromNumber(f_lambertw(this.sign * this.array[0].repeat, 1e-10, false));
          } else if (this.lt(PowiainaNum.E_MSI)) {
            return d_lambertw(this, 1e-10, false);
          } else {
            return this.neg().rec().lambertw().neg();
          }
        }
      }
    }, {
      key: "tetrate",
      value:
      //#endregion
      //#region higher calculates
      //#region Tetration
      // Code from ExpantaNum.js
      function tetrate(other2) {
        var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var t = this;
        var other = new PowiainaNum(other2);
        var payl = new PowiainaNum(payload);
        if (t.isNaN() || other.isNaN() || payl.isNaN()) {
          if (PowiainaNum.throwErrorOnResultNaN) throw new Error("NaN");
          return PowiainaNum.NaN;
        }
        if (t.eq(1)) return PowiainaNum.ONE;
        if (payl.neq(PowiainaNum.ONE) && t.gte(EXP_E_REC)) {
          other = other.add(payl.slog(t));
        }
        var negln;
        if (other.isInfi() && other.sign > 0) {
          if (t.gte(EXP_E_REC)) return PowiainaNum.POSITIVE_INFINITY;
          negln = this.log().neg();
          return negln.lambertw().div(negln);
        }
        if (other.lte(-2)) {
          if (PowiainaNum.throwErrorOnResultNaN) throw new Error("NaN");
          return PowiainaNum.NaN;
        }
        if (t.isZero()) {
          if (other.isZero()) {
            if (PowiainaNum.throwErrorOnResultNaN) throw new Error("NaN");
            return PowiainaNum.NaN;
          }
          if (other.gte(MSI / 2) || other.toNumber() % 2 == 0) return PowiainaNum.ZERO;
          return PowiainaNum.ONE;
        }
        if (t.eq(PowiainaNum.ONE)) {
          if (other.eq(PowiainaNum.ONE.neg())) {
            if (PowiainaNum.throwErrorOnResultNaN) throw new Error("NaN");
            return PowiainaNum.NaN;
          }
          return PowiainaNum.ONE;
        }
        if (other.eq(PowiainaNum.ONE.neg())) return PowiainaNum.ZERO;
        if (other.eq(PowiainaNum.ZERO)) return PowiainaNum.ONE;
        if (other.eq(PowiainaNum.ONE)) return t;
        if (other.eq(2)) return t.pow(t);
        if (t.eq(2)) {
          if (other.eq(3)) return PowiainaNum.fromNumber(16);
          if (other.eq(4)) return PowiainaNum.fromNumber(65536);
        }
        var m = t.max(other);
        if (m.gt(PowiainaNum.PENTATED_MSI)) return m;
        if (m.gt(PowiainaNum.TETRATED_MSI) || other.gt(MSI)) {
          if (this.lt(EXP_E_REC)) {
            negln = t.ln().neg();
            return negln.lambertw().div(negln);
          }
          var j = t.slog(10).add(other);
          j.setOperator(j.getOperator(2) + 1, 2);
          j.normalize();
          return j;
        }
        var y = other.toNumber();
        var f = Math.floor(y);
        var r = t.pow(y - f);
        var l = PowiainaNum.NaN;
        var i = 0;
        for (var w = PowiainaNum.E_MSI; f !== 0 && r.lt(w) && i < 100; ++i) {
          if (f > 0) {
            r = t.pow(r);
            if (l.eq(r)) {
              f = 0;
              break;
            }
            l = r;
            --f;
          } else {
            r = r.log(t);
            if (l.eq(r)) {
              f = 0;
              break;
            }
            l = r;
            ++f;
          }
        }
        if (i == 100 || this.lt(EXP_E_REC)) f = 0;
        r.setOperator(r.getOperator(1) + f, 1);
        r.normalize();
        return r;
      }
    }, {
      key: "tetr",
      value: function tetr(other2) {
        var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        return this.tetrate(other2, payload);
      }
      // Code from ExpantaNum.js
    }, {
      key: "slog",
      value: function slog() {
        var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
        var x = this;
        var b = new PowiainaNum(base);
        if (x.isInfiNaN()) return x;
        if (b.isNaN()) return b;
        if (b.isInfi()) return PowiainaNum.ZERO;
        if (x.isZero()) return PowiainaNum.ONE;
        if (x.eq(PowiainaNum.ONE)) return PowiainaNum.ZERO;
        if (x.eq(b)) return PowiainaNum.ONE;
        if (b.lt(EXP_E_REC)) {
          var a = b.tetrate(Infinity);
          if (x.eq(a)) return PowiainaNum.POSITIVE_INFINITY;
          if (x.gt(a)) {
            if (PowiainaNum.throwErrorOnResultNaN) throw new Error("NaN");
            return PowiainaNum.NaN;
          }
        }
        if (x.max(b).gt(PowiainaNum.PENTATED_MSI)) {
          if (x.gt(b)) return x;
          return PowiainaNum.ZERO;
        }
        if (x.max(b).gt(PowiainaNum.TETRATED_MSI)) {
          if (x.gt(b)) {
            x.setOperator(x.getOperator(2) - 1, 2);
            x.normalize();
            return x.sub(x.getOperator(1));
          }
        }
        if (x.lt(PowiainaNum.ZERO)) return b.pow(x).sub(2);
        // base^base^... = x? (? bases)
        var r = 0;
        // 计算x与base的差距
        var t = x.getOperator(1) - b.getOperator(1);
        if (t > 3) {
          var l = t - 3;
          r += l;
          x.setOperator(x.getOperator(1) - l, 1);
        }
        // 假设b=3， x=1e19
        for (var i = 0; i < 100; ++i) {
          if (x.lt(PowiainaNum.ZERO)) {
            x = PowiainaNum.pow(base, x);
            --r;
          } else if (x.lte(1)) {
            // 第五次，进入此处
            // 结果=4+0.08795395574340908-1=3.087953...
            // 验算3**3**3**(3**.08795395574340908)=10000000000000720000,符合预期
            return new PowiainaNum(r + x.toNumber() - 1);
          } else {
            // 第1-4次迭代，进入此处
            ++r;
            x = PowiainaNum.log(x, base);
            // 第一次：r = 1, x = log_3(1e19) ~ 39.822162211498316
            // 第二次：r = 2, x = log_3(39.822...) ~ 3.353706885314807
            // 第三次：r = 3, x = log_3(3.3537...) ~ 1.1014497830508163
            // 第四次：r = 4, x = log_3(1.1014...) ~ 0.08795395574340908
          }
        }
        if (x.gt(10)) return new PowiainaNum(r);
        if (PowiainaNum.throwErrorOnResultNaN) throw new Error("NaN");
        return PowiainaNum.NaN;
      }
    }, {
      key: "ssqrt",
      value: function ssqrt() {
        var x = this;
        if (x.lt(1 / EXP_E_REC)) {
          if (PowiainaNum.throwErrorOnResultNaN) throw new Error("NaN");
          return PowiainaNum.NaN;
        }
        if (!x.isFinite()) return x;
        if (x.gt(PowiainaNum.TETRATED_MSI)) return x;
        if (x.gt(PowiainaNum.EE_MSI)) {
          x.setOperator(x.getOperator(1) - 1, 1);
          return x;
        }
        // use lambertw
        var l = x.ln();
        return l.div(l.lambertw());
      }
    }, {
      key: "tetrate_10",
      value: function tetrate_10() {
        return PowiainaNum.tetrate(10, this);
      }
    }, {
      key: "iteratedlog",
      value:
      /**
       * iterated-log
       *
       * @example new P("10^10^3").iteratedlog(2,10) == 3
       */
      function iteratedlog() {
        var other2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var base2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
        var t = this;
        var base = new PowiainaNum(base2);
        var other = new PowiainaNum(other2);
        if (other.isZero()) return t;
        if (other.eq(PowiainaNum.ONE)) return t.log(base);
        return base.tetrate(t.slog(base).sub(other));
      }
    }, {
      key: "omegalog",
      value: function omegalog() {
        var bbase = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
        var EPSILON = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1e-6;
        var target = this;
        var dis = target;
        if (dis.isInfiNaN()) return dis;
        if (dis.gte("10{1,2}e15.954589770191003")) return dis;
        var base = new PowiainaNum(bbase);
        if (dis.getOperator(1 / 0) >= 1) {
          dis.setOperator(dis.getOperator(1 / 0) - 1, 1 / 0, 1, 1);
          return dis;
        }
        // if (dis.layer >= 1) {
        // dis.layer -= 1
        // return dis
        // } else
        // // @ts-expect-error
        // if (dis.arr01[dis.array.length - 1][0] >= 98) {
        //   // @ts-expect-error
        //   let zero = new PowiainaNum(dis.array[dis.arr01.length - 1][0]);
        //   return zero;
        // }
        // else
        if (target.lt(PowiainaNum.pentate(base, 2))) {
          return new PowiainaNum(target).anyarrow_log(3)(base);
        }
        // else {
        //   let addTest = 8;
        //   let target = 0;
        //   while (addTest >= 10 ** -10) {
        //     if (PowiainaNum.arrFrac(base, target + addTest).lte(dis)) {
        //       target += addTest;
        //     }
        //     addTest /= 2;
        //   }
        //   return new PowiainaNum(target);
        // }
        if (bbase == 10) {
          var clonedOperators = [];
          for (var i = 0; i < target.array.length; i++) {
            clonedOperators[i] = {
              arrow: target.array[i].arrow,
              expans: target.array[i].expans,
              megota: target.array[i].megota,
              repeat: target.array[i].repeat,
              valuereplaced: target.array[i].valuereplaced
            };
          }
          var _result = PowiainaNum.omegacollect(clonedOperators);
          return new PowiainaNum(_result[1].arrow - 1 + Math.log(_result[0].repeat / 2) / Math.log(5));
        }
        var left = 2;
        var right = 9007199254740991;
        var result = NaN;
        while (left <= right) {
          var mid = Math.floor((left + right) / 2);
          var comparison = PowiainaNum.arrFrac(base, mid).cmp(target);
          if (comparison === 0) {
            return new PowiainaNum(mid);
          } else if (comparison < 0) {
            result = mid;
            left = mid + 1;
          } else {
            right = mid - 1;
          }
          if (Math.abs(left - right) <= EPSILON) {
            return new PowiainaNum(mid);
          }
        }
        return new PowiainaNum(result);
        // if (dis.arr01[dis.array.length - 1][0] >= 98) {
        //   // @ts-expect-error
        //   let zero = new PowiainaNum(dis.array[dis.arr01.length - 1][0]);
        //   return zero;
        // } else if (target.lt(PowiainaNum.pentate(bbase, 2))) {
        //   return new PowiainaNum(target).anyarrow_log(3)(bbase);
        // } else {
        //   let addTest = 8;
        //   let target = 0;
        //   while (addTest >= 10 ** -10) {
        //     if (PowiainaNum.arrFrac(base, target + addTest).lte(dis)) {
        //       target += addTest;
        //     }
        //     addTest /= 2;
        //   }
        //   return new PowiainaNum(target);
        // }
      }
      /**
       * Arrow operation, return a function
       * The function has a parameter `other`
       * call this function returns a powiainanum `this`{`arrow2`}`other`
       * @param arrows2 arrow count
       * @returns A function
       */
    }, {
      key: "arrow",
      value: function arrow(arrows2) {
        var t = this;
        var arrows = new PowiainaNum(arrows2);
        if (arrows.lt(PowiainaNum.ZERO)) {
          console.warn("The arrow is <0 or not a integer, the returned function will return NaN.");
          return function () {
            if (PowiainaNum.throwErrorOnResultNaN) throw new Error("NaN");
            return PowiainaNum.NaN;
          };
        }
        if (!arrows.isInt()) {
          return function (other) {
            return arrowpsd(t, arrows, other);
          };
        }
        if (arrows.eq(0)) return function (other) {
          return t.mul(other);
        };
        if (arrows.eq(1)) return function (other) {
          return t.pow(other);
        };
        if (arrows.eq(2)) return function (other) {
          return t.tetrate(other);
        };
        return function (other2) {
          var payload2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
          var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          var other = new PowiainaNum(other2);
          var payload = new PowiainaNum(payload2);
          var ctt = PowiainaNum.arrowFuncMap.get("".concat(t.toString(), " ").concat(arrows.toString(), " ").concat(other.toString(), " ").concat(depth));
          if (ctt) return ctt;
          var res = function () {
            var calcBase;
            if (t.isNaN() || other.isNaN() || payload.isNaN()) return PowiainaNum.NaN;
            if (other.lt(PowiainaNum.ZERO)) return PowiainaNum.NaN;
            if (t.eq(PowiainaNum.ZERO)) {
              if (other.eq(PowiainaNum.ONE)) return PowiainaNum.ZERO;
              if (PowiainaNum.throwErrorOnResultNaN) throw new Error("NaN");
              return PowiainaNum.NaN;
            }
            if (payload.neq(PowiainaNum.ONE)) other = other.add(payload.anyarrow_log(arrows)(t));
            if (t.eq(PowiainaNum.ONE)) return PowiainaNum.ONE;
            if (other.eq(PowiainaNum.ZERO)) return PowiainaNum.ONE;
            if (other.eq(PowiainaNum.ONE)) return t;
            // arrow > 9e15, that using 10{x}, x=arrow;
            if (arrows.gt(PowiainaNum.MSI)) {
              calcBase = arrows;
              calcBase.setOperator(calcBase.getOperator(Infinity) + 1, Infinity);
              return calcBase;
            }
            var arrowsNum = arrows.toNumber();
            // arrow < 9e15
            // 10{x}2 = 10{x-1}10
            if (other.eq(2)) return t.arrow(arrowsNum - 1)(t, payload, depth + 1);
            if (t.max(other).gt(PowiainaNum.arrowMSI(arrowsNum + 1))) return t.max(other);
            if (t.gt(PowiainaNum.arrowMSI(arrowsNum)) || other.gt(MSI)) {
              if (t.gt(PowiainaNum.arrowMSI(arrowsNum))) {
                calcBase = t;
                calcBase.setOperator(calcBase.getOperator(arrowsNum) - 1, arrowsNum);
                calcBase.normalize();
              } else if (t.gt(PowiainaNum.arrowMSI(arrowsNum - 1))) {
                calcBase = new PowiainaNum(t.getOperator(arrowsNum - 1));
              } else {
                calcBase = PowiainaNum.ZERO;
              }
              var j = calcBase.add(other);
              j.setOperator(j.getOperator(arrowsNum) + 1, arrowsNum);
              j.normalize();
              return j;
            }
            if (depth >= PowiainaNum.maxOps + 10) {
              return new PowiainaNum({
                small: false,
                sign: 1,
                layer: 0,
                array: [newOperator(10, 0), newOperator(1, arrowsNum)]
              });
            }
            var y = other.toNumber();
            var f = Math.floor(y);
            var arrows_m1 = arrows.sub(PowiainaNum.ONE);
            //一般情况计算10{x}y, y-f是0. 因此calcBase会是1.
            calcBase = t.arrow(arrows_m1)(y - f, payload, depth + 1);
            var i = 0;
            for (var m = PowiainaNum.arrowMSI(arrowsNum - 1); f !== 0 && calcBase.lt(m) && i < 100; i++) {
              if (f > 0) {
                calcBase = t.arrow(arrows_m1)(calcBase, payload, depth + 1);
                --f;
              }
            }
            if (i == 100) f = 0;
            calcBase.setOperator(calcBase.getOperator(arrowsNum - 1) + f, arrowsNum - 1);
            calcBase.normalize();
            return calcBase;
          }();
          if (depth < PowiainaNum.maxOps + 10) {
            PowiainaNum.arrowFuncMap.set("".concat(t.toString(), " ").concat(arrows.toString(), " ").concat(other.toString(), " ").concat(depth), res);
          }
          return res;
        };
      }
    }, {
      key: "anyarrow_log",
      value:
      /**
       * return `base`{`arrow2`}`x` = `this` which `x` is.
       *
       * @param arrow2
       * @returns
       */
      function anyarrow_log(arrow2) {
        var x = this;
        var arrow = new PowiainaNum(arrow2);
        var arrowsNum = arrow.toNumber();
        if (arrow.gt(MSI)) {
          throw new Error(powiainaNumError + "Not implemented");
        }
        if (!arrow.isInt() || arrow.lt(0)) return function () {
          if (PowiainaNum.throwErrorOnResultNaN) throw new Error("NaN");
          return PowiainaNum.NaN;
        };
        if (arrow.eq(0)) return function (base) {
          return x.div(base);
        };
        if (arrow.eq(1)) return function (base) {
          return x.log(base);
        };
        if (arrow.eq(2)) return function (base) {
          return x.slog(base);
        };
        if (x.isInfiNaN()) return function () {
          return x;
        };
        return function (base) {
          var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var b = new PowiainaNum(base);
          if (b.isNaN()) return b;
          if (b.isInfi()) return PowiainaNum.ZERO;
          if (x.isZero()) return PowiainaNum.ONE;
          if (x.eq(PowiainaNum.ONE)) return PowiainaNum.ZERO;
          if (x.eq(b)) return PowiainaNum.ONE;
          if (x.max(b).gt(PowiainaNum.arrowMSI(arrowsNum + 1))) {
            if (x.gt(b)) return x;
            return PowiainaNum.ZERO;
          }
          if (x.max(b).gt(PowiainaNum.arrowMSI(arrowsNum))) {
            if (x.gt(b)) {
              x.setOperator(x.getOperator(arrowsNum) - 1, arrowsNum);
              x.normalize();
              return x.sub(x.getOperator(arrowsNum - 1));
            }
          }
          if (x.lt(PowiainaNum.ZERO)) {
            if (PowiainaNum.throwErrorOnResultNaN) throw new Error("NaN");
            return PowiainaNum.NaN;
          }
          // base^base^... = x? (? bases)
          var r = 0;
          // 计算x与base的差距
          var distanceLayerOf = x.getOperator(arrowsNum) - b.getOperator(arrowsNum);
          if (distanceLayerOf > 3) {
            var l = distanceLayerOf - 3;
            r += l;
            x.setOperator(x.getOperator(arrowsNum) - l, arrowsNum);
          }
          // 假设b=3， x=1e19
          for (var i = 0; i < 100; ++i) {
            if (x.lt(PowiainaNum.ZERO)) {
              x = x.arrow(arrowsNum - 1)(base);
              --r;
            } else if (x.lte(1)) {
              return new PowiainaNum(r + x.toNumber() - 1);
            } else {
              // 第1-4次迭代，进入此处
              ++r;
              x = x.anyarrow_log(arrowsNum - 1)(base, depth + 1);
            }
          }
          if (x.gt(10)) return new PowiainaNum(r);
          if (PowiainaNum.throwErrorOnResultNaN) throw new Error("NaN");
          return PowiainaNum.NaN;
        };
      }
    }, {
      key: "omega2log",
      value: function omega2log() {
        var bbase = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
        var EPSILON = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1e-6;
        var target = this;
        var dis = target.clone();
        if (dis.isInfiNaN()) return dis;
        if (dis.gte("10{1,3}e15.954589770191003")) return dis;
        new PowiainaNum(bbase);
        if (dis.getOperator(1 / 0, 2) >= 1) {
          dis.setOperator(dis.getOperator(1 / 0) - 1, 1 / 0, 2, 1);
          return dis;
        }
        // if (dis.layer >= 1) {
        // dis.layer -= 1
        // return dis
        // } else
        // // @ts-expect-error
        // if (dis.arr01[dis.array.length - 1][0] >= 98) {
        //   // @ts-expect-error
        //   let zero = new PowiainaNum(dis.array[dis.arr01.length - 1][0]);
        //   return zero;
        // }
        // else
        if (target.lt(new PowiainaNum(bbase).expansionArrow(3)(2))) {
          return new PowiainaNum(target).expansion_log2(3)(bbase);
        }
        // else {
        //   let addTest = 8;
        //   let target = 0;
        //   while (addTest >= 10 ** -10) {
        //     if (PowiainaNum.arrFrac(base, target + addTest).lte(dis)) {
        //       target += addTest;
        //     }
        //     addTest /= 2;
        //   }
        //   return new PowiainaNum(target);
        // }
        if (bbase == 10) {
          var clonedOperators = [];
          for (var i = 0; i < target.array.length; i++) {
            clonedOperators[i] = {
              arrow: target.array[i].arrow,
              expans: target.array[i].expans,
              megota: target.array[i].megota,
              repeat: target.array[i].repeat,
              valuereplaced: target.array[i].valuereplaced
            };
          }
          var _result2 = PowiainaNum.omegacollect(clonedOperators);
          return new PowiainaNum(_result2[1].arrow - 1 + Math.log(_result2[0].repeat / 2) / Math.log(5));
        }
        var left = 2;
        var right = 9007199254740991;
        var result = NaN;
        while (left <= right) {
          var mid = Math.floor((left + right) / 2);
          var comparison = PowiainaNum.arrw2Frac(bbase, mid).cmp(target);
          if (comparison === 0) {
            return new PowiainaNum(mid);
          } else if (comparison < 0) {
            result = mid;
            left = mid + 1;
          } else {
            right = mid - 1;
          }
          if (Math.abs(left - right) <= EPSILON) {
            return new PowiainaNum(mid);
          }
        }
        return new PowiainaNum(result);
        // if (dis.arr01[dis.array.length - 1][0] >= 98) {
        //   // @ts-expect-error
        //   let zero = new PowiainaNum(dis.array[dis.arr01.length - 1][0]);
        //   return zero;
        // } else if (target.lt(PowiainaNum.pentate(bbase, 2))) {
        //   return new PowiainaNum(target).anyarrow_log(3)(bbase);
        // } else {
        //   let addTest = 8;
        //   let target = 0;
        //   while (addTest >= 10 ** -10) {
        //     if (PowiainaNum.arrFrac(base, target + addTest).lte(dis)) {
        //       target += addTest;
        //     }
        //     addTest /= 2;
        //   }
        //   return new PowiainaNum(target);
        // }
      }
      /**
       * base{height}base
       */
    }, {
      key: "arrow_height_inverse",
      value:
      /**
       * Arrow height inverse (ExpantaNum.js), an alias of `anyarrow_log`
       * @param arrows
       * @returns
       */
      function arrow_height_inverse(arrows) {
        return this.anyarrow_log(arrows);
      }
      /**
       * Arrow w2 height inverse, an alias of `expansion_log2`
       * @param arrows
       * @returns
       */
    }, {
      key: "arrow_w2_height_inverse",
      value: function arrow_w2_height_inverse(arrows) {
        return this.expansion_log2(arrows);
      }
    }, {
      key: "chain",
      value: function chain(other, arrows) {
        return this.arrow(arrows)(other);
      }
    }, {
      key: "pentate",
      value: function pentate(other, payload) {
        return this.arrow(3)(other, payload);
      }
    }, {
      key: "hexate",
      value: function hexate(other, payload) {
        return this.arrow(4)(other, payload);
      }
    }, {
      key: "pent",
      value: function pent(other, payload) {
        return this.arrow(3)(other, payload);
      }
    }, {
      key: "penta_log",
      value: function penta_log() {
        var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
        return this.anyarrow_log(3)(base);
      }
    }, {
      key: "expansion",
      value:
      /**
       * Expansion, which is `this`{{1}}`other2`.
       *
       * Expansion refers to the binary function a{{1}}b = a{a{...a{b}a...}a}a where there are b a's from the center out. It is {a,b,1,2} in BEAF and a{X+1}b in X-Sequence Hyper-Exponential Notation. The notation a{c}b means {a,b,c}, which is a "c + 2"-ated to b, using the bracket operator.
       *
       * @url https://googology.fandom.com/wiki/Expansion
       */
      function expansion(other2) {
        var other = new PowiainaNum(other2);
        var t = this;
        if (other.lt(PowiainaNum.ZERO)) return PowiainaNum.NaN;
        if (other.eq(PowiainaNum.ONE)) return this;
        if (this.eq(PowiainaNum.ONE)) return PowiainaNum.ONE;
        if (this.eq(2)) return new PowiainaNum(4);
        if (other.eq(0)) return PowiainaNum.ONE;
        if (other.gt(0) && other.lt(1) && !other.isInt()) {
          return t.pow(other);
        }
        if (other.gt(1) && other.lt(2) && !other.isInt()) {
          var _y = other.sub(1).pow_base(t);
          if (_y.lt(2)) return PowiainaNum.arrow(t, 3, _y);
          return PowiainaNum.arrFrac(t, _y);
        }
        var calcBase;
        // I don't know is this added partrs work correctly...
        if (t.gt("10{1,2}".concat(MSI)) || other.gt(MSI)) {
          if (t.gt("10{1,2}".concat(MSI))) {
            calcBase = t.clone();
            calcBase.setOperator(calcBase.getOperator(1, 2) - 1, 1, 2);
            calcBase.normalize();
          } else if (t.gt("10{".concat(MSI, "}10"))) {
            calcBase = new PowiainaNum(t.getOperator(Infinity));
          } else {
            calcBase = PowiainaNum.ZERO;
          }
          var j = calcBase.add(other);
          j.setOperator(j.getOperator(1, 2) + 1, 1, 2);
          j.normalize();
          return j;
        }
        var y = other.toNumber() - 1;
        var f = Math.floor(y);
        calcBase = PowiainaNum.expansion(t, 1 + y - f);
        var i = 0;
        for (var m = new PowiainaNum("10{1,2}e15.954589770191003"); f !== 0 && calcBase.lt(m) && i < 100; i++) {
          if (f > 0) {
            calcBase = PowiainaNum.arrFrac(t, calcBase);
            --f;
          }
        }
        calcBase.setOperator(calcBase.getOperator(Infinity) + f, Infinity);
        calcBase.normalize();
        return calcBase;
      }
    }, {
      key: "expansionArrow",
      value: function expansionArrow(arrow2) {
        var arrow = new PowiainaNum(arrow2);
        var t = this;
        if (arrow.lt(0) || !arrow.isInt()) return function () {
          if (PowiainaNum.throwErrorOnResultNaN) throw new Error("NaN");
          return PowiainaNum.NaN;
        };
        if (arrow.eq(0)) return function (other) {
          return t.arrow(other)(t);
        };
        if (arrow.eq(1)) return function (other) {
          return t.expansion(other);
        };
        var arrows = arrow;
        return function (other2) {
          var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var other = new PowiainaNum(other2);
          var r;
          if (t.isNaN() || other.isNaN()) return PowiainaNum.NaN;
          if (other.lt(PowiainaNum.ZERO)) {
            if (PowiainaNum.throwErrorOnResultNaN) throw new Error("NaN");
            return PowiainaNum.NaN;
          }
          if (t.eq(PowiainaNum.ZERO)) {
            if (other.eq(PowiainaNum.ONE)) return PowiainaNum.ZERO;
            if (PowiainaNum.throwErrorOnResultNaN) throw new Error("NaN");
            return PowiainaNum.NaN;
          }
          if (t.eq(PowiainaNum.ONE)) return PowiainaNum.ONE;
          if (other.eq(PowiainaNum.ZERO)) return PowiainaNum.ONE;
          if (other.eq(PowiainaNum.ONE)) return t;
          // arrow > 9e15, that using 10{x,2}, x=arrow;
          if (arrows.gt(PowiainaNum.MSI)) {
            r = arrows;
            r.setOperator(r.getOperator(Infinity, 2) + 1, Infinity, 2);
            return r;
          }
          var arrowsNum = arrows.toNumber();
          // arrow < 9e15
          // 10{x}2 = 10{x-1}10
          if (other.eq(2)) return t.expansionArrow(arrowsNum - 1)(t, depth + 1);
          if (t.max(other).gt("10{".concat(arrowsNum + 1, ",2}").concat(MSI))) return t.max(other);
          if (t.gt("10{".concat(arrowsNum, ",2}").concat(MSI)) || other.gt(MSI)) {
            if (t.gt("10{".concat(arrowsNum, ",2}").concat(MSI))) {
              r = t.clone();
              r.setOperator(r.getOperator(arrowsNum, 2) - 1, arrowsNum, 2);
              r.normalize();
            } else if (t.gt("10{".concat(arrowsNum - 1, ",2}").concat(MSI))) {
              r = new PowiainaNum(t.getOperator(arrowsNum - 1, 2));
            } else {
              r = PowiainaNum.ZERO;
            }
            var j = r.add(other);
            j.setOperator(j.getOperator(arrowsNum, 2) + 1, arrowsNum, 2);
            j.normalize();
            return j;
          }
          if (depth >= PowiainaNum.maxOps + 10) {
            return new PowiainaNum({
              small: false,
              sign: 1,
              layer: 0,
              array: [newOperator(10, 0), newOperator(1, arrowsNum, 2)]
            });
          }
          var y = other.toNumber();
          var f = Math.floor(y);
          var arrows_m1 = arrows.sub(PowiainaNum.ONE);
          r = t.expansionArrow(arrows_m1)(y - f, depth + 1);
          var i = 0;
          for (var m = new PowiainaNum("10{".concat(arrowsNum - 1, ",2}").concat(MSI)); f !== 0 && r.lt(m) && i < 100; i++) {
            if (f > 0) {
              r = t.expansionArrow(arrows_m1)(r, depth + 1);
              --f;
            }
          }
          if (i == 100) f = 0;
          r.setOperator(r.getOperator(arrowsNum - 1, 2) + f, arrowsNum - 1, 2);
          r.normalize();
          return r;
        };
      }
    }, {
      key: "expansion_log_inner",
      value: function expansion_log_inner(base2) {
        var t = this;
        var base = new PowiainaNum(base2);
        if (base.eq(2) && t.gt(4)) return PowiainaNum.NaN;
        if (t.gte("10{2,2}".concat(MSI))) {
          return t;
        }
        if (t.gte("10{1,2}".concat(MSI))) {
          t.setOperator(t.getOperator(1, 2) - 1, 1, 2);
          return t;
        }
        var r = 0;
        var x = t;
        var morexxxoperators = 0;
        if (x.getOperator(1 / 0) >= 10) {
          morexxxoperators = x.getOperator(1 / 0) - 10;
          x.setOperator(10, 1 / 0);
        }
        for (var i = 0; i < 100; ++i) {
          if (x.lt(PowiainaNum.ZERO)) {
            x = PowiainaNum.arrFrac(base, x);
            --r;
          } else if (x.lte(1)) {
            return new PowiainaNum(r + x.toNumber() - 1 + morexxxoperators);
          } else {
            // 第1-4次迭代，进入此处
            ++r;
            x = x.omegalog(base.toNumber());
          }
        }
        if (x.gt(10)) return new PowiainaNum(r + morexxxoperators);
        return x.add(morexxxoperators);
      }
      /**
       * return `base`{{`arrow2`}}`x` = `this` which `x` is.
       *
       * @param arrow2
       * @returns
       */
    }, {
      key: "expansion_log2",
      value: function expansion_log2(arrow2) {
        var x = this.clone();
        var arrow = new PowiainaNum(arrow2);
        var arrowsNum = arrow.toNumber();
        if (arrow.gt(MSI)) {
          throw new Error(powiainaNumError + "Not implemented");
        }
        if (!arrow.isInt() || arrow.lt(1)) return function () {
          if (PowiainaNum.throwErrorOnResultNaN) throw new Error("NaN");
          return PowiainaNum.NaN;
        };
        if (arrow.eq(1)) return function (base) {
          return x.expansion_log_inner(base);
        };
        if (x.isInfiNaN()) return function () {
          return x;
        };
        return function (base) {
          var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var b = new PowiainaNum(base);
          if (b.isNaN()) return b;
          if (b.isInfi()) return PowiainaNum.ZERO;
          if (x.isZero()) return PowiainaNum.ONE;
          if (x.eq(PowiainaNum.ONE)) return PowiainaNum.ZERO;
          if (x.eq(b)) return PowiainaNum.ONE;
          if (x.max(b).gt(PowiainaNum.arrowexpansMSI(arrowsNum + 1))) {
            if (x.gt(b)) return x;
            return PowiainaNum.ZERO;
          }
          if (x.max(b).gt(PowiainaNum.arrowexpansMSI(arrowsNum))) {
            if (x.gt(b)) {
              x.setOperator(x.getOperator(arrowsNum, 2) - 1, arrowsNum, 2);
              x.normalize();
              return x.sub(x.getOperator(arrowsNum - 1, 2));
            }
          }
          if (x.lt(PowiainaNum.ZERO)) {
            if (PowiainaNum.throwErrorOnResultNaN) throw new Error("NaN");
            return PowiainaNum.NaN;
          }
          // base^base^... = x? (? bases)
          var r = 0;
          // 计算x与base的差距
          var distanceLayerOf = x.getOperator(arrowsNum, 2) - b.getOperator(arrowsNum, 2);
          if (distanceLayerOf > 3) {
            var l = distanceLayerOf - 3;
            r += l;
            x.setOperator(x.getOperator(arrowsNum, 2) - l, arrowsNum, 2);
          }
          // 假设b=3， x=1e19
          for (var i = 0; i < 100; ++i) {
            if (x.lt(PowiainaNum.ZERO)) {
              x = x.expansionArrow(arrowsNum - 1)(base);
              --r;
            } else if (x.lte(1)) {
              return new PowiainaNum(r + x.toNumber() - 1);
            } else {
              // 第1-4次迭代，进入此处
              ++r;
              x = x.expansion_log2(arrowsNum - 1)(base, depth + 1);
            }
          }
          if (x.gt(10)) return new PowiainaNum(r);
          if (PowiainaNum.throwErrorOnResultNaN) throw new Error("NaN");
          return PowiainaNum.NaN;
        };
      }
    }, {
      key: "multiExpansion",
      value: function multiExpansion(other) {
        return this.expansionArrow(2)(other);
      }
    }, {
      key: "powerExpansion",
      value: function powerExpansion(other) {
        return this.expansionArrow(3)(other);
      }
    }, {
      key: "explosion",
      value: function explosion(other) {
        return PowiainaNum.BEAF(this, other, 1, 3);
      }
    }, {
      key: "megotion",
      value: function megotion(other) {
        return PowiainaNum.BEAF(this, other, 1, 1, 2);
      }
    }, {
      key: "powiaination",
      value: function powiaination(other) {
        return PowiainaNum.BEAF(this, other, 1, 1, 1, 2);
      }
    }, {
      key: "abs",
      value:
      //#endregion
      //#region comparsion
      function abs() {
        var obj = this.clone();
        if (obj.sign < 0) obj.sign *= -1;
        return obj;
      }
    }, {
      key: "clampMin",
      value:
      /**
       * Restrict a number be not lower than a number
       *
       * It's also an alias of `PowiainaNum.max`.
       * @returns restricted number
       */
      function clampMin() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        return PowiainaNum.max.apply(PowiainaNum, [this].concat(args));
      }
      /**
       * Restrict a number be not higher than a number
       *
       * It's also an alias of `PowiainaNum.min`.
       * @returns restricted number
       */
    }, {
      key: "clampMax",
      value:
      /**
       * Restrict a number be not higher than a number
       *
       * It's also an alias of `PowiainaNum.min`.
       * @returns restricted number
       */
      function clampMax() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }
        return PowiainaNum.min.apply(PowiainaNum, [this].concat(args));
      }
      /**
       * A combination of minimum and maximum: the value returned by clamp is normally 'this', but it won't go below 'min' and it won't go above 'max'.
       * Therefore, if 'this' < 'min', then 'min' is returned, and if 'this' > 'max', then 'max' is returned.
       */
    }, {
      key: "clamp",
      value: function clamp(min, max) {
        return this.max(min).min(max);
      }
    }, {
      key: "max",
      value: function max() {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }
        return PowiainaNum.max.apply(PowiainaNum, [this].concat(args));
      }
    }, {
      key: "min",
      value: function min() {
        for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }
        return PowiainaNum.min.apply(PowiainaNum, [this].concat(args));
      }
      /**
       * Compare what PowiainaNum's absolute value is max
       * @param args
       * @returns absolute value max number's absolute value
       */
    }, {
      key: "maxabs",
      value: function maxabs() {
        for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
          args[_key6] = arguments[_key6];
        }
        var other = args.map(function (x) {
          return new PowiainaNum(x).abs();
        });
        return PowiainaNum.max.apply(PowiainaNum, [this.abs()].concat(_toConsumableArray(other)));
      }
    }, {
      key: "minabs",
      value: function minabs() {
        for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
          args[_key7] = arguments[_key7];
        }
        var other = args.map(function (x) {
          return new PowiainaNum(x).abs();
        });
        return PowiainaNum.min.apply(PowiainaNum, [this.abs()].concat(_toConsumableArray(other)));
      }
    }, {
      key: "cmpabs",
      value: function cmpabs(x) {
        var other = new PowiainaNum(x).abs();
        return this.abs().cmp(other);
      }
      /**
       * -1: `this` is smaller
       * 0: equals
       * 1: `x` is smaller
       * 2: NaN
       */
    }, {
      key: "compare",
      value: function compare(x) {
        var other = new PowiainaNum(x);
        if (this.isNaN() || other.isNaN()) return 2;
        if (this.sign < other.sign) return -1;
        if (this.sign > other.sign) return 1;
        var t = this;
        //this.sign = other.sign
        var allneg = this.sign == -1 && other.sign == -1;
        if (this.small && !other.small) return -1 * (allneg ? -1 : 1);
        if (other.small && !this.small) return 1 * (allneg ? -1 : 1);
        var resultreverse = 1;
        if (this.small && other.small) resultreverse *= -1;
        if (allneg) resultreverse *= -1;
        var result = 0;
        for (var i = 0; this.array.length - 1 - i >= 0 && other.array.length - 1 - i >= 0; i++) {
          var op1 = this.array[this.array.length - 1 - i];
          var op2 = other.array[other.array.length - 1 - i];
          if (op1.repeat === Infinity && op2.repeat === Infinity) {
            if (t.small === other.small) return 0;
            return other.small ? 1 : -1;
          }
          if (op1.repeat === Infinity) {
            result = 1;
            break;
          }
          if (op2.repeat === Infinity) {
            result = -1;
            break;
          }
          var cmp = compareTuples([op1.megota, op1.expans, op1.arrow, op1.repeat], [op2.megota, op2.expans, op2.arrow, op2.repeat]);
          if (cmp == 1) {
            result = 1;
            break;
          } else if (cmp == -1) {
            result = -1;
            break;
          }
        }
        return result * resultreverse + 1 - 1;
      }
    }, {
      key: "cmp",
      value: function cmp(other) {
        return this.compare(other);
      }
    }, {
      key: "eq",
      value: function eq(other) {
        return this.cmp(other) === 0;
      }
    }, {
      key: "neq",
      value: function neq(other) {
        return this.cmp(other) !== 0;
      }
    }, {
      key: "lt",
      value: function lt(other) {
        return this.cmp(other) === -1;
      }
    }, {
      key: "lte",
      value: function lte(other) {
        return this.cmp(other) <= 0;
      }
    }, {
      key: "gt",
      value: function gt(other) {
        return this.cmp(other) == 1;
      }
    }, {
      key: "gte",
      value: function gte(other) {
        var t = this.cmp(other);
        return t == 0 || t == 1;
      }
    }, {
      key: "equals",
      value: function equals(other) {
        return this.eq(other);
      }
    }, {
      key: "notEquals",
      value: function notEquals(other) {
        return this.neq(other);
      }
    }, {
      key: "eq_tolerance",
      value: function eq_tolerance(value) {
        var tolerance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1e-7;
        var dec = new PowiainaNum(value);
        return this.sub(dec).lte(this.max(dec).mul(tolerance));
      }
      //#endregion
      //#region geometry
      /**this function is indistinguishable above 4503599627370496*/
    }, {
      key: "sin",
      value: function sin() {
        var x = this;
        if (x.isneg()) {
          return x.neg().sin().neg();
        }
        var y = x.mod(7074237752028440);
        return PowiainaNum.fromNumber(Math.sin(y.toNumber()));
      }
    }, {
      key: "cos",
      value: function cos() {
        return this.sub(Math.PI / 2).sin();
      }
    }, {
      key: "tan",
      value: function tan() {
        return this.sin().div(this.cos());
      }
    }, {
      key: "cot",
      value: function cot() {
        return this.cos().div(this.sin());
      }
    }, {
      key: "sec",
      value: function sec() {
        return this.cos().rec();
      }
    }, {
      key: "csc",
      value: function csc() {
        return this.sin().rec();
      }
      //#endregion
      //#region neg, rec, floor, ceil, round, trunc, sign
    }, {
      key: "neg",
      value: function neg() {
        var a = this.clone();
        a.sign *= -1;
        a.normalize();
        return a;
      }
    }, {
      key: "rec",
      value: function rec() {
        var a = this.clone();
        a.small = !a.small;
        return a;
      }
    }, {
      key: "recip",
      value: function recip() {
        return this.rec();
      }
    }, {
      key: "reciprocate",
      value: function reciprocate() {
        return this.rec();
      }
    }, {
      key: "floor",
      value: function floor() {
        if (this.isInt()) return this;
        if (this.small) {
          if (this.sign == 1) return PowiainaNum.ZERO;else return PowiainaNum.ONE.neg();
        }
        var r = this.abs();
        r.array[0].repeat = Math[this.sign == 1 ? "floor" : "ceil"](r.getOperator(0));
        r.sign = this.sign;
        return r;
      }
    }, {
      key: "ceil",
      value: function ceil() {
        if (this.isInt()) return this;
        if (this.small) {
          if (this.sign == 1) return PowiainaNum.ONE;else return PowiainaNum.ZERO;
        }
        var r = this.abs();
        r.array[0].repeat = Math[this.sign == 1 ? "ceil" : "floor"](r.getOperator(0));
        r.sign = this.sign;
        return r;
      }
    }, {
      key: "round",
      value: function round() {
        if (this.isInt()) return this;
        if (this.small) {
          if (this.sign == 1) {
            if (this.rec().lte(2)) return PowiainaNum.ONE;else return PowiainaNum.ZERO;
          } else {
            if (this.abs().rec().lte(2)) return PowiainaNum.ZERO;else return PowiainaNum.ONE.neg();
          }
        }
        var r = this.abs();
        r.array[0].repeat = Math.round(r.array[0].repeat);
        r.sign = this.sign;
        return r;
      }
    }, {
      key: "trunc",
      value:
      /**
       * Work like `Math.trunc`,
       *
       * if `this > 0`, return `floor(this)`
       *
       * if `this < 0`, return `ceil(this)`
       *
       * @example
       * new PowiainaNum(3.3).trunc() == new PowiainaNum(3)
       * new PowiainaNum(-1.114514).trunc() == new PowiainaNum(-1)
       * @returns
       */
      function trunc() {
        var y = this;
        return y.gte(0) ? y.floor() : y.ceil();
      }
    }, {
      key: "isNaN",
      value: function (_isNaN) {
        function isNaN() {
          return _isNaN.apply(this, arguments);
        }
        isNaN.toString = function () {
          return _isNaN.toString();
        };
        return isNaN;
      }(
      //#endregion
      //#region judge-numbers
      function () {
        return isNaN(this.array[0].repeat);
      })
    }, {
      key: "isZero",
      value: function isZero() {
        return Boolean(this.small && !isFinite(this.array[0].repeat));
      }
    }, {
      key: "isFinite",
      value: function (_isFinite) {
        function isFinite() {
          return _isFinite.apply(this, arguments);
        }
        isFinite.toString = function () {
          return _isFinite.toString();
        };
        return isFinite;
      }(function () {
        return Boolean(this.small || isFinite(this.array[0].repeat)) && !this.isNaN();
      })
    }, {
      key: "isInfi",
      value: function isInfi() {
        return this.rec().isZero();
      }
    }, {
      key: "isInfiNaN",
      value: function isInfiNaN() {
        return this.isInfi() || this.isNaN();
      }
    }, {
      key: "isInt",
      value: function isInt() {
        if (this.isZero()) return true;
        if (!this.small && Number.isInteger(this.array[0].repeat)) return true;
        if (this.abs().gte(MSI / 2)) return true;
        return false;
      }
    }, {
      key: "ispos",
      value: function ispos() {
        return this.sign > 0;
      }
    }, {
      key: "isneg",
      value: function isneg() {
        return this.sign < 0;
      }
    }, {
      key: "getOperatorIndex",
      value:
      /**
       * @returns number will return the index of the operator in array. return as x.5 if it's between the xth and x+1th operators.
       */
      function getOperatorIndex(arrow) {
        var expans = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var megota = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        return PowiainaNum.opGetOperatorIndex(this.array, arrow, expans, megota);
      }
      /**
       * @returns number repeats of operators with given arguments.
       */
    }, {
      key: "getOperator",
      value:
      /**
       * @returns number repeats of operators with given arguments.
       */
      function getOperator(arrow) {
        var expans = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var megota = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        return PowiainaNum.opGetOperator(this.array, arrow, expans, megota);
      }
      /**
       * Modify the repeat of operator(argument will modified)
       * @param number val the repeat of operator will modify to array.
       * @returns bool Is the operators array changed?
       */
    }, {
      key: "setOperator",
      value:
      /**
       * Modify the repeat of operator
       * @param number val the repeat of operator will modify to array.
       * @returns bool Is the operators array changed?
       */
      function setOperator(val, arrow) {
        var expans = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var megota = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
        return PowiainaNum.opSetOperator(this.array, val, arrow, expans, megota);
      }
      //#endregion
      //#region converters
      /**
       * Convert `this` to Javascript `number`
       *
       * returns `Infinity` when the number is greater than `Number.MAX_VALUE`
       */
    }, {
      key: "toNumber",
      value: function toNumber() {
        if (this.sign == -1) return -this.neg().toNumber();
        if (this.small) return 1 / this.rec().toNumber();
        if (this.gte("e308.25471555991675")) return Infinity;
        if (this.array.length == 1) return this.array[0].repeat;else if (this.array.length == 2 && this.array[1].arrow == 1 && this.array[1].expans == 1 && this.array[1].megota == 1 && this.array[1].repeat == 1) return Math.pow(10, this.array[0].repeat);
        return NaN;
      }
      /**
       * Convert `this` to a string
       */
    }, {
      key: "toString_core",
      value: function toString_core() {
        if (this.isNaN()) return "NaN";
        if (this.sign == -1) return "-".concat(this.neg().toString());
        if (this.small) {
          if (this.isZero()) return "0";
          return "/".concat(this.rec().toString());
        }
        if (this.isInfi()) return "Infinity";
        // P^a (10{arrow,expans,megota})^repeation base
        var res = "";
        if (!this.layer) res += "";else if (this.layer < 3) res += "P".repeat(this.layer);else res += "P^" + this.layer + " ";
        for (var i = this.array.length - 1; i >= 0; i--) {
          var oper = this.array[i];
          var calc = "10{".concat(oper.arrow === Infinity ? "!" : oper.arrow).concat(oper.expans > 1 || oper.megota > 1 ? ",".concat(oper.expans === Infinity ? "!" : oper.expans) : "").concat(oper.megota > 1 ? ",".concat(oper.megota) : "", "}");
          if (oper.arrow == 1 && oper.expans == 1 && oper.megota == 1 && oper.repeat < 5) {
            calc = "e".repeat(oper.repeat);
          } else if (oper.arrow == 0 && oper.expans == 1 && oper.megota == 1) {
            calc = oper.repeat.toString();
          } else if (oper.repeat > 1) {
            calc = "(".concat(calc, ")^").concat(oper.repeat, " ");
          } else {
            calc = "".concat(calc);
          }
          res += "".concat(calc);
        }
        return res;
      }
    }, {
      key: "toString",
      value: function toString() {
        try {
          return this.toString_core();
        } catch (_a) {
          console.error("Checked error when converting to string");
          return "NaN";
        }
      }
    }, {
      key: "toJSON",
      value:
      /**
       * Convert `this` to a JSON object
       * @returns a JSON object
       */
      function toJSON() {
        return "PN" + this.toString();
      }
    }, {
      key: "arr01",
      get:
      /**
       * A property array value for version 0.1.x PowiainaNum.
       */
      function get() {
        var res = [0];
        for (var i = 0; i < this.array.length; i++) {
          if (i == 0) res[0] = this.array[i].repeat;else {
            // @ts-ignore
            res[i] = [0, 0, 0, 0];
            // @ts-ignore
            res[i][0] = this.array[i].arrow == Infinity ? "x" : this.array[i].arrow;
            // @ts-ignore
            res[i][1] = this.array[i].repeat;
            // @ts-ignore
            res[i][2] = this.array[i].expans == Infinity ? "x" : this.array[i].expans;
            // @ts-ignore
            res[i][3] = this.array[i].megota;
          }
        }
        return res;
      }
      //#endregion
      //#region useless functions
      /**
       * This function is for NaNe308, if you want to calculate G(x), use this function directly.
       */
    }, {
      key: "normalize",
      value:
      //#endregion
      //#region other functions
      /**
       * Normalize functions will make this number convert into standard format.(it also change `this`, like [].sort)
       * @returns normalized number
       */
      function normalize() {
        //TODO: normalize
        var renormalize = true;
        var x = this;
        if (this.array === undefined) {
          x.array = [newOperator(NaN, 0, 1, 1)];
        }
        if (this.sign === undefined) this.sign = 0;
        if (this.layer === undefined) this.layer = 0;
        for (var i = 0; i < this.array.length; i++) {
          // Check what is infinity
          if (this.array[i].repeat == Infinity) {
            this.array = [{
              arrow: 0,
              expans: 1,
              megota: 1,
              repeat: Infinity
            }];
            this.layer = 0;
            return this;
          }
        }
        for (var _i = 1; _i < x.array.length; ++_i) {
          var e = x.array[_i];
          if (e.arrow === null || e.arrow === undefined) {
            e.arrow = 0;
          }
          if (e.expans === null || e.expans === undefined) {
            e.expans = 1;
          }
          if (e.megota === null || e.megota === undefined) {
            e.megota = 1;
          }
          if (isNaN(e.arrow) || isNaN(e.repeat) || isNaN(e.expans) || isNaN(e.megota)) {
            x.array = [newOperator(NaN, 0, 1, 1)];
            return x;
          }
          if (!isFinite(e.repeat) || !isFinite(e.megota)) {
            x.array = [newOperator(Infinity, 0, 1, 1)];
            return x;
          }
          if (!Number.isInteger(e.arrow)) e.arrow = Math.floor(e.arrow);
          if (!Number.isInteger(e.repeat)) e.repeat = Math.floor(e.repeat);
          if (!Number.isInteger(e.expans)) e.expans = Math.floor(e.expans);
          if (!Number.isInteger(e.megota)) e.megota = Math.floor(e.megota);
        }
        if (!x.array.length) {
          x.small = !x.small;
          x.array = [newOperator(Infinity)]; // if no array set zero
        }
        do {
          renormalize = false;
          // Sort arrays.
          this.array.sort(arraySortFunction);
          for (var _i2 = 1; _i2 < x.array.length - 1; ++_i2) {
            var q = x.array[_i2];
            var r = x.array[_i2 + 1];
            if (q.arrow == r.arrow && q.expans == r.expans && q.megota == r.megota) {
              // same array's merge
              q.repeat += r.repeat;
              x.array.splice(_i2 + 1, 1);
              --_i2;
              renormalize = true;
            }
          }
          for (var _i3 = 1; _i3 < x.array.length; ++_i3) {
            var b = x.array[_i3];
            // If there is a 0 repeat operator, remove it.
            if (b.arrow !== 0 && (b.repeat === 0 || b.repeat === null || b.repeat === undefined)) {
              x.array.splice(_i3, 1);
              --_i3;
              continue;
            }
            // If there is a operator which arrow 0 and brace count >=2
            // replace it as arrow replacement operaotr
            if (b.arrow == 0 && b.expans >= 2) {
              b.arrow = Infinity;
              b.valuereplaced = 0;
              b.expans = b.expans - 1;
            }
          }
          // for any (10{1,2})x, x< MSI turn into:
          // if x = 0 , it's 1
          // if x = 1, it's 10
          // if x = 2, it's 10{10}10
          // if x >= 3, it's 10{!}^x-2 10
          // (10{x})^x 10
          if (x.array.length >= 2 && x.array[0].repeat < MSI && x.array[1].arrow == 1 && x.array[1].expans >= 2) {
            if (x.array[0].repeat == 0) {
              x.array.splice(0, 1, newOperator(1));
              x.array[1].repeat--;
            } else if (x.array[0].repeat == 1) {
              x.array.splice(0, 1, newOperator(10));
              x.array[1].repeat--;
            } else if (x.array[0].repeat == 2) {
              x.array.splice(0, 1, newOperator(10), newOperator(10, 10, x.array[1].expans - 1, x.array[1].megota));
              x.array[2].repeat--;
            } else {
              x.array.splice(0, 1, newOperator(10), newOperator(10, 10, x.array[1].expans - 1, x.array[1].megota), newOperator(x.array[0].repeat - 2, 1 / 0, x.array[1].expans - 1, x.array[1].megota));
              x.array[2].repeat--;
            }
            // x.array[1].arrow = 1;
            // x.array[1].expans++;
            // x.array[0].repeat = x.array[1].repeat;
            // x.array[1].repeat = 1;
            renormalize = true;
          }
          if (x.array.length > PowiainaNum.maxOps) x.array.splice(1, x.array.length - PowiainaNum.maxOps); // max operators check
          // for any 10^a but a <log10(MSI), replace to regular 10^a
          if (this.array.length >= 2 && this.array[1].arrow == 1 && this.array[1].repeat >= 1 && this.array[0].repeat < MSI_LOG10) {
            this.setOperator(this.array[1].repeat - 1, 1);
            this.setOperator(Math.pow(10, this.array[0].repeat), 0);
            renormalize = true;
          }
          // for any a but a > MSI, replace to 10^a.
          if (this.array[0].repeat > MSI && isFinite(this.array[0].repeat)) {
            this.setOperator(this.getOperator(1) + 1, 1);
            this.setOperator(Math.log10(this.array[0].repeat), 0);
            renormalize = true;
          }
          // if an operator megota > MSI, layer++
          if (this.array[this.array.length - 1].megota > MSI) {
            this.layer++;
            this.array = [newOperator(this.array[this.array.length - 1].megota)];
            renormalize = true;
          } else if (this.layer && this.array.length == 1 && this.array[0].arrow === 0) {
            this.layer--;
            this.array = [newOperator(10), newOperator(1, 10, 10, this.array[0].repeat)];
            renormalize = true;
          }
          // for a<1, turn into reciprocate
          if (this.array.length == 1 && this.array[0].repeat < 1) {
            this.array[0].repeat = 1 / this.array[0].repeat;
            this.small = !this.small;
            renormalize = true;
          }
          // for a = 1, small should false.
          if (this.array.length == 1 && this.array[0].repeat == 1 && this.small) {
            this.small = false;
            renormalize = true;
          }
          // for any 10{!}^t x, replace to 10{!}^t-1 10{x}10
          if (this.array.length >= 2 && !isFinite(this.array[1].arrow)) {
            if (this.array[1].repeat > 1) {
              this.array.push(newOperator(this.array[1].repeat - 1, 1 / 0, this.array[1].expans, this.array[1].megota));
              this.array[1].repeat = 1;
              this.array[1].arrow = this.array[0].repeat;
              this.array[0].repeat = 10;
            } else {
              this.array[1].arrow = this.array[0].repeat;
              this.array[0].repeat = 10;
            }
          }
          // for any 10{X>9e15}10 finite, replace into 10{!}X;
          if (this.array.length >= 2 && this.array[1].arrow >= MSI && isFinite(this.array[1].arrow)) {
            this.array[0].repeat = this.array[1].arrow;
            this.array[1] = newOperator(1, Infinity, this.array[1].expans, this.array[1].megota);
          }
          // for any (10{y=finite>=2})^z x x<9e15, convert to (10{y})^(z-1) (10{y-1}^(x-1) 10)
          if (this.array.length >= 2 && this.array[1].arrow >= 2 && this.array[0].repeat < MSI && isFinite(this.array[1].arrow)) {
            var _x2 = this.array[0].repeat;
            var y = this.array[1].arrow;
            var z = this.array[1].repeat;
            this.array[0].repeat = 10;
            this.array.splice(2, 0, newOperator(z - 1, y, this.array[1].expans, this.array[1].megota));
            this.array[1] = newOperator(_x2 - 1, y - 1, this.array[1].expans, this.array[1].megota);
          }
          while (x.array.length >= 2 && x.array[0].repeat == 1 && x.array[1].repeat) {
            // for any 10{X}10{X} 1, turn into 10{X}10
            // [1, [R=sth, A=sth, E=sth, M=sth]]
            if (x.array[1].repeat > 1) {
              x.array[1].repeat--;
            } else {
              x.array.splice(1, 1);
            }
            x.array[0].repeat = 10;
            renormalize = true;
          }
          if (x.array.length >= 2 && x.array.length < PowiainaNum.maxOps && x.array[0].repeat < MSI && x.array[1].arrow >= 2 && x.array[1].repeat > 1 &&
          //10^^^ 10
          isFinite(x.array[1].arrow)) {
            // for any (10{A sample=2})^k 1e9, turn into (10{A})^k-1  (10{A-1})^1e9-1 10
            // But dont convert when a is infinite
            // [1e9, [R=K, A=2, sth, sth]]
            x.array[1].repeat--;
            x.array.splice(1, 0, newOperator(x.array[0].repeat - 1, x.array[1].arrow - 1, x.array[1].expans, x.array[1].megota));
            x.array[0].repeat = 10;
            renormalize = true;
          }
          // for any (10{A=2})^1e16 10, turn into (10{A+1}) 1e16
          if (x.array.length >= 2 && x.array[1].repeat > MSI && x.array[1].arrow !== Infinity) {
            x.array[1].arrow++;
            x.array[0].repeat = x.array[1].repeat;
            x.array[1].repeat = 1;
            renormalize = true;
          }
          // for any (10{x})^1e16 10, turn into (10{1,2}) 1e16
          if (x.array.length >= 2 && x.array[1].repeat > MSI && x.array[1].arrow === Infinity) {
            x.array[1].arrow = 1;
            x.array[1].expans++;
            x.array[0].repeat = x.array[1].repeat;
            x.array[1].repeat = 1;
            renormalize = true;
          }
        } while (renormalize);
        return this;
      }
      /**
       * @returns  a PowiainaNum object which deep copied from `this` object.
       */
    }, {
      key: "clone",
      value: function clone() {
        var obj = new PowiainaNum();
        obj.resetFromObject(this);
        return obj;
      }
      /**
       * Set `this` from a object(deep-copy)
       * @param powlikeObject
       * @returns
       */
    }, {
      key: "resetFromObject",
      value: function resetFromObject(powlikeObject) {
        if (!powlikeObject.array) {
          return;
        }
        this.array = powlikeObject.array.map(function (item) {
          return {
            arrow: item.arrow,
            expans: item.expans,
            megota: item.megota,
            repeat: item.repeat
          };
        });
        this.small = powlikeObject.small;
        this.sign = powlikeObject.sign;
        this.layer = powlikeObject.layer;
        return this;
      }
    }], [{
      key: "add",
      value: function add(t, other) {
        return new PowiainaNum(t).add(other);
      }
    }, {
      key: "plus",
      value: function plus(t, other) {
        return new PowiainaNum(t).add(other);
      }
    }, {
      key: "sub",
      value: function sub(t, other) {
        return new PowiainaNum(t).sub(other);
      }
    }, {
      key: "minus",
      value: function minus(t, other) {
        return new PowiainaNum(t).sub(other);
      }
    }, {
      key: "mul",
      value: function mul(t, other) {
        return new PowiainaNum(t).mul(other);
      }
    }, {
      key: "times",
      value: function times(t, other) {
        return new PowiainaNum(t).mul(other);
      }
    }, {
      key: "div",
      value: function div(t, other) {
        return new PowiainaNum(t).div(other);
      }
    }, {
      key: "divide",
      value: function divide(t, other) {
        return new PowiainaNum(t).div(other);
      }
    }, {
      key: "mod",
      value: function mod(x, y) {
        return new PowiainaNum(x).mod(y);
      }
    }, {
      key: "modulus",
      value: function modulus(x, y) {
        return new PowiainaNum(x).mod(y);
      }
    }, {
      key: "pow",
      value: function pow(t, other) {
        return new PowiainaNum(t).pow(other);
      }
    }, {
      key: "root",
      value: function root(t, other) {
        return new PowiainaNum(t).root(other);
      }
    }, {
      key: "sqrt",
      value: function sqrt(t) {
        return new PowiainaNum(t).sqrt();
      }
    }, {
      key: "cbrt",
      value: function cbrt(t) {
        return new PowiainaNum(t).cbrt();
      }
    }, {
      key: "log10",
      value: function log10(t) {
        return new PowiainaNum(t).log10();
      }
    }, {
      key: "log",
      value: function log(t) {
        var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Math.E;
        return new PowiainaNum(t).log(base);
      }
    }, {
      key: "log2",
      value: function log2(t) {
        return new PowiainaNum(t).log2();
      }
    }, {
      key: "logBase",
      value: function logBase(t) {
        var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Math.E;
        return new PowiainaNum(t).log(base);
      }
    }, {
      key: "pLog10",
      value: function pLog10(t) {
        return new PowiainaNum(t).pLog10();
      }
    }, {
      key: "exp",
      value: function exp(x) {
        var y = new PowiainaNum(x);
        return y.pow_base(Math.E);
      }
    }, {
      key: "factorial",
      value: function factorial(x) {
        return new PowiainaNum(x).factorial();
      }
    }, {
      key: "gamma",
      value: function gamma(x) {
        return new PowiainaNum(x).gamma();
      }
    }, {
      key: "lambertw",
      value: function lambertw(x) {
        var principal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        return new PowiainaNum(x).lambertw(principal);
      }
      //#endregion
      //#region Commonly used functions by game
      // All of these are from break_eternity.js
      /**
       * If you're willing to spend 'resourcesAvailable' and want to buy something
       * with exponentially increasing cost each purchase (start at priceStart,
       * multiply by priceRatio, already own currentOwned), how much of it can you buy?
       * Adapted from Trimps source code.
       *
       * currentOwned >= priceStart*priceRatio^(return value)
       */
    }, {
      key: "affordGeometricSeries",
      value: function affordGeometricSeries(resourcesAvailable, priceStart, priceRatio, currentOwned) {
        return this.affordGeometricSeries_core(new PowiainaNum(resourcesAvailable), new PowiainaNum(priceStart), new PowiainaNum(priceRatio), currentOwned);
      }
    }, {
      key: "affordGeometricSeries_core",
      value: function affordGeometricSeries_core(resourcesAvailable, priceStart, priceRatio, currentOwned) {
        var withNaNProtect = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
        var actualStart = priceStart.mul(priceRatio.pow(currentOwned));
        return resourcesAvailable.div(actualStart).mul(priceRatio.sub(1)).add(1).clampMin(withNaNProtect ? 1 : -Infinity).log10().div(priceRatio.log10()).floor();
      }
      /**
       * How much resource would it cost to buy (numItems) items if you already have currentOwned,
       * the initial price is priceStart and it multiplies by priceRatio each purchase?
       *
       * return value = priceStart*priceRatio^(numItems)
       */
    }, {
      key: "sumGeometricSeries",
      value: function sumGeometricSeries(numItems, priceStart, priceRatio, currentOwned) {
        return this.sumGeometricSeries_core(numItems, new PowiainaNum(priceStart), new PowiainaNum(priceRatio), currentOwned);
      }
    }, {
      key: "sumGeometricSeries_core",
      value: function sumGeometricSeries_core(numItems, priceStart, priceRatio, currentOwned) {
        return priceStart.mul(priceRatio.pow(currentOwned)).mul(PowiainaNum.sub(1, priceRatio.pow(numItems))).div(PowiainaNum.sub(1, priceRatio));
      }
      /**
       * If you're willing to spend 'resourcesAvailable' and want to buy something with additively
       * increasing cost each purchase (start at priceStart, add by priceAdd, already own currentOwned),
       * how much of it can you buy?
       */
    }, {
      key: "affordArithmeticSeries",
      value: function affordArithmeticSeries(resourcesAvailable, priceStart, priceAdd, currentOwned) {
        return this.affordArithmeticSeries_core(new PowiainaNum(resourcesAvailable), new PowiainaNum(priceStart), new PowiainaNum(priceAdd), new PowiainaNum(currentOwned));
      }
    }, {
      key: "affordArithmeticSeries_core",
      value: function affordArithmeticSeries_core(resourcesAvailable, priceStart, priceAdd, currentOwned) {
        // n = (-(a-d/2) + sqrt((a-d/2)^2+2dS))/d
        // where a is actualStart, d is priceAdd and S is resourcesAvailable
        // then floor it and you're done!
        var actualStart = priceStart.add(currentOwned.mul(priceAdd));
        var b = actualStart.sub(priceAdd.div(2));
        var b2 = b.pow(2);
        return b.neg().add(b2.add(priceAdd.mul(resourcesAvailable).mul(2)).sqrt()).div(priceAdd).floor();
      }
      /**
       * How much resource would it cost to buy (numItems) items if you already have currentOwned,
       * the initial price is priceStart and it adds priceAdd each purchase?
       * Adapted from http://www.mathwords.com/a/arithmetic_series.htm
       */
    }, {
      key: "sumArithmeticSeries",
      value: function sumArithmeticSeries(numItems, priceStart, priceAdd, currentOwned) {
        return this.sumArithmeticSeries_core(new PowiainaNum(numItems), new PowiainaNum(priceStart), new PowiainaNum(priceAdd), new PowiainaNum(currentOwned));
      }
    }, {
      key: "sumArithmeticSeries_core",
      value: function sumArithmeticSeries_core(numItems, priceStart, priceAdd, currentOwned) {
        var actualStart = priceStart.add(currentOwned.mul(priceAdd)); // (n/2)*(2*a+(n-1)*d)
        return numItems.div(2).mul(actualStart.mul(2).add(numItems.sub(1).mul(priceAdd)));
      }
    }, {
      key: "tetrate",
      value: function tetrate(t, other2) {
        var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        return new PowiainaNum(t).tetrate(other2, payload);
      }
    }, {
      key: "tetrate_10",
      value: function tetrate_10(other2) {
        return PowiainaNum.fromNumber(10).tetrate(other2);
      }
    }, {
      key: "iteratedlog",
      value: function iteratedlog(t) {
        var other2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var base2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
        return new PowiainaNum(t).iteratedlog(other2, base2);
      }
      //#endregion
      /**
       * Get the base of operators
       */
    }, {
      key: "oBase",
      value: function oBase(operators) {
        return operators[0].repeat;
      }
    }, {
      key: "operatorLevel",
      value: function operatorLevel(operator) {
        if (operator == undefined) return [0, 0, 0];
        if (!Array.isArray(operator)) return [operator.megota, operator.expans, operator.arrow];else {
          return _toConsumableArray(operator);
        }
      }
    }, {
      key: "cmpOperatorLevel",
      value: function cmpOperatorLevel(operator, operator2) {
        return compareTuples(this.operatorLevel(operator), this.operatorLevel(operator2));
      }
    }, {
      key: "higherOmega",
      value: function higherOmega(operator) {
        this.operatorLevel(operator);
        if (!isFinite(operator.expans)) return this.operatorLevel(operator);else if (!isFinite(operator.arrow)) return this.operatorLevel(operator);else {
          return [operator.megota, operator.expans, 1 / 0];
        }
      }
      /**
       * Only works for operators level < ω2.
       */
    }, {
      key: "omegacollect",
      value: function omegacollect(operators) {
        var _a;
        // const result = {
        //   bottom: NaN,
        //   top: NaN,
        // };
        function upgrade2(base) {
          operators[1].arrow++;
          operators[0].repeat = operators[1].repeat + Math.log10(base);
          operators[1].repeat = 1;
        }
        var maxWhile = 1000000;
        while (maxWhile--) {
          var base = PowiainaNum.oBase(operators);
          if (base >= 10) {
            // Bottom upgrade mode: add 10^'s.
            operators[0].repeat = Math.log10(base);
            PowiainaNum.opSetOperator(operators, PowiainaNum.opGetOperator(operators, 1, 1, 1) + 1, 1, 1, 1);
          } else {
            if (operators.length <= 2 && ((_a = operators[1]) === null || _a === void 0 ? void 0 : _a.repeat) == 1) {
              return operators;
            }
            // Operator upgrade mode:
            var nextisOmega = this.cmpOperatorLevel(this.higherOmega(operators[1]), operators[2]) <= 0;
            // some operator will upgrade to 10{!}:
            // first, the 3th operator is >=ω.
            // second, the 2th operator's repeat is 1.
            // third: the 2th operator's arrow >=3 and it's not 10{!}(for converting)
            // fourth, base < 10
            if (nextisOmega && operators[1].repeat == 1 && isFinite(operators[1].arrow) && operators[1].arrow >= 3) {
              operators[0].repeat = operators[1].arrow - 1 + Math.log(operators[0].repeat / 2) / Math.log(5);
              operators[1] = newOperator(1, 1 / 0, operators[1].expans, operators[1].megota);
              mergeSameArrays({
                array: operators
              });
              continue;
            }
            // Check the -2th operator, is repeat >= 2?
            else if (isFinite(operators[1].arrow)) {
              // 如果下一个是omega，而且operators[1].arrow<3的话，强行提到arrow>=3
              if (operators[1].repeat >= 2) {
                upgrade2(base);
              } else if (nextisOmega && operators[1].arrow < 3) {
                upgrade2(base);
              } else if (base !== 1) {
                upgrade2(base);
              } else if (this.cmpOperatorLevel(this.higherOmega(operators[1]), operators[2]) == 1) {
                // -2th repeat = 1, and base = 1, 3rd operator is not higher.
                operators[1].arrow = operators[2].arrow;
              }
              mergeSameArrays({
                array: operators
              });
              continue;
            } else if (!isFinite(operators[1].arrow)) {
              // if an operator is 10{!}, upgrade to a higher level
              // 10{!}3 = 10{1,2}(1+Math.log10(3))
              var infRepeat = operators[1].repeat;
              var baseAfter = infRepeat + Math.log10(base);
              operators[1] = newOperator(1, 1, operators[1].expans + 1, operators[1].megota);
              operators[0].repeat = baseAfter;
              mergeSameArrays({
                array: operators
              });
              continue;
            }
          }
        }
        return operators;
      }
    }, {
      key: "arrow",
      value: function arrow(x, z, y) {
        return new PowiainaNum(x).arrow(z)(y);
      }
    }, {
      key: "arrFrac",
      value: function arrFrac(base, height) {
        if (new PowiainaNum(height).lt(2)) return PowiainaNum.pentate(base, height);
        var b = new PowiainaNum(base);
        var h = new PowiainaNum(height);
        return new PowiainaNum(b).arrow(h.floor().add(1))(b.div(2).pow(h.sub(h.floor())).mul(2));
      }
      /**
       * base{{height}}base
       */
    }, {
      key: "arrw2Frac",
      value: function arrw2Frac(base, height) {
        if (new PowiainaNum(height).lt(2)) return new PowiainaNum(base).expansionArrow(3)(height);
        var b = new PowiainaNum(base);
        var h = new PowiainaNum(height);
        return new PowiainaNum(b).expansionArrow(h.floor().add(1))(b.div(2).pow(h.sub(h.floor())).mul(2));
      }
    }, {
      key: "arrowMSI",
      value: function arrowMSI(arrowsNum) {
        return new PowiainaNum("10{".concat(arrowsNum, "}").concat(MSI));
      }
    }, {
      key: "arrowexpansMSI",
      value: function arrowexpansMSI(arrowsNum) {
        return new PowiainaNum("10{".concat(arrowsNum, ",2}").concat(MSI));
      }
    }, {
      key: "hyper",
      value: function hyper(arr) {
        var z = new PowiainaNum(arr);
        if (z.eq(0)) return function (x, y) {
          return new PowiainaNum(y).eq(0) ? new PowiainaNum(x) : new PowiainaNum(x).add(1);
        };
        if (z.eq(1)) return PowiainaNum.add;else if (z.eq(2)) return PowiainaNum.mul;else if (z.eq(3)) return PowiainaNum.pow;else {
          return function (x, y) {
            return new PowiainaNum(x).arrow(z.sub(2))(y);
          };
        }
      }
    }, {
      key: "pentate",
      value: function pentate(x, other, payload) {
        return new PowiainaNum(x).arrow(3)(other, payload);
      }
    }, {
      key: "hexate",
      value: function hexate(x, other, payload) {
        return new PowiainaNum(x).arrow(4)(other, payload);
      }
    }, {
      key: "pent",
      value: function pent(x, other, payload) {
        return new PowiainaNum(x).arrow(3)(other, payload);
      }
    }, {
      key: "penta_log",
      value: function penta_log(x) {
        var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
        return new PowiainaNum(x).anyarrow_log(3)(base);
      }
    }, {
      key: "expansion",
      value: function expansion(t, other) {
        return new PowiainaNum(t).expansion(other);
      }
    }, {
      key: "multiExpansion",
      value: function multiExpansion(t, other) {
        return new PowiainaNum(t).multiExpansion(other);
      }
    }, {
      key: "powerExpansion",
      value: function powerExpansion(t, other) {
        return new PowiainaNum(t).powerExpansion(other);
      }
    }, {
      key: "BEAF",
      value: function BEAF() {
        for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
          args[_key8] = arguments[_key8];
        }
        function getArgs(x) {
          if (args[x] !== undefined && args[x] !== null) return new PowiainaNum(args[x]);
          return new PowiainaNum(1);
        }
        if (getArgs(0).eq(1)) return new PowiainaNum(1);
        if (getArgs(1).eq(1)) return new PowiainaNum(getArgs(0));
        if (getArgs(5).eq(2) && (getArgs(4).gte(2) || getArgs(3).gte(2) || getArgs(2).gte(2))) return PowiainaNum.POSITIVE_INFINITY;
        if (args.slice(6).map(function (x) {
          return new PowiainaNum(x);
        }).filter(function (x) {
          return x.gt(1);
        }).length !== 0) return PowiainaNum.POSITIVE_INFINITY;
        return PowiainaNum.BEAF_core(getArgs(0), getArgs(1), getArgs(2), getArgs(3), getArgs(4), getArgs(5));
      }
    }, {
      key: "BEAF_core",
      value: function BEAF_core(base2, power2) {
        var arrow2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var expans2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
        var megota2 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
        var powiaina2 = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
        var depth = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
        // console.warn(
        //   "This function is unstable when calculating numbers greater than *megotion*",
        // );
        var base = new PowiainaNum(base2);
        var power = new PowiainaNum(power2);
        function readArg(a) {
          var _a;
          return new PowiainaNum((_a = [arrow2, expans2, megota2, powiaina2][a]) !== null && _a !== void 0 ? _a : 1);
        }
        if (base.eq(1)) return new PowiainaNum(1);
        if (power.eq(1)) return new PowiainaNum(base);
        if (power.isZero()) return new PowiainaNum(1);
        if (base.lt(0)) {
          if (PowiainaNum.throwErrorOnResultNaN) throw new Error("NaN");
          return PowiainaNum.NaN;
        }
        // // check infinite
        // let sufpowiaina = args.slice(4);
        // if (sufpowiaina.filter((f) => new PowiainaNum(f).gte(2)).length > 0) {
        //   return PowiainaNum.POSITIVE_INFINITY;
        // }
        if (new PowiainaNum(powiaina2).gte(3)) return PowiainaNum.POSITIVE_INFINITY;
        if (readArg(0).eq(0) && readArg(1).eq(1) && readArg(2).eq(1)) {
          return base.mul(power);
        }
        if (readArg(0).eq(1) && readArg(1).eq(1) && readArg(2).eq(1)) {
          return base.pow(power);
        }
        if (readArg(0).eq(2) && readArg(1).eq(1) && readArg(2).eq(1) && readArg(3).eq(1)) {
          return base.tetrate(power);
        }
        if (readArg(1).eq(1) && readArg(2).eq(1) && readArg(3).eq(1)) {
          return base.arrow(readArg(0))(power);
        }
        if (readArg(1).eq(2) && readArg(2).eq(1) && readArg(3).eq(1)) {
          return base.expansionArrow(readArg(0))(power);
        }
        var arrow = readArg(0).toNumber();
        var expans = readArg(1);
        var megota = readArg(2);
        var powiaina = readArg(3);
        if (powiaina.eq(2)) {
          if (arrow != 1) return PowiainaNum.POSITIVE_INFINITY;
          if (expans.neq(1)) return PowiainaNum.POSITIVE_INFINITY;
          if (megota.neq(1)) return PowiainaNum.POSITIVE_INFINITY;
          if (power.gte(MSI)) return PowiainaNum.POSITIVE_INFINITY;
          var r = new PowiainaNum(10);
          r.layer = power.toNumber();
          r.normalize();
          return r;
        }
        function convertOperator(arrows, expans, megota) {
          var a = arrows;
          var e = expans;
          var m = megota;
          if (a == 0 && e > 1) {
            return [1 / 0, e - 1, m];
          }
          if (a == 0 && e == 1 && m > 1) {
            return [1, 1 / 0, m - 1];
          }
          return [a, e, m];
        }
        if (megota.gt(MSI)) {
          var temp = new PowiainaNum(megota);
          temp.layer++;
          temp.normalize();
          return temp;
        }
        function infToBang(x) {
          if (!isFinite(x)) return "!";
          return x.toString();
        }
        function getMSIForm(arrow, expans, megota) {
          var _convertOperator = convertOperator(arrow, expans, megota),
            _convertOperator2 = _slicedToArray(_convertOperator, 3),
            a = _convertOperator2[0],
            e = _convertOperator2[1],
            m = _convertOperator2[2];
          return "10{".concat(infToBang(a), ",").concat(infToBang(e), ",").concat(m, "}").concat(MSI);
        }
        var t = base;
        var arrows = new PowiainaNum(readArg(0));
        var result = function (other2) {
          var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var ctt = PowiainaNum.beafFuncMap.get("".concat(t.toString(), " ").concat(arrow.toString(), " ").concat(expans.toString(), " ").concat(megota.toString(), " ").concat(powiaina.toString(), " ").concat(other2.toString(), " ").concat(depth));
          if (ctt) return ctt;
          // console.log(
          //   `${"-".repeat(depth)} {${base2},${power2},${arrow2},${expans2},${megota2}}`
          // );
          var other = new PowiainaNum(other2);
          var r;
          if (t.isNaN() || other.isNaN()) return PowiainaNum.NaN;
          if (other.lt(PowiainaNum.ZERO)) return PowiainaNum.NaN;
          if (t.eq(PowiainaNum.ZERO)) {
            if (other.eq(PowiainaNum.ONE)) return PowiainaNum.ZERO;
            if (PowiainaNum.throwErrorOnResultNaN) throw new Error("NaN");
            return PowiainaNum.NaN;
          }
          if (t.eq(PowiainaNum.ONE)) return PowiainaNum.ONE;
          if (other.eq(PowiainaNum.ZERO)) return PowiainaNum.ONE;
          if (other.eq(PowiainaNum.ONE)) return t;
          if (arrows.eq(0)) {
            return PowiainaNum.BEAF_core(t, t, power, expans.sub(1), megota, powiaina2, depth + 1);
            // {this, this, power, expans-1, megota}
          }
          if (expans.eq(0)) {
            return PowiainaNum.BEAF_core(t, t, t, power, megota.sub(1), powiaina2, depth + 1);
            // {this, this, this, power, megota-1}
          }
          if (megota.eq(0)) {
            return PowiainaNum.BEAF_core(t, t, t, t, expans, new PowiainaNum(powiaina2).sub(1), depth + 1);
          }
          // megota < 9e15, not implemented
          if (megota.gt(MSI)) {
            throw new Error("Not implemeneted");
          }
          // expans > 9e15, that using 10{?, x}, x=expans;
          if (expans.gt(MSI)) {
            r = new PowiainaNum(expans);
            r.setOperator(r.getOperator(1, Infinity, megota.toNumber()) + 1, 1, Infinity, megota.toNumber());
            return r;
          }
          // arrow > 9e15, that using 10{x,2}, x=arrow;
          if (arrows.gt(PowiainaNum.MSI)) {
            r = arrows.clone();
            r.setOperator(r.getOperator(Infinity, expans.toNumber(), megota.toNumber()) + 1, Infinity, expans.toNumber(), megota.toNumber());
            return r;
          }
          var arrowsNum = arrows.toNumber();
          // arrow < 9e15
          // 10{x}2 = 10{x-1}10
          if (other.eq(2)) return PowiainaNum.BEAF_core(t, t, arrowsNum - 1, expans, megota, powiaina2, depth + 1);
          if (t.max(other).gt(getMSIForm(arrowsNum + 1, expans.toNumber(), megota.toNumber()))) return t.max(other);
          // arrow < 9e15
          // 10{x}2 = 10{x-1}10
          if (t.gt(getMSIForm(arrowsNum + 1, expans.toNumber(), megota.toNumber())) || other.gt(MSI)) {
            if (t.gt(getMSIForm(arrowsNum, expans.toNumber(), megota.toNumber()))) {
              r = t.clone();
              r.setOperator(r.getOperator(arrowsNum, expans.toNumber(), megota.toNumber()) - 1, arrowsNum, expans.toNumber(), megota.toNumber());
              r.normalize();
            } else if (t.gt(getMSIForm(arrowsNum - 1, expans.toNumber(), megota.toNumber()))) {
              r = new PowiainaNum(t.getOperator(arrowsNum - 1, expans.toNumber(), megota.toNumber()));
            } else {
              r = PowiainaNum.ZERO;
            }
            var j = r.add(other);
            j.setOperator(j.getOperator(arrowsNum, expans.toNumber(), megota.toNumber()) + 1, arrowsNum, expans.toNumber(), megota.toNumber());
            j.normalize();
            return j;
          }
          if (depth >= PowiainaNum.maxOps + 10) {
            return new PowiainaNum({
              small: false,
              sign: 1,
              layer: 0,
              array: [newOperator(10, 0), newOperator(1, arrowsNum, expans.toNumber(), megota.toNumber())]
            });
          }
          var y = other.toNumber();
          var f = Math.floor(y);
          var arrows_m1 = arrows.sub(PowiainaNum.ONE);
          r = PowiainaNum.BEAF_core(t, y - f, arrows_m1, expans, megota, powiaina, depth + 1);
          // r = t.arrow(arrows_m1)(y - f, payload, depth + 1);
          var i = 0;
          for (var m = getMSIForm(arrowsNum - 1, expans.toNumber(), megota.toNumber()); f !== 0 && r.lt(m) && i < 100; i++) {
            if (f > 0) {
              r = PowiainaNum.BEAF_core(t, r, arrows_m1, expans, megota, powiaina, depth + 1);
              --f;
            }
          }
          if (i == 100) f = 0;
          r.setOperator(r.getOperator(arrowsNum - 1, expans.toNumber(), megota.toNumber()) + f, arrowsNum - 1, expans.toNumber(), megota.toNumber());
          r.normalize();
          return r;
        }(power, depth);
        if (depth < PowiainaNum.maxOps + 10) {
          PowiainaNum.beafFuncMap.set("".concat(t.toString(), " ").concat(arrow.toString(), " ").concat(expans.toString(), " ").concat(megota.toString(), " ").concat(powiaina.toString(), " ").concat(power.toString(), " ").concat(depth), result);
        }
        return result;
      }
    }, {
      key: "abs",
      value: function abs(x) {
        return new PowiainaNum(x).abs();
      }
      /**
       * Select the largest number of arguments.
       */
    }, {
      key: "max",
      value: function max() {
        var max = PowiainaNum.NEGATIVE_INFINITY;
        for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
          args[_key9] = arguments[_key9];
        }
        for (var i = 0; i < args.length; i++) {
          if (max.lt(args[i])) {
            max = new PowiainaNum(args[i]);
          }
        }
        return max;
      }
      /**
       * Select the smallest number of arguments.
       */
    }, {
      key: "min",
      value: function min() {
        var max = PowiainaNum.POSITIVE_INFINITY;
        for (var _len0 = arguments.length, args = new Array(_len0), _key0 = 0; _key0 < _len0; _key0++) {
          args[_key0] = arguments[_key0];
        }
        for (var i = 0; i < args.length; i++) {
          if (max.gt(args[i])) {
            max = new PowiainaNum(args[i]);
          }
        }
        return max;
      }
      /**
       * Restrict a number be not lower than a number
       *
       * It's also an alias of `PowiainaNum.max`.
       * @returns restricted number
       */
    }, {
      key: "clampMin",
      value: function clampMin() {
        return PowiainaNum.max.apply(PowiainaNum, arguments);
      }
    }, {
      key: "clampMax",
      value: function clampMax() {
        return PowiainaNum.min.apply(PowiainaNum, arguments);
      }
    }, {
      key: "eq",
      value: function eq(a, o) {
        return new PowiainaNum(a).eq(o);
      }
    }, {
      key: "equals",
      value: function equals(a, o) {
        return new PowiainaNum(a).eq(o);
      }
    }, {
      key: "neq",
      value: function neq(a, o) {
        return new PowiainaNum(a).neq(o);
      }
    }, {
      key: "notEquals",
      value: function notEquals(a, o) {
        return new PowiainaNum(a).notEquals(o);
      }
    }, {
      key: "lt",
      value: function lt(a, o) {
        return new PowiainaNum(a).lt(o);
      }
    }, {
      key: "gt",
      value: function gt(a, o) {
        return new PowiainaNum(a).gt(o);
      }
    }, {
      key: "lte",
      value: function lte(a, o) {
        return new PowiainaNum(a).lte(o);
      }
    }, {
      key: "gte",
      value: function gte(a, o) {
        return new PowiainaNum(a).gte(o);
      }
    }, {
      key: "rec",
      value: function rec(t) {
        return new PowiainaNum(t).rec();
      }
    }, {
      key: "recip",
      value: function recip(t) {
        return new PowiainaNum(t).rec();
      }
    }, {
      key: "reciprocate",
      value: function reciprocate(t) {
        return new PowiainaNum(t).rec();
      }
    }, {
      key: "floor",
      value: function floor(x) {
        return new PowiainaNum(x).floor();
      }
    }, {
      key: "ceil",
      value: function ceil(x) {
        return new PowiainaNum(x).ceil();
      }
    }, {
      key: "round",
      value: function round(x) {
        return new PowiainaNum(x).round();
      }
    }, {
      key: "trunc",
      value: function trunc(x) {
        return new PowiainaNum(x).trunc();
      }
      /**
       * @returns if this<other, return -1, if this=other, return 0, if this>other, return 1, if this!<=>, return 2
       */
    }, {
      key: "sign",
      value: function sign(a) {
        return new PowiainaNum(a).sign;
      }
    }, {
      key: "isNaN",
      value: function isNaN(x) {
        return new PowiainaNum(x).isNaN();
      }
      //#endregion
      //#region operators
      /**
       * @returns number will return the index of the operator. return as x.5 if it's between the xth and x+1th operators.
       */
    }, {
      key: "opGetOperatorIndex",
      value: function opGetOperatorIndex(operators, arrow) {
        var expans = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var megota = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
        for (var i = 0; i < operators.length; i++) {
          var cmp = compareTuples([operators[i].megota, operators[i].expans, operators[i].arrow], [megota, expans, arrow]);
          if (cmp == 0) return i; // I find it was [xx,xxx,*xxx*,xxx]!
          if (cmp == 1) return i - 0.5; // It's between [xx, xx,xx*,?,*xx]!
        }
        return operators.length - 0.5;
      }
    }, {
      key: "opGetOperator",
      value: function opGetOperator(operators, arrow) {
        var expans = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var megota = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
        var index = PowiainaNum.opGetOperatorIndex(operators, arrow, expans, megota);
        if (!operators[index]) return 0;
        return operators[index].repeat;
      }
    }, {
      key: "opSetOperator",
      value: function opSetOperator(operators, val, arrow) {
        var expans = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
        var megota = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
        // if (arrow!=0&&val==0) return false;
        var index = PowiainaNum.opGetOperatorIndex(operators, arrow, expans, megota);
        if (!operators[index]) {
          operators.splice(Math.ceil(index), 0, {
            arrow: arrow,
            expans: expans,
            megota: megota,
            valuereplaced: expans === Infinity ? 1 : arrow == Infinity ? 0 : -1,
            repeat: val
          });
          return true;
        }
        operators[index].repeat = val;
        if (operators[index].repeat == 0) {
          operators.splice(index, 1);
          return true;
        }
        // this.normalize()
        return false;
      }
    }, {
      key: "fromBigInt",
      value: function fromBigInt(input) {
        var x = new PowiainaNum(0);
        var abs = input < BigInt(0) ? -input : input;
        x.sign = input < BigInt(0) ? -1 : 1;
        if (abs <= MSI) x.array = [newOperator(Number(abs))];else x.array = [newOperator(log10PosBigInt(abs)), newOperator(1, 1)];
        x.normalize();
        return x;
      }
    }, {
      key: "fromNumber",
      value: function fromNumber(x) {
        var obj = new PowiainaNum();
        obj.resetFromObject({
          array: [{
            arrow: 0,
            expans: 1,
            megota: 1,
            repeat: NaN
          }],
          small: false,
          layer: 0,
          sign: 0
        });
        if (Number.isNaN(x)) return obj;
        if (x < 0) obj.sign = -1; // negative
        else if (x == 0) {
          obj.sign = 0;
          obj.small = true;
          obj.array = [newOperator(Infinity, 0)];
          return obj;
        } else if (x > 0) obj.sign = 1;
        var y = Math.abs(x);
        if (y == Infinity) {
          obj.array = [newOperator(Infinity, 0)];
        } else if (y >= MSI_REC && y < 1) {
          obj.small = true;
          obj.array = [newOperator(1 / y, 0)];
        } else if (y < MSI_REC) {
          obj.small = true;
          obj.array = [newOperator(-Math.log10(y), 0), newOperator(1, 1)];
        } else if (y <= MSI) {
          obj.array = [newOperator(y, 0)];
        } else {
          obj.setOperator(Math.log10(y), 0);
          obj.array = [newOperator(Math.log10(y), 0), newOperator(1, 1)];
        }
        return obj;
      }
    }, {
      key: "fromString",
      value: function fromString(input) {
        if (PowiainaNum.usingBreakEternityLikeFromString && BE_REGEX.test(input)) {
          /*
           * 0i00000000a7 says that eee-3000 will wrongly parse to 1. So i added this
           */
          var a = input.match(/(e+-)(\d+(.\d+)?)/);
          if (a) {
            var e_s = a[1].length;
            input = "/" + "e".repeat(e_s - 1) + a[2];
          }
        }
        return this.fromString_core(input);
      }
    }, {
      key: "fromString_core",
      value: function fromString_core(input) {
        var _a, _b, _c, _d, _e, _f;
        var x = new PowiainaNum(NaN);
        // Judge the string was a number
        if (input.startsWith("PN")) input = input.substring(2);
        if (input == "NaN") return PowiainaNum.NaN;
        if (!PowiainaNum.vanilla) {
          input = input.replace(/J\^(\d+)/g, "(10{!})^$1");
          input = input.replace(/J/g, "10{!}");
          input = input.replace(/K\^(\d+)/g, "(10{1,2})^$1");
          input = input.replace(/K/g, "10{1,2}");
          input = input.replace(/L\^(\d+)/g, "(10{2,2})^$1");
          input = input.replace(/L/g, "10{2,2}");
          input = input.replace(/M\^(\d+)/g, "(10{!,2})^$1");
          input = input.replace(/M/g, "10{!,2}");
          input = input.replace(/N\^(\d+)/g, "(10{1,!})^$1");
          input = input.replace(/N/g, "10{1,!}");
          if (/^.*e-.*(e|\^).*/.test(input)) {
            input = "/10^" + input.substring(input.indexOf("e-"));
          }
        }
        if (!isNaN(Number(input))) {
          var res = Number(input);
          var a = false;
          if (res == 0) {
            if (/^((0)|(0*\.0+e\d+)|(0*\.0*))$/.test(input)) {
              a = true;
            }
          } else {
            a = true;
          }
          if (!a) {
            var m = input.search(/e/);
            var exponent = input.substring((m == -1 ? input.length : m) + 1);
            var mantissa = input.substring(0, m == -1 ? undefined : m);
            var mantissaME = [0, 0];
            // Handle mantissa to ME
            mantissaME[1] = Number(exponent ? exponent : "0");
            // Is regular number gte 1:
            if (Number(mantissa) >= 1) {
              // check The mantissa is very long?
              var log10mant = mantissa.length >= LONG_STRING_MIN_LENGTH ? log10LongString(mantissa) : Math.log10(Number(mantissa)); // sample 10
              var log10int = Math.floor(log10mant); // sample 1
              var log10float = log10mant - log10int; // sample 0;
              mantissaME[0] = Math.pow(10, log10float);
              mantissaME[1] += log10int;
            } else {
              // If not , count how many zeros until reached non-zero numbers
              var zeros = countLeadingZerosAfterDecimal(mantissa);
              mantissa = mantissa.substring(mantissa.search(/[1-9]/));
              mantissa = mantissa.charAt(0) + "." + mantissa.substring(1);
              zeros += 1;
              mantissaME[0] = Number(mantissa);
              mantissaME[1] += -zeros;
            }
            // We'll get [a, b] which respents a*10^b;
            // actually b < 0; So we can ^-1
            // /((a*10^b)^-1) = /(a^-1*10^-b) = /(a^-1 * 10 * 10^(-b-1))
            return PowiainaNum.pow(10, -mantissaME[1] - 1).mul(Math.pow(mantissaME[0], -1) * 10).rec();
          }
          if (isFinite(res) && a) {
            x = PowiainaNum.fromNumber(Number(input));
            return x;
          }
        }
        // Check legacy PowiainaNum 0.1.x number format
        if (input.indexOf("l") !== -1 && input.indexOf("s") !== -1 && input.indexOf("a") !== -1) {
          var obj = parseLegacyPowiainaNumString(input);
          if (!obj || obj.sValue !== 0 && obj.sValue !== 1 && obj.sValue !== -1) throw powiainaNumError + "malformed input: " + input;
          x = PowiainaNum.fromObject(obj.array);
          x.layer = obj.lValue;
          x.sign = obj.sValue;
          x.small = false;
          x.normalize();
          return x;
        }
        if (!PowiainaNum.vanilla) input = replaceETo10(input);
        if (!PowiainaNum.vanilla) input = removeCommasOutsideBraces(input);
        if (!isPowiainaNum.test(input)) {
          throw powiainaNumError + "malformed input: " + input;
        }
        var negateIt = false;
        var recipIt = false;
        if (input[0] == "-" || input[0] == "+") {
          var numSigns = input.search(/[^-\+]/);
          var signs = input.substring(0, numSigns);
          negateIt = ((_b = (_a = signs.match(/-/g)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) % 2 == 1;
          input = input.substring(numSigns);
        }
        if (input[0] == "/") {
          var _numSigns = input.search(/[^\/]/);
          var _signs = input.substring(0, _numSigns);
          recipIt = ((_d = (_c = _signs.match(/\//g)) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) % 2 == 1;
          input = input.substring(_numSigns);
        }
        if (input == "NaN") x.array = [newOperator(NaN)];else if (input == "Infinity") {
          x.sign = 1;
          x.array = [newOperator(Infinity)];
        } else {
          x.sign = 1;
          x.array = [newOperator(0)];
          var _a3, b, c, d;
          if (input[0] == "P") {
            if (input[1] == "^") {
              _a3 = input.substring(2).search(/[^0-9]/) + 2;
              x.layer = Number(input.substring(2, _a3));
              input = input.substring(_a3 + 1);
            } else {
              _a3 = input.search(/[^P]/);
              x.layer = _a3;
              input = input.substring(_a3);
            }
          }
          while (input) {
            if (/^(\(?10[\^\{])/.test(input)) {
              var arrows = void 0,
                expans = void 0,
                megota = void 0;
              /*
                10^ - 匹配
                10{ - 匹配
                (10^ - 匹配
                (10{ - 匹配
                10x - 不匹配（最后一个字符不是 ^ 或 {）
                110^ - 不匹配（不是以 10 开头）
              */
              if (input[0] == "(") input = input.substring(1);
              //cutted, 10^.... or 10{....
              if (input[2] == "^") {
                _a3 = input.substring(2).search(/[^\^]/);
                //cut input to ^^...^^, and search how numbers
                arrows = _a3;
                // 10^^^
                b = _a3 + 2; // b points to after ^'s.
              } else {
                // 10{...}
                _a3 = input.indexOf("}");
                // select contents between {...}
                var tmp = input.substring(3, _a3).split(",");
                arrows = Number(tmp[0] == "!" ? Infinity : tmp[0]);
                expans = Number((_e = tmp[1] == "!" ? Infinity : tmp[1]) !== null && _e !== void 0 ? _e : 1);
                megota = Number((_f = tmp[2]) !== null && _f !== void 0 ? _f : 1);
                b = _a3 + 1;
                // b points to after }.
              }
              input = input.substring(b);
              if (input[0] == ")") {
                // )^....<Space>
                _a3 = input.indexOf(" ");
                c = Number(input.substring(2, _a3)); // Select contents between )^....<Space>
                input = input.substring(_a3 + 1); // c points to after <Space>
              } else {
                c = 1; // There is only spaces, count as <ONE>
              }
              if (arrows == 1 && expans == 1 && megota == 1) {
                if (x.array.length >= 2 && x.array[1].arrow == 1 && x.array[1].expans == 1 && x.array[1].megota == 1) {
                  x.array[1].repeat += c;
                } else {
                  x.array.splice(1, 0, newOperator(c, 1, expans, megota));
                }
              } else if (arrows == 2 && expans == 1 && megota == 1) {
                _a3 = x.array.length >= 2 && x.array[1].arrow == 1 && x.array[1].expans == 1 && x.array[1].megota == 1 ? x.array[1].repeat : 0;
                b = x.array[0].repeat;
                if (b >= 1e10) ++_a3;
                if (b >= 10) ++_a3;
                x.array[0].repeat = _a3;
                if (x.array.length >= 2 && x.array[1].arrow == 1 && x.array[1].expans == 1 && x.array[1].megota == 1) x.array.splice(1, 1);
                d = x.getOperatorIndex(2);
                if (Number.isInteger(d)) x.array[d].repeat += c;else x.array.splice(Math.ceil(d), 0, newOperator(c, 2, expans, megota));
              } else if (isFinite(arrows) && expans == 1 && megota == 1) {
                _a3 = x.getOperator(arrows - 1);
                b = x.getOperator(arrows - 2);
                if (b >= 10) ++_a3;
                d = x.getOperatorIndex(arrows);
                x.array.splice(1, Math.ceil(d) - 1);
                x.array[0].repeat = _a3;
                if (Number.isInteger(d)) x.array[1].repeat += c;else x.array.splice(1, 0, newOperator(c, arrows, expans, megota));
              } else {
                x.array.splice(1, 0, newOperator(c, arrows, expans, megota));
              }
            } else {
              break;
            }
          }
          _a3 = input.split(/[Ee]/);
          b = [x.array[0].repeat, 0];
          c = 1;
          for (var i = _a3.length - 1; i >= 0; --i) {
            //The things that are already there
            if (b[0] < MSI_LOG10 && b[1] === 0) {
              b[0] = Math.pow(10, c * b[0]);
            } else if (c == -1) {
              if (b[1] === 0) {
                b[0] = Math.pow(10, c * b[0]);
              } else if (b[1] == 1 && b[0] <= Math.log10(Number.MAX_VALUE)) {
                b[0] = Math.pow(10, c * Math.pow(10, b[0]));
              } else {
                b[0] = 0;
              }
              b[1] = 0;
            } else {
              b[1]++;
            }
            //Multiplying coefficient
            var decimalPointPos = _a3[i].indexOf(".");
            var intPartLen = decimalPointPos == -1 ? _a3[i].length : decimalPointPos;
            if (b[1] === 0) {
              if (intPartLen >= LONG_STRING_MIN_LENGTH) b[0] = Math.log10(b[0]) + log10LongString(_a3[i].substring(0, intPartLen)), b[1] = 1;else if (_a3[i]) b[0] *= Number(_a3[i]);
            } else {
              d = intPartLen >= LONG_STRING_MIN_LENGTH ? log10LongString(_a3[i].substring(0, intPartLen)) : _a3[i] ? Math.log10(Number(_a3[i])) : 0;
              if (b[1] == 1) {
                b[0] += d;
              } else if (b[1] == 2 && b[0] < MSI_LOG10 + Math.log10(d)) {
                b[0] += Math.log10(1 + Math.pow(10, Math.log10(d) - b[0]));
              }
            }
            //Carrying
            if (b[0] < MSI_LOG10 && b[1]) {
              b[0] = Math.pow(10, b[0]);
              b[1]--;
            } else if (b[0] > MSI) {
              b[0] = Math.log10(b[0]);
              b[1]++;
            }
          }
          x.array[0].repeat = b[0];
          if (b[1]) {
            if (x.array.length >= 2 && x.array[1].arrow == 1 && x.array[1].expans == 1 && x.array[1].megota == 1) x.array[1].repeat += b[1];else x.array.splice(1, 0, newOperator(b[1], 1, 1, 1));
          }
        }
        if (negateIt) x.sign *= -1;
        if (recipIt) x.small = !x.small;
        x.normalize();
        x.normalize();
        return x;
      }
    }, {
      key: "fromObject",
      value: function fromObject(powlikeObject) {
        var obj = new PowiainaNum();
        obj.resetFromObject({
          array: [{
            arrow: 0,
            expans: 1,
            megota: 1,
            repeat: NaN
          }],
          small: false,
          layer: 0,
          sign: 0
        });
        obj.array = [];
        if (isExpantaNumArray(powlikeObject)) {
          for (var i = 0; i < powlikeObject.length; i++) {
            obj.array[i] = {
              arrow: powlikeObject[i][0],
              expans: 1,
              megota: 1,
              repeat: powlikeObject[i][1]
            };
          }
          obj.small = false;
          obj.sign = 1;
          obj.layer = 0;
          return obj;
        } else if (isIBreakEternity(powlikeObject)) {
          var res = powlikeObject;
          var reciprocated = res.mag < 0;
          var res2 = new PowiainaNum(1);
          if (res.layer >= MSI) res2.array = [newOperator(Math.log10(res.layer)), newOperator(1, 1), newOperator(1, 2)];else if (res.layer >= 1) res2.array = [newOperator(Math.abs(res.mag)), newOperator(res.layer, 1)];else res2.array = [newOperator(res.mag)];
          res2.small = reciprocated;
          res2.normalize();
          return res2;
        } else if (isPowiainaNum01XArray(powlikeObject)) {
          var arrayobj = powlikeObject;
          obj.array[0] = newOperator(arrayobj[0]);
          for (var _i4 = 1; _i4 < arrayobj.length; _i4++) {
            var b = arrayobj[_i4];
            obj.array[1] = newOperator(b[1], replaceXToInfinity(b[0]), replaceXToInfinity(b[2]), b[3]);
          }
          obj.small = false;
          obj.sign = 1;
          obj.layer = 0;
          return obj;
        } else {
          obj.resetFromObject(powlikeObject);
          return obj;
        }
      }
    }, {
      key: "grahalFunction",
      value: function grahalFunction(layers2) {
        var layers = new PowiainaNum(layers2);
        if (!layers.isInt() || layers.lt(0) || layers.isNaN()) return PowiainaNum.NaN;
        if (layers.eq(1)) return new PowiainaNum("10^^^(10^)^7625597484984 3638334640023.7783");else if (layers.lte(MSI)) {
          return new PowiainaNum("(10{!})^".concat(layers.toNumber(), " 10^^^(10^)^7625597484984 3638334640023.7783"));
        } else {
          return PowiainaNum.BEAF(3, layers, 1, 2);
        }
      }
    }]);
  }(); //#endregion
  //#region constants
  /**
   * Zero
   */
  PowiainaNum.ZERO = new PowiainaNum({
    array: arrays.ZERO,
    small: true,
    layer: 0,
    sign: 0
  });
  /**
   * One
   */
  PowiainaNum.ONE = new PowiainaNum({
    array: [{
      arrow: 0,
      expans: 1,
      megota: 1,
      repeat: 1
    }],
    small: false,
    layer: 0,
    sign: 1
  });
  /**
   * The value of the largest integer n such that n and n + 1 are both
   * exactly representable as a Number value = 9007199254740991 = 2^53 − 1.
   */
  PowiainaNum.MSI = new PowiainaNum(MSI);
  /**
   * MSI's reciprocate value, = 1/9007199254740991.
   */
  PowiainaNum.MSI_REC = function () {
    var obj = new PowiainaNum(MSI);
    obj.small = true;
    return obj;
  }();
  /**
   * 10^(MSI) = 10^9007199254740991.
   */
  PowiainaNum.E_MSI = new PowiainaNum({
    array: [{
      arrow: 0,
      expans: 1,
      megota: 1,
      repeat: MSI
    }, {
      arrow: 1,
      expans: 1,
      megota: 1,
      repeat: 1
    }],
    small: false,
    layer: 0,
    sign: 1
  });
  /**
   * 10^10^(MSI) = 10^10^9007199254740991.
   */
  PowiainaNum.EE_MSI = new PowiainaNum({
    array: [{
      arrow: 0,
      expans: 1,
      megota: 1,
      repeat: MSI
    }, {
      arrow: 1,
      expans: 1,
      megota: 1,
      repeat: 2
    }],
    small: false,
    layer: 0,
    sign: 1
  });
  /**
   * 10^(MSI) 's reciprocate value, = 10^-9007199254740991.
   */
  PowiainaNum.E_MSI_REC = new PowiainaNum({
    array: [{
      arrow: 0,
      expans: 1,
      megota: 1,
      repeat: MSI
    }, {
      arrow: 1,
      expans: 1,
      megota: 1,
      repeat: 1
    }],
    small: true,
    layer: 0,
    sign: 1
  });
  /**
   * Tetrated MSI, = 10↑↑9007199254740991.
   */
  PowiainaNum.TETRATED_MSI = new PowiainaNum({
    array: [{
      arrow: 0,
      expans: 1,
      megota: 1,
      repeat: 1e10
    }, {
      arrow: 1,
      expans: 1,
      megota: 1,
      repeat: MSI - 2
    }],
    small: false,
    layer: 0,
    sign: 1
  });
  /**
   * Pentated MSI, = 10↑↑↑9007199254740991.
   */
  PowiainaNum.PENTATED_MSI = new PowiainaNum({
    array: [{
      arrow: 0,
      expans: 1,
      megota: 1,
      repeat: 10
    }, {
      arrow: 2,
      expans: 1,
      megota: 1,
      repeat: MSI - 1
    }],
    small: false,
    layer: 0,
    sign: 1
  });
  /**
   * Tritri, = 3↑↑↑3 = power tower with height 7625597484987 base 3.
   */
  PowiainaNum.TRITRI = new PowiainaNum({
    small: false,
    layer: 0,
    sign: 1,
    array: [newOperator(3638334640023.7783, 0, 1, 1), newOperator(7625587484984, 1, 1, 1)]
  });
  /**
   * The Graham's Number, = G^64(4)
   *
   * = 3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{
   * 3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3{3↑↑↑↑3
   * }3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3
   * }3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3}3
   */
  PowiainaNum.GRAHAMS_NUMBER = new PowiainaNum("(10{!})^63 10^^^(10^)^7625597484984 3638334640023.7783");
  /**
   * Positive Infinity.
   */
  PowiainaNum.POSITIVE_INFINITY = new PowiainaNum(Infinity);
  /**
   * Negative Infinity.
   */
  PowiainaNum.NEGATIVE_INFINITY = new PowiainaNum(-Infinity);
  PowiainaNum.NaN = new PowiainaNum({
    array: [{
      arrow: 0,
      expans: 1,
      megota: 1,
      repeat: NaN
    }],
    small: false,
    layer: 0,
    sign: 0
  });
  /**
   * The mathematical constant e. This is Euler's number, the base of natural logarithms.
   */
  PowiainaNum.E = new PowiainaNum(Math.E);
  /**
   * The natural logarithm of 2 = ln(2).
   */
  PowiainaNum.LN2 = new PowiainaNum(Math.LN2);
  /**
   * The natural logarithm of 10.
   */
  PowiainaNum.LN10 = new PowiainaNum(Math.LN10);
  /**
   * The base-2 logarithm of e = log_2(e).
   */
  PowiainaNum.LOG2E = new PowiainaNum(Math.LOG2E);
  /**
   * The base-10 logarithm of e = log_10(e).
   */
  PowiainaNum.LOG10E = new PowiainaNum(Math.LOG10E);
  /**
   * Pi(). This is the ratio of the circumference of a circle to its diameter.
   */
  PowiainaNum.PI = new PowiainaNum(Math.PI);
  /**
   * The square root of 0.5, or, equivalently, one divided by the square root of 2.
   *
   * = (√2)/2 = √(0.5)
   */
  PowiainaNum.SQRT1_2 = new PowiainaNum(Math.SQRT1_2);
  /**
   * The square root of 2 = √2.
   */
  PowiainaNum.SQRT2 = new PowiainaNum(Math.SQRT2);
  PowiainaNum.maxOps = 100;
  PowiainaNum.POW_2_44_MOD_PI = 1.701173079953;
  //#endregion
  PowiainaNum.arrowFuncMap = new Map();
  PowiainaNum.beafFuncMap = new Map();
  //#region configurations
  /**
   * If you set this config to true,
   *  the `fromString` method will try to parse the string to `PowiainaNum` class with `break_eternity.js` similar `fromString` method, if cannot parse correctly, the program will use `PowiainaNum.js` `fromString` method.
   */
  PowiainaNum.usingBreakEternityLikeFromString = true;
  /**
   * If you set this config to true, the `constructor` method will return Zero instead of NaN when call new PowiainaNum() with no arguments.
   */
  PowiainaNum.blankArgumentConstructorReturnZero = false;
  /**
   * If you set this config to true, when calucation returns NaN, the program will throw error.
   */
  PowiainaNum.throwErrorOnResultNaN = false;
  /**
   * If you set this config to true, it will turn off replacement of string, e.g replace e^x to 10^^x
   */
  PowiainaNum.vanilla = false;

  exports.arraySortFunction = arraySortFunction;
  exports["default"] = PowiainaNum;
  exports.mergeSameArrays = mergeSameArrays;
  exports.newOperator = newOperator;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
