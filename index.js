//DOM
const imageStorage = document.querySelector('.imageStorage');
const button = document.querySelector('button')

// fetching an images API
const fetchImages = async () => {
  let response =  await fetch('https://unsplash.it/g/200/300?random');
  let blob = await response.blob();
  return URL.createObjectURL(blob);
}

//Rx Observable Stream
const photoFetchStream$ = Rx.Observable.fromEvent(button,'click')
.switchMap(() => {
  return fetchImages()
})

//action
photoFetchStream$
.subscribe(
  src => {
    let img = `<img src='${src}'/>`
    imageStorage.insertAdjacentHTML('beforeend',img);
},
  err => {
    console.warn(err)
  },
  complete => {
    console.log('completed')
  }
)
