import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { VARS } from '../../../modelos/vars';
import { Bloque } from '../../../modelos/bloque';

@Component({
  selector: 'app-bloques',
  templateUrl: './bloques.component.html',
  styleUrls: ['./bloques.component.css']
})
export class BloquesComponent implements OnInit {

  @Input() dinamic_date: Date;
  @Input() semana;
  @Input() settings;
  @Input() view;

  @Output() fechaClickeada = new EventEmitter<{fechaStringEvento: string}>();
  @Output() changeSemana = new EventEmitter<{change: string}>();

  year;
  month;
  num_dia;
  dias;
  rango_bloque;
  head;
  fecha;

  public dias_stringify: any[];
  public bloqueType: string;

  public bloques: any[];
  public bloque: Bloque;



  constructor() {
    this.head = VARS._defaultDays;
    this.rango_bloque = VARS._default_rango_boque;
    this.dias = VARS._defaultDays;
    this.bloques = [];
  }

  ngOnInit() {
    this.bloqueType = this.view;
    this.setChanges(this.semana);
    this.year = this.semana[0].getFullYear();
    this.month = this.semana[0].getMonth();
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
    if (changes.semana) {
      this.setChanges(changes.semana.currentValue);
    }
  }

  setChanges(semana: any) {
    let iterator = 0; // LOL XD 
    this.bloques = []; // LIMPIAMOS CACHE
    for (const i of semana) {
      this.bloque = new Bloque();      
      this.bloque.nombre_dia = VARS._defaultDays[iterator];      
      this.bloque.anho = i.getFullYear();
      this.bloque.mes = i.getMonth();
      this.bloque.num_dia = i.getDate();
      this.bloques.push(this.bloque);
      iterator++;
    }
  }

  onClickDataCell(rango: string, bloque: number, data: Bloque) {
    data.rango_bloque = rango;
    data.bloque = bloque;
    this.emitirFecha(JSON.stringify(data));    
  }

  emitirFecha(data: string) {
    this.fechaClickeada.emit({fechaStringEvento: data});
  }
}
