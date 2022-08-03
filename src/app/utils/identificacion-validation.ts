import { AbstractControl } from '@angular/forms'

export class IdentificacionValidation {
    static isEcuadorian(control: AbstractControl) {
        const cedula = control.value;
        var total = 0;
        var longitud = cedula.length;
        var longcheck = longitud - 1;

        if (cedula !== "" && longitud === 10) {
            for (let i = 0; i < longcheck; i++) {
                if (i % 2 === 0) {
                    var aux = cedula.charAt(i) * 2;
                    if (aux > 9) aux -= 9;
                    total += aux;
                } else {
                    total += parseInt(cedula.charAt(i)); // parseInt o concatenará en lugar de sumar
                }
            }

            total = total % 10 ? 10 - total % 10 : 0;

            if (cedula.charAt(longitud - 1) == total) {
                return null;
            } else {
                return {isEcuadorian: true};
            }
        }
    }
}