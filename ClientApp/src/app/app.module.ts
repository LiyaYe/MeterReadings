import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { MeterReadingComponent } from './meter-reading/meter-reading.component';
import { ManageMeterReadingsComponent } from './manage-meter-readings/manage-meter-readings.component';
import { ManageCustomerAccountsComponent } from './manage-customer-accounts/manage-customer-accounts.component';
import { CustomerAccountsListComponent } from './customer-accounts-list/customer-accounts-list.component';
import { MeterReadingsListComponent } from './meter-readings-list/meter-readings-list.component';
import { CustomerAccountsService } from './services/customer-accounts-service';
import { MeterReadingsService } from './services/meter-readings-service';
import { CustomerAccountHeper } from './services/customer-account-helper';
import { MeterReadingsHelper } from './services/meter-readings-helper';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    MeterReadingComponent,
    ManageMeterReadingsComponent,
    ManageCustomerAccountsComponent,
    CustomerAccountsListComponent,
    MeterReadingsListComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'manage-meter-readings', component: ManageMeterReadingsComponent },
      { path: 'manage-customer-accounts', component: ManageCustomerAccountsComponent },
    ])
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
