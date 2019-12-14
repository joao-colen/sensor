import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SensorsService } from '../../services/sensors.service';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {

  constructor(private route: ActivatedRoute, private sensorService: SensorsService) { }
  home: any;
  sensorID : string;

  ngOnInit() {
    this.sensorID = this.route.snapshot.params.id;
    console.log(this.sensorID);

    this.sensorService.getSensor(this.sensorID).subscribe((res) => {
      [this.home] = res;
      console.log(this.home);
    });
  }

}
