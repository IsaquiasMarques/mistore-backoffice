import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  userAgree: boolean = false;
  
  changeAgreementStatus(){
    this.userAgree = !this.userAgree;
  }

}
