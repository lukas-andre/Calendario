import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bloques',
  templateUrl: './bloques.component.html',
  styleUrls: ['./bloques.component.css']
})
export class BloquesComponent implements OnInit {

  bloque:{
    rango_hora: string,
    data:string
  };

  constructor() {

  }

  ngOnInit() {
  }

  onClickDataCell(bloque: {rango_hora: string, data:string}){
    this.bloque = bloque;
    console.log("(escrito desde comoponente Bloques) Hola soy el bloque: " + this.bloque);
  }

}
