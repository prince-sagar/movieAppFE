import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup-company',
  templateUrl: './signup-company.component.html',
  styleUrls: ['./signup-company.component.scss']
})
export class SignupCompanyComponent {
    validateForm!: FormGroup;

    constructor(private fb: FormBuilder,
       private authService: AuthService,
       private notification: NzNotificationService,
       private router: Router) { }

      ngOnInit(){
        this.validateForm = this.fb.group({
          email: [null, [Validators.email, Validators.required]],
          name: [null, [Validators.required]],
          lastName: [null, [Validators.required]],
          phone: [null],
          password: [null, [Validators.required]],
          checkPassword: [null, [Validators.required]],
        });
      }

      submitForm(){
        this.authService.registerClient(this.validateForm.value).subscribe(res =>{
          this.notification
          .success(
            'Success',
            'Client registered successfully',
            {nzDuration:5000}
           );
           this.router.navigate(['/login']);
        }, err => {
          this.notification.error(
            'Error',
            '${error.error}',
            { nzDuration: 5000 }
          )
        });

      }

}
