import { Observable, defer, from } from "rxjs";
import { retryWhen, scan, takeWhile, delay } from "rxjs/operators";


export var load = (url: string) => {

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

export var loadWithFetch = (url:string)=> {

    return defer(() => {
        return from(fetch(url).then(r => r.json()));
    });

    
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