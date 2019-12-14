import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { SensorsService } from '../../services/sensors.service';

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
    constructor(private sensorService: SensorsService) {
  }

  displayedColumns: string[] = ['id', 'height', 'width', 'length', 'voltage', 'brand', 'type'];
  dataSource = this.sensors;
  
  ngOnInit() {
    this.sensorService.getSensors().subscribe((res) => {
      this.sensors = res; 
    });
    
  }

}