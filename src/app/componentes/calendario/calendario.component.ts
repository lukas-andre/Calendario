// import { EventoService } from '../../servicios/evento.service';
// import { TrabajadorService } from '../../servicios/trabajador.service';

import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Trabajador } from '../../modelos/db/trabajador';
import { Evento } from '../../modelos/db/evento';
import { VARS } from '../../modelos/vars';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
  // providers: [TrabajadorService, EventoService]
})
export class CalendarioComponent implements OnInit {

  public title: string;
  public dateObj: Date;
  public view: string;
  public defaultDate: Date;
  public options: string;
  public master_date: Date;


  public year: any;
  public years: any[];
  public weak_days: any;
  public month;
  public months: any[];
  public today: any;
  public day;
  public num_day;
  public semana: Date[] = [];


  public fechaSeleccionada: string;

  public dinamic_date: Date;
  public dinamic_head: Date;
  public settings;

  public change;

  constructor() {
    this.master_date = new Date();
    this.constructSemanal();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  constructSemanal() {
    this.title = 'Toma Turno TEST 1';
    this.view = 'semanal';
    this.dinamic_date = this.master_date;
    this.dinamic_head = new Date();
    this.today = new Date();
    this.day = new Date().getDay();
    this.num_day = this.today.getDate();

    this.year = new Date().getFullYear();
    this.month = new Date().getMonth();
    this.weak_days = VARS._defaultDays;
    this.months = VARS._meses;
    this.month = this.months[this.today.getMonth()];
    this.semana = [];
    this.setSemana(this.today);
  }

  actualizarSemanal() {
    this.view = this.view;

  }

  recibirChangeSemana(change: {change: string}) {
    console.log(change);
  }


  setSemana(date: Date) {

    /**         MODELO :S

geDate() =>     1   2   3   4   5    6    0
ARRAY INDEX     0   1   2   3   4    5    6
                L   M   M   J   V    S    D
LO QUE BUSCO  [ 22  23  24  25  26  [27]  28 ]

                <-------------------> <---->
                to_first_day = 5        to_last_day = 1

                to_lef <--- = 5 ciclos  to_rigth = 1 ciclo

                []<-DIA DE HOY

     */

    // date.setDate(13);  <-- Variables para Jugar modificando el date que entra.
    // date.setMonth(1);  <--
    if (date.getDay() === 0) {
      date.setDate(date.getDate() - 1);
    }
    const numero_del_dia = date.getDate(); // numero del dia de HOY = 27
    const posicion_del_dia = date.getDay(); // posicion_del_dia sabado = 6
    const to_first_day = posicion_del_dia - 1;  // [-]Dias hacias atras para el lunes = 5
    const to_last_day = 7 - posicion_del_dia;  // [+]Dias para el ultimo dia = 1
    const _semana = [];

    let ayer = new Date(date);
    let mañana = new Date(date);

    let todayFlagRight = date;
    let todayFlagLeft = date;

    let left = 0;
    let right = 0;
    let index = 0;

    // DEJAME EXPLICAR ESTA SHET
    for (index; index < 6 ;  index++) { // un for de 7 cliclos para recorrer una semana
      for (left ; left < to_first_day; left ++) { // Recorremos primero hacia la izquierda <-
        ayer.setDate(todayFlagLeft.getDate() - 1); // ayer sera hoy - 1 dia.
        todayFlagLeft = ayer; // cambiamos today por ayer pa seguir el ciclo.. como una burbuja
        ayer = new Date(todayFlagLeft); // seteamos ayer como Date como su dia esta parte esta loca :s pero funciona
        _semana.push(todayFlagLeft); // pusheamos, se que tengo el index y puedo ponerlo en su lugar.
      }                          // pero no funciono al menos como lo intente asi que luego se orde
      for (right ; right <= to_last_day; right ++) { // se recorre los dias que falten para la derecha
        mañana.setDate(todayFlagRight.getDate() + 1); // mañana sera mañana + 1, si es raro pero mañana es hoy.
        _semana.push(todayFlagRight);                // Pusheamos hoy primero, ya que no lo contamos en el ford anterior [27]
        todayFlagRight = mañana; // avanzamos todayFlagRight a mañana. Este Tu 'presente'
        mañana = new Date(todayFlagRight); // Reseteamos mañana como nuevo 'presente'
      }
    }
    // OBTENER AÑO Y MES DE LA SEMANA
    this.semana = this.sortSemana(_semana);
    console.log('this.semana[0]', this.semana[0]);
    // this.dinamic_date = this.semana[0];
    this.dinamic_head = date;

    this.today = this.semana[0];
    this.day = this.today.getDay();
    this.num_day = this.today.getDate();
    this.month = this.months[this.today.getMonth()];
    this.year = this.today.getFullYear();
  }
// ORDENAMINETO CUMA JAJAJA
  sortSemana(arrayDate: Date[]) {
    const _arrayDate = [];
    for (let i = 0; i < arrayDate.length; i++) {  // Recorremos el arrelgo para ordenarlo
      _arrayDate[arrayDate[i].getDay()] = arrayDate[i]; // Basicamente get day arroja el index semana. ejemeplo si es lunes su index es 1 , domingo 0 ...etc.
    }       // EL ARREGLO QUEDO [0,1,2,3,4,5,6] | PROBLEA -> 0 es Domingo, debe quedar -> [1,2,3,4,5,6,0]
    const set_last = _arrayDate[0];  // TOMAMOS ELEMENTO DE LA POSICION 0
    for (let j = 0; j < arrayDate.length - 1 ; j++) {
      _arrayDate[j] = _arrayDate[j + 1]; // SHUFLEMAOS
    }
    _arrayDate.pop(); // SACAMOS EL ULTIMO QUE SE QUEDA PEGADO
    _arrayDate.push(set_last); // PUSHEAMOS set_last QUE GUARDAMOS ANTES
    return _arrayDate; // ARRAY ORDENADO
  }

  recibirFecha(fecha: {fechaStringEvento: string}) {
    this.fechaSeleccionada = JSON.parse(fecha.fechaStringEvento);
    console.log(this.fechaSeleccionada);
  }

  changeSemana(change: any) {
    const date_semana_siguiente = this.dinamic_date;
    console.log(change);
    if (change === 'next') {
      if (this.dinamic_date.getDay() === 0) {
        date_semana_siguiente.setDate(this.dinamic_date.getDate() + 1);
      } else {
        date_semana_siguiente.setDate(this.dinamic_date.getDate() + 7 );
      }
    }
    if (change === 'before') {
      if (this.dinamic_date.getDay() === 0) {
        date_semana_siguiente.setDate(this.dinamic_date.getDate() - 1);
      } else {
        date_semana_siguiente.setDate(this.dinamic_date.getDate() - 7 );
      }
    }
    this.setSemana(date_semana_siguiente);
  }
}
