import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth.routing';

import { Auth } from './auth.component';

@NgModule({
    imports: [BrowserModule, FormsModule, AuthRoutingModule ],
    declarations: [Auth]
})

export class AuthModule {}