import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// browser animation module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

// Routing Module
import { AppRoutingModule } from './app.routing';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
// Login
import { LoginComponent } from './login/login.component';

// http service
import { HttpModule } from '@angular/http';
import { PrestasiComponent } from './prestasi/prestasi.component';

// toaster modul
import { ToastrModule } from 'toastr-ng2';
//datatables module ]
import { DataTablesModule } from 'angular-datatables';
// ng 2 select
import { SelectModule } from 'ng2-select-compat';
// ng 2 auto complete
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

// DP
import { DatePickerModule } from 'ng2-datepicker';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalsComponent } from './modals/modals.component';

// auth guard
import { AuthGuard } from './_guards/auth.guard';
// lampiran
import { LampiranComponent } from './lampiran/lampiran.component';
// surat masuk
import { SuratMasukComponent } from './surat-masuk/surat-masuk.component';
import { SuratKeluarComponent } from './surat-keluar/surat-keluar.component';
import { RetensiSuratComponent } from './retensi-surat/retensi-surat.component';
import { SasaranMutuComponent } from './sasaran-mutu/sasaran-mutu.component';



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ToastrModule.forRoot(), // ToastrModule added
    ChartsModule,
    HttpModule,
    DataTablesModule,
    ModalModule,
    SelectModule,
    Ng2AutoCompleteModule,
    DatePickerModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    LoginComponent,
    PrestasiComponent,
    LampiranComponent,
    SuratMasukComponent,
    ModalsComponent,
    SuratKeluarComponent,
    RetensiSuratComponent,
    SasaranMutuComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  AuthGuard
],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
