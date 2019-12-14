import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { SensorsService } from '../../services/sensors.service';
import { SensorComponent } from '../sensor/sensor.component';
import { MatDialog } from '@angular/material';

export interface SensorElement {
  id: number;
  height: number;
  width: number;
  length: number;
  voltage: number;
  brand: string;
  type: string;
}

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css']
})

export class SensorsComponent implements OnInit {

  sensors: any[];
    constructor(private sensorService: SensorsService, public dialog: MatDialog) {
  }

  displayedColumns: string[] = ['id', 'height', 'width', 'length', 'voltage', 'brand', 'type'];
  dataSource = this.sensors;
  
  ngOnInit() {
    this.sensorService.getSensors().subscribe((res) => {
      this.sensors = res; 
    });
    
  }

  openDialog() {
    const dialogRef = this.dialog.open(SensorComponent, {
      height: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}