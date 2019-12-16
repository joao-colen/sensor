import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { SensorsService } from '../../services/sensors.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

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
  
  options: FormGroup;

  constructor(private sensorService: SensorsService, public fb: FormBuilder, private ngZone: NgZone, private mapsAPILoader: MapsAPILoader, private dialogRef: MatDialogRef<AddDialogComponent>) {
    this.options = fb.group({
      hideRequired: false,
      Tensao: '3',
      Marca: 'A1',
      Tamanho: 'A',
      Tipo: 'temperatura',
      Medida: '',
      Latitude: '',
      Longitude: '',
    });
  }

  latitude: number;
  longitude: number;
  zoom:number;
  address: string;
  private geoCoder;

  @ViewChild('search', {static: false})
  public searchElementRef: ElementRef;

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

    this.sensorService.addSensor(body).subscribe((res) => {
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
