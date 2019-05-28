import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BookDataComponent } from './Booking/Book.component';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { CreateDataComponent } from './Create/create.component';
import { ItemDataComponent } from './Item/Item.component';
import { ItemInventoryDataComponent } from './ItemInventory/ItemInventory.component';
import { ItemOrderDataComponent } from './ItemOrder/ItemOrder.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    BookDataComponent,
    CounterComponent,
    FetchDataComponent,
    CreateDataComponent,
    ItemDataComponent,
    ItemInventoryDataComponent,
    ItemOrderDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'Booking', component: BookDataComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'Create', component: CreateDataComponent },
      { path: 'Item', component: ItemDataComponent },
      { path: 'ItemInventory', component: ItemInventoryDataComponent },
     { path: 'ItemOrder', component: ItemOrderDataComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
