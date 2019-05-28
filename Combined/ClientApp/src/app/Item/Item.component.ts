import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html'
})

export class ItemDataComponent {
  public categoryDataModel =
    {
      CategoryID: "",
      ItemName: ""
    };
  public categories: GetCategory[];
  public items: GetItems[];

  private _baseUrl: string;
  private _http: HttpClient;

  constructor(http: HttpClient, @Inject('API_URL') apiUrl: string) {
    http.get<GetCategory[]>(apiUrl + 'Values/GetCategory').subscribe(result => {
      this.categories = result;
      console.log(this.categories);
    }, error => console.error(error));

    http.get<GetItems[]>(apiUrl + 'Values/GetItems').subscribe(result => {
      this.items = result;
      console.log(this.items);
    }, error => console.error(error));

    this._baseUrl = apiUrl;
    this._http = http;
    this.categoryDataModel = {

      CategoryID: "",
      ItemName: ""
    }
  }
  SaveItem() {
    this._http.get<GetItems[]>('http://localhost:4248/api/Values/GetItems').subscribe(result => { //to get
      this.items = result;

      var itemExist;
      console.clear();
      // console.log(this.categoryDataModel.ItemName);
      console.log(this.items);
      this.items.map((item) => {
        if (this.categoryDataModel.ItemName == item['itemName']) {
          itemExist = true;
        }
      });
      if (itemExist == true) {
        alert("Item already exists");
      }
      else {
        this._http.post<PostItem>(this._baseUrl + 'values/AddItem', this.categoryDataModel).subscribe(result => {
          alert("Saved Successfully");
        }, error => console.error(error));
      }
    }, error => console.error(error));
      }
}

interface GetCategory {
  CategoryID: number;
  CategoryName: string;
};
interface GetItems {
  ItemID: number;
  ItemName: string;
  CategoryID: number;
};

interface PostItem {
  CategoryID: number;
  ItemName: string;
}
