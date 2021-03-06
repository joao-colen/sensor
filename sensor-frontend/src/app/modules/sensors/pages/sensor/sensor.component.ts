import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SensorsService } from '../../services/sensors.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { SensorsComponent } from '../sensors/sensors.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {

  constructor(private route: ActivatedRoute, private sensorService: SensorsService, public dialog: MatDialog, private ngZone: NgZone, private mapsAPILoader: MapsAPILoader) { }
  sensor: any;
  sensorID : string;
  latitude: number;
  longitude: number;
  zoom:number;
  address: string;
  private geoCoder;
 
  @ViewChild('search', {static: false})
  public searchElementRef: ElementRef;
  
  ngOnInit() {
    this.sensorID = this.route.snapshot.params.id;

    this.sensorService.getSensor(this.sensorID).subscribe((res) => {
      [this.sensor] = res;
      this.setCurrentLocation();
    });
    
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
    });
  }
  
  // open Delete Dialog
  dialogDelete() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: this.sensorID
    };
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
  }

  // open Edit Dialog
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
      tensao: this.sensor.tensao,
      valor_medido: this.sensor.ultima_medida,
      latitude: this.latitude,
      longitude: this.longitude,
      endereco: this.address
    };

    const dialogRef = this.dialog.open(EditDialogComponent, dialogConfig);
  }

  // Get the location of the sensor
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = this.sensor.latitude;
        this.longitude = this.sensor.longitude;
        this.zoom = 15;
      });
    }
  }
}
