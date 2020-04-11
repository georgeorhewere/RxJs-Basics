import { Observable, fromEvent  } from 'rxjs';
import{ map, filter, delay } from 'rxjs/operators';

var programmingLanguages = ["Java","C#","Python","Javascript"];

//get reference to the circle div
let circle = document.getElementById("circle");
// get refernce to the list div and button
let bookList = document.getElementById("bookList");
let bookBtn = document.getElementById("bookBtn");

var clickProcess = fromEvent(bookBtn,'click');
           

 
                
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

var load = (url : string) => {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("load",()=>{
        let books = JSON.parse(xhr.responseText);
        books.forEach(book=>{
            let div = document.createElement("div");
            div.innerText = book.title + " by "+ book.author;
            bookList.appendChild(div);
        })
    })

    xhr.open("GET", url);
    xhr.send();
}

clickProcess.subscribe(
    e => load("books.json"),
    e =>console.log(`error is : ${e}`),
    () =>  console.log(`completed data stream`)
)

