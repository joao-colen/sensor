import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SensorsComponent } from './modules/sensors/pages/sensors/sensors.component';
import { SensorComponent } from './modules/sensors/pages/sensor/sensor.component';
import { HttpClientModule } from '@angular/common/http';


import { MatAutocompleteModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule, MatSlideToggleModule, MatMenuModule, MatSidenavModule, MatToolbarModule, MatCardModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatListModule, MatStepperModule, MatTabsModule, MatTreeModule, MatButtonModule, MatButtonToggleModule, MatBadgeModule, MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatBottomSheetModule, MatSnackBarModule, MatTooltipModule, MatPaginatorModule, MatSortModule, MatRippleModule, MatDialogModule, MatTableModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    SensorsComponent,
    SensorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatRippleModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
