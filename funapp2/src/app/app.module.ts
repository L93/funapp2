import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import  { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { PostsComponent } from './posts/posts.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostItemComponent } from './posts/post-list/post-item/post-item.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AccountComponent } from 'src/app/account/account.component';
import { FooterComponent } from './footer/footer.component';
import { DisregardoneComponent } from './disregardone/disregardone.component';
import { DisregardtwoComponent } from './disregardtwo/disregardtwo.component';
import { PostInterface } from 'src/app/shared/post.model';


import { AppRoutingModule } from './shared/app-routing/app-routing.module';
import { DataService } from 'src/app/shared/data.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatCardModule,
          MatButtonModule, MatToolbarModule,
          MatToolbar, MatExpansionModule, MatProgressBarModule, 
          MatProgressSpinnerModule} from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PostsComponent,
    PostCreateComponent,
    PostListComponent,
    PostItemComponent,
    PageNotFoundComponent,
    AccountComponent,
    FooterComponent,
    DisregardoneComponent,
    DisregardtwoComponent,
  ],
  imports: [
  
    FormsModule,
    BrowserModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    BrowserModule,
    

    BrowserAnimationsModule, MatInputModule, MatCardModule,
    MatButtonModule, MatToolbarModule, MatExpansionModule,
    MatProgressBarModule, MatProgressSpinnerModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
