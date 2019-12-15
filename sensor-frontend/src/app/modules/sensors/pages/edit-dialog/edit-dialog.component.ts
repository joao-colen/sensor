import { Component, OnInit, Inject, ViewChild, ElementRef, NgZone } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { SensorsService } from '../../services/sensors.service';
import { MatDialog } from '@angular/material';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  sensorID: any;
  options: FormGroup;

  
  constructor(private sensorService: SensorsService, private dialogRef: MatDialogRef<EditDialogComponent>, private ngZone: NgZone, private mapsAPILoader: MapsAPILoader, public fb: FormBuilder,  @Inject(MAT_DIALOG_DATA) data) {
    this.options = fb.group({
      hideRequired: false,
      Tensao: String(data.tensao),
      Marca: data.marca,
      Tamanho: data.tamanho,
      Tipo: data.tipo,
      Medida: data.valor_medido,
      Latitude: data.latitude,
      Longitude: data.longitude
    });
    this.sensorID = data.id;
  }

  latitude: number;
  longitude: number;
  zoom:number;
  address: string;
  private geoCoder;

  @ViewChild('search', {static: false})
  public searchElementRef: ElementRef;

  ngOnInit() {
    this.setCurrentLocation();

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
 
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
 
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 15;
          this.getAddress(this.latitude, this.longitude);
        });
      });
    });
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
      tensao: parseFloat(this.options.get('Tensao').value),
      tipo:this.options.get('Tipo').value,
      altura: altura,
      largura: largura,
      comprimento: comprimento,
      marca: this.options.get('Marca').value,
      valor_medido: this.options.get('Medida').value,
      latitude: this.latitude,
      longitude: this.longitude,
      endereco: this.address
    }
    console.log(body);
    this.sensorService.editSensor(this.sensorID, body).subscribe((res) => {
      this.dialogRef.close();
    });
    window.location.reload()
  }

    // Get Current Location Coordinates
    private setCurrentLocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = this.options.get('Latitude').value;
          this.longitude = this.options.get('Longitude').value;
          this.zoom = 15;
        });
      }
    }
  
    getAddress(latitude, longitude) {
      this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
        console.log(results);
        console.log(status);
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 15;
            this.address = results[0].formatted_address;
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
   
      });
    }

}
