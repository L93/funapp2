import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from 'src/app/app.component';
import { HomeComponent } from 'src/app/home/home.component';
import { HeaderComponent } from 'src/app/header/header.component';
import { PostsComponent } from 'src/app/posts/posts.component';
import { PostCreateComponent } from 'src/app/posts/post-create/post-create.component';
import { PostListComponent } from 'src/app/posts/post-list/post-list.component';
import { PostItemComponent } from 'src/app/posts/post-list/post-item/post-item.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import { AccountComponent } from 'src/app/account/account.component';
import { DisregardoneComponent } from 'src/app/disregardone/disregardone.component';
import { DisregardtwoComponent } from 'src/app/disregardtwo/disregardtwo.component';



const appRoutes : Routes = [
  {path: 'home', component: HomeComponent, children: [
  
    {path: '', component: HeaderComponent, children: [
      {path: 'disregardone', component: DisregardoneComponent},
      {path: 'disregardtwo', component: DisregardtwoComponent},
      {path: 'account', component: AccountComponent},
      {path: 'page-not-found', component: PageNotFoundComponent},
      {path: 'posts', component: PostsComponent, children: [
        {path: 'list', component: PostListComponent, children: [
          {path: '', component: PostItemComponent, children: [
            {path: '', component: PostCreateComponent}
          ]},
      ]},
    ]}
    ]},
  ]
},
  {path: '', redirectTo: 'home', pathMatch: "full"},
  {path: '**', redirectTo: 'home/header/page-not-found'}
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing: false} ),
    CommonModule
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
