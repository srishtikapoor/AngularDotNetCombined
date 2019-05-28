import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ItemOrder',
  templateUrl: './ItemOrder.component.html'
})
export class ItemOrderDataComponent {
  public customers: GetCustomerDetails[];
  public items: GetItems[];
  public rate: GetRate[];

  public itemOrderDataModel = {
    OrderID: 0,
    ItemOrderQuantity: 0,
    TotalAmount:0,
   ItemID:0,
    CustomerID: 0,
    ID:0
  };

  private _baseUrl: string;
  private _http: HttpClient;
  RateList: any;

  constructor(http: HttpClient, @Inject('API_URL') apiUrl: string) {
    http.get<GetCustomerDetails[]>(apiUrl + 'Values/GetCustomerDetails').subscribe(result => {
      this.customers = result;
      console.log(this.customers);
    }, error => console.error(error));

    http.get<GetItems[]>(apiUrl + 'Values/GetItems').subscribe(result => {
      this.items = result;
      console.log(this.items);
    }, error => console.error(error));

  
    this._baseUrl = apiUrl;
    this._http = http;
    this.itemOrderDataModel = {
      OrderID: 0,
      ItemOrderQuantity: 0,
      TotalAmount: 0,
      ItemID: 0,
      CustomerID: 0,
      ID: 0
    };
  }


 
  ngOnInit(): void {
    this._http.get<any>(this._baseUrl + 'values/GetRateList').subscribe(result => {
      this.RateList = result;
      console.log(this.RateList);
    }, error => console.error(error));
  }
  getPrice(itemID) {
    if (this.itemOrderDataModel.ItemOrderQuantity == 0) {
      this.itemOrderDataModel.TotalAmount = 0;
    }
    else {
      var result = this.RateList[itemID];
      this.itemOrderDataModel.TotalAmount = parseFloat((result * this.itemOrderDataModel.ItemOrderQuantity).toFixed(2));
    }
  }

  SaveItemOrder() {
    this._http.post<PostItemOrder>(this._baseUrl + 'values/SaveItemOrder', this.itemOrderDataModel).subscribe(result => {
      alert("Saved Successfully");
      console.log("Error");
    }, error => console.error(error));
  }
}
interface GetCustomerDetails {
  CustomerID: number;
  CustomerName: string;
  CustomerEmail: string;
}
interface GetItems {
  ItemID: number;
  ItemName: string;
  CategoryID: number;
}
interface GetRate {
  ItemInventoryID: number;
  ItemQuantity: number ;
  ItemRate: number;
  ItemID: number;
  CreateDate: number;
}

interface PostItemOrder {
  OrderID: number;
  ItemOrderQuantity: number;
  TotalAmount: number;
  ItemID: number;
  CustomerID: number;
}
