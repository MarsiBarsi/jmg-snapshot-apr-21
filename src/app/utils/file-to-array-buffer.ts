import {Observable} from 'rxjs';

export function fileToArrayBuffer(file: File): Observable<ArrayBuffer> {
    return new Observable(observer => {
        const fileReader = new FileReader();

        fileReader.onload = () => {
            if (fileReader.result instanceof ArrayBuffer) {
                observer.next(fileReader.result);
                observer.complete();
            } else {
                observer.error(new Error('Failed to read file as ArrayBuffer'));
            }
        };
        fileReader.onerror = observer.error.bind(observer);
        fileReader.readAsArrayBuffer(file);
    });
}
