import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppService } from './app.service';
import { IMyDpOptions, IMyDateModel, IMySelector, IMyOptions } from 'mydatepicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe]
})
export class AppComponent implements OnInit {
  title = 'pruebaNexos';

  constructor(
    private appService: AppService,
    private datePipe: DatePipe
  ) {
    this.usuario.cargo = "";
  }

  ngOnInit() {
    this.obtenerCargos();
    this.obtenerUsuarios();
    this.obtenerMercancia();
  }

  fechaHoy = new Date();
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    todayBtnTxt: 'Hoy',
    editableDateField: false,
    componentDisabled: false,
    markCurrentDay: true,
    openSelectorOnInputClick: true,
    disableUntil: { year: 0, month: 0, day: 0 }/* ,
    disableSince:  { year: this.fechaHoy.getFullYear(), month: this.fechaHoy.getMonth() + 1, day: this.fechaHoy.getDate() + 1 } */
  };

  public myDatePickerOptions2: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    todayBtnTxt: 'Hoy',
    editableDateField: false,
    componentDisabled: false,
    markCurrentDay: true,
    openSelectorOnInputClick: true,
    disableUntil: { year: 0, month: 0, day: 0 },
    disableSince: { year: this.fechaHoy.getFullYear(), month: this.fechaHoy.getMonth() + 1, day: this.fechaHoy.getDate() + 1 }
  };
  private border = 'none';
  private selectedTextNormal: any = '';
  private selectedTextNormal2: any = '';


  nombreCargo: any;
  dataCargos: any = [];
  nodo: any;
  myValue: any;
  fechacreacion: any
  tablaCargos: any = 5;
  searchCargo: any;
  mp: any;
  mp1: any;
  mp2: any;
  itempagePuntos = 5;
  usuario: any = {};
  searchUsuario: any;
  searchMercancia: any;
  tablaUsuarios: any = 5;
  tablaMercancia: any = 5;
  bloqueador: boolean = false;
  dataUsuarios: any = [];
  dataMercancia: any = [
    /* {
      id: 2,
      nombre_producto: "llantas mod",
      cantidad: 25,
      fecha: "2021-04-18T05:00:00.000+00:00",
      usuario: {
        id: 1,
        nombre: "Karolayn",
        edad: 80,
        fecha_ingreso: "2021-07-23T05:00:00.000+00:00",
        cargo: {
          id: 6,
          nombre: "Jefe"
        }
      },
      fecha_modificacion: "2022-05-18T05:00:00.000+00:00",
      usuario_modificacion: {
        id: 2,
        nombre: "andres",
        edad: 20,
        fecha_ingreso: "2021-07-23T05:00:00.000+00:00",
        cargo: {
          id: 6,
          nombre: "Jefe"
        }
      }
    },
    {
      id: 3,
      nombre_producto: "carro mod",
      cantidad: 25,
      fecha: "2021-04-18T05:00:00.000+00:00",
      usuario: {
        id: 2,
        nombre: "felipe",
        edad: 80,
        fecha_ingreso: "2021-07-23T05:00:00.000+00:00",
        cargo: {
          id: 6,
          nombre: "Jefe"
        }
      },
      fecha_modificacion: "2022-05-18T05:00:00.000+00:00",
      usuario_modificacion: {
        id: 1,
        nombre: "andres",
        edad: 20,
        fecha_ingreso: "2021-07-23T05:00:00.000+00:00",
        cargo: {
          id: 6,
          nombre: "Jefe"
        }
      }
    } */
  ]
  producto: any = {};

  obtenerCargos() {
    this.appService.getCargos().subscribe(data2 => {
      console.log('resp', data2);
      this.dataCargos = data2;

    })
  }

  obtenerUsuarios() {
    this.appService.getUsuarios().subscribe(data2 => {
      console.log('resp', data2);
      this.dataUsuarios = data2;
    })
  }

  obtenerMercancia() {
    this.appService.getMercancia().subscribe(data2 => {
      console.log('resp', data2);
      this.dataMercancia = data2;
    })
  }


  GuardarCargo(nombre: any) {
    console.log(nombre);

    let cuerpo = { nombre: nombre }

    this.appService.postCargos(cuerpo).subscribe(data => {
      console.log('resp', data);
      this.obtenerCargos();
      this.nombreCargo="";
    })
  }

  GuardarUsuario(usuario) {
    usuario.fecha_ingreso = usuario.fecha_ingreso.formatted
    usuario.cargo = { id: usuario.cargo }
    console.log(usuario);
    this.appService.postUsuario(usuario).subscribe(data => {
      console.log('resp', data);
      this.obtenerUsuarios()
      this.usuario = {}
    })
  }

  GuardarProducto(producto) {
    producto.fecha = producto.fecha_ing_comp.formatted
    producto.usuario = { id: producto.usuario }
    console.log(producto);
    this.appService.getMercanciaExiste(producto.nombre_producto).subscribe(existe => {
      if (existe == false) {
        console.log("Entra if");

        this.appService.postMercancia(producto).subscribe(data => {
          console.log('resp', data);
          this.obtenerMercancia();
          this.producto={}
        })
      } else {
        alert("Ya Existe Un Aticulo Con Este Nombre")
      }
    })
  }


  llenarInfo(info) {
    console.log(info);
    this.disableUntil();

    this.bloqueador = true
    this.fechacreacion = info.fecha
    const fecha = new Date(info.fecha);
    this.producto.usuario = info.usuario.id;
    this.producto.nombre_producto = info.nombre_producto;
    this.producto.fecha_ing_comp = { date: { year: fecha.getFullYear(), month: fecha.getMonth() + 1, day: fecha.getDate() } };
    this.producto.cantidad = info.cantidad;
    this.producto.id = info.id;
  }

  ModificarProducto(producto) {
    console.log(producto);
    producto.id = this.producto.id
    producto.fecha = producto.fecha_ing_comp.formatted || this.fechacreacion
    const fechaModi = new Date()
    producto.fecha_modificacion = fechaModi;
    producto.usuario = { id: producto.usuario }
    producto.usuario_modificar = { id: producto.usuario_modificar }
    console.log(producto);

    const existe = this.dataMercancia.filter(x => (x.nombre_producto.toLowerCase().trim() === producto.nombre_producto.toLowerCase().trim()) &&
      (x.id != producto.id));
    console.log(existe);
    if (existe.length == 0) {
      console.log("Entra if");

      this.appService.putMercancia(producto).subscribe(data => {
        console.log('resp', data);
        if (data == 'Mercancia actualizada') {
          this.obtenerMercancia();
          this.producto.id = undefined;
          this.producto = {};
          this.bloqueador = false
        } else {
          alert(data);
        }

      })
    } else {
      alert("Ya Existe Un Aticulo Con Este Nombre")
    }
  }

  EliminarProducto(producto) {
    this.appService.deleteMercancia(producto.id).subscribe(data => {
      console.log('resp', data);

      this.obtenerMercancia();


    })
  }

  kPNumeros(event: any) {
    const pattern = /^[0-9]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onDateChanged(event: IMyDateModel) {
    if (event.formatted !== '') {
      this.dataUsuarios.fecha_ing_comp = event.formatted;
      this.border = '1px solid #CCC';
    } else {
      this.dataUsuarios.fecha_ing_comp = undefined;
      this.selectedTextNormal = '';
      this.border = 'none';
    }
  }

  onDateChanged2(event: IMyDateModel) {
    if (event.formatted !== '') {
      this.producto.fecha_ing_comp = event.formatted;
      this.border = '1px solid #CCC';
    } else {
      this.producto.fecha_ing_comp = undefined;
      this.selectedTextNormal = '';
      this.border = 'none';
    }
  }

  disableUntil() {
    const fecha = new Date();
    let copy = this.getCopyOfOptions();
    let dia = fecha.getDate();
    fecha.setDate(dia);
    console.log(fecha)
    copy.disableSince = { year: this.fechaHoy.getFullYear(), month: this.fechaHoy.getMonth() + 1, day: this.fechaHoy.getDate() + 1 }
    this.myDatePickerOptions2 = copy;
  }

  getCopyOfOptions(): IMyOptions {
    return JSON.parse(JSON.stringify(this.myDatePickerOptions2));
  }

}


