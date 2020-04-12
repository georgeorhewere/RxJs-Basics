import { Observable, fromEvent, from, defer, merge, of, throwError, onErrorResumeNext } from 'rxjs';
import { map, filter, delay, mergeMap, flatMap, retry, retryWhen, scan, takeWhile, catchError } from 'rxjs/operators';
import { loadWithFetch, load } from './loader';


// let source = onErrorResumeNext(
//     of("Samantha"),
//     from(["Lucas", "Fred", "Harry","Channel"]),
//     throwError(new Error("Error condition 1")),
//     of("Olumide"),   

// )
// .pipe(    
//         catchError(e =>{          
//             console.log(`Caught ${e}`)
//             return of("David afer the error")
//         }
//         )
    
// )


// Observable.create(observer =>{
//     observer.next("James");
//     observer.next("Jude");
//     observer.next("John");
//     observer.error("Stop Immediately !");
//     observer.next("Samson");
// });

// source.subscribe(
//     value=> console.log(`value is ${value}`),
//     error => console.log(`error is : ${error}`),
//     ()=> console.log("completed")
// )
var programmingLanguages = ["Java", "C#", "Python", "Javascript"];

//get reference to the circle div
let circle = document.getElementById("circle");
// get refernce to the list div and button
let bookList = document.getElementById("bookList");
let bookBtn = document.getElementById("bookBtn");
var clickProcess = fromEvent(bookBtn, 'click');




 Observable.create(observer =>{

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
 
var onNext = (value) => {
    circle.style.left = value.x;
    circle.style.top = value.y;
}


var renderBooks = (books) => {
    books.forEach(book => {
        let div = document.createElement("div");
        div.innerText = book.title + " by " + book.author;
        bookList.appendChild(div);
    });
}

//load books on start
var loadSubscription = load("bookss.json")
.subscribe(renderBooks,
    e=>console.log(`error is  ${e}`),
    ()=> console.log(`compleed`)
    );

console.log(loadSubscription);
 // loadSubscription.unsubscribe();


clickProcess.pipe(
    flatMap(e => loadWithFetch("books.json"))
)
    .subscribe(
        renderBooks,
        e => console.log(`error is : ${e}`),
        () => console.log(`completed data stream`)
    )

/**/