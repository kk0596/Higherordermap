import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map, mergeMap, Subject, switchMap } from 'rxjs';
import { CustomersService } from '../services/customers.service';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {

  title: string = "Higher Order Mapping"

  customerForm: FormGroup | undefined ;
  customer: any;
  customersWithSwitchmap: any[] = [];
  requestsWithSwitchmap = [];
  customersWithoutSwitchmap: any[] = [];
  requestsWithoutSwitchmap = [];
  private customerLookup$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private CustomersService: CustomersService
  ) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      delayTime: 2000
    });

    this.customerForm.valueChanges.subscribe(() => {
      this.customerLookup$.next();
      this.getCustomers();
    });

    this.customerLookup$
      .pipe(
        map(() => this.requestsWithSwitchmap = []),
        switchMap(() => {
          this.requestsWithSwitchmap.push(this.customerForm.value);
          const searchParams = this.customerForm.value;
          return this.CustomersService.get(searchParams);
        })
      )
      .subscribe(results => {
        this.customersWithSwitchmap = results;
        this.requestsWithSwitchmap.shift();
      });

    this.customerLookup$.next();
    this.getCustomers();
  }

  getCustomers() {
    this.requestsWithoutSwitchmap.push(this.customerForm.value);
    const searchParams = this.customerForm.value;
    this.CustomersService.get(searchParams).subscribe(results => {
      this.customersWithoutSwitchmap = results;
      this.requestsWithoutSwitchmap.shift();
    });
  }

}
