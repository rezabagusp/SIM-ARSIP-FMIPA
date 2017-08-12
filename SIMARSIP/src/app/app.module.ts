import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
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

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';

// App as root module,  library
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.routing';
import { ToastrModule } from 'toastr-ng2';

// auth
import { AuthModule } from './auth/auth.module';
// admin
import { AdminModule } from './admin/admin.module';
// superadmin


// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalsComponent } from './modals/modals.component';

// service 
import { AuthenticationService } from './_services/authentication.service';
import { AdminService } from './_services/admin.service';
import { UploadService } from './_services/upload.service';

// Guard for canActive
import { AuthGuard } from './_guards/auth.guard';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ToastrModule.forRoot(),
    ChartsModule,
    BrowserAnimationsModule,
    HttpModule,
    //global module
    ModalModule,    
    //app
    AuthModule,
    AdminModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    ModalsComponent,
  ],
  exports: [

  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  AuthGuard,
  AuthenticationService,
  AdminService,
  UploadService
],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
