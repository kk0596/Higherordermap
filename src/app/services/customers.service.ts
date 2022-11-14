import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  customers = [{
    name: 'Karthikeyan',
    address: '08, Annai Sathya Nagar',
    city: 'Srivilliputtur',
    state: 'TN',
    zip: '626125'
  }, {
    name: 'Sarvanan',
    address: '1 1st Avenue',
    city: 'Madurai',
    state: 'TN',
    zip: '610018'
  }, {
    name: 'Viraj',
    address: '2122 Junction Road',
    city: 'Kochin',
    state: 'KL',
    zip: '78230'
  }, {
    name: 'Arul',
    address: '2635 Ray Park',
    city: 'Mumbai',
    state: 'MH',
    zip: '77245'
  }, {
    name: 'Jai Macken',
    address: '8384 Westport Junction',
    city: 'Bangalore',
    state: 'KA',
    zip: '33432'
  }, {
    name: 'Shreyas',
    address: '78/b, Indira Nagar',
    city: 'kolkata',
    state: 'WB',
    zip: '27205'
  }, {
    name: 'Andre Snodin',
    address: '23 Arizona Park',
    city: 'Delhi',
    state: 'DL',
    zip: '48224'
  }];
  constructor() { }

  get(customer:any) {
    return of(this.customers.filter(x => {
      return x.name.toLowerCase().includes(customer.name.toLowerCase()) &&
        x.address.toLowerCase().includes(customer.address.toLowerCase()) &&
        x.city.toLowerCase().includes(customer.city.toLowerCase()) &&
        x.state.toLowerCase().includes(customer.state.toLowerCase()) &&
        x.zip.toLowerCase().includes(customer.zip.toLowerCase());
    })).pipe(delay(customer.delayTime));
  }

}
