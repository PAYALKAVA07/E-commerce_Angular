import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    user_email: new FormControl('', [Validators.required, Validators.email]),
    user_password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });


  constructor(private _api: LoginService) { }
  _router = inject(Router);

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('sdubsdsubduksd')
      const { user_email, user_password } = this.loginForm.value;
      this._api.login(user_email, user_password).subscribe((res: any) => {
        console.log("res",res)
        localStorage.setItem('token', res.token); 
        Swal.fire({
          title: 'Success!',
          text: 'Logged in successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this._router.navigate(['/']); // Redirect after alert
        });

      },
        (err) => {
          // console.log("Error",err.error.message);
          Swal.fire({
            title: 'Login Failed!',
            text: err.error.message,
            icon: 'error',
            confirmButtonText: 'Try Again',
            confirmButtonColor:'#436850',
            background: '#95714F',
            color:'black'
          });
        })
    }
  }
}
