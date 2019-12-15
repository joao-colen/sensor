import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SensorsComponent } from './modules/sensors/pages/sensors/sensors.component';
import { SensorComponent } from './modules/sensors/pages/sensor/sensor.component';
import { DeleteDialogComponent } from './modules/sensors/pages/delete-dialog/delete-dialog.component';
import { HttpClientModule } from '@angular/common/http';

import { MatAutocompleteModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule, MatSlideToggleModule, MatMenuModule, MatSidenavModule, MatToolbarModule, MatCardModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatListModule, MatStepperModule, MatTabsModule, MatTreeModule, MatButtonModule, MatButtonToggleModule, MatBadgeModule, MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatBottomSheetModule, MatSnackBarModule, MatTooltipModule, MatPaginatorModule, MatSortModule, MatRippleModule, MatDialogModule, MatTableModule } from '@angular/material';
import { AddDialogComponent } from './modules/sensors/pages/add-dialog/add-dialog.component';
import { EditDialogComponent } from './modules/sensors/pages/edit-dialog/edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SensorsComponent,
    SensorComponent,
    DeleteDialogComponent,
    AddDialogComponent,
    EditDialogComponent
  ],
  entryComponents: [ 
    DeleteDialogComponent,
    AddDialogComponent,
    EditDialogComponent
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
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
