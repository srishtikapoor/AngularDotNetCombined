import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-Book',
  templateUrl: './Book.component.html'
})
export class BookDataComponent {
  public states: GetStates[];

  constructor(http: HttpClient, @Inject('API_URL') apiUrl: string) {
    http.get<GetStates[]>(apiUrl + 'Values/getstates').subscribe(result => {
      this.states = result;
    }, error => console.error(error));
  }
}

interface GetStates {
  StateID: number,
  StateName: string,
  CountryID: number
};
