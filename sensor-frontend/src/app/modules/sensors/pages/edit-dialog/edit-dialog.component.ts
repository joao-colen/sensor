import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { SensorsService } from '../../services/sensors.service';
import { MatDialog } from '@angular/material';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  sensorID: any;
  options: FormGroup;
  constructor(private sensorService: SensorsService, private dialogRef: MatDialogRef<EditDialogComponent>, public fb: FormBuilder,  @Inject(MAT_DIALOG_DATA) data) {
    this.options = fb.group({
      hideRequired: false,
      Tensao: String(data.tensao),
      Marca: data.marca,
      Tamanho: data.tamanho,
      Tipo: data.tipo,
    });
    this.sensorID = data.id;
  }

  ngOnInit() {
  }

  editSensor() {
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
    this.sensorService.editSensor(this.sensorID, body).subscribe((res) => {
      this.dialogRef.close();
    });
    //window.location.reload()
  }

}
