import { Component, OnInit } from '@angular/core';
import { Meses } from '../modelos/meses.model';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  dias: string[] = [
    'Lunes', 'Martes', 'Miercoles',
    'Jueves', 'Viernes', 'Sabado'
  ];
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
  bloques = [1,2,3,4,5,6,7]

  constructor() {
    this.setMesActualVerbose();
  }

  ngOnInit() {
  }

  setMesActualVerbose(){
    this.mesActualVerbose = this.meses.getNombresArray()[this.mesActual];
  }



}
