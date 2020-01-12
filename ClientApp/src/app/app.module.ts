import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ManageMeterReadingsComponent } from './manage-meter-readings/manage-meter-readings.component';
import { ManageCustomerAccountsComponent } from './manage-customer-accounts/manage-customer-accounts.component';
import { CustomerAccountsListComponent } from './customer-accounts-list/customer-accounts-list.component';
import { MeterReadingsListComponent } from './meter-readings-list/meter-readings-list.component';
import { CustomerAccountsService } from './services/customer-accounts-service';
import { MeterReadingsService } from './services/meter-readings-service';
import { CustomerAccountHeper } from './services/customer-account-helper';
import { MeterReadingsHelper } from './services/meter-readings-helper';
import { MeterReadingImportComponent } from './meter-reading-import/meter-reading-import.component';
import { CustomerAccountImportComponent } from './customer-account-import/customer-account-import.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ManageMeterReadingsComponent,
    ManageCustomerAccountsComponent,
    CustomerAccountsListComponent,
    MeterReadingsListComponent,
    MeterReadingImportComponent,
    CustomerAccountImportComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'manage-meter-readings', component: ManageMeterReadingsComponent },
      { path: 'manage-customer-accounts', component: ManageCustomerAccountsComponent },
    ]),
    BrowserAnimationsModule
  ],
  providers: [
    CustomerAccountsService,
    MeterReadingsService,
    CustomerAccountHeper,
    MeterReadingsHelper,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
