const R = ramda;
const S = sanctuary;
const Either = ramdaFantasy.Either;
const Future = ramdaFantasy.Future;
const Identity = ramdaFantasy.Identity;
const IO = ramdaFantasy.IO;
const lift2 = ramdaFantasy.lift2;
const lift3 = ramdaFantasy.lift3;
const Maybe = ramdaFantasy.Maybe;
const Tuple = ramdaFantasy.Tuple;
const Reader = ramdaFantasy.Reader;

const _window = {}
R.forEach(x => _window[x] = window[x], R.keys(R).filter(k => k in window))
R.forEach(x => window[x] = R[x], R.keys(R))
