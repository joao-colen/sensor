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
  headElements = ['id', 'Marca', 'Tipo','Última Medida', 'Endereço']; 
  searchText: string = ''; 
  previous: string;
  sensors: any[];

  constructor(private sensorService: SensorsService, public dialog: MatDialog) {
  }
  
  // collumns of the table
  displayedColumns: string[] = ['id', 'Marca', 'Tipo', 'Última Medida', 'Endereço'];
  
  // data of the rows 
  dataSource = this.sensors;
  
  ngOnInit() {
    this.sensorService.getSensors().subscribe((res) => {
      this.sensors = res; 
      this.mdbTable.setDataSource(this.sensors); 
      this.previous = this.mdbTable.getDataSource(); 
      this.elements = this.sensors;
    });
  }

  // Open Add Dialog
  dialogAdd() {
    const dialogRef = this.dialog.open(AddDialogComponent);
  }
}