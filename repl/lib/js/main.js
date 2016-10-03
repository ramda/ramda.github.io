global.S = sanctuary;
global.Either = ramdaFantasy.Either;
global.Future = ramdaFantasy.Future;
global.Identity = ramdaFantasy.Identity;
global.IO = ramdaFantasy.IO;
global.lift2 = ramdaFantasy.lift2;
global.lift3 = ramdaFantasy.lift3;
global.Maybe = ramdaFantasy.Maybe;
global.Tuple = ramdaFantasy.Tuple;
global.Reader = ramdaFantasy.Reader;

const _window = {}
R.forEach(x => _window[x] = window[x], R.keys(R).filter(k => k in window))
R.forEach(x => window[x] = R[x], R.keys(R))
