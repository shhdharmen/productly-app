import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
const config: SocketIoConfig = { url: environment.apiUrl, options: {} };

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SocketIoModule.forRoot(config),
    ToastrModule.forRoot()
  ]
})
export class CoreModule { }
