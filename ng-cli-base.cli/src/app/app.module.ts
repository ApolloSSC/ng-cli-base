import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserApiService, CommentApiService, PostApiService } from './api/api.services';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
      BrowserModule,
      HttpModule,
      FormsModule
  ],
  providers: [
      UserApiService,
      CommentApiService,
      PostApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
