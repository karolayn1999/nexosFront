import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mercancia'
})
export class MercanciaPipe implements PipeTransform {

  transform(value: any, query?: any): any {

    if (query === undefined || query === '') { return value; }
    return value.filter(datos => {
      return datos.usuario.nombre.toLowerCase().includes(query.toLowerCase()) || datos.nombre_producto.toLowerCase().includes(query.toLowerCase())||
      datos.fecha.toLowerCase().includes(query.toLowerCase());
    });
  }

}
