import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SensorsService } from '../../services/sensors.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { SensorsComponent } from '../sensors/sensors.component';
import {MatDialog, MatDialogConfig} from '@angular/material';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {

  constructor(private route: ActivatedRoute, private sensorService: SensorsService, public dialog: MatDialog) { }
  sensor: any;
  sensorID : string;

  ngOnInit() {
    this.sensorID = this.route.snapshot.params.id;
    console.log(this.sensorID);

    this.sensorService.getSensor(this.sensorID).subscribe((res) => {
      [this.sensor] = res;
      console.log(this.sensor);
    });
  }
  
  dialogDelete() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: this.sensorID
    };
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
  }

  dialogEdit() {
    const dialogConfig = new MatDialogConfig();
    let tamanho
    if(this.sensor.altura == 3) {
      tamanho = 'A';
    } else {
      tamanho = 'B';
    }
    dialogConfig.data = {
      id: this.sensorID,
      tamanho: tamanho,
      marca: this.sensor.marca,
      tipo: this.sensor.tipo,
      tensao: this.sensor.tensao
    };

    const dialogRef = this.dialog.open(EditDialogComponent, dialogConfig);
  }
}
