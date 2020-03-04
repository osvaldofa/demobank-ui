import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TransactionModel} from '../shared/models/transaction.model';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  accountNumber: number;
  transactions: TransactionModel[];


  constructor(private route: ActivatedRoute, private transactionService: TransactionService) {
    this.transactions = null;
    this.loadTransactions();
  }

  ngOnInit(): void {

  }

  loadTransactions() {
    this.route.params.subscribe(params => {
        const param = this.route.snapshot.paramMap.get('accountNumber');

        if (param) {
          this.accountNumber = this.tryConvert(param);
          this.transactionService.getTransactionsByAccount(this.accountNumber).subscribe(
                  (t: TransactionModel[]) => {
                      this.transactions = t;
                    });
          console.log('-----> ' + this.tryLength(this.transactions));
        }
    });
  }

  tryLength(array: TransactionModel[]) {
     try {
       return array.length;
     } catch (error) {
       console.log('Exception: ' + error.message);
       return 0;
     }
  }

  tryConvert(num: string) {
    if (num && num.trim()) {
      return Number(num);
    }
    return 0;
  }

  toLocaleDateString(date: Date) {
     return (date) ? date.toLocaleDateString() : '';
  }
}
