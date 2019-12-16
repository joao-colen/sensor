import { Component, OnInit, Inject } from '@angular/core';
import { SensorsService } from '../../services/sensors.service';
import { SensorComponent } from '../sensor/sensor.component';
import { MatDialog } from '@angular/material';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  sensorID: any;
  constructor(private sensorService: SensorsService, private dialogRef: MatDialogRef<DeleteDialogComponent>,  @Inject(MAT_DIALOG_DATA) data) { 
    this.sensorID = data.id;
  }

  ngOnInit() {
  }

  // function to remove Sensor
  removeSensor() {
    this.sensorService.deleteSensor(this.sensorID).subscribe((res) => {
      this.dialogRef.close();
    });
  }

  // function to cancel action of removing the sensor
  close() {
    this.dialogRef.close();
  }
}
