import { Observable, fromEvent } from 'rxjs';
import { map, filter, delay, mergeMap, flatMap, retry, retryWhen, scan, takeWhile } from 'rxjs/operators';

var programmingLanguages = ["Java", "C#", "Python", "Javascript"];

//get reference to the circle div
let circle = document.getElementById("circle");
// get refernce to the list div and button
let bookList = document.getElementById("bookList");
let bookBtn = document.getElementById("bookBtn");
var clickProcess = fromEvent(bookBtn, 'click');




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
var onNext = (value) => {
    circle.style.left = value.x;
    circle.style.top = value.y;
}

var load = (url: string) => {

    return Observable.create(observer => {
        let xhr = new XMLHttpRequest();

        xhr.addEventListener("load", () => {
            // get generic data
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                observer.next(data);
                observer.complete();
            } else {
                observer.error(xhr.statusText);

            }
        })

        xhr.open("GET", url);
        xhr.send();
    }).pipe(
        retryWhen(retryStrategy({ attempts: 3, waitTime: 1500 }))
    );
}

let retryStrategy = ({ attempts = 3, waitTime = 1000 }) => {
    return (errors) => {
        return errors.pipe(
            scan((acc, value) => {
                console.log(acc, value);
                return acc + 1;
            }, 0),
            takeWhile(x => x < attempts),
            delay(waitTime)
        );
    }
}
var renderBooks = (books) => {
    books.forEach(book => {
        let div = document.createElement("div");
        div.innerText = book.title + " by " + book.author;
        bookList.appendChild(div);
    });
}

//load books on start
load("books.json").subscribe(renderBooks);

clickProcess.pipe(
    flatMap(e => load("books.json"))
)
    .subscribe(
        renderBooks,
        e => console.log(`error is : ${e}`),
        () => console.log(`completed data stream`)
    )

