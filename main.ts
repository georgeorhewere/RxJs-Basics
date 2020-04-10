import { Observable,of, Observer } from 'rxjs';

var programmingLanguages = ["Java","C#","Python","Javascript"];

//Observable.from is depreciated
var source = of("Java","C#","Python","Javascript");

class MyObserver implements Observer<string>{
    
    next(value){
        console.log(`next value is : ${value}`);
    }

    error(e){
        console.log(`error is : ${e}`);
    }

    
    complete(){
        console.log(`completed data stream`);
    }
}

source.subscribe(new MyObserver());
source.subscribe(new MyObserver());