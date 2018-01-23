import { Component, OnInit } from '@angular/core';
import { Meses } from '../modelos/meses.model';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  head: string[] = [
    'Bloque','Lunes', 'Martes', 'Miercoles',
    'Jueves', 'Viernes'
  ];

  rango_bloque : string[] = [
    '09:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '13:00-14:00',
    '14:00-15:00',
    '15:00-16:00',
    '16:00-17:00',
    '17:00-18:00',
    '18:00-19:00',
  ]

  dd: number;
  meses: Meses = new Meses();
  aaaa: number;
  semana: number;
  bis: boolean = false;
  añoInicio: number;
  ahora: any = new Date();
  anhoActual: number = new Date().getFullYear();
  mesActual: any = new Date().getMonth();
  mesActualVerbose: any ;

  constructor() {
    this.setMesActualVerbose();
  }

  ngOnInit() {
  }

  setMesActualVerbose(){
    this.mesActualVerbose = this.meses.getNombresArray()[this.mesActual];
  }

  getBloque(){
    if(this.rango_bloque){
      return this.rango_bloque.pop();
    }
  }
}
