if (!Object.is /*|| true*/) {
  Object.is = function (x, y) {
    if (isItNan(x) && isItNan(y)) {
      return true;
    } else if (isItNegZero(x) || isItNegZero(y)) {
      return isItNegZero(x) && isItNegZero(y);
    } else {
      return x === y;
    }
    function isItNan(a) {
      return a !== a;
    }
    function isItNegZero(v) {
      return v === 0 && 1 / v === -Infinity;
    }
  };
}

// tests:
console.log(Object.is(42, 42) === true);
console.log(Object.is('foo', 'foo') === true);
console.log(Object.is(false, false) === true);
console.log(Object.is(null, null) === true);
console.log(Object.is(undefined, undefined) === true);
console.log(Object.is(NaN, NaN) === true);
console.log(Object.is(-0, -0) === true);
console.log(Object.is(0, 0) === true);

console.log(Object.is(-0, 0) === false);
console.log(Object.is(0, -0) === false);
console.log(Object.is(0, NaN) === false);
console.log(Object.is(NaN, 0) === false);
console.log(Object.is(42, '42') === false);
console.log(Object.is('42', 42) === false);
console.log(Object.is('foo', 'bar') === false);
console.log(Object.is(false, true) === false);
console.log(Object.is(null, undefined) === false);
console.log(Object.is(undefined, null) === false);
