import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usuario'
})
export class UsuarioPipe implements PipeTransform {

  transform(value: any, query?: any): any {

    if (query === undefined || query === '') { return value; }
    return value.filter(datos => {
      return datos.nombre.toLowerCase().includes(query.toLowerCase()) || datos.edad.toString().toLowerCase().includes(query.toLowerCase())||
      datos.fecha_ingreso.toLowerCase().includes(query.toLowerCase());
    });
  }
}
