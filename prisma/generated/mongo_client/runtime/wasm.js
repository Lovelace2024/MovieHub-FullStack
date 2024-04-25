"use strict";
var ko = Object.create;
var Et = Object.defineProperty;
var Lo = Object.getOwnPropertyDescriptor;
var Mo = Object.getOwnPropertyNames;
var Io = Object.getPrototypeOf,
  _o = Object.prototype.hasOwnProperty;
var se = (e, t) => () => (e && (t = e((e = 0))), t);
var Ae = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
  ze = (e, t) => {
    for (var r in t) Et(e, r, { get: t[r], enumerable: !0 });
  },
  Kr = (e, t, r, n) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let i of Mo(t))
        !_o.call(e, i) &&
          i !== r &&
          Et(e, i, {
            get: () => t[i],
            enumerable: !(n = Lo(t, i)) || n.enumerable,
          });
    return e;
  };
var _e = (e, t, r) => (
    (r = e != null ? ko(Io(e)) : {}),
    Kr(
      t || !e || !e.__esModule
        ? Et(r, "default", { value: e, enumerable: !0 })
        : r,
      e,
    )
  ),
  ar = (e) => Kr(Et({}, "__esModule", { value: !0 }), e);
function lr(e, t) {
  if (((t = t.toLowerCase()), t === "utf8" || t === "utf-8"))
    return new h(Bo.encode(e));
  if (t === "base64" || t === "base64url")
    return (
      (e = e.replace(/-/g, "+").replace(/_/g, "/")),
      (e = e.replace(/[^A-Za-z0-9+/]/g, "")),
      new h([...atob(e)].map((r) => r.charCodeAt(0)))
    );
  if (t === "binary" || t === "ascii" || t === "latin1" || t === "latin-1")
    return new h([...e].map((r) => r.charCodeAt(0)));
  if (t === "ucs2" || t === "ucs-2" || t === "utf16le" || t === "utf-16le") {
    let r = new h(e.length * 2),
      n = new DataView(r.buffer);
    for (let i = 0; i < e.length; i++) n.setUint16(i * 2, e.charCodeAt(i), !0);
    return r;
  }
  if (t === "hex") {
    let r = new h(e.length / 2);
    for (let n = 0, i = 0; i < e.length; i += 2, n++)
      r[n] = parseInt(e.slice(i, i + 2), 16);
    return r;
  }
  zr(`encoding "${t}"`);
}
function Do(e) {
  let r = Object.getOwnPropertyNames(DataView.prototype).filter(
      (a) => a.startsWith("get") || a.startsWith("set"),
    ),
    n = r.map((a) => a.replace("get", "read").replace("set", "write")),
    i = (a, f) =>
      function (v = 0) {
        return (
          $(v, "offset"),
          X(v, "offset"),
          q(v, "offset", this.length - 1),
          new DataView(this.buffer)[r[a]](v, f)
        );
      },
    o = (a, f) =>
      function (v, C = 0) {
        let T = r[a].match(/set(\w+\d+)/)[1].toLowerCase(),
          O = No[T];
        return (
          $(C, "offset"),
          X(C, "offset"),
          q(C, "offset", this.length - 1),
          Fo(v, "value", O[0], O[1]),
          new DataView(this.buffer)[r[a]](C, v, f),
          C + parseInt(r[a].match(/\d+/)[0]) / 8
        );
      },
    s = (a) => {
      a.forEach((f) => {
        f.includes("Uint") && (e[f.replace("Uint", "UInt")] = e[f]),
          f.includes("Float64") && (e[f.replace("Float64", "Double")] = e[f]),
          f.includes("Float32") && (e[f.replace("Float32", "Float")] = e[f]);
      });
    };
  n.forEach((a, f) => {
    a.startsWith("read") &&
      ((e[a] = i(f, !1)), (e[a + "LE"] = i(f, !0)), (e[a + "BE"] = i(f, !1))),
      a.startsWith("write") &&
        ((e[a] = o(f, !1)), (e[a + "LE"] = o(f, !0)), (e[a + "BE"] = o(f, !1))),
      s([a, a + "LE", a + "BE"]);
  });
}
function zr(e) {
  throw new Error(`Buffer polyfill does not implement "${e}"`);
}
function xt(e, t) {
  if (!(e instanceof Uint8Array))
    throw new TypeError(
      `The "${t}" argument must be an instance of Buffer or Uint8Array`,
    );
}
function q(e, t, r = Vo + 1) {
  if (e < 0 || e > r) {
    let n = new RangeError(
      `The value of "${t}" is out of range. It must be >= 0 && <= ${r}. Received ${e}`,
    );
    throw ((n.code = "ERR_OUT_OF_RANGE"), n);
  }
}
function $(e, t) {
  if (typeof e != "number") {
    let r = new TypeError(
      `The "${t}" argument must be of type number. Received type ${typeof e}.`,
    );
    throw ((r.code = "ERR_INVALID_ARG_TYPE"), r);
  }
}
function X(e, t) {
  if (!Number.isInteger(e) || Number.isNaN(e)) {
    let r = new RangeError(
      `The value of "${t}" is out of range. It must be an integer. Received ${e}`,
    );
    throw ((r.code = "ERR_OUT_OF_RANGE"), r);
  }
}
function Fo(e, t, r, n) {
  if (e < r || e > n) {
    let i = new RangeError(
      `The value of "${t}" is out of range. It must be >= ${r} and <= ${n}. Received ${e}`,
    );
    throw ((i.code = "ERR_OUT_OF_RANGE"), i);
  }
}
function Hr(e, t) {
  if (typeof e != "string") {
    let r = new TypeError(
      `The "${t}" argument must be of type string. Received type ${typeof e}`,
    );
    throw ((r.code = "ERR_INVALID_ARG_TYPE"), r);
  }
}
function qo(e, t = "utf8") {
  return h.from(e, t);
}
var h,
  No,
  Bo,
  Uo,
  $o,
  Vo,
  y,
  ur,
  u = se(() => {
    "use strict";
    h = class e extends Uint8Array {
      constructor() {
        super(...arguments);
        this._isBuffer = !0;
      }
      get offset() {
        return this.byteOffset;
      }
      static alloc(r, n = 0, i = "utf8") {
        return Hr(i, "encoding"), e.allocUnsafe(r).fill(n, i);
      }
      static allocUnsafe(r) {
        return e.from(r);
      }
      static allocUnsafeSlow(r) {
        return e.from(r);
      }
      static isBuffer(r) {
        return r && !!r._isBuffer;
      }
      static byteLength(r, n = "utf8") {
        if (typeof r == "string") return lr(r, n).byteLength;
        if (r && r.byteLength) return r.byteLength;
        let i = new TypeError(
          'The "string" argument must be of type string or an instance of Buffer or ArrayBuffer.',
        );
        throw ((i.code = "ERR_INVALID_ARG_TYPE"), i);
      }
      static isEncoding(r) {
        return $o.includes(r);
      }
      static compare(r, n) {
        xt(r, "buff1"), xt(n, "buff2");
        for (let i = 0; i < r.length; i++) {
          if (r[i] < n[i]) return -1;
          if (r[i] > n[i]) return 1;
        }
        return r.length === n.length ? 0 : r.length > n.length ? 1 : -1;
      }
      static from(r, n = "utf8") {
        if (r && typeof r == "object" && r.type === "Buffer")
          return new e(r.data);
        if (typeof r == "number") return new e(new Uint8Array(r));
        if (typeof r == "string") return lr(r, n);
        if (ArrayBuffer.isView(r)) {
          let { byteOffset: i, byteLength: o, buffer: s } = r;
          return "map" in r && typeof r.map == "function"
            ? new e(
                r.map((a) => a % 256),
                i,
                o,
              )
            : new e(s, i, o);
        }
        if (
          r &&
          typeof r == "object" &&
          ("length" in r || "byteLength" in r || "buffer" in r)
        )
          return new e(r);
        throw new TypeError(
          "First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.",
        );
      }
      static concat(r, n) {
        if (r.length === 0) return e.alloc(0);
        let i = [].concat(...r.map((s) => [...s])),
          o = e.alloc(n !== void 0 ? n : i.length);
        return o.set(n !== void 0 ? i.slice(0, n) : i), o;
      }
      slice(r = 0, n = this.length) {
        return this.subarray(r, n);
      }
      subarray(r = 0, n = this.length) {
        return Object.setPrototypeOf(super.subarray(r, n), e.prototype);
      }
      reverse() {
        return super.reverse(), this;
      }
      readIntBE(r, n) {
        $(r, "offset"),
          X(r, "offset"),
          q(r, "offset", this.length - 1),
          $(n, "byteLength"),
          X(n, "byteLength");
        let i = new DataView(this.buffer, r, n),
          o = 0;
        for (let s = 0; s < n; s++) o = o * 256 + i.getUint8(s);
        return i.getUint8(0) & 128 && (o -= Math.pow(256, n)), o;
      }
      readIntLE(r, n) {
        $(r, "offset"),
          X(r, "offset"),
          q(r, "offset", this.length - 1),
          $(n, "byteLength"),
          X(n, "byteLength");
        let i = new DataView(this.buffer, r, n),
          o = 0;
        for (let s = 0; s < n; s++) o += i.getUint8(s) * Math.pow(256, s);
        return i.getUint8(n - 1) & 128 && (o -= Math.pow(256, n)), o;
      }
      readUIntBE(r, n) {
        $(r, "offset"),
          X(r, "offset"),
          q(r, "offset", this.length - 1),
          $(n, "byteLength"),
          X(n, "byteLength");
        let i = new DataView(this.buffer, r, n),
          o = 0;
        for (let s = 0; s < n; s++) o = o * 256 + i.getUint8(s);
        return o;
      }
      readUintBE(r, n) {
        return this.readUIntBE(r, n);
      }
      readUIntLE(r, n) {
        $(r, "offset"),
          X(r, "offset"),
          q(r, "offset", this.length - 1),
          $(n, "byteLength"),
          X(n, "byteLength");
        let i = new DataView(this.buffer, r, n),
          o = 0;
        for (let s = 0; s < n; s++) o += i.getUint8(s) * Math.pow(256, s);
        return o;
      }
      readUintLE(r, n) {
        return this.readUIntLE(r, n);
      }
      writeIntBE(r, n, i) {
        return (
          (r = r < 0 ? r + Math.pow(256, i) : r), this.writeUIntBE(r, n, i)
        );
      }
      writeIntLE(r, n, i) {
        return (
          (r = r < 0 ? r + Math.pow(256, i) : r), this.writeUIntLE(r, n, i)
        );
      }
      writeUIntBE(r, n, i) {
        $(n, "offset"),
          X(n, "offset"),
          q(n, "offset", this.length - 1),
          $(i, "byteLength"),
          X(i, "byteLength");
        let o = new DataView(this.buffer, n, i);
        for (let s = i - 1; s >= 0; s--) o.setUint8(s, r & 255), (r = r / 256);
        return n + i;
      }
      writeUintBE(r, n, i) {
        return this.writeUIntBE(r, n, i);
      }
      writeUIntLE(r, n, i) {
        $(n, "offset"),
          X(n, "offset"),
          q(n, "offset", this.length - 1),
          $(i, "byteLength"),
          X(i, "byteLength");
        let o = new DataView(this.buffer, n, i);
        for (let s = 0; s < i; s++) o.setUint8(s, r & 255), (r = r / 256);
        return n + i;
      }
      writeUintLE(r, n, i) {
        return this.writeUIntLE(r, n, i);
      }
      toJSON() {
        return { type: "Buffer", data: Array.from(this) };
      }
      swap16() {
        let r = new DataView(this.buffer, this.byteOffset, this.byteLength);
        for (let n = 0; n < this.length; n += 2)
          r.setUint16(n, r.getUint16(n, !0), !1);
        return this;
      }
      swap32() {
        let r = new DataView(this.buffer, this.byteOffset, this.byteLength);
        for (let n = 0; n < this.length; n += 4)
          r.setUint32(n, r.getUint32(n, !0), !1);
        return this;
      }
      swap64() {
        let r = new DataView(this.buffer, this.byteOffset, this.byteLength);
        for (let n = 0; n < this.length; n += 8)
          r.setBigUint64(n, r.getBigUint64(n, !0), !1);
        return this;
      }
      compare(r, n = 0, i = r.length, o = 0, s = this.length) {
        return (
          xt(r, "target"),
          $(n, "targetStart"),
          $(i, "targetEnd"),
          $(o, "sourceStart"),
          $(s, "sourceEnd"),
          q(n, "targetStart"),
          q(i, "targetEnd", r.length),
          q(o, "sourceStart"),
          q(s, "sourceEnd", this.length),
          e.compare(this.slice(o, s), r.slice(n, i))
        );
      }
      equals(r) {
        return (
          xt(r, "otherBuffer"),
          this.length === r.length && this.every((n, i) => n === r[i])
        );
      }
      copy(r, n = 0, i = 0, o = this.length) {
        q(n, "targetStart"),
          q(i, "sourceStart", this.length),
          q(o, "sourceEnd"),
          (n >>>= 0),
          (i >>>= 0),
          (o >>>= 0);
        let s = 0;
        for (; i < o && !(this[i] === void 0 || r[n] === void 0); )
          (r[n] = this[i]), s++, i++, n++;
        return s;
      }
      write(r, n, i, o = "utf8") {
        let s = typeof n == "string" ? 0 : n ?? 0,
          a = typeof i == "string" ? this.length - s : i ?? this.length - s;
        return (
          (o = typeof n == "string" ? n : typeof i == "string" ? i : o),
          $(s, "offset"),
          $(a, "length"),
          q(s, "offset", this.length),
          q(a, "length", this.length),
          (o === "ucs2" ||
            o === "ucs-2" ||
            o === "utf16le" ||
            o === "utf-16le") &&
            (a = a - (a % 2)),
          lr(r, o).copy(this, s, 0, a)
        );
      }
      fill(r = 0, n = 0, i = this.length, o = "utf-8") {
        let s = typeof n == "string" ? 0 : n,
          a = typeof i == "string" ? this.length : i;
        if (
          ((o = typeof n == "string" ? n : typeof i == "string" ? i : o),
          (r = e.from(typeof r == "number" ? [r] : r ?? [], o)),
          Hr(o, "encoding"),
          q(s, "offset", this.length),
          q(a, "end", this.length),
          r.length !== 0)
        )
          for (let f = s; f < a; f += r.length)
            super.set(
              r.slice(
                0,
                r.length + f >= this.length ? this.length - f : r.length,
              ),
              f,
            );
        return this;
      }
      includes(r, n = null, i = "utf-8") {
        return this.indexOf(r, n, i) !== -1;
      }
      lastIndexOf(r, n = null, i = "utf-8") {
        return this.indexOf(r, n, i, !0);
      }
      indexOf(r, n = null, i = "utf-8", o = !1) {
        let s = o ? this.findLastIndex.bind(this) : this.findIndex.bind(this);
        i = typeof n == "string" ? n : i;
        let a = e.from(typeof r == "number" ? [r] : r, i),
          f = typeof n == "string" ? 0 : n;
        return (
          (f = typeof n == "number" ? f : null),
          (f = Number.isNaN(f) ? null : f),
          (f ??= o ? this.length : 0),
          (f = f < 0 ? this.length + f : f),
          a.length === 0 && o === !1
            ? f >= this.length
              ? this.length
              : f
            : a.length === 0 && o === !0
              ? (f >= this.length ? this.length : f) || this.length
              : s(
                  (v, C) =>
                    (o ? C <= f : C >= f) &&
                    this[C] === a[0] &&
                    a.every((O, R) => this[C + R] === O),
                )
        );
      }
      toString(r = "utf8", n = 0, i = this.length) {
        if (((n = n < 0 ? 0 : n), (r = r.toString().toLowerCase()), i <= 0))
          return "";
        if (r === "utf8" || r === "utf-8") return Uo.decode(this.slice(n, i));
        if (r === "base64" || r === "base64url") {
          let o = btoa(this.reduce((s, a) => s + ur(a), ""));
          return r === "base64url"
            ? o.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
            : o;
        }
        if (
          r === "binary" ||
          r === "ascii" ||
          r === "latin1" ||
          r === "latin-1"
        )
          return this.slice(n, i).reduce(
            (o, s) => o + ur(s & (r === "ascii" ? 127 : 255)),
            "",
          );
        if (
          r === "ucs2" ||
          r === "ucs-2" ||
          r === "utf16le" ||
          r === "utf-16le"
        ) {
          let o = new DataView(this.buffer.slice(n, i));
          return Array.from({ length: o.byteLength / 2 }, (s, a) =>
            a * 2 + 1 < o.byteLength ? ur(o.getUint16(a * 2, !0)) : "",
          ).join("");
        }
        if (r === "hex")
          return this.slice(n, i).reduce(
            (o, s) => o + s.toString(16).padStart(2, "0"),
            "",
          );
        zr(`encoding "${r}"`);
      }
      toLocaleString() {
        return this.toString();
      }
      inspect() {
        return `<Buffer ${this.toString("hex")
          .match(/.{1,2}/g)
          .join(" ")}>`;
      }
    };
    (No = {
      int8: [-128, 127],
      int16: [-32768, 32767],
      int32: [-2147483648, 2147483647],
      uint8: [0, 255],
      uint16: [0, 65535],
      uint32: [0, 4294967295],
      float32: [-1 / 0, 1 / 0],
      float64: [-1 / 0, 1 / 0],
      bigint64: [-0x8000000000000000n, 0x7fffffffffffffffn],
      biguint64: [0n, 0xffffffffffffffffn],
    }),
      (Bo = new TextEncoder()),
      (Uo = new TextDecoder()),
      ($o = [
        "utf8",
        "utf-8",
        "hex",
        "base64",
        "ascii",
        "binary",
        "base64url",
        "ucs2",
        "ucs-2",
        "utf16le",
        "utf-16le",
        "latin1",
        "latin-1",
      ]),
      (Vo = 4294967295);
    Do(h.prototype);
    (y = new Proxy(qo, {
      construct(e, [t, r]) {
        return h.from(t, r);
      },
      get(e, t) {
        return h[t];
      },
    })),
      (ur = String.fromCodePoint);
  });
var g,
  c = se(() => {
    "use strict";
    g = {
      nextTick: (e, ...t) => {
        setTimeout(() => {
          e(...t);
        }, 0);
      },
      env: {},
      version: "",
      cwd: () => "/",
      stderr: {},
      argv: ["/bin/node"],
    };
  });
var E,
  m = se(() => {
    "use strict";
    E =
      globalThis.performance ??
      (() => {
        let e = Date.now();
        return { now: () => Date.now() - e };
      })();
  });
var w,
  p = se(() => {
    "use strict";
    w = () => {};
    w.prototype = w;
  });
var b,
  d = se(() => {
    "use strict";
    b = class {
      constructor(t) {
        this.value = t;
      }
      deref() {
        return this.value;
      }
    };
  });
