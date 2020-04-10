import { Observable } from 'rxjs';

var programmingLanguages = ["Java","C#","Python","Javascript"];

//Observable.from is depreciated
// var source = of("Java","C#","Python","Javascript");
var source = Observable.create(observer =>{

    programmingLanguages.forEach(element => {
       /*  if(element === "Python"){
            observer.error("Something broke my code");
        } */
        observer.next(element)
    });

    observer.complete()

});


source.subscribe(
    value => console.log(`next value is : ${value}`),
    e =>console.log(`error is : ${e}`),
    () =>  console.log(`completed data stream`)
)

