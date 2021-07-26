import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { MyDatePickerModule } from 'mydatepicker';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CargosPipe } from './cargos.pipe';
import { UsuarioPipe } from './usuario.pipe';
import { MercanciaPipe } from './mercancia.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CargosPipe,
    UsuarioPipe,
    MercanciaPipe
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    MyDatePickerModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
