import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    public https: HttpClient
  ) { }


  getCargos(){
    return this.https.get(`http://localhost:8080/pruebaNexos-0.0.1-SNAPSHOT/cargo/listarCargos`);
  }

  postCargos(cuerpo:any){
    return this.https.post(`http://localhost:8080/pruebaNexos-0.0.1-SNAPSHOT/cargo/registrarCargo`,cuerpo, {responseType: 'text'});
  } 

  getUsuarios(){
    return this.https.get(`http://localhost:8080/pruebaNexos-0.0.1-SNAPSHOT/usuario/listarUsuarios`);
  }

  postUsuario(cuerpo:any){
    return this.https.post(`http://localhost:8080/pruebaNexos-0.0.1-SNAPSHOT/usuario/registrarUsuario`,cuerpo, {responseType: 'text'});
  }

  getMercanciaExiste(nombre){
    return this.https.get(`http://localhost:8080/pruebaNexos-0.0.1-SNAPSHOT/mercancia/mercanciaNombre?nombre_producto=`+ nombre);
  }

  getMercancia(){
    return this.https.get(`http://localhost:8080/pruebaNexos-0.0.1-SNAPSHOT/mercancia/listarMercancia`);
  }

  postMercancia(cuerpo:any){
    return this.https.post(`http://localhost:8080/pruebaNexos-0.0.1-SNAPSHOT/mercancia/registrarMercancia`,cuerpo, {responseType: 'text'});
  }

  putMercancia(cuerpo:any){
    return this.https.post(`http://localhost:8080/pruebaNexos-0.0.1-SNAPSHOT/mercancia/actualizarMercancia`,cuerpo, {responseType: 'text'});
  }

  deleteMercancia(id:any){
    return this.https.delete(`http://localhost:8080/pruebaNexos-0.0.1-SNAPSHOT/mercancia/eliminarMercancia?id=`+id, {responseType: 'text'});
  }
}
