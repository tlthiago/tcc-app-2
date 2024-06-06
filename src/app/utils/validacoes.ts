import { FormControl, FormArray, FormGroup, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export class Validacoes {

  static requiredMinCheckbox(min = 1) {
      const validator = (formArray: FormArray) => {
          const totalChecked = formArray.controls
            .map(v => v.value)
            .reduce((total, current) => current ? total + current : total, 0);
          return totalChecked >= min ? null : { required: true };
      };

      return validator;
  }

  
  static senhasCombinam(outroCampoNome: string, ehPrincipal: boolean = false) {
    return (control: AbstractControl): ValidationErrors | null => {
      const campo = control.value;
      
      console.log('campo', campo);

      console.log('control.parent', control.parent);

      console.log('control.parent.controls', control.parent?.controls);
        
      
      if (control.parent && control.parent.value) {

        if (ehPrincipal) {
          const outroCampo = (control.parent?.controls as any)[outroCampoNome] as AbstractControl;
          if (outroCampo.value) {
            outroCampo.updateValueAndValidity();
          }
          return null;
        } else {
           return campo === (control.parent?.controls as any)[outroCampoNome].value ? null : { senhasNaoCoincidem: true };
        }
      }
  
      return { senhasNaoCoincidem: true };
    };
  }

  // Funciona para comparar campos de senha
  static matchValidator(matchTo: string, reverse?: boolean): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.parent && reverse) {
              const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
              if (c) {
                c.updateValueAndValidity();
              }
              return null;
            }
            return !!control.parent && !!control.parent.value &&
              control.value === (control.parent?.controls as any)[matchTo].value ? null : { matching: true };
        };
  }

  static cepValidator(control: AbstractControl) {
    const cep = control.value;
    if (cep && cep !== '') {
      const validacep = /^[0-9]{8}$/;
      return validacep.test(cep) ? null : { cepInvalido : true };
    }
    return null;
  }

  static validaCpf(controle: AbstractControl) {
    const cpf = controle.value;

    let soma: number = 0;
    let resto: number;
    let valido: boolean;

    const regex = new RegExp('[0-9]{11}');

    if (
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999' ||
      !regex.test(cpf)
    )
      valido = false;
    else {
      for (let i = 1; i <= 9; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
      resto = (soma * 10) % 11;

      if (resto == 10 || resto == 11) resto = 0;
      if (resto != parseInt(cpf.substring(9, 10))) valido = false;

      soma = 0;
      for (let i = 1; i <= 10; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
      resto = (soma * 10) % 11;

      if (resto == 10 || resto == 11) resto = 0;
      if (resto != parseInt(cpf.substring(10, 11))) valido = false;
      valido = true;
    }

    if (valido) return null;

    return { cpfInvalido: true };
  }
}