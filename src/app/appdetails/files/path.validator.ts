import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl, AbstractControl } from '@angular/forms';

@Directive({
    selector: '[validatePath][ngModel],[validatePath][formControl]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => PathValidator), multi: true }
    ]
})
export class PathValidator {

    constructor() {}

    validate(control: AbstractControl): {[key: string]: any;}  {
        var val: string = control.value;
        if (!val) {
            return {'path': 'Path is invalid '}
        }
        
        const match = val.match(/^(\/[^/ ]*)+\/?$/gm)
        if (!match) {
            return {'path': 'Path is invalid '}
        }
        if (match.length !== 1) {
            return {'path': 'Path is invalid '}
        }
        if (match[0].toString() !== val.toString()) {
            return {'path': 'Path is invalid '}
        }

        return null
     };
}