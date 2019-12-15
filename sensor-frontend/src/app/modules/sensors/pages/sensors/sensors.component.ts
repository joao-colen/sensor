import { Component, OnInit, HostListener, ViewChild} from '@angular/core';
import { SensorsService } from '../../services/sensors.service';
import { SensorComponent } from '../sensor/sensor.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { MdbTableDirective, MDBBootstrapModule } from 'angular-bootstrap-md';

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
  @ViewChild(
    MdbTableDirective, { 
      static: true 
    }
  ) 
  mdbTable: MdbTableDirective; 
  elements: any = []; 
  headElements = ['id', 'height', 'width', 'length', 'voltage', 'brand', 'type']; 
  searchText: string = ''; 
  previous: string;
  sensors: any[];

  constructor(private sensorService: SensorsService, public dialog: MatDialog) {
  }
  
  @HostListener('input') oninput() { 
    this.searchItems();
  }
  
  displayedColumns: string[] = ['id', 'height', 'width', 'length', 'voltage', 'brand', 'type'];
  dataSource = this.sensors;
  
  ngOnInit() {
    this.sensorService.getSensors().subscribe((res) => {
      this.sensors = res; 
      this.mdbTable.setDataSource(this.sensors); 
      this.previous = this.mdbTable.getDataSource(); 
      this.elements = this.sensors;
    });

  }

  searchItems() { 
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous); 
      this.elements = this.mdbTable.getDataSource(); 
    } 
    if (this.searchText) { 
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev); 
    } 
  } 

  dialogAdd() {
    const dialogRef = this.dialog.open(AddDialogComponent);
  }
}