function en(e, t) {
  var r,
    n,
    i,
    o,
    s,
    a,
    f,
    v,
    C = e.constructor,
    T = C.precision;
  if (!e.s || !t.s) return t.s || (t = new C(e)), B ? I(t, T) : t;
  if (
    ((f = e.d),
    (v = t.d),
    (s = e.e),
    (i = t.e),
    (f = f.slice()),
    (o = s - i),
    o)
  ) {
    for (
      o < 0
        ? ((n = f), (o = -o), (a = v.length))
        : ((n = v), (i = s), (a = f.length)),
        s = Math.ceil(T / D),
        a = s > a ? s + 1 : a + 1,
        o > a && ((o = a), (n.length = 1)),
        n.reverse();
      o--;

    )
      n.push(0);
    n.reverse();
  }
  for (
    a = f.length,
      o = v.length,
      a - o < 0 && ((o = a), (n = v), (v = f), (f = n)),
      r = 0;
    o;

  )
    (r = ((f[--o] = f[o] + v[o] + r) / j) | 0), (f[o] %= j);
  for (r && (f.unshift(r), ++i), a = f.length; f[--a] == 0; ) f.pop();
  return (t.d = f), (t.e = i), B ? I(t, T) : t;
}
function ue(e, t, r) {
  if (e !== ~~e || e < t || e > r) throw Error(Se + e);
}
function le(e) {
  var t,
    r,
    n,
    i = e.length - 1,
    o = "",
    s = e[0];
  if (i > 0) {
    for (o += s, t = 1; t < i; t++)
      (n = e[t] + ""), (r = D - n.length), r && (o += Ee(r)), (o += n);
    (s = e[t]), (n = s + ""), (r = D - n.length), r && (o += Ee(r));
  } else if (s === 0) return "0";
  for (; s % 10 === 0; ) s /= 10;
  return o + s;
}
function tn(e, t) {
  var r,
    n,
    i,
    o,
    s,
    a,
    f = 0,
    v = 0,
    C = e.constructor,
    T = C.precision;
  if (V(e) > 16) throw Error(mr + V(e));
  if (!e.s) return new C(ee);
  for (
    t == null ? ((B = !1), (a = T)) : (a = t), s = new C(0.03125);
    e.abs().gte(0.1);

  )
    (e = e.times(s)), (v += 5);
  for (
    n = ((Math.log(Re(2, v)) / Math.LN10) * 2 + 5) | 0,
      a += n,
      r = i = o = new C(ee),
      C.precision = a;
    ;

  ) {
    if (
      ((i = I(i.times(e), a)),
      (r = r.times(++f)),
      (s = o.plus(he(i, r, a))),
      le(s.d).slice(0, a) === le(o.d).slice(0, a))
    ) {
      for (; v--; ) o = I(o.times(o), a);
      return (C.precision = T), t == null ? ((B = !0), I(o, T)) : o;
    }
    o = s;
  }
}
function V(e) {
  for (var t = e.e * D, r = e.d[0]; r >= 10; r /= 10) t++;
  return t;
}
function cr(e, t, r) {
  if (t > e.LN10.sd())
    throw (
      ((B = !0),
      r && (e.precision = r),
      Error(re + "LN10 precision limit exceeded"))
    );
  return I(new e(e.LN10), t);
}
function Ee(e) {
  for (var t = ""; e--; ) t += "0";
  return t;
}
function Ye(e, t) {
  var r,
    n,
    i,
    o,
    s,
    a,
    f,
    v,
    C,
    T = 1,
    O = 10,
    R = e,
    k = R.d,
    S = R.constructor,
    L = S.precision;
  if (R.s < 1) throw Error(re + (R.s ? "NaN" : "-Infinity"));
  if (R.eq(ee)) return new S(0);
  if ((t == null ? ((B = !1), (v = L)) : (v = t), R.eq(10)))
    return t == null && (B = !0), cr(S, v);
  if (
    ((v += O),
    (S.precision = v),
    (r = le(k)),
    (n = r.charAt(0)),
    (o = V(R)),
    Math.abs(o) < 15e14)
  ) {
    for (; (n < 7 && n != 1) || (n == 1 && r.charAt(1) > 3); )
      (R = R.times(e)), (r = le(R.d)), (n = r.charAt(0)), T++;
    (o = V(R)),
      n > 1 ? ((R = new S("0." + r)), o++) : (R = new S(n + "." + r.slice(1)));
  } else
    return (
      (f = cr(S, v + 2, L).times(o + "")),
      (R = Ye(new S(n + "." + r.slice(1)), v - O).plus(f)),
      (S.precision = L),
      t == null ? ((B = !0), I(R, L)) : R
    );
  for (
    a = s = R = he(R.minus(ee), R.plus(ee), v), C = I(R.times(R), v), i = 3;
    ;

  ) {
    if (
      ((s = I(s.times(C), v)),
      (f = a.plus(he(s, new S(i), v))),
      le(f.d).slice(0, v) === le(a.d).slice(0, v))
    )
      return (
        (a = a.times(2)),
        o !== 0 && (a = a.plus(cr(S, v + 2, L).times(o + ""))),
        (a = he(a, new S(T), v)),
        (S.precision = L),
        t == null ? ((B = !0), I(a, L)) : a
      );
    (a = f), (i += 2);
  }
}
function Yr(e, t) {
  var r, n, i;
  for (
    (r = t.indexOf(".")) > -1 && (t = t.replace(".", "")),
      (n = t.search(/e/i)) > 0
        ? (r < 0 && (r = n), (r += +t.slice(n + 1)), (t = t.substring(0, n)))
        : r < 0 && (r = t.length),
      n = 0;
    t.charCodeAt(n) === 48;

  )
    ++n;
  for (i = t.length; t.charCodeAt(i - 1) === 48; ) --i;
  if (((t = t.slice(n, i)), t)) {
    if (
      ((i -= n),
      (r = r - n - 1),
      (e.e = Fe(r / D)),
      (e.d = []),
      (n = (r + 1) % D),
      r < 0 && (n += D),
      n < i)
    ) {
      for (n && e.d.push(+t.slice(0, n)), i -= D; n < i; )
        e.d.push(+t.slice(n, (n += D)));
      (t = t.slice(n)), (n = D - t.length);
    } else n -= i;
    for (; n--; ) t += "0";
    if ((e.d.push(+t), B && (e.e > Pt || e.e < -Pt))) throw Error(mr + r);
  } else (e.s = 0), (e.e = 0), (e.d = [0]);
  return e;
}
function I(e, t, r) {
  var n,
    i,
    o,
    s,
    a,
    f,
    v,
    C,
    T = e.d;
  for (s = 1, o = T[0]; o >= 10; o /= 10) s++;
  if (((n = t - s), n < 0)) (n += D), (i = t), (v = T[(C = 0)]);
  else {
    if (((C = Math.ceil((n + 1) / D)), (o = T.length), C >= o)) return e;
    for (v = o = T[C], s = 1; o >= 10; o /= 10) s++;
    (n %= D), (i = n - D + s);
  }
  if (
    (r !== void 0 &&
      ((o = Re(10, s - i - 1)),
      (a = (v / o) % 10 | 0),
      (f = t < 0 || T[C + 1] !== void 0 || v % o),
      (f =
        r < 4
          ? (a || f) && (r == 0 || r == (e.s < 0 ? 3 : 2))
          : a > 5 ||
            (a == 5 &&
              (r == 4 ||
                f ||
                (r == 6 &&
                  (n > 0 ? (i > 0 ? v / Re(10, s - i) : 0) : T[C - 1]) % 10 &
                    1) ||
                r == (e.s < 0 ? 8 : 7))))),
    t < 1 || !T[0])
  )
    return (
      f
        ? ((o = V(e)),
          (T.length = 1),
          (t = t - o - 1),
          (T[0] = Re(10, (D - (t % D)) % D)),
          (e.e = Fe(-t / D) || 0))
        : ((T.length = 1), (T[0] = e.e = e.s = 0)),
      e
    );
  if (
    (n == 0
      ? ((T.length = C), (o = 1), C--)
      : ((T.length = C + 1),
        (o = Re(10, D - n)),
        (T[C] = i > 0 ? ((v / Re(10, s - i)) % Re(10, i) | 0) * o : 0)),
    f)
  )
    for (;;)
      if (C == 0) {
        (T[0] += o) == j && ((T[0] = 1), ++e.e);
        break;
      } else {
        if (((T[C] += o), T[C] != j)) break;
        (T[C--] = 0), (o = 1);
      }
  for (n = T.length; T[--n] === 0; ) T.pop();
  if (B && (e.e > Pt || e.e < -Pt)) throw Error(mr + V(e));
  return e;
}
function rn(e, t) {
  var r,
    n,
    i,
    o,
    s,
    a,
    f,
    v,
    C,
    T,
    O = e.constructor,
    R = O.precision;
  if (!e.s || !t.s) return t.s ? (t.s = -t.s) : (t = new O(e)), B ? I(t, R) : t;
  if (
    ((f = e.d),
    (T = t.d),
    (n = t.e),
    (v = e.e),
    (f = f.slice()),
    (s = v - n),
    s)
  ) {
    for (
      C = s < 0,
        C
          ? ((r = f), (s = -s), (a = T.length))
          : ((r = T), (n = v), (a = f.length)),
        i = Math.max(Math.ceil(R / D), a) + 2,
        s > i && ((s = i), (r.length = 1)),
        r.reverse(),
        i = s;
      i--;

    )
      r.push(0);
    r.reverse();
  } else {
    for (i = f.length, a = T.length, C = i < a, C && (a = i), i = 0; i < a; i++)
      if (f[i] != T[i]) {
        C = f[i] < T[i];
        break;
      }
    s = 0;
  }
  for (
    C && ((r = f), (f = T), (T = r), (t.s = -t.s)),
      a = f.length,
      i = T.length - a;
    i > 0;
    --i
  )
    f[a++] = 0;
  for (i = T.length; i > s; ) {
    if (f[--i] < T[i]) {
      for (o = i; o && f[--o] === 0; ) f[o] = j - 1;
      --f[o], (f[i] += j);
    }
    f[i] -= T[i];
  }
  for (; f[--a] === 0; ) f.pop();
  for (; f[0] === 0; f.shift()) --n;
  return f[0] ? ((t.d = f), (t.e = n), B ? I(t, R) : t) : new O(0);
}
function Oe(e, t, r) {
  var n,
    i = V(e),
    o = le(e.d),
    s = o.length;
  return (
    t
      ? (r && (n = r - s) > 0
          ? (o = o.charAt(0) + "." + o.slice(1) + Ee(n))
          : s > 1 && (o = o.charAt(0) + "." + o.slice(1)),
        (o = o + (i < 0 ? "e" : "e+") + i))
      : i < 0
        ? ((o = "0." + Ee(-i - 1) + o), r && (n = r - s) > 0 && (o += Ee(n)))
        : i >= s
          ? ((o += Ee(i + 1 - s)),
            r && (n = r - i - 1) > 0 && (o = o + "." + Ee(n)))
          : ((n = i + 1) < s && (o = o.slice(0, n) + "." + o.slice(n)),
            r && (n = r - s) > 0 && (i + 1 === s && (o += "."), (o += Ee(n)))),
    e.s < 0 ? "-" + o : o
  );
}
function Xr(e, t) {
  if (e.length > t) return (e.length = t), !0;
}
function nn(e) {
  var t, r, n;
  function i(o) {
    var s = this;
    if (!(s instanceof i)) return new i(o);
    if (((s.constructor = i), o instanceof i)) {
      (s.s = o.s), (s.e = o.e), (s.d = (o = o.d) ? o.slice() : o);
      return;
    }
    if (typeof o == "number") {
      if (o * 0 !== 0) throw Error(Se + o);
      if (o > 0) s.s = 1;
      else if (o < 0) (o = -o), (s.s = -1);
      else {
        (s.s = 0), (s.e = 0), (s.d = [0]);
        return;
      }
      if (o === ~~o && o < 1e7) {
        (s.e = 0), (s.d = [o]);
        return;
      }
      return Yr(s, o.toString());
    } else if (typeof o != "string") throw Error(Se + o);
    if (
      (o.charCodeAt(0) === 45 ? ((o = o.slice(1)), (s.s = -1)) : (s.s = 1),
      Qo.test(o))
    )
      Yr(s, o);
    else throw Error(Se + o);
  }
  if (
    ((i.prototype = A),
    (i.ROUND_UP = 0),
    (i.ROUND_DOWN = 1),
    (i.ROUND_CEIL = 2),
    (i.ROUND_FLOOR = 3),
    (i.ROUND_HALF_UP = 4),
    (i.ROUND_HALF_DOWN = 5),
    (i.ROUND_HALF_EVEN = 6),
    (i.ROUND_HALF_CEIL = 7),
    (i.ROUND_HALF_FLOOR = 8),
    (i.clone = nn),
    (i.config = i.set = Jo),
    e === void 0 && (e = {}),
    e)
  )
    for (
      n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0;
      t < n.length;

    )
      e.hasOwnProperty((r = n[t++])) || (e[r] = this[r]);
  return i.config(e), i;
}
function Jo(e) {
  if (!e || typeof e != "object") throw Error(re + "Object expected");
  var t,
    r,
    n,
    i = [
      "precision",
      1,
      De,
      "rounding",
      0,
      8,
      "toExpNeg",
      -1 / 0,
      0,
      "toExpPos",
      0,
      1 / 0,
    ];
  for (t = 0; t < i.length; t += 3)
    if ((n = e[(r = i[t])]) !== void 0)
      if (Fe(n) === n && n >= i[t + 1] && n <= i[t + 2]) this[r] = n;
      else throw Error(Se + r + ": " + n);
  if ((n = e[(r = "LN10")]) !== void 0)
    if (n == Math.LN10) this[r] = new this(n);
    else throw Error(Se + r + ": " + n);
  return this;
}
var De,
  jo,
  pr,
  B,
  re,
  Se,
  mr,
  Fe,
  Re,
  Qo,
  ee,
  j,
  D,
  Zr,
  Pt,
  A,
  he,
  pr,
  vt,
  on = se(() => {
    "use strict";
    u();
    c();
    m();
    p();
    d();
    l();
    (De = 1e9),
      (jo = {
        precision: 20,
        rounding: 4,
        toExpNeg: -7,
        toExpPos: 21,
        LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286",
      }),
      (B = !0),
      (re = "[DecimalError] "),
      (Se = re + "Invalid argument: "),
      (mr = re + "Exponent out of range: "),
      (Fe = Math.floor),
      (Re = Math.pow),
      (Qo = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i),
      (j = 1e7),
      (D = 7),
      (Zr = 9007199254740991),
      (Pt = Fe(Zr / D)),
      (A = {});
    A.absoluteValue = A.abs = function () {
      var e = new this.constructor(this);
      return e.s && (e.s = 1), e;
    };
    A.comparedTo = A.cmp = function (e) {
      var t,
        r,
        n,
        i,
        o = this;
      if (((e = new o.constructor(e)), o.s !== e.s)) return o.s || -e.s;
      if (o.e !== e.e) return (o.e > e.e) ^ (o.s < 0) ? 1 : -1;
      for (n = o.d.length, i = e.d.length, t = 0, r = n < i ? n : i; t < r; ++t)
        if (o.d[t] !== e.d[t]) return (o.d[t] > e.d[t]) ^ (o.s < 0) ? 1 : -1;
      return n === i ? 0 : (n > i) ^ (o.s < 0) ? 1 : -1;
    };
    A.decimalPlaces = A.dp = function () {
      var e = this,
        t = e.d.length - 1,
        r = (t - e.e) * D;
      if (((t = e.d[t]), t)) for (; t % 10 == 0; t /= 10) r--;
      return r < 0 ? 0 : r;
    };
    A.dividedBy = A.div = function (e) {
      return he(this, new this.constructor(e));
    };
    A.dividedToIntegerBy = A.idiv = function (e) {
      var t = this,
        r = t.constructor;
      return I(he(t, new r(e), 0, 1), r.precision);
    };
    A.equals = A.eq = function (e) {
      return !this.cmp(e);
    };
    A.exponent = function () {
      return V(this);
    };
    A.greaterThan = A.gt = function (e) {
      return this.cmp(e) > 0;
    };
    A.greaterThanOrEqualTo = A.gte = function (e) {
      return this.cmp(e) >= 0;
    };
    A.isInteger = A.isint = function () {
      return this.e > this.d.length - 2;
    };
    A.isNegative = A.isneg = function () {
      return this.s < 0;
    };
    A.isPositive = A.ispos = function () {
      return this.s > 0;
    };
    A.isZero = function () {
      return this.s === 0;
    };
    A.lessThan = A.lt = function (e) {
      return this.cmp(e) < 0;
    };
    A.lessThanOrEqualTo = A.lte = function (e) {
      return this.cmp(e) < 1;
    };
    A.logarithm = A.log = function (e) {
      var t,
        r = this,
        n = r.constructor,
        i = n.precision,
        o = i + 5;
      if (e === void 0) e = new n(10);
      else if (((e = new n(e)), e.s < 1 || e.eq(ee))) throw Error(re + "NaN");
      if (r.s < 1) throw Error(re + (r.s ? "NaN" : "-Infinity"));
      return r.eq(ee)
        ? new n(0)
        : ((B = !1), (t = he(Ye(r, o), Ye(e, o), o)), (B = !0), I(t, i));
    };
    A.minus = A.sub = function (e) {
      var t = this;
      return (
        (e = new t.constructor(e)),
        t.s == e.s ? rn(t, e) : en(t, ((e.s = -e.s), e))
      );
    };
    A.modulo = A.mod = function (e) {
      var t,
        r = this,
        n = r.constructor,
        i = n.precision;
      if (((e = new n(e)), !e.s)) throw Error(re + "NaN");
      return r.s
        ? ((B = !1), (t = he(r, e, 0, 1).times(e)), (B = !0), r.minus(t))
        : I(new n(r), i);
    };
    A.naturalExponential = A.exp = function () {
      return tn(this);
    };
    A.naturalLogarithm = A.ln = function () {
      return Ye(this);
    };
    A.negated = A.neg = function () {
      var e = new this.constructor(this);
      return (e.s = -e.s || 0), e;
    };
    A.plus = A.add = function (e) {
      var t = this;
      return (
        (e = new t.constructor(e)),
        t.s == e.s ? en(t, e) : rn(t, ((e.s = -e.s), e))
      );
    };
    A.precision = A.sd = function (e) {
      var t,
        r,
        n,
        i = this;
      if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(Se + e);
      if (
        ((t = V(i) + 1), (n = i.d.length - 1), (r = n * D + 1), (n = i.d[n]), n)
      ) {
        for (; n % 10 == 0; n /= 10) r--;
        for (n = i.d[0]; n >= 10; n /= 10) r++;
      }
      return e && t > r ? t : r;
    };
    A.squareRoot = A.sqrt = function () {
      var e,
        t,
        r,
        n,
        i,
        o,
        s,
        a = this,
        f = a.constructor;
      if (a.s < 1) {
        if (!a.s) return new f(0);
        throw Error(re + "NaN");
      }
      for (
        e = V(a),
          B = !1,
          i = Math.sqrt(+a),
          i == 0 || i == 1 / 0
            ? ((t = le(a.d)),
              (t.length + e) % 2 == 0 && (t += "0"),
              (i = Math.sqrt(t)),
              (e = Fe((e + 1) / 2) - (e < 0 || e % 2)),
              i == 1 / 0
                ? (t = "5e" + e)
                : ((t = i.toExponential()),
                  (t = t.slice(0, t.indexOf("e") + 1) + e)),
              (n = new f(t)))
            : (n = new f(i.toString())),
          r = f.precision,
          i = s = r + 3;
        ;

      )
        if (
          ((o = n),
          (n = o.plus(he(a, o, s + 2)).times(0.5)),
          le(o.d).slice(0, s) === (t = le(n.d)).slice(0, s))
        ) {
          if (((t = t.slice(s - 3, s + 1)), i == s && t == "4999")) {
            if ((I(o, r + 1, 0), o.times(o).eq(a))) {
              n = o;
              break;
            }
          } else if (t != "9999") break;
          s += 4;
        }
      return (B = !0), I(n, r);
    };
    A.times = A.mul = function (e) {
      var t,
        r,
        n,
        i,
        o,
        s,
        a,
        f,
        v,
        C = this,
        T = C.constructor,
        O = C.d,
        R = (e = new T(e)).d;
      if (!C.s || !e.s) return new T(0);
      for (
        e.s *= C.s,
          r = C.e + e.e,
          f = O.length,
          v = R.length,
          f < v && ((o = O), (O = R), (R = o), (s = f), (f = v), (v = s)),
          o = [],
          s = f + v,
          n = s;
        n--;

      )
        o.push(0);
      for (n = v; --n >= 0; ) {
        for (t = 0, i = f + n; i > n; )
          (a = o[i] + R[n] * O[i - n - 1] + t),
            (o[i--] = a % j | 0),
            (t = (a / j) | 0);
        o[i] = (o[i] + t) % j | 0;
      }
      for (; !o[--s]; ) o.pop();
      return (
        t ? ++r : o.shift(), (e.d = o), (e.e = r), B ? I(e, T.precision) : e
      );
    };
    A.toDecimalPlaces = A.todp = function (e, t) {
      var r = this,
        n = r.constructor;
      return (
        (r = new n(r)),
        e === void 0
          ? r
          : (ue(e, 0, De),
            t === void 0 ? (t = n.rounding) : ue(t, 0, 8),
            I(r, e + V(r) + 1, t))
      );
    };
    A.toExponential = function (e, t) {
      var r,
        n = this,
        i = n.constructor;
      return (
        e === void 0
          ? (r = Oe(n, !0))
          : (ue(e, 0, De),
            t === void 0 ? (t = i.rounding) : ue(t, 0, 8),
            (n = I(new i(n), e + 1, t)),
            (r = Oe(n, !0, e + 1))),
        r
      );
    };
    A.toFixed = function (e, t) {
      var r,
        n,
        i = this,
        o = i.constructor;
      return e === void 0
        ? Oe(i)
        : (ue(e, 0, De),
          t === void 0 ? (t = o.rounding) : ue(t, 0, 8),
          (n = I(new o(i), e + V(i) + 1, t)),
          (r = Oe(n.abs(), !1, e + V(n) + 1)),
          i.isneg() && !i.isZero() ? "-" + r : r);
    };
    A.toInteger = A.toint = function () {
      var e = this,
        t = e.constructor;
      return I(new t(e), V(e) + 1, t.rounding);
    };
    A.toNumber = function () {
      return +this;
    };
    A.toPower = A.pow = function (e) {
      var t,
        r,
        n,
        i,
        o,
        s,
        a = this,
        f = a.constructor,
        v = 12,
        C = +(e = new f(e));
      if (!e.s) return new f(ee);
      if (((a = new f(a)), !a.s)) {
        if (e.s < 1) throw Error(re + "Infinity");
        return a;
      }
      if (a.eq(ee)) return a;
      if (((n = f.precision), e.eq(ee))) return I(a, n);
      if (((t = e.e), (r = e.d.length - 1), (s = t >= r), (o = a.s), s)) {
        if ((r = C < 0 ? -C : C) <= Zr) {
          for (
            i = new f(ee), t = Math.ceil(n / D + 4), B = !1;
            r % 2 && ((i = i.times(a)), Xr(i.d, t)), (r = Fe(r / 2)), r !== 0;

          )
            (a = a.times(a)), Xr(a.d, t);
          return (B = !0), e.s < 0 ? new f(ee).div(i) : I(i, n);
        }
      } else if (o < 0) throw Error(re + "NaN");
      return (
        (o = o < 0 && e.d[Math.max(t, r)] & 1 ? -1 : 1),
        (a.s = 1),
        (B = !1),
        (i = e.times(Ye(a, n + v))),
        (B = !0),
        (i = tn(i)),
        (i.s = o),
        i
      );
    };
    A.toPrecision = function (e, t) {
      var r,
        n,
        i = this,
        o = i.constructor;
      return (
        e === void 0
          ? ((r = V(i)), (n = Oe(i, r <= o.toExpNeg || r >= o.toExpPos)))
          : (ue(e, 1, De),
            t === void 0 ? (t = o.rounding) : ue(t, 0, 8),
            (i = I(new o(i), e, t)),
            (r = V(i)),
            (n = Oe(i, e <= r || r <= o.toExpNeg, e))),
        n
      );
    };
    A.toSignificantDigits = A.tosd = function (e, t) {
      var r = this,
        n = r.constructor;
      return (
        e === void 0
          ? ((e = n.precision), (t = n.rounding))
          : (ue(e, 1, De), t === void 0 ? (t = n.rounding) : ue(t, 0, 8)),
        I(new n(r), e, t)
      );
    };
    A.toString =
      A.valueOf =
      A.val =
      A.toJSON =
      A[Symbol.for("nodejs.util.inspect.custom")] =
        function () {
          var e = this,
            t = V(e),
            r = e.constructor;
          return Oe(e, t <= r.toExpNeg || t >= r.toExpPos);
        };
    he = (function () {
      function e(n, i) {
        var o,
          s = 0,
          a = n.length;
        for (n = n.slice(); a--; )
          (o = n[a] * i + s), (n[a] = o % j | 0), (s = (o / j) | 0);
        return s && n.unshift(s), n;
      }
      function t(n, i, o, s) {
        var a, f;
        if (o != s) f = o > s ? 1 : -1;
        else
          for (a = f = 0; a < o; a++)
            if (n[a] != i[a]) {
              f = n[a] > i[a] ? 1 : -1;
              break;
            }
        return f;
      }
      function r(n, i, o) {
        for (var s = 0; o--; )
          (n[o] -= s), (s = n[o] < i[o] ? 1 : 0), (n[o] = s * j + n[o] - i[o]);
        for (; !n[0] && n.length > 1; ) n.shift();
      }
      return function (n, i, o, s) {
        var a,
          f,
          v,
          C,
          T,
          O,
          R,
          k,
          S,
          L,
          ie,
          z,
          N,
          Y,
          Te,
          sr,
          oe,
          bt,
          wt = n.constructor,
          Oo = n.s == i.s ? 1 : -1,
          ae = n.d,
          U = i.d;
        if (!n.s) return new wt(n);
        if (!i.s) throw Error(re + "Division by zero");
        for (
          f = n.e - i.e,
            oe = U.length,
            Te = ae.length,
            R = new wt(Oo),
            k = R.d = [],
            v = 0;
          U[v] == (ae[v] || 0);

        )
          ++v;
        if (
          (U[v] > (ae[v] || 0) && --f,
          o == null
            ? (z = o = wt.precision)
            : s
              ? (z = o + (V(n) - V(i)) + 1)
              : (z = o),
          z < 0)
        )
          return new wt(0);
        if (((z = (z / D + 2) | 0), (v = 0), oe == 1))
          for (C = 0, U = U[0], z++; (v < Te || C) && z--; v++)
            (N = C * j + (ae[v] || 0)), (k[v] = (N / U) | 0), (C = N % U | 0);
        else {
          for (
            C = (j / (U[0] + 1)) | 0,
              C > 1 &&
                ((U = e(U, C)),
                (ae = e(ae, C)),
                (oe = U.length),
                (Te = ae.length)),
              Y = oe,
              S = ae.slice(0, oe),
              L = S.length;
            L < oe;

          )
            S[L++] = 0;
          (bt = U.slice()), bt.unshift(0), (sr = U[0]), U[1] >= j / 2 && ++sr;
          do
            (C = 0),
              (a = t(U, S, oe, L)),
              a < 0
                ? ((ie = S[0]),
                  oe != L && (ie = ie * j + (S[1] || 0)),
                  (C = (ie / sr) | 0),
                  C > 1
                    ? (C >= j && (C = j - 1),
                      (T = e(U, C)),
                      (O = T.length),
                      (L = S.length),
                      (a = t(T, S, O, L)),
                      a == 1 && (C--, r(T, oe < O ? bt : U, O)))
                    : (C == 0 && (a = C = 1), (T = U.slice())),
                  (O = T.length),
                  O < L && T.unshift(0),
                  r(S, T, L),
                  a == -1 &&
                    ((L = S.length),
                    (a = t(U, S, oe, L)),
                    a < 1 && (C++, r(S, oe < L ? bt : U, L))),
                  (L = S.length))
                : a === 0 && (C++, (S = [0])),
              (k[v++] = C),
              a && S[0] ? (S[L++] = ae[Y] || 0) : ((S = [ae[Y]]), (L = 1));
          while ((Y++ < Te || S[0] !== void 0) && z--);
        }
        return k[0] || k.shift(), (R.e = f), I(R, s ? o + V(R) + 1 : o);
      };
    })();
    pr = nn(jo);
    ee = new pr(1);
    vt = pr;
  });
