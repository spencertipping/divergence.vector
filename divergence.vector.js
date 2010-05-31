// Divergence vector geometry module | Spencer Tipping <spencer@spencertipping.com>
// Licensed under the terms of the MIT source code license

d.rebase (function () {
  var range = n >$> (n > 0 ? range(n - 1) << n - 1 : []);

  var         unify = n >$> (x >$> (x.length ? x : this.constructor.create.apply (this, range(n) * (_ >$> x)))),
          reduction = (left, right, join, op, n) >$> (left + (range(n) * (i >$> '$_[#{i}] #{op} $0[#{i}]')).join(join) + right).compose (unify (n)),
      componentwise = reduction.fn ('new @constructor (', ')', ','),
                dot = reduction.fn ('', '', '+', '*'),
        constructor = n >$> (range(n) * (i >$> '$_[#{i}] = $#{i}') + ['@length = #{n}']).join(',').fn(),
               four = n >$> '+-*/'.split('') * (op >$> op.maps_to (componentwise (op, n))) / d.init;

  d.vector = range(6) * (n >$> d.init (constructor(n).ctor (four (n),
                                                            {'&': v >$> this * ((this % v) / (v % v)), '|': v >$> this - (this & v), '%': dot (n),
                                                           unit : _ >$> this / this.distance(),  distance : _ >$> Math.sqrt (this % this),
                                                       toString : _ >$> '<#{Array.prototype.join.call(this, ", ")}>'}),
                                       {create: 'new d.vector[#{n}] (#{(range(n) * (i >$> "$" + i)).join(",")})'.fn()}));
  var v3 = d.vector[3];
  d.init (v3.prototype, {'^': v >$> new v3 (this[1] * v[2] - this[2] * v[1], this[2] * v[0] - this[0] * v[2], this[0] * v[1] - this[1] * v[0])})}) ();