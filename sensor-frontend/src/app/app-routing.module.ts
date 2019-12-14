import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SensorsComponent } from './modules/sensors/pages/sensors/sensors.component';
import { SensorComponent } from './modules/sensors/pages/sensor/sensor.component';


const routes: Routes = [
  {'path': 'sensors', component: SensorsComponent},
  {'path': 'sensor', component: SensorComponent},
  { path: '', redirectTo: 'sensors', pathMatch: 'full' },
  { path: '**', redirectTo: 'sensors', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