var P,
  ce,
  l = se(() => {
    "use strict";
    on();
    (P = class extends vt {
      static isDecimal(t) {
        return t instanceof vt;
      }
      static random(t = 20) {
        {
          let n = crypto
            .getRandomValues(new Uint8Array(t))
            .reduce((i, o) => i + o, "");
          return new vt(`0.${n.slice(0, t)}`);
        }
      }
    }),
      (ce = P);
  });
function Wo() {
  return !1;
}
var Go,
  Ko,
  un,
  cn = se(() => {
    "use strict";
    u();
    c();
    m();
    p();
    d();
    l();
    (Go = {}), (Ko = { existsSync: Wo, promises: Go }), (un = Ko);
  });
var xn = Ae((Au, En) => {
  "use strict";
  u();
  c();
  m();
  p();
  d();
  l();
  En.exports = (yr(), ar(hr)).format;
});
var hr = {};
ze(hr, {
  default: () => Yo,
  deprecate: () => vn,
  format: () => Tn,
  inspect: () => Cn,
  promisify: () => Pn,
});
function Pn(e) {
  return (...t) =>
    new Promise((r, n) => {
      e(...t, (i, o) => {
        i ? n(i) : r(o);
      });
    });
}
function vn(e, t) {
  return (...r) => (console.warn(t), e(...r));
}
function Cn(e) {
  return JSON.stringify(e, (t, r) =>
    typeof r == "function"
      ? r.toString()
      : typeof r == "bigint"
        ? `${r}n`
        : r instanceof Error
          ? { ...r, message: r.message, stack: r.stack }
          : r,
  );
}
var Tn,
  zo,
  Yo,
  yr = se(() => {
    "use strict";
    u();
    c();
    m();
    p();
    d();
    l();
    (Tn = xn()),
      (zo = { promisify: Pn, deprecate: vn, inspect: Cn, format: Tn }),
      (Yo = zo);
  });
function rs(...e) {
  return e.join("/");
}
function ns(...e) {
  return e.join("/");
}
var On,
  is,
  os,
  Ze,
  kn = se(() => {
    "use strict";
    u();
    c();
    m();
    p();
    d();
    l();
    (On = "/"),
      (is = { sep: On }),
      (os = { resolve: rs, posix: is, join: ns, sep: On }),
      (Ze = os);
  });
var St,
  Mn = se(() => {
    "use strict";
    u();
    c();
    m();
    p();
    d();
    l();
    St = class {
      constructor() {
        this.events = {};
      }
      on(t, r) {
        return (
          this.events[t] || (this.events[t] = []), this.events[t].push(r), this
        );
      }
      emit(t, ...r) {
        return this.events[t]
          ? (this.events[t].forEach((n) => {
              n(...r);
            }),
            !0)
          : !1;
      }
    };
  });
