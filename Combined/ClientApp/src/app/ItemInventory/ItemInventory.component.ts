import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ItemInventory',
  templateUrl: './ItemInventory.component.html'
})
export class ItemInventoryDataComponent {
  public itemInventoryDataModel = {
    ItemInventoryID: null,
    ItemID: "",
    ItemQuantity: "",
    ItemRate: "",
    ItemName: "",
    CreateDate: 0
  };

  public items: GetItems[];

  private _baseUrl: string;
  private _http: HttpClient;

  constructor(http: HttpClient, @Inject('API_URL') apiUrl: string) {
    http.get<GetItems[]>(apiUrl + 'Values/GetItems').subscribe(result => {
      this.items = result;
      console.log(this.items);
    }, error => console.error(error));
    this._baseUrl = apiUrl;
    this._http = http;
    this.itemInventoryDataModel = {
      ItemInventoryID: 0,
      ItemQuantity: "",
      ItemRate: "",
      ItemID: "",
      ItemName: "",
      CreateDate: 0
    };
  }
  SaveItemInventory() {
    this._http.post<PostItemInventory>(this._baseUrl + 'values/SaveItemInventory', this.itemInventoryDataModel).subscribe(result => {
      alert("Saved Successfully");
      console.log("Error");
    }, error => console.error(error));
  }
}

interface GetItems {
  ItemID: number;
  ItemName: string;
  CategoryID: number;
}
interface PostItemInventory {
  ItemInventoryID: number;
  ItemQuantity: number;
  ItemRate: number;
  ItemID: number;
  ItemName: string;
  CreateDate: any;
}
