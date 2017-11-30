const createSubscriber = tag => {
  return{
    next(item){console.log(`${tag}.next ${item}`)},
    error(error){console.log(error)},
    complete(){console.log(`${tag} complete`)}
  }
}
const Rx = require('rxjs/Rx');


// Rx.Observable.range(1,10)
// .do(a => console.log(a))
// .map(a => a* a)
// .subscribe(createSubscriber('simple'))
//
// Rx.Observable.range(1,10)
// .finally(() => console.log(`Finnaly`))
// .map(a => a* a)
// .subscribe(createSubscriber('simple'))
//
//
//
// Rx.Observable.range(1,10)
// .filter(a => a <5)
// .subscribe(createSubscriber('simple'))
//
//
// Rx.Observable.interval(1000)
// .startWith(-1)
// .take(10)
// .subscribe(createSubscriber('simple'))


// Rx.Observable.interval(1000)
// .merge(Rx.Observable.interval(500))
// .take(5)
// .subscribe(createSubscriber('interval'))




// Rx.Observable.merge(
//   Rx.Observable.interval(1000).map(i => `${i} %`),
//   Rx.Observable.interval(500).map(i => `${i} half seconds`)
// )
// .take(5)
// .subscribe(createSubscriber('interval'))
//
//
// Rx.Observable.concat(
//   Rx.Observable.interval(1000).map(i => `${i} %`).take(3),
//   Rx.Observable.interval(500).map(i => `${i} half seconds`).take(2)
// )
// .subscribe(createSubscriber('interval'))



// Rx.Observable.range(1,3)
// .mergeMap(i => Rx.Observable.timer(i * 1000).map(() => `After ${i} seconds`))
// .subscribe(createSubscriber('mergemap'))



// const getTrakcs = async () => {
//   return await ['track1','track2','track3']
// }
//
// Rx.Observable.fromPromise(getTrakcs())
// .mergeMap(tracks => Rx.Observable.from(tracks))
// .map(track => `track: ${track}`)
// .subscribe(createSubscriber('promise'))




// const query = value => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(value)
//     },2000)
//   })
// }
//
//
//
// Rx.Observable.of('my query')
// .do(() => console.log('yesss'))
// .mergeMap(a => query(a))
// .subscribe(createSubscriber('query'))




//
// Rx.Observable.range(1,10)
// .scan((acc,value) => acc + value)
// .subscribe(createSubscriber('reduce'))

// Rx.Observable.range(1,100)
// .bufferCount(50)
// .subscribe(createSubscriber('item'))



Rx.Observable.interval(500)
.take(20)
.bufferTime(2000)
.subscribe(createSubscriber('item'))