var _n = Ae((Kc, In) => {
  "use strict";
  u();
  c();
  m();
  p();
  d();
  l();
  In.exports = (e, t = 1, r) => {
    if (
      ((r = { indent: " ", includeEmptyLines: !1, ...r }), typeof e != "string")
    )
      throw new TypeError(
        `Expected \`input\` to be a \`string\`, got \`${typeof e}\``,
      );
    if (typeof t != "number")
      throw new TypeError(
        `Expected \`count\` to be a \`number\`, got \`${typeof t}\``,
      );
    if (typeof r.indent != "string")
      throw new TypeError(
        `Expected \`options.indent\` to be a \`string\`, got \`${typeof r.indent}\``,
      );
    if (t === 0) return e;
    let n = r.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
    return e.replace(n, r.indent.repeat(t));
  };
});
var Nn = Ae((lm, Fn) => {
  "use strict";
  u();
  c();
  m();
  p();
  d();
  l();
  Fn.exports = ({ onlyFirst: e = !1 } = {}) => {
    let t = [
      "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
      "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))",
    ].join("|");
    return new RegExp(t, e ? void 0 : "g");
  };
});
var Un = Ae((gm, Bn) => {
  "use strict";
  u();
  c();
  m();
  p();
  d();
  l();
  var ms = Nn();
  Bn.exports = (e) => (typeof e == "string" ? e.replace(ms(), "") : e);
});
var jn = Ae((Jf, gs) => {
  gs.exports = {
    name: "@prisma/engines-version",
    version: "5.13.0-23.b9a39a7ee606c28e3455d0fd60e78c3ba82b1a2b",
    main: "index.js",
    types: "index.d.ts",
    license: "Apache-2.0",
    author: "Tim Suchanek <suchanek@prisma.io>",
    prisma: { enginesVersion: "b9a39a7ee606c28e3455d0fd60e78c3ba82b1a2b" },
    repository: {
      type: "git",
      url: "https://github.com/prisma/engines-wrapper.git",
      directory: "packages/engines-version",
    },
    devDependencies: { "@types/node": "18.19.29", typescript: "4.9.5" },
    files: ["index.js", "index.d.ts"],
    scripts: { build: "tsc -d" },
  };
});
var Qn = Ae(() => {
  "use strict";
  u();
  c();
  m();
  p();
  d();
  l();
});
var Ur = Ae((ST, Fi) => {
  "use strict";
  u();
  c();
  m();
  p();
  d();
  l();
  Fi.exports = (function () {
    function e(t, r, n, i, o) {
      return t < r || n < r ? (t > n ? n + 1 : t + 1) : i === o ? r : r + 1;
    }
    return function (t, r) {
      if (t === r) return 0;
      if (t.length > r.length) {
        var n = t;
        (t = r), (r = n);
      }
      for (
        var i = t.length, o = r.length;
        i > 0 && t.charCodeAt(i - 1) === r.charCodeAt(o - 1);

      )
        i--, o--;
      for (var s = 0; s < i && t.charCodeAt(s) === r.charCodeAt(s); ) s++;
      if (((i -= s), (o -= s), i === 0 || o < 3)) return o;
      var a = 0,
        f,
        v,
        C,
        T,
        O,
        R,
        k,
        S,
        L,
        ie,
        z,
        N,
        Y = [];
      for (f = 0; f < i; f++) Y.push(f + 1), Y.push(t.charCodeAt(s + f));
      for (var Te = Y.length - 1; a < o - 3; )
        for (
          L = r.charCodeAt(s + (v = a)),
            ie = r.charCodeAt(s + (C = a + 1)),
            z = r.charCodeAt(s + (T = a + 2)),
            N = r.charCodeAt(s + (O = a + 3)),
            R = a += 4,
            f = 0;
          f < Te;
          f += 2
        )
          (k = Y[f]),
            (S = Y[f + 1]),
            (v = e(k, v, C, L, S)),
            (C = e(v, C, T, ie, S)),
            (T = e(C, T, O, z, S)),
            (R = e(T, O, R, N, S)),
            (Y[f] = R),
            (O = T),
            (T = C),
            (C = v),
            (v = k);
      for (; a < o; )
        for (L = r.charCodeAt(s + (v = a)), R = ++a, f = 0; f < Te; f += 2)
          (k = Y[f]), (Y[f] = R = e(k, v, R, L, Y[f + 1])), (v = k);
      return R;
    };
  })();
});
var Ya = {};
ze(Ya, {
  Debug: () => wr,
  Decimal: () => ce,
  Extensions: () => dr,
  MetricsClient: () => Ue,
  NotFoundError: () => ye,
  PrismaClientInitializationError: () => M,
  PrismaClientKnownRequestError: () => Q,
  PrismaClientRustPanicError: () => be,
  PrismaClientUnknownRequestError: () => J,
  PrismaClientValidationError: () => W,
  Public: () => fr,
  Sql: () => Z,
  defineDmmfProperty: () => qn,
  empty: () => Wn,
  getPrismaClient: () => Ao,
  getRuntime: () => ve,
  join: () => Jn,
  makeStrictEnum: () => Ro,
  objectEnumValues: () => Lt,
  raw: () => kr,
  sqltag: () => Lr,
  warnEnvConflicts: () => void 0,
  warnOnce: () => nt,
});
module.exports = ar(Ya);
u();
c();
m();
p();
d();
l();
var dr = {};
ze(dr, { defineExtension: () => sn, getExtensionContext: () => an });
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
function sn(e) {
  return typeof e == "function" ? e : (t) => t.$extends(e);
}
u();
c();
m();
p();
d();
l();
function an(e) {
  return e;
}
var fr = {};
ze(fr, { validator: () => ln });
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
function ln(...e) {
  return (t) => t;
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
var gr,
  mn,
  pn,
  dn,
  fn = !0;
typeof g < "u" &&
  (({
    FORCE_COLOR: gr,
    NODE_DISABLE_COLORS: mn,
    NO_COLOR: pn,
    TERM: dn,
  } = g.env || {}),
  (fn = g.stdout && g.stdout.isTTY));
var Ho = {
  enabled:
    !mn && pn == null && dn !== "dumb" && ((gr != null && gr !== "0") || fn),
};
function _(e, t) {
  let r = new RegExp(`\\x1b\\[${t}m`, "g"),
    n = `\x1B[${e}m`,
    i = `\x1B[${t}m`;
  return function (o) {
    return !Ho.enabled || o == null
      ? o
      : n + (~("" + o).indexOf(i) ? o.replace(r, i + n) : o) + i;
  };
}
var ru = _(0, 0),
  Ct = _(1, 22),
  Tt = _(2, 22),
  nu = _(3, 23),
  gn = _(4, 24),
  iu = _(7, 27),
  ou = _(8, 28),
  su = _(9, 29),
  au = _(30, 39),
  Ne = _(31, 39),
  hn = _(32, 39),
  At = _(33, 39),
  yn = _(34, 39),
  lu = _(35, 39),
  bn = _(36, 39),
  uu = _(37, 39),
  wn = _(90, 39),
  cu = _(90, 39),
  mu = _(40, 49),
  pu = _(41, 49),
  du = _(42, 49),
  fu = _(43, 49),
  gu = _(44, 49),
  hu = _(45, 49),
  yu = _(46, 49),
  bu = _(47, 49);
u();
c();
m();
p();
d();
l();
var Xo = 100,
  An = ["green", "yellow", "blue", "magenta", "cyan", "red"],
  Rt = [],
  Rn = Date.now(),
  Zo = 0,
  br = typeof g < "u" ? g.env : {};
globalThis.DEBUG ??= br.DEBUG ?? "";
globalThis.DEBUG_COLORS ??= br.DEBUG_COLORS ? br.DEBUG_COLORS === "true" : !0;
var Xe = {
  enable(e) {
    typeof e == "string" && (globalThis.DEBUG = e);
  },
  disable() {
    let e = globalThis.DEBUG;
    return (globalThis.DEBUG = ""), e;
  },
  enabled(e) {
    let t = globalThis.DEBUG.split(",").map((i) =>
        i.replace(/[.+?^${}()|[\]\\]/g, "\\$&"),
      ),
      r = t.some((i) =>
        i === "" || i[0] === "-"
          ? !1
          : e.match(RegExp(i.split("*").join(".*") + "$")),
      ),
      n = t.some((i) =>
        i === "" || i[0] !== "-"
          ? !1
          : e.match(RegExp(i.slice(1).split("*").join(".*") + "$")),
      );
    return r && !n;
  },
  log: (...e) => {
    let [t, r, ...n] = e,
      i;
    typeof require == "function" &&
    typeof g < "u" &&
    typeof g.stderr < "u" &&
    typeof g.stderr.write == "function"
      ? (i = (...o) => {
          try {
            let s = (yr(), ar(hr));
            g.stderr.write(
              s.format(...o) +
                `
`,
            );
          } catch {
            i = console.warn ?? console.log;
          }
        })
      : (i = console.warn ?? console.log),
      i(`${t} ${r}`, ...n);
  },
  formatters: {},
};
function es(e) {
  let t = {
      color: An[Zo++ % An.length],
      enabled: Xe.enabled(e),
      namespace: e,
      log: Xe.log,
      extend: () => {},
    },
    r = (...n) => {
      let { enabled: i, namespace: o, color: s, log: a } = t;
      if (
        (n.length !== 0 && Rt.push([o, ...n]),
        Rt.length > Xo && Rt.shift(),
        Xe.enabled(o) || i)
      ) {
        let f = n.map((C) => (typeof C == "string" ? C : ts(C))),
          v = `+${Date.now() - Rn}ms`;
        (Rn = Date.now()), a(o, ...f, v);
      }
    };
  return new Proxy(r, { get: (n, i) => t[i], set: (n, i, o) => (t[i] = o) });
}
var wr = new Proxy(es, { get: (e, t) => Xe[t], set: (e, t, r) => (Xe[t] = r) });
function ts(e, t = 2) {
  let r = new Set();
  return JSON.stringify(
    e,
    (n, i) => {
      if (typeof i == "object" && i !== null) {
        if (r.has(i)) return "[Circular *]";
        r.add(i);
      } else if (typeof i == "bigint") return i.toString();
      return i;
    },
    t,
  );
}
function Sn() {
  Rt.length = 0;
}
var te = wr;
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
var Er = [
  "darwin",
  "darwin-arm64",
  "debian-openssl-1.0.x",
  "debian-openssl-1.1.x",
  "debian-openssl-3.0.x",
  "rhel-openssl-1.0.x",
  "rhel-openssl-1.1.x",
  "rhel-openssl-3.0.x",
  "linux-arm64-openssl-1.1.x",
  "linux-arm64-openssl-1.0.x",
  "linux-arm64-openssl-3.0.x",
  "linux-arm-openssl-1.1.x",
  "linux-arm-openssl-1.0.x",
  "linux-arm-openssl-3.0.x",
  "linux-musl",
  "linux-musl-openssl-3.0.x",
  "linux-musl-arm64-openssl-1.1.x",
  "linux-musl-arm64-openssl-3.0.x",
  "linux-nixos",
  "linux-static-x64",
  "linux-static-arm64",
  "windows",
  "freebsd11",
  "freebsd12",
  "freebsd13",
  "freebsd14",
  "freebsd15",
  "openbsd",
  "netbsd",
  "arm",
];
u();
c();
m();
p();
d();
l();
var Ln = "library";
function et(e) {
  let t = ss();
  return (
    t ||
    (e?.config.engineType === "library"
      ? "library"
      : e?.config.engineType === "binary"
        ? "binary"
        : Ln)
  );
}
function ss() {
  let e = g.env.PRISMA_CLIENT_ENGINE_TYPE;
  return e === "library" ? "library" : e === "binary" ? "binary" : void 0;
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
var ke;
((t) => {
  let e;
  ((N) => (
    (N.findUnique = "findUnique"),
    (N.findUniqueOrThrow = "findUniqueOrThrow"),
    (N.findFirst = "findFirst"),
    (N.findFirstOrThrow = "findFirstOrThrow"),
    (N.findMany = "findMany"),
    (N.create = "create"),
    (N.createMany = "createMany"),
    (N.update = "update"),
    (N.updateMany = "updateMany"),
    (N.upsert = "upsert"),
    (N.delete = "delete"),
    (N.deleteMany = "deleteMany"),
    (N.groupBy = "groupBy"),
    (N.count = "count"),
    (N.aggregate = "aggregate"),
    (N.findRaw = "findRaw"),
    (N.aggregateRaw = "aggregateRaw")
  ))((e = t.ModelAction ||= {}));
})((ke ||= {}));
var rt = {};
ze(rt, {
  error: () => us,
  info: () => ls,
  log: () => as,
  query: () => cs,
  should: () => Dn,
  tags: () => tt,
  warn: () => xr,
});
u();
c();
m();
p();
d();
l();
var tt = {
    error: Ne("prisma:error"),
    warn: At("prisma:warn"),
    info: bn("prisma:info"),
    query: yn("prisma:query"),
  },
  Dn = { warn: () => !g.env.PRISMA_DISABLE_WARNINGS };
function as(...e) {
  console.log(...e);
}
function xr(e, ...t) {
  Dn.warn() && console.warn(`${tt.warn} ${e}`, ...t);
}
function ls(e, ...t) {
  console.info(`${tt.info} ${e}`, ...t);
}
function us(e, ...t) {
  console.error(`${tt.error} ${e}`, ...t);
}
function cs(e, ...t) {
  console.log(`${tt.query} ${e}`, ...t);
}
u();
c();
m();
p();
d();
l();
function Ot(e, t) {
  if (!e)
    throw new Error(
      `${t}. This should never happen. If you see this error, please, open an issue at https://pris.ly/prisma-prisma-bug-report`,
    );
}
u();
c();
m();
p();
d();
l();
function Le(e, t) {
  throw new Error(t);
}
u();
c();
m();
p();
d();
l();
function Pr(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
u();
c();
m();
p();
d();
l();
var vr = (e, t) => e.reduce((r, n) => ((r[t(n)] = n), r), {});
u();
c();
m();
p();
d();
l();
function Be(e, t) {
  let r = {};
  for (let n of Object.keys(e)) r[n] = t(e[n], n);
  return r;
}
u();
c();
m();
p();
d();
l();
function Cr(e, t) {
  if (e.length === 0) return;
  let r = e[0];
  for (let n = 1; n < e.length; n++) t(r, e[n]) < 0 && (r = e[n]);
  return r;
}
u();
c();
m();
p();
d();
l();
function K(e, t) {
  Object.defineProperty(e, "name", { value: t, configurable: !0 });
}
u();
c();
m();
p();
d();
l();
var $n = new Set(),
  nt = (e, t, ...r) => {
    $n.has(e) || ($n.add(e), xr(t, ...r));
  };
u();
c();
m();
p();
d();
l();
var Q = class extends Error {
  constructor(t, { code: r, clientVersion: n, meta: i, batchRequestIdx: o }) {
    super(t),
      (this.name = "PrismaClientKnownRequestError"),
      (this.code = r),
      (this.clientVersion = n),
      (this.meta = i),
      Object.defineProperty(this, "batchRequestIdx", {
        value: o,
        enumerable: !1,
        writable: !0,
      });
  }
  get [Symbol.toStringTag]() {
    return "PrismaClientKnownRequestError";
  }
};
K(Q, "PrismaClientKnownRequestError");
var ye = class extends Q {
  constructor(t, r) {
    super(t, { code: "P2025", clientVersion: r }),
      (this.name = "NotFoundError");
  }
};
K(ye, "NotFoundError");
u();
c();
m();
p();
d();
l();
var M = class e extends Error {
  constructor(t, r, n) {
    super(t),
      (this.name = "PrismaClientInitializationError"),
      (this.clientVersion = r),
      (this.errorCode = n),
      Error.captureStackTrace(e);
  }
  get [Symbol.toStringTag]() {
    return "PrismaClientInitializationError";
  }
};
K(M, "PrismaClientInitializationError");
u();
c();
m();
p();
d();
l();
var be = class extends Error {
  constructor(t, r) {
    super(t),
      (this.name = "PrismaClientRustPanicError"),
      (this.clientVersion = r);
  }
  get [Symbol.toStringTag]() {
    return "PrismaClientRustPanicError";
  }
};
K(be, "PrismaClientRustPanicError");
u();
c();
m();
p();
d();
l();
var J = class extends Error {
  constructor(t, { clientVersion: r, batchRequestIdx: n }) {
    super(t),
      (this.name = "PrismaClientUnknownRequestError"),
      (this.clientVersion = r),
      Object.defineProperty(this, "batchRequestIdx", {
        value: n,
        writable: !0,
        enumerable: !1,
      });
  }
  get [Symbol.toStringTag]() {
    return "PrismaClientUnknownRequestError";
  }
};
K(J, "PrismaClientUnknownRequestError");
u();
c();
m();
p();
d();
l();
var W = class extends Error {
  constructor(r, { clientVersion: n }) {
    super(r);
    this.name = "PrismaClientValidationError";
    this.clientVersion = n;
  }
  get [Symbol.toStringTag]() {
    return "PrismaClientValidationError";
  }
};
K(W, "PrismaClientValidationError");
u();
c();
m();
p();
d();
l();
var Ue = class {
  constructor(t) {
    this._engine = t;
  }
  prometheus(t) {
    return this._engine.metrics({ format: "prometheus", ...t });
  }
  json(t) {
    return this._engine.metrics({ format: "json", ...t });
  }
};
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
function it(e) {
  let t;
  return {
    get() {
      return t || (t = { value: e() }), t.value;
    },
  };
}
function qn(e, t) {
  let r = it(() => ps(t));
  Object.defineProperty(e, "dmmf", { get: () => r.get() });
}
function ps(e) {
  throw new Error(
    "Prisma.dmmf is not available when running in edge runtimes.",
  );
}
function Tr(e) {
  return Object.entries(e).map(([t, r]) => ({ name: t, ...r }));
}
u();
c();
m();
p();
d();
l();
var kt = Symbol(),
  Ar = new WeakMap(),
  we = class {
    constructor(t) {
      t === kt
        ? Ar.set(this, `Prisma.${this._getName()}`)
        : Ar.set(
            this,
            `new Prisma.${this._getNamespace()}.${this._getName()}()`,
          );
    }
    _getName() {
      return this.constructor.name;
    }
    toString() {
      return Ar.get(this);
    }
  },
  ot = class extends we {
    _getNamespace() {
      return "NullTypes";
    }
  },
  st = class extends ot {};
Rr(st, "DbNull");
var at = class extends ot {};
Rr(at, "JsonNull");
var lt = class extends ot {};
Rr(lt, "AnyNull");
var Lt = {
  classes: { DbNull: st, JsonNull: at, AnyNull: lt },
  instances: { DbNull: new st(kt), JsonNull: new at(kt), AnyNull: new lt(kt) },
};
function Rr(e, t) {
  Object.defineProperty(e, "name", { value: t, configurable: !0 });
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
function ut(e) {
  return {
    ok: !1,
    error: e,
    map() {
      return ut(e);
    },
    flatMap() {
      return ut(e);
    },
  };
}
var Sr = class {
    constructor() {
      this.registeredErrors = [];
    }
    consumeError(t) {
      return this.registeredErrors[t];
    }
    registerNewError(t) {
      let r = 0;
      for (; this.registeredErrors[r] !== void 0; ) r++;
      return (this.registeredErrors[r] = { error: t }), r;
    }
  },
  Or = (e) => {
    let t = new Sr(),
      r = Me(t, e.startTransaction.bind(e)),
      n = {
        adapterName: e.adapterName,
        errorRegistry: t,
        queryRaw: Me(t, e.queryRaw.bind(e)),
        executeRaw: Me(t, e.executeRaw.bind(e)),
        provider: e.provider,
        startTransaction: async (...i) => (await r(...i)).map((s) => ds(t, s)),
      };
    return (
      e.getConnectionInfo &&
        (n.getConnectionInfo = fs(t, e.getConnectionInfo.bind(e))),
      n
    );
  },
  ds = (e, t) => ({
    adapterName: t.adapterName,
    provider: t.provider,
    options: t.options,
    queryRaw: Me(e, t.queryRaw.bind(t)),
    executeRaw: Me(e, t.executeRaw.bind(t)),
    commit: Me(e, t.commit.bind(t)),
    rollback: Me(e, t.rollback.bind(t)),
  });
function Me(e, t) {
  return async (...r) => {
    try {
      return await t(...r);
    } catch (n) {
      let i = e.registerNewError(n);
      return ut({ kind: "GenericJs", id: i });
    }
  };
}
function fs(e, t) {
  return (...r) => {
    try {
      return t(...r);
    } catch (n) {
      let i = e.registerNewError(n);
      return ut({ kind: "GenericJs", id: i });
    }
  };
}
var To = _e(jn());
var cO = _e(Qn());
Mn();
cn();
kn();
u();
c();
m();
p();
d();
l();
var Z = class e {
  constructor(t, r) {
    if (t.length - 1 !== r.length)
      throw t.length === 0
        ? new TypeError("Expected at least 1 string")
        : new TypeError(
            `Expected ${t.length} strings to have ${t.length - 1} values`,
          );
    let n = r.reduce((s, a) => s + (a instanceof e ? a.values.length : 1), 0);
    (this.values = new Array(n)),
      (this.strings = new Array(n + 1)),
      (this.strings[0] = t[0]);
    let i = 0,
      o = 0;
    for (; i < r.length; ) {
      let s = r[i++],
        a = t[i];
      if (s instanceof e) {
        this.strings[o] += s.strings[0];
        let f = 0;
        for (; f < s.values.length; )
          (this.values[o++] = s.values[f++]), (this.strings[o] = s.strings[f]);
        this.strings[o] += a;
      } else (this.values[o++] = s), (this.strings[o] = a);
    }
  }
  get text() {
    let t = this.strings.length,
      r = 1,
      n = this.strings[0];
    for (; r < t; ) n += `$${r}${this.strings[r++]}`;
    return n;
  }
  get sql() {
    let t = this.strings.length,
      r = 1,
      n = this.strings[0];
    for (; r < t; ) n += `?${this.strings[r++]}`;
    return n;
  }
  get statement() {
    let t = this.strings.length,
      r = 1,
      n = this.strings[0];
    for (; r < t; ) n += `:${r}${this.strings[r++]}`;
    return n;
  }
  inspect() {
    return { text: this.text, sql: this.sql, values: this.values };
  }
};
function Jn(e, t = ",", r = "", n = "") {
  if (e.length === 0)
    throw new TypeError(
      "Expected `join([])` to be called with an array of multiple elements, but got an empty array",
    );
  return new Z([r, ...Array(e.length - 1).fill(t), n], e);
}
function kr(e) {
  return new Z([e], []);
}
var Wn = kr("");
function Lr(e, ...t) {
  return new Z(e, t);
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
function ct(e) {
  return {
    getKeys() {
      return Object.keys(e);
    },
    getPropertyValue(t) {
      return e[t];
    },
  };
}
u();
c();
m();
p();
d();
l();
function H(e, t) {
  return {
    getKeys() {
      return [e];
    },
    getPropertyValue() {
      return t();
    },
  };
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
var me = class {
  constructor() {
    this._map = new Map();
  }
  get(t) {
    return this._map.get(t)?.value;
  }
  set(t, r) {
    this._map.set(t, { value: r });
  }
  getOrCreate(t, r) {
    let n = this._map.get(t);
    if (n) return n.value;
    let i = r();
    return this.set(t, i), i;
  }
};
function Ie(e) {
  let t = new me();
  return {
    getKeys() {
      return e.getKeys();
    },
    getPropertyValue(r) {
      return t.getOrCreate(r, () => e.getPropertyValue(r));
    },
    getPropertyDescriptor(r) {
      return e.getPropertyDescriptor?.(r);
    },
  };
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
var Mt = { enumerable: !0, configurable: !0, writable: !0 };
function It(e) {
  let t = new Set(e);
  return {
    getOwnPropertyDescriptor: () => Mt,
    has: (r, n) => t.has(n),
    set: (r, n, i) => t.add(n) && Reflect.set(r, n, i),
    ownKeys: () => [...t],
  };
}
var Gn = Symbol.for("nodejs.util.inspect.custom");
function pe(e, t) {
  let r = hs(t),
    n = new Set(),
    i = new Proxy(e, {
      get(o, s) {
        if (n.has(s)) return o[s];
        let a = r.get(s);
        return a ? a.getPropertyValue(s) : o[s];
      },
      has(o, s) {
        if (n.has(s)) return !0;
        let a = r.get(s);
        return a ? a.has?.(s) ?? !0 : Reflect.has(o, s);
      },
      ownKeys(o) {
        let s = Kn(Reflect.ownKeys(o), r),
          a = Kn(Array.from(r.keys()), r);
        return [...new Set([...s, ...a, ...n])];
      },
      set(o, s, a) {
        return r.get(s)?.getPropertyDescriptor?.(s)?.writable === !1
          ? !1
          : (n.add(s), Reflect.set(o, s, a));
      },
      getOwnPropertyDescriptor(o, s) {
        let a = Reflect.getOwnPropertyDescriptor(o, s);
        if (a && !a.configurable) return a;
        let f = r.get(s);
        return f
          ? f.getPropertyDescriptor
            ? { ...Mt, ...f?.getPropertyDescriptor(s) }
            : Mt
          : a;
      },
      defineProperty(o, s, a) {
        return n.add(s), Reflect.defineProperty(o, s, a);
      },
    });
  return (
    (i[Gn] = function () {
      let o = { ...this };
      return delete o[Gn], o;
    }),
    i
  );
}
function hs(e) {
  let t = new Map();
  for (let r of e) {
    let n = r.getKeys();
    for (let i of n) t.set(i, r);
  }
  return t;
}
function Kn(e, t) {
  return e.filter((r) => t.get(r)?.has?.(r) ?? !0);
}
u();
c();
m();
p();
d();
l();
function $e(e) {
  return {
    getKeys() {
      return e;
    },
    has() {
      return !1;
    },
    getPropertyValue() {},
  };
}
u();
c();
m();
p();
d();
l();
function _t(e, t) {
  return {
    batch: e,
    transaction:
      t?.kind === "batch"
        ? { isolationLevel: t.options.isolationLevel }
        : void 0,
  };
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
var Ve = class {
  constructor(t = 0, r) {
    this.context = r;
    this.lines = [];
    this.currentLine = "";
    this.currentIndent = 0;
    this.currentIndent = t;
  }
  write(t) {
    return typeof t == "string" ? (this.currentLine += t) : t.write(this), this;
  }
  writeJoined(t, r) {
    let n = r.length - 1;
    for (let i = 0; i < r.length; i++)
      this.write(r[i]), i !== n && this.write(t);
    return this;
  }
  writeLine(t) {
    return this.write(t).newLine();
  }
  newLine() {
    this.lines.push(this.indentedCurrentLine()),
      (this.currentLine = ""),
      (this.marginSymbol = void 0);
    let t = this.afterNextNewLineCallback;
    return (this.afterNextNewLineCallback = void 0), t?.(), this;
  }
  withIndent(t) {
    return this.indent(), t(this), this.unindent(), this;
  }
  afterNextNewline(t) {
    return (this.afterNextNewLineCallback = t), this;
  }
  indent() {
    return this.currentIndent++, this;
  }
  unindent() {
    return this.currentIndent > 0 && this.currentIndent--, this;
  }
  addMarginSymbol(t) {
    return (this.marginSymbol = t), this;
  }
  toString() {
    return this.lines.concat(this.indentedCurrentLine()).join(`
`);
  }
  getCurrentLineLength() {
    return this.currentLine.length;
  }
  indentedCurrentLine() {
    let t = this.currentLine.padStart(
      this.currentLine.length + 2 * this.currentIndent,
    );
    return this.marginSymbol ? this.marginSymbol + t.slice(1) : t;
  }
};
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
function Hn(e) {
  return e.substring(0, 1).toLowerCase() + e.substring(1);
}
u();
c();
m();
p();
d();
l();
function qe(e) {
  return (
    e instanceof Date || Object.prototype.toString.call(e) === "[object Date]"
  );
}
function Dt(e) {
  return e.toString() !== "Invalid Date";
}
u();
c();
m();
p();
d();
l();
l();
function je(e) {
  return P.isDecimal(e)
    ? !0
    : e !== null &&
        typeof e == "object" &&
        typeof e.s == "number" &&
        typeof e.e == "number" &&
        typeof e.toFixed == "function" &&
        Array.isArray(e.d);
}
u();
c();
m();
p();
d();
l();
var mt = class {
  constructor(t, r, n, i, o) {
    (this.modelName = t),
      (this.name = r),
      (this.typeName = n),
      (this.isList = i),
      (this.isEnum = o);
  }
  _toGraphQLInputType() {
    let t = this.isList ? "List" : "",
      r = this.isEnum ? "Enum" : "";
    return `${t}${r}${this.typeName}FieldRefInput<${this.modelName}>`;
  }
};
function Qe(e) {
  return e instanceof mt;
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
var Ft = class {
  constructor(t) {
    this.value = t;
  }
  write(t) {
    t.write(this.value);
  }
  markAsError() {
    this.value.markAsError();
  }
};
u();
c();
m();
p();
d();
l();
var Nt = (e) => e,
  Bt = { bold: Nt, red: Nt, green: Nt, dim: Nt, enabled: !1 },
  zn = { bold: Ct, red: Ne, green: hn, dim: Tt, enabled: !0 },
  Je = {
    write(e) {
      e.writeLine(",");
    },
  };
u();
c();
m();
p();
d();
l();
var de = class {
  constructor(t) {
    this.contents = t;
    this.isUnderlined = !1;
    this.color = (t) => t;
  }
  underline() {
    return (this.isUnderlined = !0), this;
  }
  setColor(t) {
    return (this.color = t), this;
  }
  write(t) {
    let r = t.getCurrentLineLength();
    t.write(this.color(this.contents)),
      this.isUnderlined &&
        t.afterNextNewline(() => {
          t.write(" ".repeat(r)).writeLine(
            this.color("~".repeat(this.contents.length)),
          );
        });
  }
};
u();
c();
m();
p();
d();
l();
var xe = class {
  constructor() {
    this.hasError = !1;
  }
  markAsError() {
    return (this.hasError = !0), this;
  }
};
var We = class extends xe {
  constructor() {
    super(...arguments);
    this.items = [];
  }
  addItem(r) {
    return this.items.push(new Ft(r)), this;
  }
  getField(r) {
    return this.items[r];
  }
  getPrintWidth() {
    return this.items.length === 0
      ? 2
      : Math.max(...this.items.map((n) => n.value.getPrintWidth())) + 2;
  }
  write(r) {
    if (this.items.length === 0) {
      this.writeEmpty(r);
      return;
    }
    this.writeWithItems(r);
  }
  writeEmpty(r) {
    let n = new de("[]");
    this.hasError && n.setColor(r.context.colors.red).underline(), r.write(n);
  }
  writeWithItems(r) {
    let { colors: n } = r.context;
    r
      .writeLine("[")
      .withIndent(() => r.writeJoined(Je, this.items).newLine())
      .write("]"),
      this.hasError &&
        r.afterNextNewline(() => {
          r.writeLine(n.red("~".repeat(this.getPrintWidth())));
        });
  }
  asObject() {}
};
u();
c();
m();
p();
d();
l();
var Yn = ": ",
  Ut = class {
    constructor(t, r) {
      this.name = t;
      this.value = r;
      this.hasError = !1;
    }
    markAsError() {
      this.hasError = !0;
    }
    getPrintWidth() {
      return this.name.length + this.value.getPrintWidth() + Yn.length;
    }
    write(t) {
      let r = new de(this.name);
      this.hasError && r.underline().setColor(t.context.colors.red),
        t.write(r).write(Yn).write(this.value);
    }
  };
u();
c();
m();
p();
d();
l();
var $t = class e extends xe {
  constructor() {
    super(...arguments);
    this.fields = {};
    this.suggestions = [];
  }
  addField(r) {
    this.fields[r.name] = r;
  }
  addSuggestion(r) {
    this.suggestions.push(r);
  }
  getField(r) {
    return this.fields[r];
  }
  getDeepField(r) {
    let [n, ...i] = r,
      o = this.getField(n);
    if (!o) return;
    let s = o;
    for (let a of i) {
      let f;
      if (
        (s.value instanceof e
          ? (f = s.value.getField(a))
          : s.value instanceof We && (f = s.value.getField(Number(a))),
        !f)
      )
        return;
      s = f;
    }
    return s;
  }
  getDeepFieldValue(r) {
    return r.length === 0 ? this : this.getDeepField(r)?.value;
  }
  hasField(r) {
    return !!this.getField(r);
  }
  removeAllFields() {
    this.fields = {};
  }
  removeField(r) {
    delete this.fields[r];
  }
  getFields() {
    return this.fields;
  }
  isEmpty() {
    return Object.keys(this.fields).length === 0;
  }
  getFieldValue(r) {
    return this.getField(r)?.value;
  }
  getDeepSubSelectionValue(r) {
    let n = this;
    for (let i of r) {
      if (!(n instanceof e)) return;
      let o = n.getSubSelectionValue(i);
      if (!o) return;
      n = o;
    }
    return n;
  }
  getDeepSelectionParent(r) {
    let n = this.getSelectionParent();
    if (!n) return;
    let i = n;
    for (let o of r) {
      let s = i.value.getFieldValue(o);
      if (!s || !(s instanceof e)) return;
      let a = s.getSelectionParent();
      if (!a) return;
      i = a;
    }
    return i;
  }
  getSelectionParent() {
    let r = this.getField("select")?.value.asObject();
    if (r) return { kind: "select", value: r };
    let n = this.getField("include")?.value.asObject();
    if (n) return { kind: "include", value: n };
  }
  getSubSelectionValue(r) {
    return this.getSelectionParent()?.value.fields[r].value;
  }
  getPrintWidth() {
    let r = Object.values(this.fields);
    return r.length == 0 ? 2 : Math.max(...r.map((i) => i.getPrintWidth())) + 2;
  }
  write(r) {
    let n = Object.values(this.fields);
    if (n.length === 0 && this.suggestions.length === 0) {
      this.writeEmpty(r);
      return;
    }
    this.writeWithContents(r, n);
  }
  asObject() {
    return this;
  }
  writeEmpty(r) {
    let n = new de("{}");
    this.hasError && n.setColor(r.context.colors.red).underline(), r.write(n);
  }
  writeWithContents(r, n) {
    r.writeLine("{").withIndent(() => {
      r.writeJoined(Je, [...n, ...this.suggestions]).newLine();
    }),
      r.write("}"),
      this.hasError &&
        r.afterNextNewline(() => {
          r.writeLine(r.context.colors.red("~".repeat(this.getPrintWidth())));
        });
  }
};
u();
c();
m();
p();
d();
l();
var G = class extends xe {
  constructor(r) {
    super();
    this.text = r;
  }
  getPrintWidth() {
    return this.text.length;
  }
  write(r) {
    let n = new de(this.text);
    this.hasError && n.underline().setColor(r.context.colors.red), r.write(n);
  }
  asObject() {}
};
var Mr = class {
  constructor(t) {
    this.errorMessages = [];
    this.arguments = t;
  }
  write(t) {
    t.write(this.arguments);
  }
  addErrorMessage(t) {
    this.errorMessages.push(t);
  }
  renderAllMessages(t) {
    return this.errorMessages.map((r) => r(t)).join(`
`);
  }
};
function Vt(e) {
  return new Mr(Xn(e));
}
function Xn(e) {
  let t = new $t();
  for (let [r, n] of Object.entries(e)) {
    let i = new Ut(r, Zn(n));
    t.addField(i);
  }
  return t;
}
function Zn(e) {
  if (typeof e == "string") return new G(JSON.stringify(e));
  if (typeof e == "number" || typeof e == "boolean") return new G(String(e));
  if (typeof e == "bigint") return new G(`${e}n`);
  if (e === null) return new G("null");
  if (e === void 0) return new G("undefined");
  if (je(e)) return new G(`new Prisma.Decimal("${e.toFixed()}")`);
  if (e instanceof Uint8Array)
    return y.isBuffer(e)
      ? new G(`Buffer.alloc(${e.byteLength})`)
      : new G(`new Uint8Array(${e.byteLength})`);
  if (e instanceof Date) {
    let t = Dt(e) ? e.toISOString() : "Invalid Date";
    return new G(`new Date("${t}")`);
  }
  return e instanceof we
    ? new G(`Prisma.${e._getName()}`)
    : Qe(e)
      ? new G(`prisma.${Hn(e.modelName)}.$fields.${e.name}`)
      : Array.isArray(e)
        ? bs(e)
        : typeof e == "object"
          ? Xn(e)
          : new G(Object.prototype.toString.call(e));
}
function bs(e) {
  let t = new We();
  for (let r of e) t.addItem(Zn(r));
  return t;
}
function ei(e) {
  if (e === void 0) return "";
  let t = Vt(e);
  return new Ve(0, { colors: Bt }).write(t).toString();
}
u();
c();
m();
p();
d();
l();
var ws = "P2037";
function qt({ error: e, user_facing_error: t }, r, n) {
  return t.error_code
    ? new Q(Es(t, n), {
        code: t.error_code,
        clientVersion: r,
        meta: t.meta,
        batchRequestIdx: t.batch_request_idx,
      })
    : new J(e, { clientVersion: r, batchRequestIdx: t.batch_request_idx });
}
function Es(e, t) {
  let r = e.message;
  return (
    (t === "postgresql" || t === "postgres" || t === "mysql") &&
      e.error_code === ws &&
      (r += `
Prisma Accelerate has built-in connection pooling to prevent such errors: https://pris.ly/client/error-accelerate`),
    r
  );
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
var Ir = class {
  getLocation() {
    return null;
  }
};
function Pe(e) {
  return typeof $EnabledCallSite == "function" && e !== "minimal"
    ? new $EnabledCallSite()
    : new Ir();
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
var ti = { _avg: !0, _count: !0, _sum: !0, _min: !0, _max: !0 };
function Ge(e = {}) {
  let t = Ps(e);
  return Object.entries(t).reduce(
    (n, [i, o]) => (
      ti[i] !== void 0 ? (n.select[i] = { select: o }) : (n[i] = o), n
    ),
    { select: {} },
  );
}
function Ps(e = {}) {
  return typeof e._count == "boolean"
    ? { ...e, _count: { _all: e._count } }
    : e;
}
function jt(e = {}) {
  return (t) => (typeof e._count == "boolean" && (t._count = t._count._all), t);
}
function ri(e, t) {
  let r = jt(e);
  return t({ action: "aggregate", unpacker: r, argsMapper: Ge })(e);
}
u();
c();
m();
p();
d();
l();
function vs(e = {}) {
  let { select: t, ...r } = e;
  return typeof t == "object"
    ? Ge({ ...r, _count: t })
    : Ge({ ...r, _count: { _all: !0 } });
}
function Cs(e = {}) {
  return typeof e.select == "object"
    ? (t) => jt(e)(t)._count
    : (t) => jt(e)(t)._count._all;
}
function ni(e, t) {
  return t({ action: "count", unpacker: Cs(e), argsMapper: vs })(e);
}
u();
c();
m();
p();
d();
l();
function Ts(e = {}) {
  let t = Ge(e);
  if (Array.isArray(t.by))
    for (let r of t.by) typeof r == "string" && (t.select[r] = !0);
  else typeof t.by == "string" && (t.select[t.by] = !0);
  return t;
}
function As(e = {}) {
  return (t) => (
    typeof e?._count == "boolean" &&
      t.forEach((r) => {
        r._count = r._count._all;
      }),
    t
  );
}
function ii(e, t) {
  return t({ action: "groupBy", unpacker: As(e), argsMapper: Ts })(e);
}
function oi(e, t, r) {
  if (t === "aggregate") return (n) => ri(n, r);
  if (t === "count") return (n) => ni(n, r);
  if (t === "groupBy") return (n) => ii(n, r);
}
u();
c();
m();
p();
d();
l();
function si(e, t) {
  let r = t.fields.filter((i) => !i.relationName),
    n = vr(r, (i) => i.name);
  return new Proxy(
    {},
    {
      get(i, o) {
        if (o in i || typeof o == "symbol") return i[o];
        let s = n[o];
        if (s) return new mt(e, o, s.type, s.isList, s.kind === "enum");
      },
      ...It(Object.keys(n)),
    },
  );
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
var ai = (e) => (Array.isArray(e) ? e : e.split(".")),
  _r = (e, t) => ai(t).reduce((r, n) => r && r[n], e),
  li = (e, t, r) =>
    ai(t).reduceRight(
      (n, i, o, s) => Object.assign({}, _r(e, s.slice(0, o)), { [i]: n }),
      r,
    );
function Rs(e, t) {
  return e === void 0 || t === void 0 ? [] : [...t, "select", e];
}
function Ss(e, t, r) {
  return t === void 0 ? e ?? {} : li(t, r, e || !0);
}
function Dr(e, t, r, n, i, o) {
  let a = e._runtimeDataModel.models[t].fields.reduce(
    (f, v) => ({ ...f, [v.name]: v }),
    {},
  );
  return (f) => {
    let v = Pe(e._errorFormat),
      C = Rs(n, i),
      T = Ss(f, o, C),
      O = r({ dataPath: C, callsite: v })(T),
      R = Os(e, t);
    return new Proxy(O, {
      get(k, S) {
        if (!R.includes(S)) return k[S];
        let ie = [a[S].type, r, S],
          z = [C, T];
        return Dr(e, ...ie, ...z);
      },
      ...It([...R, ...Object.getOwnPropertyNames(O)]),
    });
  };
}
function Os(e, t) {
  return e._runtimeDataModel.models[t].fields
    .filter((r) => r.kind === "object")
    .map((r) => r.name);
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
var ks = _e(_n());
var Ls = {
    red: Ne,
    gray: wn,
    dim: Tt,
    bold: Ct,
    underline: gn,
    highlightSource: (e) => e.highlight(),
  },
  Ms = {
    red: (e) => e,
    gray: (e) => e,
    dim: (e) => e,
    bold: (e) => e,
    underline: (e) => e,
    highlightSource: (e) => e,
  };
function Is({ message: e, originalMethod: t, isPanic: r, callArguments: n }) {
  return {
    functionName: `prisma.${t}()`,
    message: e,
    isPanic: r ?? !1,
    callArguments: n,
  };
}
function _s(
  {
    functionName: e,
    location: t,
    message: r,
    isPanic: n,
    contextLines: i,
    callArguments: o,
  },
  s,
) {
  let a = [""],
    f = t ? " in" : ":";
  if (
    (n
      ? (a.push(
          s.red(
            `Oops, an unknown error occurred! This is ${s.bold("on us")}, you did nothing wrong.`,
          ),
        ),
        a.push(
          s.red(`It occurred in the ${s.bold(`\`${e}\``)} invocation${f}`),
        ))
      : a.push(s.red(`Invalid ${s.bold(`\`${e}\``)} invocation${f}`)),
    t && a.push(s.underline(Ds(t))),
    i)
  ) {
    a.push("");
    let v = [i.toString()];
    o && (v.push(o), v.push(s.dim(")"))), a.push(v.join("")), o && a.push("");
  } else a.push(""), o && a.push(o), a.push("");
  return (
    a.push(r),
    a.join(`
`)
  );
}
function Ds(e) {
  let t = [e.fileName];
  return (
    e.lineNumber && t.push(String(e.lineNumber)),
    e.columnNumber && t.push(String(e.columnNumber)),
    t.join(":")
  );
}
function Ke(e) {
  let t = e.showColors ? Ls : Ms,
    r;
  return (
    typeof $getTemplateParameters < "u"
      ? (r = $getTemplateParameters(e, t))
      : (r = Is(e)),
    _s(r, t)
  );
}
function ui(e, t, r, n) {
  return e === ke.ModelAction.findFirstOrThrow ||
    e === ke.ModelAction.findUniqueOrThrow
    ? Fs(t, r, n)
    : n;
}
function Fs(e, t, r) {
  return async (n) => {
    if ("rejectOnNotFound" in n.args) {
      let o = Ke({
        originalMethod: n.clientMethod,
        callsite: n.callsite,
        message: "'rejectOnNotFound' option is not supported",
      });
      throw new W(o, { clientVersion: t });
    }
    return await r(n).catch((o) => {
      throw o instanceof Q && o.code === "P2025"
        ? new ye(`No ${e} found`, t)
        : o;
    });
  };
}
u();
c();
m();
p();
d();
l();
function fe(e) {
  return e.replace(/^./, (t) => t.toLowerCase());
}
var Ns = [
    "findUnique",
    "findUniqueOrThrow",
    "findFirst",
    "findFirstOrThrow",
    "create",
    "update",
    "upsert",
    "delete",
  ],
  Bs = ["aggregate", "count", "groupBy"];
function Fr(e, t) {
  let r = e._extensions.getAllModelExtensions(t) ?? {},
    n = [
      Us(e, t),
      Vs(e, t),
      ct(r),
      H("name", () => t),
      H("$name", () => t),
      H("$parent", () => e._appliedParent),
    ];
  return pe({}, n);
}
function Us(e, t) {
  let r = fe(t),
    n = Object.keys(ke.ModelAction).concat("count");
  return {
    getKeys() {
      return n;
    },
    getPropertyValue(i) {
      let o = i,
        s = (f) => e._request(f);
      s = ui(o, t, e._clientVersion, s);
      let a = (f) => (v) => {
        let C = Pe(e._errorFormat);
        return e._createPrismaPromise((T) => {
          let O = {
            args: v,
            dataPath: [],
            action: o,
            model: t,
            clientMethod: `${r}.${i}`,
            jsModelName: r,
            transaction: T,
            callsite: C,
          };
          return s({ ...O, ...f });
        });
      };
      return Ns.includes(o) ? Dr(e, t, a) : $s(i) ? oi(e, i, a) : a({});
    },
  };
}
function $s(e) {
  return Bs.includes(e);
}
function Vs(e, t) {
  return Ie(
    H("fields", () => {
      let r = e._runtimeDataModel.models[t];
      return si(t, r);
    }),
  );
}
u();
c();
m();
p();
d();
l();
function ci(e) {
  return e.replace(/^./, (t) => t.toUpperCase());
}
var Nr = Symbol();
function pt(e) {
  let t = [qs(e), H(Nr, () => e), H("$parent", () => e._appliedParent)],
    r = e._extensions.getAllClientExtensions();
  return r && t.push(ct(r)), pe(e, t);
}
function qs(e) {
  let t = Object.keys(e._runtimeDataModel.models),
    r = t.map(fe),
    n = [...new Set(t.concat(r))];
  return Ie({
    getKeys() {
      return n;
    },
    getPropertyValue(i) {
      let o = ci(i);
      if (e._runtimeDataModel.models[o] !== void 0) return Fr(e, o);
      if (e._runtimeDataModel.models[i] !== void 0) return Fr(e, i);
    },
    getPropertyDescriptor(i) {
      if (!r.includes(i)) return { enumerable: !1 };
    },
  });
}
function mi(e) {
  return e[Nr] ? e[Nr] : e;
}
function pi(e) {
  if (typeof e == "function") return e(this);
  if (e.client?.__AccelerateEngine) {
    let r = e.client.__AccelerateEngine;
    this._originalClient._engine = new r(
      this._originalClient._accelerateEngineConfig,
    );
  }
  let t = Object.create(this._originalClient, {
    _extensions: { value: this._extensions.append(e) },
    _appliedParent: { value: this, configurable: !0 },
    $use: { value: void 0 },
    $on: { value: void 0 },
  });
  return pt(t);
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
function di({ result: e, modelName: t, select: r, omit: n, extensions: i }) {
  let o = i.getAllComputedFields(t);
  if (!o) return e;
  let s = [],
    a = [];
  for (let f of Object.values(o)) {
    if (n) {
      if (n[f.name]) continue;
      let v = f.needs.filter((C) => n[C]);
      v.length > 0 && a.push($e(v));
    } else if (r) {
      if (!r[f.name]) continue;
      let v = f.needs.filter((C) => !r[C]);
      v.length > 0 && a.push($e(v));
    }
    js(e, f.needs) && s.push(Qs(f, pe(e, s)));
  }
  return s.length > 0 || a.length > 0 ? pe(e, [...s, ...a]) : e;
}
function js(e, t) {
  return t.every((r) => Pr(e, r));
}
function Qs(e, t) {
  return Ie(H(e.name, () => e.compute(t)));
}
u();
c();
m();
p();
d();
l();
function Qt({
  visitor: e,
  result: t,
  args: r,
  runtimeDataModel: n,
  modelName: i,
}) {
  if (Array.isArray(t)) {
    for (let s = 0; s < t.length; s++)
      t[s] = Qt({
        result: t[s],
        args: r,
        modelName: i,
        runtimeDataModel: n,
        visitor: e,
      });
    return t;
  }
  let o = e(t, i, r) ?? t;
  return (
    r.include &&
      fi({
        includeOrSelect: r.include,
        result: o,
        parentModelName: i,
        runtimeDataModel: n,
        visitor: e,
      }),
    r.select &&
      fi({
        includeOrSelect: r.select,
        result: o,
        parentModelName: i,
        runtimeDataModel: n,
        visitor: e,
      }),
    o
  );
}
function fi({
  includeOrSelect: e,
  result: t,
  parentModelName: r,
  runtimeDataModel: n,
  visitor: i,
}) {
  for (let [o, s] of Object.entries(e)) {
    if (!s || t[o] == null) continue;
    let f = n.models[r].fields.find((C) => C.name === o);
    if (!f || f.kind !== "object" || !f.relationName) continue;
    let v = typeof s == "object" ? s : {};
    t[o] = Qt({
      visitor: i,
      result: t[o],
      args: v,
      modelName: f.type,
      runtimeDataModel: n,
    });
  }
}
function gi({
  result: e,
  modelName: t,
  args: r,
  extensions: n,
  runtimeDataModel: i,
}) {
  return n.isEmpty() || e == null || typeof e != "object" || !i.models[t]
    ? e
    : Qt({
        result: e,
        args: r ?? {},
        modelName: t,
        runtimeDataModel: i,
        visitor: (s, a, f) =>
          di({
            result: s,
            modelName: fe(a),
            select: f.select,
            omit: f.omit,
            extensions: n,
          }),
      });
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
l();
function hi(e) {
  if (e instanceof Z) return Js(e);
  if (Array.isArray(e)) {
    let r = [e[0]];
    for (let n = 1; n < e.length; n++) r[n] = dt(e[n]);
    return r;
  }
  let t = {};
  for (let r in e) t[r] = dt(e[r]);
  return t;
}
function Js(e) {
  return new Z(e.strings, e.values);
}
function dt(e) {
  if (typeof e != "object" || e == null || e instanceof we || Qe(e)) return e;
  if (je(e)) return new ce(e.toFixed());
  if (qe(e)) return new Date(+e);
  if (ArrayBuffer.isView(e)) return e.slice(0);
  if (Array.isArray(e)) {
    let t = e.length,
      r;
    for (r = Array(t); t--; ) r[t] = dt(e[t]);
    return r;
  }
  if (typeof e == "object") {
    let t = {};
    for (let r in e)
      r === "__proto__"
        ? Object.defineProperty(t, r, {
            value: dt(e[r]),
            configurable: !0,
            enumerable: !0,
            writable: !0,
          })
        : (t[r] = dt(e[r]));
    return t;
  }
  Le(e, "Unknown value");
}
function bi(e, t, r, n = 0) {
  return e._createPrismaPromise((i) => {
    let o = t.customDataProxyFetch;
    return (
      "transaction" in t &&
        i !== void 0 &&
        (t.transaction?.kind === "batch" && t.transaction.lock.then(),
        (t.transaction = i)),
      n === r.length
        ? e._executeRequest(t)
        : r[n]({
            model: t.model,
            operation: t.model ? t.action : t.clientMethod,
            args: hi(t.args ?? {}),
            __internalParams: t,
            query: (s, a = t) => {
              let f = a.customDataProxyFetch;
              return (
                (a.customDataProxyFetch = Pi(o, f)),
                (a.args = s),
                bi(e, a, r, n + 1)
              );
            },
          })
    );
  });
}
function wi(e, t) {
  let { jsModelName: r, action: n, clientMethod: i } = t,
    o = r ? n : i;
  if (e._extensions.isEmpty()) return e._executeRequest(t);
  let s = e._extensions.getAllQueryCallbacks(r ?? "$none", o);
  return bi(e, t, s);
}
function Ei(e) {
  return (t) => {
    let r = { requests: t },
      n = t[0].extensions.getAllBatchQueryCallbacks();
    return n.length ? xi(r, n, 0, e) : e(r);
  };
}
function xi(e, t, r, n) {
  if (r === t.length) return n(e);
  let i = e.customDataProxyFetch,
    o = e.requests[0].transaction;
  return t[r]({
    args: {
      queries: e.requests.map((s) => ({
        model: s.modelName,
        operation: s.action,
        args: s.args,
      })),
      transaction: o
        ? { isolationLevel: o.kind === "batch" ? o.isolationLevel : void 0 }
        : void 0,
    },
    __internalParams: e,
    query(s, a = e) {
      let f = a.customDataProxyFetch;
      return (a.customDataProxyFetch = Pi(i, f)), xi(a, t, r + 1, n);
    },
  });
}
var yi = (e) => e;
function Pi(e = yi, t = yi) {
  return (r) => e(t(r));
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
function Ci(e, t, r) {
  let n = fe(r);
  return !t.result || !(t.result.$allModels || t.result[n])
    ? e
    : Ws({
        ...e,
        ...vi(t.name, e, t.result.$allModels),
        ...vi(t.name, e, t.result[n]),
      });
}
function Ws(e) {
  let t = new me(),
    r = (n, i) =>
      t.getOrCreate(n, () =>
        i.has(n)
          ? [n]
          : (i.add(n), e[n] ? e[n].needs.flatMap((o) => r(o, i)) : [n]),
      );
  return Be(e, (n) => ({ ...n, needs: r(n.name, new Set()) }));
}
function vi(e, t, r) {
  return r
    ? Be(r, ({ needs: n, compute: i }, o) => ({
        name: o,
        needs: n ? Object.keys(n).filter((s) => n[s]) : [],
        compute: Gs(t, o, i),
      }))
    : {};
}
function Gs(e, t, r) {
  let n = e?.[t]?.compute;
  return n ? (i) => r({ ...i, [t]: n(i) }) : r;
}
function Ti(e, t) {
  if (!t) return e;
  let r = { ...e };
  for (let n of Object.values(t))
    if (e[n.name]) for (let i of n.needs) r[i] = !0;
  return r;
}
function Ai(e, t) {
  if (!t) return e;
  let r = { ...e };
  for (let n of Object.values(t))
    if (!e[n.name]) for (let i of n.needs) delete r[i];
  return r;
}
var Jt = class {
    constructor(t, r) {
      this.extension = t;
      this.previous = r;
      this.computedFieldsCache = new me();
      this.modelExtensionsCache = new me();
      this.queryCallbacksCache = new me();
      this.clientExtensions = it(() =>
        this.extension.client
          ? {
              ...this.previous?.getAllClientExtensions(),
              ...this.extension.client,
            }
          : this.previous?.getAllClientExtensions(),
      );
      this.batchCallbacks = it(() => {
        let t = this.previous?.getAllBatchQueryCallbacks() ?? [],
          r = this.extension.query?.$__internalBatch;
        return r ? t.concat(r) : t;
      });
    }
    getAllComputedFields(t) {
      return this.computedFieldsCache.getOrCreate(t, () =>
        Ci(this.previous?.getAllComputedFields(t), this.extension, t),
      );
    }
    getAllClientExtensions() {
      return this.clientExtensions.get();
    }
    getAllModelExtensions(t) {
      return this.modelExtensionsCache.getOrCreate(t, () => {
        let r = fe(t);
        return !this.extension.model ||
          !(this.extension.model[r] || this.extension.model.$allModels)
          ? this.previous?.getAllModelExtensions(t)
          : {
              ...this.previous?.getAllModelExtensions(t),
              ...this.extension.model.$allModels,
              ...this.extension.model[r],
            };
      });
    }
    getAllQueryCallbacks(t, r) {
      return this.queryCallbacksCache.getOrCreate(`${t}:${r}`, () => {
        let n = this.previous?.getAllQueryCallbacks(t, r) ?? [],
          i = [],
          o = this.extension.query;
        return !o || !(o[t] || o.$allModels || o[r] || o.$allOperations)
          ? n
          : (o[t] !== void 0 &&
              (o[t][r] !== void 0 && i.push(o[t][r]),
              o[t].$allOperations !== void 0 && i.push(o[t].$allOperations)),
            t !== "$none" &&
              o.$allModels !== void 0 &&
              (o.$allModels[r] !== void 0 && i.push(o.$allModels[r]),
              o.$allModels.$allOperations !== void 0 &&
                i.push(o.$allModels.$allOperations)),
            o[r] !== void 0 && i.push(o[r]),
            o.$allOperations !== void 0 && i.push(o.$allOperations),
            n.concat(i));
      });
    }
    getAllBatchQueryCallbacks() {
      return this.batchCallbacks.get();
    }
  },
  Wt = class e {
    constructor(t) {
      this.head = t;
    }
    static empty() {
      return new e();
    }
    static single(t) {
      return new e(new Jt(t));
    }
    isEmpty() {
      return this.head === void 0;
    }
    append(t) {
      return new e(new Jt(t, this.head));
    }
    getAllComputedFields(t) {
      return this.head?.getAllComputedFields(t);
    }
    getAllClientExtensions() {
      return this.head?.getAllClientExtensions();
    }
    getAllModelExtensions(t) {
      return this.head?.getAllModelExtensions(t);
    }
    getAllQueryCallbacks(t, r) {
      return this.head?.getAllQueryCallbacks(t, r) ?? [];
    }
    getAllBatchQueryCallbacks() {
      return this.head?.getAllBatchQueryCallbacks() ?? [];
    }
  };
u();
c();
m();
p();
d();
l();
var Ri = te("prisma:client"),
  Si = { Vercel: "vercel", "Netlify CI": "netlify" };
function Oi({ postinstall: e, ciName: t, clientVersion: r }) {
  if (
    (Ri("checkPlatformCaching:postinstall", e),
    Ri("checkPlatformCaching:ciName", t),
    e === !0 && t && t in Si)
  ) {
    let n = `Prisma has detected that this project was built on ${t}, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the \`prisma generate\` command during the build process.

Learn how: https://pris.ly/d/${Si[t]}-build`;
    throw (console.error(n), new M(n, r));
  }
}
u();
c();
m();
p();
d();
l();
function ki(e, t) {
  return e
    ? e.datasources
      ? e.datasources
      : e.datasourceUrl
        ? { [t[0]]: { url: e.datasourceUrl } }
        : {}
    : {};
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
var Ks = "Cloudflare-Workers",
  Hs = "node";
function Li() {
  return typeof Netlify == "object"
    ? "netlify"
    : typeof EdgeRuntime == "string"
      ? "edge-light"
      : globalThis.navigator?.userAgent === Ks
        ? "workerd"
        : globalThis.Deno
          ? "deno"
          : globalThis.__lagon__
            ? "lagon"
            : globalThis.process?.release?.name === Hs
              ? "node"
              : globalThis.Bun
                ? "bun"
                : globalThis.fastly
                  ? "fastly"
                  : "unknown";
}
var zs = {
  node: "Node.js",
  workerd: "Cloudflare Workers",
  deno: "Deno and Deno Deploy",
  netlify: "Netlify Edge Functions",
  "edge-light": "Vercel Edge Functions or Edge Middleware",
};
function ve() {
  let e = Li();
  return {
    id: e,
    prettyName: zs[e] || e,
    isEdge: ["workerd", "deno", "netlify", "edge-light"].includes(e),
  };
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
function Gt({
  inlineDatasources: e,
  overrideDatasources: t,
  env: r,
  clientVersion: n,
}) {
  let i,
    o = Object.keys(e)[0],
    s = e[o]?.url,
    a = t[o]?.url;
  if (
    (o === void 0
      ? (i = void 0)
      : a
        ? (i = a)
        : s?.value
          ? (i = s.value)
          : s?.fromEnvVar && (i = r[s.fromEnvVar]),
    s?.fromEnvVar !== void 0 && i === void 0)
  )
    throw ve().id === "workerd"
      ? new M(
          `error: Environment variable not found: ${s.fromEnvVar}.

In Cloudflare module Workers, environment variables are available only in the Worker's \`env\` parameter of \`fetch\`.
To solve this, provide the connection string directly: https://pris.ly/d/cloudflare-datasource-url`,
          n,
        )
      : new M(`error: Environment variable not found: ${s.fromEnvVar}.`, n);
  if (i === void 0)
    throw new M(
      "error: Missing URL environment variable, value, or override.",
      n,
    );
  return i;
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
function Mi(e) {
  if (e?.kind === "itx") return e.options.id;
}
u();
c();
m();
p();
d();
l();
var Br,
  Ii = {
    async loadLibrary(e) {
      let { clientVersion: t, adapter: r, engineWasm: n } = e;
      if (r === void 0)
        throw new M(
          `The \`adapter\` option for \`PrismaClient\` is required in this context (${ve().prettyName})`,
          t,
        );
      if (n === void 0)
        throw new M("WASM engine was unexpectedly `undefined`", t);
      Br === void 0 &&
        (Br = (async () => {
          let o = n.getRuntime(),
            s = await n.getQueryEngineWasmModule();
          if (s == null)
            throw new M(
              "The loaded wasm module was unexpectedly `undefined` or `null` once loaded",
              t,
            );
          let a = { "./query_engine_bg.js": o },
            f = new WebAssembly.Instance(s, a);
          return o.__wbg_set_wasm(f.exports), o.QueryEngine;
        })());
      let i = await Br;
      return {
        debugPanic() {
          return Promise.reject("{}");
        },
        dmmf() {
          return Promise.resolve("{}");
        },
        version() {
          return { commit: "unknown", version: "unknown" };
        },
        QueryEngine: i,
      };
    },
  };
var Ys = "P2036",
  ge = te("prisma:client:libraryEngine");
function Xs(e) {
  return e.item_type === "query" && "query" in e;
}
function Zs(e) {
  return "level" in e ? e.level === "error" && e.message === "PANIC" : !1;
}
var MC = [...Er, "native"],
  _i = 0,
  ft = class {
    constructor(t, r) {
      this.name = "LibraryEngine";
      (this.libraryLoader = r ?? Ii),
        (this.config = t),
        (this.libraryStarted = !1),
        (this.logQueries = t.logQueries ?? !1),
        (this.logLevel = t.logLevel ?? "error"),
        (this.logEmitter = t.logEmitter),
        (this.datamodel = t.inlineSchema),
        t.enableDebugLogs && (this.logLevel = "debug");
      let n = Object.keys(t.overrideDatasources)[0],
        i = t.overrideDatasources[n]?.url;
      n !== void 0 && i !== void 0 && (this.datasourceOverrides = { [n]: i }),
        (this.libraryInstantiationPromise = this.instantiateLibrary()),
        this.checkForTooManyEngines();
    }
    checkForTooManyEngines() {
      _i === 10 &&
        console.warn(
          `${At("warn(prisma-client)")} This is the 10th instance of Prisma Client being started. Make sure this is intentional.`,
        );
    }
    async applyPendingMigrations() {
      throw new Error(
        "Cannot call this method from this type of engine instance",
      );
    }
    async transaction(t, r, n) {
      await this.start();
      let i = JSON.stringify(r),
        o;
      if (t === "start") {
        let a = JSON.stringify({
          max_wait: n.maxWait,
          timeout: n.timeout,
          isolation_level: n.isolationLevel,
        });
        o = await this.engine?.startTransaction(a, i);
      } else
        t === "commit"
          ? (o = await this.engine?.commitTransaction(n.id, i))
          : t === "rollback" &&
            (o = await this.engine?.rollbackTransaction(n.id, i));
      let s = this.parseEngineResponse(o);
      if (ea(s)) {
        let a = this.getExternalAdapterError(s);
        throw a
          ? a.error
          : new Q(s.message, {
              code: s.error_code,
              clientVersion: this.config.clientVersion,
              meta: s.meta,
            });
      }
      return s;
    }
    async instantiateLibrary() {
      if ((ge("internalSetup"), this.libraryInstantiationPromise))
        return this.libraryInstantiationPromise;
      (this.binaryTarget = await this.getCurrentBinaryTarget()),
        await this.loadEngine(),
        this.version();
    }
    async getCurrentBinaryTarget() {}
    parseEngineResponse(t) {
      if (!t)
        throw new J("Response from the Engine was empty", {
          clientVersion: this.config.clientVersion,
        });
      try {
        return JSON.parse(t);
      } catch {
        throw new J("Unable to JSON.parse response from engine", {
          clientVersion: this.config.clientVersion,
        });
      }
    }
    async loadEngine() {
      if (!this.engine) {
        this.QueryEngineConstructor ||
          ((this.library = await this.libraryLoader.loadLibrary(this.config)),
          (this.QueryEngineConstructor = this.library.QueryEngine));
        try {
          let t = new b(this),
            { adapter: r } = this.config;
          r && ge("Using driver adapter: %O", r),
            (this.engine = new this.QueryEngineConstructor(
              {
                datamodel: this.datamodel,
                env: g.env,
                logQueries: this.config.logQueries ?? !1,
                ignoreEnvVarErrors: !0,
                datasourceOverrides: this.datasourceOverrides ?? {},
                logLevel: this.logLevel,
                configDir: this.config.cwd,
                engineProtocol: "json",
              },
              (n) => {
                t.deref()?.logger(n);
              },
              r,
            )),
            _i++;
        } catch (t) {
          let r = t,
            n = this.parseInitError(r.message);
          throw typeof n == "string"
            ? r
            : new M(n.message, this.config.clientVersion, n.error_code);
        }
      }
    }
    logger(t) {
      let r = this.parseEngineResponse(t);
      if (r) {
        if ("span" in r) {
          this.config.tracingHelper.createEngineSpan(r);
          return;
        }
        (r.level = r?.level.toLowerCase() ?? "unknown"),
          Xs(r)
            ? this.logEmitter.emit("query", {
                timestamp: new Date(),
                query: r.query,
                params: r.params,
                duration: Number(r.duration_ms),
                target: r.module_path,
              })
            : (Zs(r),
              this.logEmitter.emit(r.level, {
                timestamp: new Date(),
                message: r.message,
                target: r.module_path,
              }));
      }
    }
    parseInitError(t) {
      try {
        return JSON.parse(t);
      } catch {}
      return t;
    }
    parseRequestError(t) {
      try {
        return JSON.parse(t);
      } catch {}
      return t;
    }
    onBeforeExit() {
      throw new Error(
        '"beforeExit" hook is not applicable to the library engine since Prisma 5.0.0, it is only relevant and implemented for the binary engine. Please add your event listener to the `process` object directly instead.',
      );
    }
    async start() {
      if (
        (await this.libraryInstantiationPromise,
        await this.libraryStoppingPromise,
        this.libraryStartingPromise)
      )
        return (
          ge(
            `library already starting, this.libraryStarted: ${this.libraryStarted}`,
          ),
          this.libraryStartingPromise
        );
      if (this.libraryStarted) return;
      let t = async () => {
        ge("library starting");
        try {
          let r = { traceparent: this.config.tracingHelper.getTraceParent() };
          await this.engine?.connect(JSON.stringify(r)),
            (this.libraryStarted = !0),
            ge("library started");
        } catch (r) {
          let n = this.parseInitError(r.message);
          throw typeof n == "string"
            ? r
            : new M(n.message, this.config.clientVersion, n.error_code);
        } finally {
          this.libraryStartingPromise = void 0;
        }
      };
      return (
        (this.libraryStartingPromise = this.config.tracingHelper.runInChildSpan(
          "connect",
          t,
        )),
        this.libraryStartingPromise
      );
    }
    async stop() {
      if (
        (await this.libraryStartingPromise,
        await this.executingQueryPromise,
        this.libraryStoppingPromise)
      )
        return ge("library is already stopping"), this.libraryStoppingPromise;
      if (!this.libraryStarted) return;
      let t = async () => {
        await new Promise((n) => setTimeout(n, 5)), ge("library stopping");
        let r = { traceparent: this.config.tracingHelper.getTraceParent() };
        await this.engine?.disconnect(JSON.stringify(r)),
          (this.libraryStarted = !1),
          (this.libraryStoppingPromise = void 0),
          ge("library stopped");
      };
      return (
        (this.libraryStoppingPromise = this.config.tracingHelper.runInChildSpan(
          "disconnect",
          t,
        )),
        this.libraryStoppingPromise
      );
    }
    version() {
      return (
        (this.versionInfo = this.library?.version()),
        this.versionInfo?.version ?? "unknown"
      );
    }
    debugPanic(t) {
      return this.library?.debugPanic(t);
    }
    async request(t, { traceparent: r, interactiveTransaction: n }) {
      ge(`sending request, this.libraryStarted: ${this.libraryStarted}`);
      let i = JSON.stringify({ traceparent: r }),
        o = JSON.stringify(t);
      try {
        await this.start(),
          (this.executingQueryPromise = this.engine?.query(o, i, n?.id)),
          (this.lastQuery = o);
        let s = this.parseEngineResponse(await this.executingQueryPromise);
        if (s.errors)
          throw s.errors.length === 1
            ? this.buildQueryError(s.errors[0])
            : new J(JSON.stringify(s.errors), {
                clientVersion: this.config.clientVersion,
              });
        if (this.loggerRustPanic) throw this.loggerRustPanic;
        return { data: s, elapsed: 0 };
      } catch (s) {
        if (s instanceof M) throw s;
        s.code === "GenericFailure" && s.message?.startsWith("PANIC:");
        let a = this.parseRequestError(s.message);
        throw typeof a == "string"
          ? s
          : new J(
              `${a.message}
${a.backtrace}`,
              { clientVersion: this.config.clientVersion },
            );
      }
    }
    async requestBatch(t, { transaction: r, traceparent: n }) {
      ge("requestBatch");
      let i = _t(t, r);
      await this.start(),
        (this.lastQuery = JSON.stringify(i)),
        (this.executingQueryPromise = this.engine.query(
          this.lastQuery,
          JSON.stringify({ traceparent: n }),
          Mi(r),
        ));
      let o = await this.executingQueryPromise,
        s = this.parseEngineResponse(o);
      if (s.errors)
        throw s.errors.length === 1
          ? this.buildQueryError(s.errors[0])
          : new J(JSON.stringify(s.errors), {
              clientVersion: this.config.clientVersion,
            });
      let { batchResult: a, errors: f } = s;
      if (Array.isArray(a))
        return a.map((v) =>
          v.errors && v.errors.length > 0
            ? this.loggerRustPanic ?? this.buildQueryError(v.errors[0])
            : { data: v, elapsed: 0 },
        );
      throw f && f.length === 1
        ? new Error(f[0].error)
        : new Error(JSON.stringify(s));
    }
    buildQueryError(t) {
      t.user_facing_error.is_panic;
      let r = this.getExternalAdapterError(t.user_facing_error);
      return r
        ? r.error
        : qt(t, this.config.clientVersion, this.config.activeProvider);
    }
    getExternalAdapterError(t) {
      if (t.error_code === Ys && this.config.adapter) {
        let r = t.meta?.id;
        Ot(
          typeof r == "number",
          "Malformed external JS error received from the engine",
        );
        let n = this.config.adapter.errorRegistry.consumeError(r);
        return Ot(n, "External error with reported id was not registered"), n;
      }
    }
    async metrics(t) {
      await this.start();
      let r = await this.engine.metrics(JSON.stringify(t));
      return t.format === "prometheus" ? r : this.parseEngineResponse(r);
    }
  };
function ea(e) {
  return typeof e == "object" && e !== null && e.error_code !== void 0;
}
u();
c();
m();
p();
d();
l();
var gt =
    "Accelerate has not been setup correctly. Make sure your client is using `.$extends(withAccelerate())`. See https://pris.ly/d/accelerate-getting-started",
  Kt = class {
    constructor(t) {
      this.config = t;
      this.name = "AccelerateEngine";
      this.resolveDatasourceUrl =
        this.config.accelerateUtils?.resolveDatasourceUrl;
      this.getBatchRequestPayload =
        this.config.accelerateUtils?.getBatchRequestPayload;
      this.prismaGraphQLToJSError =
        this.config.accelerateUtils?.prismaGraphQLToJSError;
      this.PrismaClientUnknownRequestError =
        this.config.accelerateUtils?.PrismaClientUnknownRequestError;
      this.PrismaClientInitializationError =
        this.config.accelerateUtils?.PrismaClientInitializationError;
      this.PrismaClientKnownRequestError =
        this.config.accelerateUtils?.PrismaClientKnownRequestError;
      this.debug = this.config.accelerateUtils?.debug;
      this.engineVersion = this.config.accelerateUtils?.engineVersion;
      this.clientVersion = this.config.accelerateUtils?.clientVersion;
    }
    onBeforeExit(t) {}
    async start() {}
    async stop() {}
    version(t) {
      return "unknown";
    }
    transaction(t, r, n) {
      throw new M(gt, this.config.clientVersion);
    }
    metrics(t) {
      throw new M(gt, this.config.clientVersion);
    }
    request(t, r) {
      throw new M(gt, this.config.clientVersion);
    }
    requestBatch(t, r) {
      throw new M(gt, this.config.clientVersion);
    }
    applyPendingMigrations() {
      throw new M(gt, this.config.clientVersion);
    }
  };
function Di({ copyEngine: e = !0 }, t) {
  let r;
  try {
    r = Gt({
      inlineDatasources: t.inlineDatasources,
      overrideDatasources: t.overrideDatasources,
      env: { ...t.env, ...g.env },
      clientVersion: t.clientVersion,
    });
  } catch {}
  e &&
    r?.startsWith("prisma://") &&
    nt(
      "recommend--no-engine",
      "In production, we recommend using `prisma generate --no-engine` (See: `prisma generate --help`)",
    );
  let n = et(t.generator),
    i = !!(r?.startsWith("prisma://") || !e),
    o = !!t.adapter,
    s = n === "library",
    a = n === "binary";
  if ((i && o) || (o && !1)) {
    let f;
    throw (
      (e
        ? r?.startsWith("prisma://")
          ? (f = [
              "Prisma Client was configured to use the `adapter` option but the URL was a `prisma://` URL.",
              "Please either use the `prisma://` URL or remove the `adapter` from the Prisma Client constructor.",
            ])
          : (f = [
              "Prisma Client was configured to use both the `adapter` and Accelerate, please chose one.",
            ])
        : (f = [
            "Prisma Client was configured to use the `adapter` option but `prisma generate` was run with `--no-engine`.",
            "Please run `prisma generate` without `--no-engine` to be able to use Prisma Client with the adapter.",
          ]),
      new W(
        f.join(`
`),
        { clientVersion: t.clientVersion },
      ))
    );
  }
  if (o) return new ft(t);
  if (i) return new Kt(t);
  {
    let f = [
      `PrismaClient failed to initialize because it wasn't configured to run in this environment (${ve().prettyName}).`,
      "In order to run Prisma Client in an edge runtime, you will need to configure one of the following options:",
      "- Enable Driver Adapters: https://pris.ly/d/driver-adapters",
      "- Enable Accelerate: https://pris.ly/d/accelerate",
    ];
    throw new W(
      f.join(`
`),
      { clientVersion: t.clientVersion },
    );
  }
  throw new W("Invalid client engine type, please use `library` or `binary`", {
    clientVersion: t.clientVersion,
  });
}
u();
c();
m();
p();
d();
l();
function Ht({ generator: e }) {
  return e?.previewFeatures ?? [];
}
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
var Vi = _e(Ur());
u();
c();
m();
p();
d();
l();
function Ui(e, t) {
  let r = $i(e),
    n = ta(r),
    i = na(n);
  i ? zt(i, t) : t.addErrorMessage(() => "Unknown error");
}
function $i(e) {
  return e.errors.flatMap((t) => (t.kind === "Union" ? $i(t) : [t]));
}
function ta(e) {
  let t = new Map(),
    r = [];
  for (let n of e) {
    if (n.kind !== "InvalidArgumentType") {
      r.push(n);
      continue;
    }
    let i = `${n.selectionPath.join(".")}:${n.argumentPath.join(".")}`,
      o = t.get(i);
    o
      ? t.set(i, {
          ...n,
          argument: {
            ...n.argument,
            typeNames: ra(o.argument.typeNames, n.argument.typeNames),
          },
        })
      : t.set(i, n);
  }
  return r.push(...t.values()), r;
}
function ra(e, t) {
  return [...new Set(e.concat(t))];
}
function na(e) {
  return Cr(e, (t, r) => {
    let n = Ni(t),
      i = Ni(r);
    return n !== i ? n - i : Bi(t) - Bi(r);
  });
}
function Ni(e) {
  let t = 0;
  return (
    Array.isArray(e.selectionPath) && (t += e.selectionPath.length),
    Array.isArray(e.argumentPath) && (t += e.argumentPath.length),
    t
  );
}
function Bi(e) {
  switch (e.kind) {
    case "InvalidArgumentValue":
    case "ValueTooLarge":
      return 20;
    case "InvalidArgumentType":
      return 10;
    case "RequiredArgumentMissing":
      return -10;
    default:
      return 0;
  }
}
u();
c();
m();
p();
d();
l();
var ne = class {
  constructor(t, r) {
    this.name = t;
    this.value = r;
    this.isRequired = !1;
  }
  makeRequired() {
    return (this.isRequired = !0), this;
  }
  write(t) {
    let {
      colors: { green: r },
    } = t.context;
    t.addMarginSymbol(r(this.isRequired ? "+" : "?")),
      t.write(r(this.name)),
      this.isRequired || t.write(r("?")),
      t.write(r(": ")),
      typeof this.value == "string"
        ? t.write(r(this.value))
        : t.write(this.value);
  }
};
u();
c();
m();
p();
d();
l();
var Yt = class {
  constructor() {
    this.fields = [];
  }
  addField(t, r) {
    return (
      this.fields.push({
        write(n) {
          let { green: i, dim: o } = n.context.colors;
          n.write(i(o(`${t}: ${r}`))).addMarginSymbol(i(o("+")));
        },
      }),
      this
    );
  }
  write(t) {
    let {
      colors: { green: r },
    } = t.context;
    t.writeLine(r("{"))
      .withIndent(() => {
        t.writeJoined(Je, this.fields).newLine();
      })
      .write(r("}"))
      .addMarginSymbol(r("+"));
  }
};
function zt(e, t) {
  switch (e.kind) {
    case "MutuallyExclusiveFields":
      ia(e, t);
      break;
    case "IncludeOnScalar":
      oa(e, t);
      break;
    case "EmptySelection":
      sa(e, t);
      break;
    case "UnknownSelectionField":
      ua(e, t);
      break;
    case "UnknownArgument":
      ca(e, t);
      break;
    case "UnknownInputField":
      ma(e, t);
      break;
    case "RequiredArgumentMissing":
      pa(e, t);
      break;
    case "InvalidArgumentType":
      da(e, t);
      break;
    case "InvalidArgumentValue":
      fa(e, t);
      break;
    case "ValueTooLarge":
      ga(e, t);
      break;
    case "SomeFieldsMissing":
      ha(e, t);
      break;
    case "TooManyFieldsGiven":
      ya(e, t);
      break;
    case "Union":
      Ui(e, t);
      break;
    default:
      throw new Error("not implemented: " + e.kind);
  }
}
function ia(e, t) {
  let r = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
  r &&
    (r.getField(e.firstField)?.markAsError(),
    r.getField(e.secondField)?.markAsError()),
    t.addErrorMessage(
      (n) =>
        `Please ${n.bold("either")} use ${n.green(`\`${e.firstField}\``)} or ${n.green(`\`${e.secondField}\``)}, but ${n.red("not both")} at the same time.`,
    );
}
function oa(e, t) {
  let [r, n] = Xt(e.selectionPath),
    i = e.outputType,
    o = t.arguments.getDeepSelectionParent(r)?.value;
  if (o && (o.getField(n)?.markAsError(), i))
    for (let s of i.fields)
      s.isRelation && o.addSuggestion(new ne(s.name, "true"));
  t.addErrorMessage((s) => {
    let a = `Invalid scalar field ${s.red(`\`${n}\``)} for ${s.bold("include")} statement`;
    return (
      i ? (a += ` on model ${s.bold(i.name)}. ${ht(s)}`) : (a += "."),
      (a += `
Note that ${s.bold("include")} statements only accept relation fields.`),
      a
    );
  });
}
function sa(e, t) {
  let r = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
  if (r) {
    let n = r.getField("omit")?.value.asObject();
    if (n) {
      aa(e, t, n);
      return;
    }
  }
  la(e, t);
}
function aa(e, t, r) {
  r.removeAllFields();
  for (let n of e.outputType.fields) r.addSuggestion(new ne(n.name, "false"));
  t.addErrorMessage(
    (n) =>
      `The ${n.red("omit")} statement includes every field of the model ${n.bold(e.outputType.name)}. At least one field must be included in the result`,
  );
}
function la(e, t) {
  let r = e.outputType,
    n = t.arguments.getDeepSelectionParent(e.selectionPath)?.value,
    i = n?.isEmpty() ?? !1;
  n && (n.removeAllFields(), Qi(n, r)),
    t.addErrorMessage((o) =>
      i
        ? `The ${o.red("`select`")} statement for type ${o.bold(r.name)} must not be empty. ${ht(o)}`
        : `The ${o.red("`select`")} statement for type ${o.bold(r.name)} needs ${o.bold("at least one truthy value")}.`,
    );
}
function ua(e, t) {
  let [r, n] = Xt(e.selectionPath),
    i = t.arguments.getDeepSubSelectionValue(r)?.asObject(),
    o;
  if (i) {
    let s = i.getFieldValue("select")?.asObject(),
      a = i.getFieldValue("include")?.asObject(),
      f = i.getFieldValue("omit")?.asObject();
    s?.hasField(n)
      ? ((o = "select"), s.getField(n)?.markAsError(), Qi(s, e.outputType))
      : a?.hasField(n)
        ? ((o = "include"), a.getField(n)?.markAsError(), ba(a, e.outputType))
        : f?.hasField(n) &&
          ((o = "omit"), f.getField(n)?.markAsError(), wa(f, e.outputType));
  }
  t.addErrorMessage((s) => {
    let a = [`Unknown field ${s.red(`\`${n}\``)}`];
    return (
      o && a.push(`for ${s.bold(o)} statement`),
      a.push(`on model ${s.bold(`\`${e.outputType.name}\``)}.`),
      a.push(ht(s)),
      a.join(" ")
    );
  });
}
function ca(e, t) {
  let r = e.argumentPath[0],
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
  n && (n.getField(r)?.markAsError(), Ea(n, e.arguments)),
    t.addErrorMessage((i) =>
      qi(
        i,
        r,
        e.arguments.map((o) => o.name),
      ),
    );
}
function ma(e, t) {
  let [r, n] = Xt(e.argumentPath),
    i = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
  if (i) {
    i.getDeepField(e.argumentPath)?.markAsError();
    let o = i.getDeepFieldValue(r)?.asObject();
    o && Ji(o, e.inputType);
  }
  t.addErrorMessage((o) =>
    qi(
      o,
      n,
      e.inputType.fields.map((s) => s.name),
    ),
  );
}
function qi(e, t, r) {
  let n = [`Unknown argument \`${e.red(t)}\`.`],
    i = Pa(t, r);
  return (
    i && n.push(`Did you mean \`${e.green(i)}\`?`),
    r.length > 0 && n.push(ht(e)),
    n.join(" ")
  );
}
function pa(e, t) {
  let r;
  t.addErrorMessage((f) =>
    r?.value instanceof G && r.value.text === "null"
      ? `Argument \`${f.green(o)}\` must not be ${f.red("null")}.`
      : `Argument \`${f.green(o)}\` is missing.`,
  );
  let n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
  if (!n) return;
  let [i, o] = Xt(e.argumentPath),
    s = new Yt(),
    a = n.getDeepFieldValue(i)?.asObject();
  if (a)
    if (
      ((r = a.getField(o)),
      r && a.removeField(o),
      e.inputTypes.length === 1 && e.inputTypes[0].kind === "object")
    ) {
      for (let f of e.inputTypes[0].fields)
        s.addField(f.name, f.typeNames.join(" | "));
      a.addSuggestion(new ne(o, s).makeRequired());
    } else {
      let f = e.inputTypes.map(ji).join(" | ");
      a.addSuggestion(new ne(o, f).makeRequired());
    }
}
function ji(e) {
  return e.kind === "list" ? `${ji(e.elementType)}[]` : e.name;
}
function da(e, t) {
  let r = e.argument.name,
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
  n && n.getDeepFieldValue(e.argumentPath)?.markAsError(),
    t.addErrorMessage((i) => {
      let o = Zt(
        "or",
        e.argument.typeNames.map((s) => i.green(s)),
      );
      return `Argument \`${i.bold(r)}\`: Invalid value provided. Expected ${o}, provided ${i.red(e.inferredType)}.`;
    });
}
function fa(e, t) {
  let r = e.argument.name,
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
  n && n.getDeepFieldValue(e.argumentPath)?.markAsError(),
    t.addErrorMessage((i) => {
      let o = [`Invalid value for argument \`${i.bold(r)}\``];
      if (
        (e.underlyingError && o.push(`: ${e.underlyingError}`),
        o.push("."),
        e.argument.typeNames.length > 0)
      ) {
        let s = Zt(
          "or",
          e.argument.typeNames.map((a) => i.green(a)),
        );
        o.push(` Expected ${s}.`);
      }
      return o.join("");
    });
}
function ga(e, t) {
  let r = e.argument.name,
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject(),
    i;
  if (n) {
    let s = n.getDeepField(e.argumentPath)?.value;
    s?.markAsError(), s instanceof G && (i = s.text);
  }
  t.addErrorMessage((o) => {
    let s = ["Unable to fit value"];
    return (
      i && s.push(o.red(i)),
      s.push(`into a 64-bit signed integer for field \`${o.bold(r)}\``),
      s.join(" ")
    );
  });
}
function ha(e, t) {
  let r = e.argumentPath[e.argumentPath.length - 1],
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject();
  if (n) {
    let i = n.getDeepFieldValue(e.argumentPath)?.asObject();
    i && Ji(i, e.inputType);
  }
  t.addErrorMessage((i) => {
    let o = [
      `Argument \`${i.bold(r)}\` of type ${i.bold(e.inputType.name)} needs`,
    ];
    return (
      e.constraints.minFieldCount === 1
        ? e.constraints.requiredFields
          ? o.push(
              `${i.green("at least one of")} ${Zt(
                "or",
                e.constraints.requiredFields.map((s) => `\`${i.bold(s)}\``),
              )} arguments.`,
            )
          : o.push(`${i.green("at least one")} argument.`)
        : o.push(
            `${i.green(`at least ${e.constraints.minFieldCount}`)} arguments.`,
          ),
      o.push(ht(i)),
      o.join(" ")
    );
  });
}
function ya(e, t) {
  let r = e.argumentPath[e.argumentPath.length - 1],
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject(),
    i = [];
  if (n) {
    let o = n.getDeepFieldValue(e.argumentPath)?.asObject();
    o && (o.markAsError(), (i = Object.keys(o.getFields())));
  }
  t.addErrorMessage((o) => {
    let s = [
      `Argument \`${o.bold(r)}\` of type ${o.bold(e.inputType.name)} needs`,
    ];
    return (
      e.constraints.minFieldCount === 1 && e.constraints.maxFieldCount == 1
        ? s.push(`${o.green("exactly one")} argument,`)
        : e.constraints.maxFieldCount == 1
          ? s.push(`${o.green("at most one")} argument,`)
          : s.push(
              `${o.green(`at most ${e.constraints.maxFieldCount}`)} arguments,`,
            ),
      s.push(
        `but you provided ${Zt(
          "and",
          i.map((a) => o.red(a)),
        )}. Please choose`,
      ),
      e.constraints.maxFieldCount === 1
        ? s.push("one.")
        : s.push(`${e.constraints.maxFieldCount}.`),
      s.join(" ")
    );
  });
}
function Qi(e, t) {
  for (let r of t.fields)
    e.hasField(r.name) || e.addSuggestion(new ne(r.name, "true"));
}
function ba(e, t) {
  for (let r of t.fields)
    r.isRelation &&
      !e.hasField(r.name) &&
      e.addSuggestion(new ne(r.name, "true"));
}
function wa(e, t) {
  for (let r of t.fields)
    !e.hasField(r.name) &&
      !r.isRelation &&
      e.addSuggestion(new ne(r.name, "true"));
}
function Ea(e, t) {
  for (let r of t)
    e.hasField(r.name) ||
      e.addSuggestion(new ne(r.name, r.typeNames.join(" | ")));
}
function Ji(e, t) {
  if (t.kind === "object")
    for (let r of t.fields)
      e.hasField(r.name) ||
        e.addSuggestion(new ne(r.name, r.typeNames.join(" | ")));
}
function Xt(e) {
  let t = [...e],
    r = t.pop();
  if (!r) throw new Error("unexpected empty path");
  return [t, r];
}
function ht({ green: e, enabled: t }) {
  return (
    "Available options are " +
    (t ? `listed in ${e("green")}` : "marked with ?") +
    "."
  );
}
function Zt(e, t) {
  if (t.length === 1) return t[0];
  let r = [...t],
    n = r.pop();
  return `${r.join(", ")} ${e} ${n}`;
}
var xa = 3;
function Pa(e, t) {
  let r = 1 / 0,
    n;
  for (let i of t) {
    let o = (0, Vi.default)(e, i);
    o > xa || (o < r && ((r = o), (n = i)));
  }
  return n;
}
function er({
  args: e,
  errors: t,
  errorFormat: r,
  callsite: n,
  originalMethod: i,
  clientVersion: o,
}) {
  let s = Vt(e);
  for (let T of t) zt(T, s);
  let a = r === "pretty" ? zn : Bt,
    f = s.renderAllMessages(a),
    v = new Ve(0, { colors: a }).write(s).toString(),
    C = Ke({
      message: f,
      callsite: n,
      originalMethod: i,
      showColors: r === "pretty",
      callArguments: v,
    });
  throw new W(C, { clientVersion: o });
}
var va = {
  findUnique: "findUnique",
  findUniqueOrThrow: "findUniqueOrThrow",
  findFirst: "findFirst",
  findFirstOrThrow: "findFirstOrThrow",
  findMany: "findMany",
  count: "aggregate",
  create: "createOne",
  createMany: "createMany",
  update: "updateOne",
  updateMany: "updateMany",
  upsert: "upsertOne",
  delete: "deleteOne",
  deleteMany: "deleteMany",
  executeRaw: "executeRaw",
  queryRaw: "queryRaw",
  aggregate: "aggregate",
  groupBy: "groupBy",
  runCommandRaw: "runCommandRaw",
  findRaw: "findRaw",
  aggregateRaw: "aggregateRaw",
};
function Wi({
  modelName: e,
  action: t,
  args: r,
  runtimeDataModel: n,
  extensions: i,
  callsite: o,
  clientMethod: s,
  errorFormat: a,
  clientVersion: f,
  previewFeatures: v,
}) {
  let C = new $r({
    runtimeDataModel: n,
    modelName: e,
    action: t,
    rootArgs: r,
    callsite: o,
    extensions: i,
    selectionPath: [],
    argumentPath: [],
    originalMethod: s,
    errorFormat: a,
    clientVersion: f,
    previewFeatures: v,
  });
  return { modelName: e, action: va[t], query: Vr(r, C) };
}
function Vr({ select: e, include: t, ...r } = {}, n) {
  let i;
  return (
    n.isPreviewFeatureOn("omitApi") && ((i = r.omit), delete r.omit),
    { arguments: Ki(r, n), selection: Ca(e, t, i, n) }
  );
}
function Ca(e, t, r, n) {
  return e
    ? (t
        ? n.throwValidationError({
            kind: "MutuallyExclusiveFields",
            firstField: "include",
            secondField: "select",
            selectionPath: n.getSelectionPath(),
          })
        : r &&
          n.isPreviewFeatureOn("omitApi") &&
          n.throwValidationError({
            kind: "MutuallyExclusiveFields",
            firstField: "omit",
            secondField: "select",
            selectionPath: n.getSelectionPath(),
          }),
      Sa(e, n))
    : Ta(n, t, r);
}
function Ta(e, t, r) {
  let n = {};
  return (
    e.model && !e.isRawAction() && ((n.$composites = !0), (n.$scalars = !0)),
    t && Aa(n, t, e),
    r && e.isPreviewFeatureOn("omitApi") && Ra(n, r, e),
    n
  );
}
function Aa(e, t, r) {
  for (let [n, i] of Object.entries(t)) {
    let o = r.findField(n);
    o &&
      o?.kind !== "object" &&
      r.throwValidationError({
        kind: "IncludeOnScalar",
        selectionPath: r.getSelectionPath().concat(n),
        outputType: r.getOutputTypeDescription(),
      }),
      i === !0
        ? (e[n] = !0)
        : typeof i == "object" && (e[n] = Vr(i, r.nestSelection(n)));
  }
}
function Ra(e, t, r) {
  let n = r.getComputedFields(),
    i = Ai(t, n);
  for (let [o, s] of Object.entries(i)) {
    let a = r.findField(o);
    (n?.[o] && !a) || (e[o] = !s);
  }
}
function Sa(e, t) {
  let r = {},
    n = t.getComputedFields(),
    i = Ti(e, n);
  for (let [o, s] of Object.entries(i)) {
    let a = t.findField(o);
    (n?.[o] && !a) ||
      (s === !0
        ? (r[o] = !0)
        : typeof s == "object" && (r[o] = Vr(s, t.nestSelection(o))));
  }
  return r;
}
function Gi(e, t) {
  if (e === null) return null;
  if (typeof e == "string" || typeof e == "number" || typeof e == "boolean")
    return e;
  if (typeof e == "bigint") return { $type: "BigInt", value: String(e) };
  if (qe(e)) {
    if (Dt(e)) return { $type: "DateTime", value: e.toISOString() };
    t.throwValidationError({
      kind: "InvalidArgumentValue",
      selectionPath: t.getSelectionPath(),
      argumentPath: t.getArgumentPath(),
      argument: { name: t.getArgumentName(), typeNames: ["Date"] },
      underlyingError: "Provided Date object is invalid",
    });
  }
  if (Qe(e))
    return {
      $type: "FieldRef",
      value: { _ref: e.name, _container: e.modelName },
    };
  if (Array.isArray(e)) return Oa(e, t);
  if (ArrayBuffer.isView(e))
    return { $type: "Bytes", value: y.from(e).toString("base64") };
  if (ka(e)) return e.values;
  if (je(e)) return { $type: "Decimal", value: e.toFixed() };
  if (e instanceof we) {
    if (e !== Lt.instances[e._getName()])
      throw new Error("Invalid ObjectEnumValue");
    return { $type: "Enum", value: e._getName() };
  }
  if (La(e)) return e.toJSON();
  if (typeof e == "object") return Ki(e, t);
  t.throwValidationError({
    kind: "InvalidArgumentValue",
    selectionPath: t.getSelectionPath(),
    argumentPath: t.getArgumentPath(),
    argument: { name: t.getArgumentName(), typeNames: [] },
    underlyingError: `We could not serialize ${Object.prototype.toString.call(e)} value. Serialize the object to JSON or implement a ".toJSON()" method on it`,
  });
}
function Ki(e, t) {
  if (e.$type) return { $type: "Raw", value: e };
  let r = {};
  for (let n in e) {
    let i = e[n];
    i !== void 0 && (r[n] = Gi(i, t.nestArgument(n)));
  }
  return r;
}
function Oa(e, t) {
  let r = [];
  for (let n = 0; n < e.length; n++) {
    let i = t.nestArgument(String(n)),
      o = e[n];
    o === void 0 &&
      t.throwValidationError({
        kind: "InvalidArgumentValue",
        selectionPath: i.getSelectionPath(),
        argumentPath: i.getArgumentPath(),
        argument: { name: `${t.getArgumentName()}[${n}]`, typeNames: [] },
        underlyingError:
          "Can not use `undefined` value within array. Use `null` or filter out `undefined` values",
      }),
      r.push(Gi(o, i));
  }
  return r;
}
function ka(e) {
  return typeof e == "object" && e !== null && e.__prismaRawParameters__ === !0;
}
function La(e) {
  return typeof e == "object" && e !== null && typeof e.toJSON == "function";
}
var $r = class e {
  constructor(t) {
    this.params = t;
    this.params.modelName &&
      (this.model = this.params.runtimeDataModel.models[this.params.modelName]);
  }
  throwValidationError(t) {
    er({
      errors: [t],
      originalMethod: this.params.originalMethod,
      args: this.params.rootArgs ?? {},
      callsite: this.params.callsite,
      errorFormat: this.params.errorFormat,
      clientVersion: this.params.clientVersion,
    });
  }
  getSelectionPath() {
    return this.params.selectionPath;
  }
  getArgumentPath() {
    return this.params.argumentPath;
  }
  getArgumentName() {
    return this.params.argumentPath[this.params.argumentPath.length - 1];
  }
  getOutputTypeDescription() {
    if (!(!this.params.modelName || !this.model))
      return {
        name: this.params.modelName,
        fields: this.model.fields.map((t) => ({
          name: t.name,
          typeName: "boolean",
          isRelation: t.kind === "object",
        })),
      };
  }
  isRawAction() {
    return [
      "executeRaw",
      "queryRaw",
      "runCommandRaw",
      "findRaw",
      "aggregateRaw",
    ].includes(this.params.action);
  }
  isPreviewFeatureOn(t) {
    return this.params.previewFeatures.includes(t);
  }
  getComputedFields() {
    if (this.params.modelName)
      return this.params.extensions.getAllComputedFields(this.params.modelName);
  }
  findField(t) {
    return this.model?.fields.find((r) => r.name === t);
  }
  nestSelection(t) {
    let r = this.findField(t),
      n = r?.kind === "object" ? r.type : void 0;
    return new e({
      ...this.params,
      modelName: n,
      selectionPath: this.params.selectionPath.concat(t),
    });
  }
  nestArgument(t) {
    return new e({
      ...this.params,
      argumentPath: this.params.argumentPath.concat(t),
    });
  }
};
u();
c();
m();
p();
d();
l();
var Hi = (e) => ({ command: e });
u();
c();
m();
p();
d();
l();
u();
c();
m();
p();
d();
l();
var zi = (e) => e.strings.reduce((t, r, n) => `${t}@P${n}${r}`);
u();
c();
m();
p();
d();
l();
l();
function yt(e) {
  try {
    return Yi(e, "fast");
  } catch {
    return Yi(e, "slow");
  }
}
function Yi(e, t) {
  return JSON.stringify(e.map((r) => Ma(r, t)));
}
function Ma(e, t) {
  return typeof e == "bigint"
    ? { prisma__type: "bigint", prisma__value: e.toString() }
    : qe(e)
      ? { prisma__type: "date", prisma__value: e.toJSON() }
      : ce.isDecimal(e)
        ? { prisma__type: "decimal", prisma__value: e.toJSON() }
        : y.isBuffer(e)
          ? { prisma__type: "bytes", prisma__value: e.toString("base64") }
          : Ia(e) || ArrayBuffer.isView(e)
            ? {
                prisma__type: "bytes",
                prisma__value: y.from(e).toString("base64"),
              }
            : typeof e == "object" && t === "slow"
              ? Zi(e)
              : e;
}
function Ia(e) {
  return e instanceof ArrayBuffer || e instanceof SharedArrayBuffer
    ? !0
    : typeof e == "object" && e !== null
      ? e[Symbol.toStringTag] === "ArrayBuffer" ||
        e[Symbol.toStringTag] === "SharedArrayBuffer"
      : !1;
}
function Zi(e) {
  if (typeof e != "object" || e === null) return e;
  if (typeof e.toJSON == "function") return e.toJSON();
  if (Array.isArray(e)) return e.map(Xi);
  let t = {};
  for (let r of Object.keys(e)) t[r] = Xi(e[r]);
  return t;
}
function Xi(e) {
  return typeof e == "bigint" ? e.toString() : Zi(e);
}
var _a = /^(\s*alter\s)/i,
  eo = te("prisma:client");
function qr(e, t, r, n) {
  if (
    !(e !== "postgresql" && e !== "cockroachdb") &&
    r.length > 0 &&
    _a.exec(t)
  )
    throw new Error(`Running ALTER using ${n} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`);
}
var jr =
    ({ clientMethod: e, activeProvider: t }) =>
    (r) => {
      let n = "",
        i;
      if (Array.isArray(r)) {
        let [o, ...s] = r;
        (n = o), (i = { values: yt(s || []), __prismaRawParameters__: !0 });
      } else
        switch (t) {
          case "sqlite":
          case "mysql": {
            (n = r.sql),
              (i = { values: yt(r.values), __prismaRawParameters__: !0 });
            break;
          }
          case "cockroachdb":
          case "postgresql":
          case "postgres": {
            (n = r.text),
              (i = { values: yt(r.values), __prismaRawParameters__: !0 });
            break;
          }
          case "sqlserver": {
            (n = zi(r)),
              (i = { values: yt(r.values), __prismaRawParameters__: !0 });
            break;
          }
          default:
            throw new Error(`The ${t} provider does not support ${e}`);
        }
      return (
        i?.values
          ? eo(`prisma.${e}(${n}, ${i.values})`)
          : eo(`prisma.${e}(${n})`),
        { query: n, parameters: i }
      );
    },
  to = {
    requestArgsToMiddlewareArgs(e) {
      return [e.strings, ...e.values];
    },
    middlewareArgsToRequestArgs(e) {
      let [t, ...r] = e;
      return new Z(t, r);
    },
  },
  ro = {
    requestArgsToMiddlewareArgs(e) {
      return [e];
    },
    middlewareArgsToRequestArgs(e) {
      return e[0];
    },
  };
u();
c();
m();
p();
d();
l();
function Qr(e) {
  return function (r) {
    let n,
      i = (o = e) => {
        try {
          return o === void 0 || o?.kind === "itx"
            ? (n ??= no(r(o)))
            : no(r(o));
        } catch (s) {
          return Promise.reject(s);
        }
      };
    return {
      then(o, s) {
        return i().then(o, s);
      },
      catch(o) {
        return i().catch(o);
      },
      finally(o) {
        return i().finally(o);
      },
      requestTransaction(o) {
        let s = i(o);
        return s.requestTransaction ? s.requestTransaction(o) : s;
      },
      [Symbol.toStringTag]: "PrismaPromise",
    };
  };
}
function no(e) {
  return typeof e.then == "function" ? e : Promise.resolve(e);
}
u();
c();
m();
p();
d();
l();
var io = {
    isEnabled() {
      return !1;
    },
    getTraceParent() {
      return "00-10-10-00";
    },
    async createEngineSpan() {},
    getActiveContext() {},
    runInChildSpan(e, t) {
      return t();
    },
  },
  Jr = class {
    isEnabled() {
      return this.getGlobalTracingHelper().isEnabled();
    }
    getTraceParent(t) {
      return this.getGlobalTracingHelper().getTraceParent(t);
    }
    createEngineSpan(t) {
      return this.getGlobalTracingHelper().createEngineSpan(t);
    }
    getActiveContext() {
      return this.getGlobalTracingHelper().getActiveContext();
    }
    runInChildSpan(t, r) {
      return this.getGlobalTracingHelper().runInChildSpan(t, r);
    }
    getGlobalTracingHelper() {
      return globalThis.PRISMA_INSTRUMENTATION?.helper ?? io;
    }
  };
function oo(e) {
  return e.includes("tracing") ? new Jr() : io;
}
u();
c();
m();
p();
d();
l();
function so(e, t = () => {}) {
  let r,
    n = new Promise((i) => (r = i));
  return {
    then(i) {
      return --e === 0 && r(t()), i?.(n);
    },
  };
}
u();
c();
m();
p();
d();
l();
var Da = ["$connect", "$disconnect", "$on", "$transaction", "$use", "$extends"],
  ao = Da;
u();
c();
m();
p();
d();
l();
function lo(e) {
  return typeof e == "string"
    ? e
    : e.reduce(
        (t, r) => {
          let n = typeof r == "string" ? r : r.level;
          return n === "query"
            ? t
            : t && (r === "info" || t === "info")
              ? "info"
              : n;
        },
        void 0,
      );
}
u();
c();
m();
p();
d();
l();
var tr = class {
  constructor() {
    this._middlewares = [];
  }
  use(t) {
    this._middlewares.push(t);
  }
  get(t) {
    return this._middlewares[t];
  }
  has(t) {
    return !!this._middlewares[t];
  }
  length() {
    return this._middlewares.length;
  }
};
u();
c();
m();
p();
d();
l();
var co = _e(Un());
u();
c();
m();
p();
d();
l();
function rr(e) {
  return typeof e.batchRequestIdx == "number";
}
u();
c();
m();
p();
d();
l();
l();
function nr(e) {
  return e === null
    ? e
    : Array.isArray(e)
      ? e.map(nr)
      : typeof e == "object"
        ? Fa(e)
          ? Na(e)
          : Be(e, nr)
        : e;
}
function Fa(e) {
  return e !== null && typeof e == "object" && typeof e.$type == "string";
}
function Na({ $type: e, value: t }) {
  switch (e) {
    case "BigInt":
      return BigInt(t);
    case "Bytes":
      return y.from(t, "base64");
    case "DateTime":
      return new Date(t);
    case "Decimal":
      return new ce(t);
    case "Json":
      return JSON.parse(t);
    default:
      Le(t, "Unknown tagged value");
  }
}
u();
c();
m();
p();
d();
l();
function uo(e) {
  if (e.action !== "findUnique" && e.action !== "findUniqueOrThrow") return;
  let t = [];
  return (
    e.modelName && t.push(e.modelName),
    e.query.arguments && t.push(Wr(e.query.arguments)),
    t.push(Wr(e.query.selection)),
    t.join("")
  );
}
function Wr(e) {
  return `(${Object.keys(e)
    .sort()
    .map((r) => {
      let n = e[r];
      return typeof n == "object" && n !== null ? `(${r} ${Wr(n)})` : r;
    })
    .join(" ")})`;
}
u();
c();
m();
p();
d();
l();
var Ba = {
  aggregate: !1,
  aggregateRaw: !1,
  createMany: !0,
  createOne: !0,
  deleteMany: !0,
  deleteOne: !0,
  executeRaw: !0,
  findFirst: !1,
  findFirstOrThrow: !1,
  findMany: !1,
  findRaw: !1,
  findUnique: !1,
  findUniqueOrThrow: !1,
  groupBy: !1,
  queryRaw: !1,
  runCommandRaw: !0,
  updateMany: !0,
  updateOne: !0,
  upsertOne: !0,
};
function Gr(e) {
  return Ba[e];
}
u();
c();
m();
p();
d();
l();
var ir = class {
  constructor(t) {
    this.options = t;
    this.tickActive = !1;
    this.batches = {};
  }
  request(t) {
    let r = this.options.batchBy(t);
    return r
      ? (this.batches[r] ||
          ((this.batches[r] = []),
          this.tickActive ||
            ((this.tickActive = !0),
            g.nextTick(() => {
              this.dispatchBatches(), (this.tickActive = !1);
            }))),
        new Promise((n, i) => {
          this.batches[r].push({ request: t, resolve: n, reject: i });
        }))
      : this.options.singleLoader(t);
  }
  dispatchBatches() {
    for (let t in this.batches) {
      let r = this.batches[t];
      delete this.batches[t],
        r.length === 1
          ? this.options
              .singleLoader(r[0].request)
              .then((n) => {
                n instanceof Error ? r[0].reject(n) : r[0].resolve(n);
              })
              .catch((n) => {
                r[0].reject(n);
              })
          : (r.sort((n, i) => this.options.batchOrder(n.request, i.request)),
            this.options
              .batchLoader(r.map((n) => n.request))
              .then((n) => {
                if (n instanceof Error)
                  for (let i = 0; i < r.length; i++) r[i].reject(n);
                else
                  for (let i = 0; i < r.length; i++) {
                    let o = n[i];
                    o instanceof Error ? r[i].reject(o) : r[i].resolve(o);
                  }
              })
              .catch((n) => {
                for (let i = 0; i < r.length; i++) r[i].reject(n);
              }));
    }
  }
  get [Symbol.toStringTag]() {
    return "DataLoader";
  }
};
var Ua = te("prisma:client:request_handler"),
  or = class {
    constructor(t, r) {
      (this.logEmitter = r),
        (this.client = t),
        (this.dataloader = new ir({
          batchLoader: Ei(async ({ requests: n, customDataProxyFetch: i }) => {
            let { transaction: o, otelParentCtx: s } = n[0],
              a = n.map((T) => T.protocolQuery),
              f = this.client._tracingHelper.getTraceParent(s),
              v = n.some((T) => Gr(T.protocolQuery.action));
            return (
              await this.client._engine.requestBatch(a, {
                traceparent: f,
                transaction: $a(o),
                containsWrite: v,
                customDataProxyFetch: i,
              })
            ).map((T, O) => {
              if (T instanceof Error) return T;
              try {
                return this.mapQueryEngineResult(n[O], T);
              } catch (R) {
                return R;
              }
            });
          }),
          singleLoader: async (n) => {
            let i = n.transaction?.kind === "itx" ? mo(n.transaction) : void 0,
              o = await this.client._engine.request(n.protocolQuery, {
                traceparent: this.client._tracingHelper.getTraceParent(),
                interactiveTransaction: i,
                isWrite: Gr(n.protocolQuery.action),
                customDataProxyFetch: n.customDataProxyFetch,
              });
            return this.mapQueryEngineResult(n, o);
          },
          batchBy: (n) =>
            n.transaction?.id
              ? `transaction-${n.transaction.id}`
              : uo(n.protocolQuery),
          batchOrder(n, i) {
            return n.transaction?.kind === "batch" &&
              i.transaction?.kind === "batch"
              ? n.transaction.index - i.transaction.index
              : 0;
          },
        }));
    }
    async request(t) {
      try {
        return await this.dataloader.request(t);
      } catch (r) {
        let {
          clientMethod: n,
          callsite: i,
          transaction: o,
          args: s,
          modelName: a,
        } = t;
        this.handleAndLogRequestError({
          error: r,
          clientMethod: n,
          callsite: i,
          transaction: o,
          args: s,
          modelName: a,
        });
      }
    }
    mapQueryEngineResult({ dataPath: t, unpacker: r }, n) {
      let i = n?.data,
        o = n?.elapsed,
        s = this.unpack(i, t, r);
      return g.env.PRISMA_CLIENT_GET_TIME ? { data: s, elapsed: o } : s;
    }
    handleAndLogRequestError(t) {
      try {
        this.handleRequestError(t);
      } catch (r) {
        throw (
          (this.logEmitter &&
            this.logEmitter.emit("error", {
              message: r.message,
              target: t.clientMethod,
              timestamp: new Date(),
            }),
          r)
        );
      }
    }
    handleRequestError({
      error: t,
      clientMethod: r,
      callsite: n,
      transaction: i,
      args: o,
      modelName: s,
    }) {
      if ((Ua(t), Va(t, i) || t instanceof ye)) throw t;
      if (t instanceof Q && qa(t)) {
        let f = po(t.meta);
        er({
          args: o,
          errors: [f],
          callsite: n,
          errorFormat: this.client._errorFormat,
          originalMethod: r,
          clientVersion: this.client._clientVersion,
        });
      }
      let a = t.message;
      if (
        (n &&
          (a = Ke({
            callsite: n,
            originalMethod: r,
            isPanic: t.isPanic,
            showColors: this.client._errorFormat === "pretty",
            message: a,
          })),
        (a = this.sanitizeMessage(a)),
        t.code)
      ) {
        let f = s ? { modelName: s, ...t.meta } : t.meta;
        throw new Q(a, {
          code: t.code,
          clientVersion: this.client._clientVersion,
          meta: f,
          batchRequestIdx: t.batchRequestIdx,
        });
      } else {
        if (t.isPanic) throw new be(a, this.client._clientVersion);
        if (t instanceof J)
          throw new J(a, {
            clientVersion: this.client._clientVersion,
            batchRequestIdx: t.batchRequestIdx,
          });
        if (t instanceof M) throw new M(a, this.client._clientVersion);
        if (t instanceof be) throw new be(a, this.client._clientVersion);
      }
      throw ((t.clientVersion = this.client._clientVersion), t);
    }
    sanitizeMessage(t) {
      return this.client._errorFormat && this.client._errorFormat !== "pretty"
        ? (0, co.default)(t)
        : t;
    }
    unpack(t, r, n) {
      if (!t || (t.data && (t = t.data), !t)) return t;
      let i = Object.values(t)[0],
        o = r.filter((a) => a !== "select" && a !== "include"),
        s = nr(_r(i, o));
      return n ? n(s) : s;
    }
    get [Symbol.toStringTag]() {
      return "RequestHandler";
    }
  };
function $a(e) {
  if (e) {
    if (e.kind === "batch")
      return { kind: "batch", options: { isolationLevel: e.isolationLevel } };
    if (e.kind === "itx") return { kind: "itx", options: mo(e) };
    Le(e, "Unknown transaction kind");
  }
}
function mo(e) {
  return { id: e.id, payload: e.payload };
}
function Va(e, t) {
  return rr(e) && t?.kind === "batch" && e.batchRequestIdx !== t.index;
}
function qa(e) {
  return e.code === "P2009" || e.code === "P2012";
}
function po(e) {
  if (e.kind === "Union") return { kind: "Union", errors: e.errors.map(po) };
  if (Array.isArray(e.selectionPath)) {
    let [, ...t] = e.selectionPath;
    return { ...e, selectionPath: t };
  }
  return e;
}
u();
c();
m();
p();
d();
l();
var fo = "5.13.0";
var go = fo;
u();
c();
m();
p();
d();
l();
l();
function ho(e) {
  return e.map((t) => {
    let r = {};
    for (let n of Object.keys(t)) r[n] = yo(t[n]);
    return r;
  });
}
function yo({ prisma__type: e, prisma__value: t }) {
  switch (e) {
    case "bigint":
      return BigInt(t);
    case "bytes":
      return y.from(t, "base64");
    case "decimal":
      return new ce(t);
    case "datetime":
    case "date":
      return new Date(t);
    case "time":
      return new Date(`1970-01-01T${t}Z`);
    case "array":
      return t.map(yo);
    default:
      return t;
  }
}
u();
c();
m();
p();
d();
l();
var xo = _e(Ur());
u();
c();
m();
p();
d();
l();
var F = class extends Error {
  constructor(t) {
    super(
      t +
        `
Read more at https://pris.ly/d/client-constructor`,
    ),
      (this.name = "PrismaClientConstructorValidationError");
  }
  get [Symbol.toStringTag]() {
    return "PrismaClientConstructorValidationError";
  }
};
K(F, "PrismaClientConstructorValidationError");
var bo = [
    "datasources",
    "datasourceUrl",
    "errorFormat",
    "adapter",
    "log",
    "transactionOptions",
    "__internal",
  ],
  wo = ["pretty", "colorless", "minimal"],
  Eo = ["info", "query", "warn", "error"],
  Qa = {
    datasources: (e, { datasourceNames: t }) => {
      if (e) {
        if (typeof e != "object" || Array.isArray(e))
          throw new F(
            `Invalid value ${JSON.stringify(e)} for "datasources" provided to PrismaClient constructor`,
          );
        for (let [r, n] of Object.entries(e)) {
          if (!t.includes(r)) {
            let i = He(r, t) || ` Available datasources: ${t.join(", ")}`;
            throw new F(
              `Unknown datasource ${r} provided to PrismaClient constructor.${i}`,
            );
          }
          if (typeof n != "object" || Array.isArray(n))
            throw new F(`Invalid value ${JSON.stringify(e)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
          if (n && typeof n == "object")
            for (let [i, o] of Object.entries(n)) {
              if (i !== "url")
                throw new F(`Invalid value ${JSON.stringify(e)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
              if (typeof o != "string")
                throw new F(`Invalid value ${JSON.stringify(o)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
            }
        }
      }
    },
    adapter: (e, t) => {
      if (e === null) return;
      if (e === void 0)
        throw new F(
          '"adapter" property must not be undefined, use null to conditionally disable driver adapters.',
        );
      if (!Ht(t).includes("driverAdapters"))
        throw new F(
          '"adapter" property can only be provided to PrismaClient constructor when "driverAdapters" preview feature is enabled.',
        );
      if (et() === "binary")
        throw new F(
          'Cannot use a driver adapter with the "binary" Query Engine. Please use the "library" Query Engine.',
        );
    },
    datasourceUrl: (e) => {
      if (typeof e < "u" && typeof e != "string")
        throw new F(`Invalid value ${JSON.stringify(e)} for "datasourceUrl" provided to PrismaClient constructor.
Expected string or undefined.`);
    },
    errorFormat: (e) => {
      if (e) {
        if (typeof e != "string")
          throw new F(
            `Invalid value ${JSON.stringify(e)} for "errorFormat" provided to PrismaClient constructor.`,
          );
        if (!wo.includes(e)) {
          let t = He(e, wo);
          throw new F(
            `Invalid errorFormat ${e} provided to PrismaClient constructor.${t}`,
          );
        }
      }
    },
    log: (e) => {
      if (!e) return;
      if (!Array.isArray(e))
        throw new F(
          `Invalid value ${JSON.stringify(e)} for "log" provided to PrismaClient constructor.`,
        );
      function t(r) {
        if (typeof r == "string" && !Eo.includes(r)) {
          let n = He(r, Eo);
          throw new F(
            `Invalid log level "${r}" provided to PrismaClient constructor.${n}`,
          );
        }
      }
      for (let r of e) {
        t(r);
        let n = {
          level: t,
          emit: (i) => {
            let o = ["stdout", "event"];
            if (!o.includes(i)) {
              let s = He(i, o);
              throw new F(
                `Invalid value ${JSON.stringify(i)} for "emit" in logLevel provided to PrismaClient constructor.${s}`,
              );
            }
          },
        };
        if (r && typeof r == "object")
          for (let [i, o] of Object.entries(r))
            if (n[i]) n[i](o);
            else
              throw new F(
                `Invalid property ${i} for "log" provided to PrismaClient constructor`,
              );
      }
    },
    transactionOptions: (e) => {
      if (!e) return;
      let t = e.maxWait;
      if (t != null && t <= 0)
        throw new F(
          `Invalid value ${t} for maxWait in "transactionOptions" provided to PrismaClient constructor. maxWait needs to be greater than 0`,
        );
      let r = e.timeout;
      if (r != null && r <= 0)
        throw new F(
          `Invalid value ${r} for timeout in "transactionOptions" provided to PrismaClient constructor. timeout needs to be greater than 0`,
        );
    },
    __internal: (e) => {
      if (!e) return;
      let t = ["debug", "engine", "configOverride"];
      if (typeof e != "object")
        throw new F(
          `Invalid value ${JSON.stringify(e)} for "__internal" to PrismaClient constructor`,
        );
      for (let [r] of Object.entries(e))
        if (!t.includes(r)) {
          let n = He(r, t);
          throw new F(
            `Invalid property ${JSON.stringify(r)} for "__internal" provided to PrismaClient constructor.${n}`,
          );
        }
    },
  };
function Po(e, t) {
  for (let [r, n] of Object.entries(e)) {
    if (!bo.includes(r)) {
      let i = He(r, bo);
      throw new F(
        `Unknown property ${r} provided to PrismaClient constructor.${i}`,
      );
    }
    Qa[r](n, t);
  }
  if (e.datasourceUrl && e.datasources)
    throw new F(
      'Can not use "datasourceUrl" and "datasources" options at the same time. Pick one of them',
    );
}
function He(e, t) {
  if (t.length === 0 || typeof e != "string") return "";
  let r = Ja(e, t);
  return r ? ` Did you mean "${r}"?` : "";
}
function Ja(e, t) {
  if (t.length === 0) return null;
  let r = t.map((i) => ({ value: i, distance: (0, xo.default)(e, i) }));
  r.sort((i, o) => (i.distance < o.distance ? -1 : 1));
  let n = r[0];
  return n.distance < 3 ? n.value : null;
}
u();
c();
m();
p();
d();
l();
function vo(e) {
  return e.length === 0
    ? Promise.resolve([])
    : new Promise((t, r) => {
        let n = new Array(e.length),
          i = null,
          o = !1,
          s = 0,
          a = () => {
            o || (s++, s === e.length && ((o = !0), i ? r(i) : t(n)));
          },
          f = (v) => {
            o || ((o = !0), r(v));
          };
        for (let v = 0; v < e.length; v++)
          e[v].then(
            (C) => {
              (n[v] = C), a();
            },
            (C) => {
              if (!rr(C)) {
                f(C);
                return;
              }
              C.batchRequestIdx === v ? f(C) : (i || (i = C), a());
            },
          );
      });
}
var Ce = te("prisma:client");
typeof globalThis == "object" && (globalThis.NODE_CLIENT = !0);
var Wa = {
    requestArgsToMiddlewareArgs: (e) => e,
    middlewareArgsToRequestArgs: (e) => e,
  },
  Ga = Symbol.for("prisma.client.transaction.id"),
  Ka = {
    id: 0,
    nextId() {
      return ++this.id;
    },
  };
function Ao(e) {
  class t {
    constructor(n) {
      this._originalClient = this;
      this._middlewares = new tr();
      this._createPrismaPromise = Qr();
      this.$extends = pi;
      (e = n?.__internal?.configOverride?.(e) ?? e), Oi(e), n && Po(n, e);
      let i = n?.adapter ? Or(n.adapter) : void 0,
        o = new St().on("error", () => {});
      (this._extensions = Wt.empty()),
        (this._previewFeatures = Ht(e)),
        (this._clientVersion = e.clientVersion ?? go),
        (this._activeProvider = e.activeProvider),
        (this._tracingHelper = oo(this._previewFeatures));
      let s = {
          rootEnvPath:
            e.relativeEnvPaths.rootEnvPath &&
            Ze.resolve(e.dirname, e.relativeEnvPaths.rootEnvPath),
          schemaEnvPath:
            e.relativeEnvPaths.schemaEnvPath &&
            Ze.resolve(e.dirname, e.relativeEnvPaths.schemaEnvPath),
        },
        a = e.injectableEdgeEnv?.();
      try {
        let f = n ?? {},
          v = f.__internal ?? {},
          C = v.debug === !0;
        C && te.enable("prisma:client");
        let T = Ze.resolve(e.dirname, e.relativePath);
        un.existsSync(T) || (T = e.dirname),
          Ce("dirname", e.dirname),
          Ce("relativePath", e.relativePath),
          Ce("cwd", T);
        let O = v.engine || {};
        if (
          (f.errorFormat
            ? (this._errorFormat = f.errorFormat)
            : g.env.NODE_ENV === "production"
              ? (this._errorFormat = "minimal")
              : g.env.NO_COLOR
                ? (this._errorFormat = "colorless")
                : (this._errorFormat = "colorless"),
          (this._runtimeDataModel = e.runtimeDataModel),
          (this._engineConfig = {
            cwd: T,
            dirname: e.dirname,
            enableDebugLogs: C,
            allowTriggerPanic: O.allowTriggerPanic,
            datamodelPath: Ze.join(e.dirname, e.filename ?? "schema.prisma"),
            prismaPath: O.binaryPath ?? void 0,
            engineEndpoint: O.endpoint,
            generator: e.generator,
            showColors: this._errorFormat === "pretty",
            logLevel: f.log && lo(f.log),
            logQueries:
              f.log &&
              !!(typeof f.log == "string"
                ? f.log === "query"
                : f.log.find((R) =>
                    typeof R == "string" ? R === "query" : R.level === "query",
                  )),
            env: a?.parsed ?? {},
            flags: [],
            engineWasm: e.engineWasm,
            clientVersion: e.clientVersion,
            engineVersion: e.engineVersion,
            previewFeatures: this._previewFeatures,
            activeProvider: e.activeProvider,
            inlineSchema: e.inlineSchema,
            overrideDatasources: ki(f, e.datasourceNames),
            inlineDatasources: e.inlineDatasources,
            inlineSchemaHash: e.inlineSchemaHash,
            tracingHelper: this._tracingHelper,
            transactionOptions: {
              maxWait: f.transactionOptions?.maxWait ?? 2e3,
              timeout: f.transactionOptions?.timeout ?? 5e3,
              isolationLevel: f.transactionOptions?.isolationLevel,
            },
            logEmitter: o,
            isBundled: e.isBundled,
            adapter: i,
          }),
          (this._accelerateEngineConfig = {
            ...this._engineConfig,
            accelerateUtils: {
              resolveDatasourceUrl: Gt,
              getBatchRequestPayload: _t,
              prismaGraphQLToJSError: qt,
              PrismaClientUnknownRequestError: J,
              PrismaClientInitializationError: M,
              PrismaClientKnownRequestError: Q,
              debug: te("prisma:client:accelerateEngine"),
              engineVersion: To.version,
              clientVersion: e.clientVersion,
            },
          }),
          Ce("clientVersion", e.clientVersion),
          (this._engine = Di(e, this._engineConfig)),
          (this._requestHandler = new or(this, o)),
          f.log)
        )
          for (let R of f.log) {
            let k =
              typeof R == "string" ? R : R.emit === "stdout" ? R.level : null;
            k &&
              this.$on(k, (S) => {
                rt.log(`${rt.tags[k] ?? ""}`, S.message || S.query);
              });
          }
        this._metrics = new Ue(this._engine);
      } catch (f) {
        throw ((f.clientVersion = this._clientVersion), f);
      }
      return (this._appliedParent = pt(this));
    }
    get [Symbol.toStringTag]() {
      return "PrismaClient";
    }
    $use(n) {
      this._middlewares.use(n);
    }
    $on(n, i) {
      n === "beforeExit"
        ? this._engine.onBeforeExit(i)
        : n && this._engineConfig.logEmitter.on(n, i);
    }
    $connect() {
      try {
        return this._engine.start();
      } catch (n) {
        throw ((n.clientVersion = this._clientVersion), n);
      }
    }
    async $disconnect() {
      try {
        await this._engine.stop();
      } catch (n) {
        throw ((n.clientVersion = this._clientVersion), n);
      } finally {
        Sn();
      }
    }
    $executeRawInternal(n, i, o, s) {
      let a = this._activeProvider;
      return this._request({
        action: "executeRaw",
        args: o,
        transaction: n,
        clientMethod: i,
        argsMapper: jr({ clientMethod: i, activeProvider: a }),
        callsite: Pe(this._errorFormat),
        dataPath: [],
        middlewareArgsMapper: s,
      });
    }
    $executeRaw(n, ...i) {
      return this._createPrismaPromise((o) => {
        if (n.raw !== void 0 || n.sql !== void 0) {
          let [s, a] = Co(n, i);
          return (
            qr(
              this._activeProvider,
              s.text,
              s.values,
              Array.isArray(n)
                ? "prisma.$executeRaw`<SQL>`"
                : "prisma.$executeRaw(sql`<SQL>`)",
            ),
            this.$executeRawInternal(o, "$executeRaw", s, a)
          );
        }
        throw new W(
          "`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n",
          { clientVersion: this._clientVersion },
        );
      });
    }
    $executeRawUnsafe(n, ...i) {
      return this._createPrismaPromise(
        (o) => (
          qr(
            this._activeProvider,
            n,
            i,
            "prisma.$executeRawUnsafe(<SQL>, [...values])",
          ),
          this.$executeRawInternal(o, "$executeRawUnsafe", [n, ...i])
        ),
      );
    }
    $runCommandRaw(n) {
      if (e.activeProvider !== "mongodb")
        throw new W(
          `The ${e.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`,
          { clientVersion: this._clientVersion },
        );
      return this._createPrismaPromise((i) =>
        this._request({
          args: n,
          clientMethod: "$runCommandRaw",
          dataPath: [],
          action: "runCommandRaw",
          argsMapper: Hi,
          callsite: Pe(this._errorFormat),
          transaction: i,
        }),
      );
    }
    async $queryRawInternal(n, i, o, s) {
      let a = this._activeProvider;
      return this._request({
        action: "queryRaw",
        args: o,
        transaction: n,
        clientMethod: i,
        argsMapper: jr({ clientMethod: i, activeProvider: a }),
        callsite: Pe(this._errorFormat),
        dataPath: [],
        middlewareArgsMapper: s,
      }).then(ho);
    }
    $queryRaw(n, ...i) {
      return this._createPrismaPromise((o) => {
        if (n.raw !== void 0 || n.sql !== void 0)
          return this.$queryRawInternal(o, "$queryRaw", ...Co(n, i));
        throw new W(
          "`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n",
          { clientVersion: this._clientVersion },
        );
      });
    }
    $queryRawUnsafe(n, ...i) {
      return this._createPrismaPromise((o) =>
        this.$queryRawInternal(o, "$queryRawUnsafe", [n, ...i]),
      );
    }
    _transactionWithArray({ promises: n, options: i }) {
      let o = Ka.nextId(),
        s = so(n.length),
        a = n.map((f, v) => {
          if (f?.[Symbol.toStringTag] !== "PrismaPromise")
            throw new Error(
              "All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.",
            );
          let C =
              i?.isolationLevel ??
              this._engineConfig.transactionOptions.isolationLevel,
            T = { kind: "batch", id: o, index: v, isolationLevel: C, lock: s };
          return f.requestTransaction?.(T) ?? f;
        });
      return vo(a);
    }
    async _transactionWithCallback({ callback: n, options: i }) {
      let o = { traceparent: this._tracingHelper.getTraceParent() },
        s = {
          maxWait: i?.maxWait ?? this._engineConfig.transactionOptions.maxWait,
          timeout: i?.timeout ?? this._engineConfig.transactionOptions.timeout,
          isolationLevel:
            i?.isolationLevel ??
            this._engineConfig.transactionOptions.isolationLevel,
        },
        a = await this._engine.transaction("start", o, s),
        f;
      try {
        let v = { kind: "itx", ...a };
        (f = await n(this._createItxClient(v))),
          await this._engine.transaction("commit", o, a);
      } catch (v) {
        throw (
          (await this._engine.transaction("rollback", o, a).catch(() => {}), v)
        );
      }
      return f;
    }
    _createItxClient(n) {
      return pt(
        pe(mi(this), [
          H("_appliedParent", () => this._appliedParent._createItxClient(n)),
          H("_createPrismaPromise", () => Qr(n)),
          H(Ga, () => n.id),
          $e(ao),
        ]),
      );
    }
    $transaction(n, i) {
      let o;
      typeof n == "function"
        ? this._engineConfig.adapter?.adapterName === "@prisma/adapter-d1"
          ? (o = () => {
              throw new Error(
                "Cloudflare D1 does not support interactive transactions. We recommend you to refactor your queries with that limitation in mind, and use batch transactions with `prisma.$transactions([])` where applicable.",
              );
            })
          : (o = () =>
              this._transactionWithCallback({ callback: n, options: i }))
        : (o = () => this._transactionWithArray({ promises: n, options: i }));
      let s = { name: "transaction", attributes: { method: "$transaction" } };
      return this._tracingHelper.runInChildSpan(s, o);
    }
    _request(n) {
      n.otelParentCtx = this._tracingHelper.getActiveContext();
      let i = n.middlewareArgsMapper ?? Wa,
        o = {
          args: i.requestArgsToMiddlewareArgs(n.args),
          dataPath: n.dataPath,
          runInTransaction: !!n.transaction,
          action: n.action,
          model: n.model,
        },
        s = {
          middleware: {
            name: "middleware",
            middleware: !0,
            attributes: { method: "$use" },
            active: !1,
          },
          operation: {
            name: "operation",
            attributes: {
              method: o.action,
              model: o.model,
              name: o.model ? `${o.model}.${o.action}` : o.action,
            },
          },
        },
        a = -1,
        f = async (v) => {
          let C = this._middlewares.get(++a);
          if (C)
            return this._tracingHelper.runInChildSpan(s.middleware, (L) =>
              C(v, (ie) => (L?.end(), f(ie))),
            );
          let { runInTransaction: T, args: O, ...R } = v,
            k = { ...n, ...R };
          O && (k.args = i.middlewareArgsToRequestArgs(O)),
            n.transaction !== void 0 && T === !1 && delete k.transaction;
          let S = await wi(this, k);
          return k.model
            ? gi({
                result: S,
                modelName: k.model,
                args: k.args,
                extensions: this._extensions,
                runtimeDataModel: this._runtimeDataModel,
              })
            : S;
        };
      return this._tracingHelper.runInChildSpan(s.operation, () => f(o));
    }
    async _executeRequest({
      args: n,
      clientMethod: i,
      dataPath: o,
      callsite: s,
      action: a,
      model: f,
      argsMapper: v,
      transaction: C,
      unpacker: T,
      otelParentCtx: O,
      customDataProxyFetch: R,
    }) {
      try {
        n = v ? v(n) : n;
        let k = { name: "serialize" },
          S = this._tracingHelper.runInChildSpan(k, () =>
            Wi({
              modelName: f,
              runtimeDataModel: this._runtimeDataModel,
              action: a,
              args: n,
              clientMethod: i,
              callsite: s,
              extensions: this._extensions,
              errorFormat: this._errorFormat,
              clientVersion: this._clientVersion,
              previewFeatures: this._previewFeatures,
            }),
          );
        return (
          te.enabled("prisma:client") &&
            (Ce("Prisma Client call:"),
            Ce(`prisma.${i}(${ei(n)})`),
            Ce("Generated request:"),
            Ce(
              JSON.stringify(S, null, 2) +
                `
`,
            )),
          C?.kind === "batch" && (await C.lock),
          this._requestHandler.request({
            protocolQuery: S,
            modelName: f,
            action: a,
            clientMethod: i,
            dataPath: o,
            callsite: s,
            args: n,
            extensions: this._extensions,
            transaction: C,
            unpacker: T,
            otelParentCtx: O,
            otelChildCtx: this._tracingHelper.getActiveContext(),
            customDataProxyFetch: R,
          })
        );
      } catch (k) {
        throw ((k.clientVersion = this._clientVersion), k);
      }
    }
    get $metrics() {
      if (!this._hasPreviewFlag("metrics"))
        throw new W(
          "`metrics` preview feature must be enabled in order to access metrics API",
          { clientVersion: this._clientVersion },
        );
      return this._metrics;
    }
    _hasPreviewFlag(n) {
      return !!this._engineConfig.previewFeatures?.includes(n);
    }
    $applyPendingMigrations() {
      return this._engine.applyPendingMigrations();
    }
  }
  return t;
}
function Co(e, t) {
  return Ha(e) ? [new Z(e, t), to] : [e, ro];
}
function Ha(e) {
  return Array.isArray(e) && Array.isArray(e.raw);
}
u();
c();
m();
p();
d();
l();
var za = new Set([
  "toJSON",
  "$$typeof",
  "asymmetricMatch",
  Symbol.iterator,
  Symbol.toStringTag,
  Symbol.isConcatSpreadable,
  Symbol.toPrimitive,
]);
function Ro(e) {
  return new Proxy(e, {
    get(t, r) {
      if (r in t) return t[r];
      if (!za.has(r)) throw new TypeError(`Invalid enum value: ${String(r)}`);
    },
  });
}
u();
c();
m();
p();
d();
l();
l();
0 &&
  (module.exports = {
    Debug,
    Decimal,
    Extensions,
    MetricsClient,
    NotFoundError,
    PrismaClientInitializationError,
    PrismaClientKnownRequestError,
    PrismaClientRustPanicError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError,
    Public,
    Sql,
    defineDmmfProperty,
    empty,
    getPrismaClient,
    getRuntime,
    join,
    makeStrictEnum,
    objectEnumValues,
    raw,
    sqltag,
    warnEnvConflicts,
    warnOnce,
  });
//# sourceMappingURL=wasm.js.map
