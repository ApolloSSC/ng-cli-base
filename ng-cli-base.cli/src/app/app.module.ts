import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserApiService, CommentApiService, PostApiService } from './api/api.services';
import { SharedService } from './service/shared.service';
import { HttpModule } from '@angular/http';
import { NavbarComponent } from './navbar/navbar.component';
import { PostsPanelComponent } from './posts/posts-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PostsPanelComponent
  ],
  imports: [
      BrowserModule,
      HttpModule,
      FormsModule
  ],
  providers: [
      UserApiService,
      CommentApiService,
      PostApiService,
      SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
