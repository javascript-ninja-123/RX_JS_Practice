

const createSubscriber = tag => {
  return{
    next(item){console.log(`${tag}.next ${item}`)},
    error(error){console.log(error)},
    complete(){console.log(`${tag} complete`)}
  }
}

// Rx.Observable.interval(500)
// .take(5)
// .subscribe(createSubscriber('yes'))

// Rx.Observable.of(['this is an array','jey'])
// .subscribe(createSubscriber('of'))
//
//
// const userValue = [
//   {name:'yes'},
//   {name:'hoy'},
//   {name:'say'}
// ]
//
// Rx.Observable.from(userValue)
// .map(value => value.name)
// .map(name => `name: ${name}`)
// .subscribe(createSubscriber('from'))
//
//
// Rx.Observable.throw(new Error('Error'))
// .subscribe(createSubscriber('Error'))
//
// let sideEffect = 1;
// const defer$ = Rx.Observable.defer(() => {
//   sideEffect++;
//   return Rx.Observable.of(sideEffect);
// })
//
// defer$.subscribe(createSubscriber('defer'))

const Rx = require('rxjs/Rx')
 const fs = require('fs');
const readdir$ = Rx.Observable.bindNodeCallback(fs.readdir);
readdir$('./')
.flatMap(files => Rx.Observable.from(files))
.map(file => `MANIPUL\ATED ${file}`)
.subscribe(createSubscriber('readdir'));



const getItem = async () => {
  try{
    return await 'man'
  }
  catch(err){
    return err
  }
}


Rx.Observable.fromPromise(getItem())
.subscribe(createSubscriber('promise'))
