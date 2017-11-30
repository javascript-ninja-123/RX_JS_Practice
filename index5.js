// const Rx = require('rxjs/Rx');
const START = document.querySelector('#start');
const STOP = document.querySelector('#stop');
const UL = document.querySelector('#results');
const QURTER = document.querySelector('#quarter');
const HALF = document.querySelector('#half');
const INPUT = document.querySelector('#input');
const db = firebase.database();


//async call
const fetchUser = async () => {
  let snap =  await db.ref('userData').once('value')
  let snapshot = snap.val();
  return Object.values(snapshot);
}



//stream
const startButtonStream$ = Rx.Observable.fromEvent(START,'click');
const stopButtonStrem$ = Rx.Observable.fromEvent(STOP,'click');
const quarterButtonStream$ = Rx.Observable.fromEvent(QURTER,'click')
const halfButtonStream$ = Rx.Observable.fromEvent(HALF,'click')
const inputStream$ = Rx.Observable.fromEvent(INPUT,'input')
.map(e => e.target.value)
const fetchDataPromise$ = Rx.Observable.fromPromise(fetchUser());


fetchUser()
.then(users => {
  const intervalStream$ = Rx.Observable.interval(700)
   .takeUntil(stopButtonStrem$)
   .take(users.length)


 const starter$ =  Rx.Observable.merge(
    startButtonStream$.mapTo(1000),
    quarterButtonStream$.mapTo(500),
    halfButtonStream$.mapTo(250)
  )


  const userUiCreator$ =
  starter$
   .mergeMap(time => Rx.Observable.interval(time)
    .takeUntil(stopButtonStrem$)
    .take(users.length))
   .startWith(0)
   .scan(acc => {
     return acc +1;
   })
   .map(user => users[user])
   .filter(user =>  {
     if(user.email) return user;
     else return;
   })

  // .map(user => `<li>${user.email} --- ${user.phone}</li>`)

  Rx.Observable.combineLatest(userUiCreator$, inputStream$)
   .map(array => ({user:array[0], text:array[1]}))
   .repeat()
   .subscribe(
     x => {
      // UL.insertAdjacentHTML('beforeend',x)
      console.log(x)
    },
    error => console.log(error),
    () => console.log('completed')
   )
})


// // const fetchDataStream$ = startButtonStream$
// // .mergeMap(() => intervalStream$)
// // .switchMap(() => fetchDataPromise$)
//
//
// fetchDataStream$
// .subscribe(x => console.log(x))






// const buttonStream$ = Rx.Observable.fromEvent(START,'click');
// const stopStream$ = Rx.Observable.fromEvent(STOP,'click');
// const intervalStream$ =Rx.Observable.interval(500).takeUntil(stopStream$);
// const intervalButtonStream$ = buttonStream$
// .switchMapTo(intervalStream$)
// .scan((acc) => {
//   acc =  acc+1
//   return acc;
// },0)
//
//
//
//
// intervalButtonStream$
// .subscribe(x => console.log(x))



// const createSubscriber = tag => {
//   return{
//     next(item){console.log(`${tag}.next ${item}`)},
//     error(error){console.log(error)},
//     complete(){console.log(`${tag} complete`)}
//   }
// }
