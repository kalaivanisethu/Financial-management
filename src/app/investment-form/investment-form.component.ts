import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvestmentService } from '../core/investment.service';
import { StoreService } from '../store/store.service';
@Component({
  selector: 'app-investment-form',
  templateUrl: './investment-form.component.html',
  styleUrls: ['./investment-form.component.css']
})
export class InvestmentFormComponent {
 public investmentForm: FormGroup;
 public reviewMode = false;
 public assetTypes: string[] = ['Stock', 'Bond', 'Mutual Fund', 'Real Estate', 'Gold', 'Crypto'];
  constructor(private fb: FormBuilder, private storeService: StoreService) {
    this.investmentForm = this.fb.group({
      assetType: [this.assetTypes, Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      purchasePrice: ['', [Validators.required, Validators.min(1)]],
      purchaseDate: ['', Validators.required]
    });
  }
//submit the form
 public submitForm() {
    if (this.investmentForm.valid) {
      this.reviewMode = true;
    }
  }
//confirmfor submit
  public confirmSubmission() {
    this.storeService.addInvestment({
      id: Date.now(), // Simple ID generation
      ...this.investmentForm.value
    });
    this.investmentForm.reset();
    this.reviewMode = false;
    alert('Investment added successfully!');
  }
//edit the form
  public editForm() {
    this.reviewMode = false;
  }
}
