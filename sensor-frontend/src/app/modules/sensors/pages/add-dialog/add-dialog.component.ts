import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { SensorsService } from '../../services/sensors.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  ngOnInit() {
  }
  
  options: FormGroup;

  constructor(private sensorService: SensorsService, public fb: FormBuilder,  private dialogRef: MatDialogRef<AddDialogComponent>) {
    this.options = fb.group({
      hideRequired: false,
      Tensao: '3',
      Marca: 'A1',
      Tamanho: 'A',
      Tipo: 'temperatura',
    });
  }

  addNewSensor() {
    let altura: any;
    let largura: any;
    let comprimento: any;
    if(this.options.get('Tamanho').value == 'A') {
      altura = 3;
      largura = 3;
      comprimento = 3;
    } else {
      altura = 1;
      largura = 2;
      comprimento = 2;
    }

    const body = {
      tensao: parseInt(this.options.get('Tensao').value),
      tipo:this.options.get('Tipo').value,
      altura: altura,
      largura: largura,
      comprimento: comprimento,
      marca: this.options.get('Marca').value
    }

    console.log(body);
    this.sensorService.addSensor(body).subscribe((res) => {
      this.dialogRef.close();
    });
    window.location.reload()
  }
}
