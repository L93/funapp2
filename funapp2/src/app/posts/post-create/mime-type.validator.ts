import { AbstractControl } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

export const mimeType = (control: AbstractControl): Promise<{[key: string]: any}> | Observable<{[key: string]: any}> => {

  const file = control.value as File;
  // above specifies value type, which == File here
  const fileReader = new FileReader();
  // fileReader.onloadend = () => {};
  // above "wouldn't work because its just sync code registering a f(x)". Right below is a way to bypass that w/ a custom observable.

  // frObs beneath means fileReader observer
  const frObs = Observable.create( (observer: Observer<{[key: string]: any}>) => { // you found the x !!! refer to last line.
    fileReader.addEventListener('loadend', () => {
      const arr = new Uint8Array(fileReader.result).subarray(0, 4);
      // subarray is the part that "allows us to get the mime type"
      // see more on notes
      let header = '';
      let isValid = false;
      // above defaults isValid to false, changes to true if file mime type found.
      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16); // converted to hexadecimal string.
      }

// checking for patterns indicating(stand for) file type, png &
// jpeg. Google "JS file mime types for more info on how this
// works, & file type representation"
// What he meant above is search "file signatures":

      switch (header) { // check each case for match, if none
        case '89504e47': // return default isValid = false;
          isValid = true;
          break;
        case 'ff8dffe0':
        case 'ff8dffe1':
        case 'ff8dffe2':
        case 'ff8dffe3':
        case 'ff8dffe8':
          isValid = true;
          break;
        default:
          isValid = false; // "Or you can use the blob.type as fallback"
          break;
      }
      if (isValid) {
        observer.next(null); // observer.next emits a value;

      } else {  // getting error for 'else'.. ??
        observer.next({invalidMimeType: true});
// above: observer return for error/invalid can be whatever key:value you want.
      }
      observer.complete(); // to let angular/subscribers know process is done.

    });
    fileReader.readAsArrayBuffer(file);
  });
  return frObs; // "return the file reader observable" to x marks the spot above.
 };
