import { Observable } from 'rxjs';

var programmingLanguages = ["Java","C#","Python","Javascript"];

//Observable.from is depreciated
// var source = of("Java","C#","Python","Javascript");
var source = Observable.create(observer =>{

    let index =0;
    let produceValue = () =>{
        observer.next(programmingLanguages[index++]);

        if(index < programmingLanguages.length){
                setTimeout(produceValue,2000);

        }else{
            observer.complete();
        }
    }

    produceValue();

});


source.subscribe(
    value => console.log(`next value is : ${value}`),
    e =>console.log(`error is : ${e}`),
    () =>  console.log(`completed data stream`)
)

