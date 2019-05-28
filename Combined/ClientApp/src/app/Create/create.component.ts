import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'
})
export class CreateDataComponent {
  public customerDetails: GetCustomerDetails[]; //to get

  private _baseUrl: string;
  private _http: HttpClient;
  public customerDataModel =
    {
      CustomerID: null,
      CustomerName: "",
      CustomerEmail: ""
    };
  constructor(http: HttpClient, @Inject('API_URL') apiUrl: string) {
    http.get<GetCustomerDetails[]>(apiUrl + 'Values/GetCustomerDetails').subscribe(result => { //to get
      this.customerDetails = result;
      console.log(result);
    }, error => console.error(error));

    this._baseUrl = apiUrl;
    this._http = http;
    this.customerDataModel = {
      CustomerID: 0,
      CustomerName: "",
      CustomerEmail: ""
    }
  }

  SaveDetails() {


    this._http.get<GetCustomerDetails[]>('http://localhost:4248/api/Values/GetCustomerDetails').subscribe(result => { //to get
        this.customerDetails = result;
        //---------------------------
      let emailExist;
      this.customerDetails.map((customer) => {
        if (this.customerDataModel.CustomerEmail == customer['customerEmail']) {
          emailExist = true;
        }
      });
      if (emailExist == true) {
        alert("Email already exists");
      } else {
        this._http.post<customerDataModel>(this._baseUrl + 'values/CustomerDetails', this.customerDataModel).subscribe(result => {
          alert("Saved Successfully");
        }, error => console.error(error));
      }
        //---------------------------
      }, error => console.error(error));
 
  
  
    
  }
}

interface GetCustomerDetails {
  CustomerID: number;
  CustomerName: string;
  CustomerEmail: string;
}
interface customerDataModel {
  CustomerID: number;
  CustomerName: string;
  CustomerEmail: string;
}
