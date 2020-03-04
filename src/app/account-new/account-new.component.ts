import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/account.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-new',
  templateUrl: './account-new.component.html',
  styleUrls: ['./account-new.component.css']
})
export class AccountNewComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private accountService: AccountService) {
    this.customerId = 0;
    this.initialBalance = 0;
    this.loadCustomer();
  }

  customerId: number;
  initialBalance: number;

  ngOnInit(): void {
  }

  loadCustomer() {
    this.route.params.subscribe(params => {
        const param = this.route.snapshot.paramMap.get('customerId');
        this.customerId = this.tryConvert(param);
        this.cleanBalance();
      });
    }

  createAccount() {
    this.accountService.createNewAccount(this.customerId, this.initialBalance);
    this.goHome();
  }

  cleanBalance() {
    this.initialBalance = 0;
  }

  goHome() {
    this.router.onSameUrlNavigation ='reload';
    this.router.navigateByUrl('/');
  }

  tryConvert(num: string) {
    if (num && num.trim()) {
      return Number(num);
    }
    return 0;
  }

}
