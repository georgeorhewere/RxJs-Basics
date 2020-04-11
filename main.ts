import { Observable, fromEvent  } from 'rxjs';
import{ map, filter, delay } from 'rxjs/operators';

var programmingLanguages = ["Java","C#","Python","Javascript"];

let circle = document.getElementById("circle");
var source = fromEvent(document,'mousemove')
                .pipe(
                    map((e:MouseEvent)=>{
                        return {
                            x: e.clientX,
                            y:e.clientY
                        }
                    }),
                    filter(evt => evt.x < 500),
                    delay(400)
                );
/* Observable.create(observer =>{

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

}).pipe(
    map(x => "I Love " + x),
    filter(f => (f as string).includes("Java"))
    
    );
 */
var onNext =(value)=>{
    circle.style.left = value.x;
    circle.style.top = value.y;

}

source.subscribe(
    onNext,
    e =>console.log(`error is : ${e}`),
    () =>  console.log(`completed data stream`)
)

