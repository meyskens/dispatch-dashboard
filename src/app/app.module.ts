import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from "@angular/flex-layout";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';

import { AuthService } from './auth/auth.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { CanActivateViaAuthGuard } from './auth/can-activate-via-auth.guard';
import { DashComponent } from './dash/dash.component';
import { HomeComponent } from './home/home.component';
import { AppListComponent } from './applist/applist.component';
import { LogsComponent } from './logs/logs.component';
import { AppListService } from './applist/applist.service';
import { NewAppDialog } from './applist/newapp.component';
import { AppDetailsComponent } from './appdetails/appdetails.component';
import { CurrentAppService } from './navbar/currentapp.service';
import { AppDetailsService } from './appdetails/appdetails.service';
import { AppDetailsSettingsComponent } from './appdetails/settings/settings.component';
import { AppDetailsGeneralComponent } from './appdetails/general/general.component';
import { DialogDeleteApp } from './appdetails/settings/dialog-delete.component';
import { DialogScaleApp } from './appdetails/general/dialog-scale.component';
import { AppDetailsFilesComponent } from './appdetails/files/files.component';
import { FilesService } from './appdetails/files/files.service';
import { PathValidator } from './appdetails/files/path.validator';
import { EnvVarsService } from './appdetails/envvars/envvars.service';
import { AppDetailsEnvVarsComponent } from './appdetails/envvars/envvars.component';
import { AppDetailsDatabasesComponent } from './appdetails/databases/databases.component';
import { DatabasesService } from './appdetails/databases/databases.service';
import { AppDetailsDomainsComponent } from './appdetails/domains/domains.component';
import { DialogAddDomain } from './appdetails/domains/dialog-add.component';
import { ApplogsComponent } from './applogs/applogs.component';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { ApplogsService } from './applogs/applogs.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashComponent,
    HomeComponent,
    AppListComponent,
    LogsComponent,
    NewAppDialog,
    AppDetailsComponent,
    AppDetailsSettingsComponent,
    AppDetailsGeneralComponent,
    DialogDeleteApp,
    DialogScaleApp,
    AppDetailsFilesComponent,
    PathValidator,
    AppDetailsEnvVarsComponent,
    AppDetailsDatabasesComponent,
    AppDetailsDomainsComponent,
    DialogAddDomain,
    ApplogsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    AngularDateTimePickerModule,
  ],
  providers: [
    AuthService,
    AppListService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    CanActivateViaAuthGuard,
    CurrentAppService,
    AppDetailsService,
    FilesService,
    EnvVarsService,
    DatabasesService,
    ApplogsService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [NewAppDialog, DialogDeleteApp, DialogScaleApp, DialogAddDomain],
})
export class AppModule { }
