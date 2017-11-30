const title = document.getElementById('title');
const results = document.getElementById('results');


//small library
const fetchItem = async (query) => {
  try{
    let response = await fetch('https://jsonplaceholder.typicode.com/users')
    let data = await response.json();
    return data.filter(value => {
      if(value.name.includes(query)){
        return value;
      }
    })
  }
  catch(err){
    return err
  }
}


Rx.Observable.fromEvent(title,'keyup')
.map(e => e.target.value)
.distinctUntilChanged()
.debounceTime(500)
.switchMap(fetchItem)
.subscribe(
  item => {
    let li = `<li>
        <p>${item[0].name}</p>
        <p>${item[0].email}</p>
        </li>`
         results.innerHTML = li;
  },
  err => console.log(err)
)
//stream$
// const keyup$ = Rx.Observable.fromEvent(title,'keyup');
// const queries$ = keyup$
// .map(e => e.target.value)
// .distinctUntilChanged()
// .debounceTime(700)
// .switchMap(query => fetchItem(query))
//
//
//
//
// queries$.subscribe(item => {
//       let li = `<li>
//       <p>${item[0].name}</p>
//       <p>${item[0].email}</p>
//       </li>`
//       results.innerHTML = li;
// })



const simple$ = new Rx.Observable(observer => {
  console.log('Generating observable')
  setTimeout(() => {
    observer.next('An item');
    setTimeout(() => {
      observer.next('Another item')
      observer.complete();
    },1000)
  },1000)
})


const error$ = new Rx.Observable(observer => {
    observer.error(new Error('stuff'));
})

simple$
.subscribe(
  e => console.log(e),
  error => console.log(error),
  () => console.log('it is complete')
)


error$.subscribe(
  e => console.log('done'),
  error => console.log(error.stack),
  () => console.log('completed')
)




//Part2
const createInterval$ = time => {
  return new Rx.Observable(observer => {
    let index = 0;
    let interval = setInterval(() => {
      observer.next(index++);
    },time)
  })

  return () => {
    clearInterval(interval)
  }
}

const createSubscriber = tag => {
  return{
    next(item){console.log(`${tag}.next ${item}`)},
    error(error){console.log(error)},
    complete(){console.log(`${tag} complete`)}
  }
}

const takeIn = (observable,amount) => {
  return new Rx.Observable(observer => {
    let count = 0;
    
  })
}


 const newman$ = createInterval$(1000).take(3).subscribe(createSubscriber('one'))
 // setTimeout(() => {
 //   newman$.unsubscribe()
 // },2000)
