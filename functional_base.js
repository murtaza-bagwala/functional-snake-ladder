const objOf  = key => val => ({ [key]: val })

const spec = obj => x => Object.keys(obj)
  .map(key => objOf(key)(obj[key](x)))
  .reduce((acc, obj) => Object.assign(acc, obj))

const mod = x => y => ((y % x) + x) % x 

const merge  = o1 => o2 => Object.assign({}, o1, o2)

const prop = key => obj => obj[key]

const rnd  = min => max => Math.floor(Math.random() * max) + min

module.exports = {merge, mod, objOf, prop, rnd, spec}

