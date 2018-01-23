import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bloques',
  templateUrl: './bloques.component.html',
  styleUrls: ['./bloques.component.css']
})
export class BloquesComponent implements OnInit {

  estadoBloque = true;
  @Input() cantidadBloques = 7;
  rango_bloque : string[] = [
    '18:00-19:00',
    '17:00-18:00',
    '15:00-16:00',
    '13:00-14:00',
    '11:00-12:00',
    '10:00-11:00',
    '09:00-10:00',
  ]
  rowBloques: string[];

  bloque:{numero: number, estado: boolean};
  constructor() {
    // this.getRowBloques();
  }

  ngOnInit() {
  }

  // getRowBloques(){
  //   for(let i = 0; i < this.rango_bloque.length ; i++ ) {
  //     this.rowBloques.push(this.rango_bloque[i]);
  //     for(let j = 0; j < 7; j++){
  //       this.rowBloques.push('true');
  //     }
  //   }
  // }

  getBloque(){
    if (this.rango_bloque){
      console.log(this.rango_bloque.pop())
      // return this.rango_bloque.pop();

    }
  }

}
