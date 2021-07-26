import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cargos'
})
export class CargosPipe implements PipeTransform {

  transform(value: any, query?: any): any {

    if (query === undefined || query === '') { return value; }
    return value.filter(datos => {
      return datos.nombre.toLowerCase().includes(query.toLowerCase());
    });
  }

}
