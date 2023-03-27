import { AbstractControl } from "@angular/forms";

export function passwordValidate(ctrl:AbstractControl):{[key:string]:any}|null
{
    let pass=ctrl?.get('password')?.value;
    let conpass=ctrl?.get('confirmPassword')?.value;

    return (pass !== conpass)?{'missMatch':true}:null;


}