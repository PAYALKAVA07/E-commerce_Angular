import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterService } from '../register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  registerForm = new FormGroup({
    user_firstName: new FormControl('', [Validators.required]),
    user_lastName: new FormControl('', [Validators.required]),
    user_email: new FormControl('', [Validators.required, Validators.email]),
    user_contact: new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}")]),
    user_password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    user_confirmpassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  constructor(private _api: RegisterService) { }
  _router = inject(Router);

  onSubmit() {
    if (this.registerForm.valid) {
      const { user_firstName, user_lastName, user_email, user_contact, user_password, user_confirmpassword } = this.registerForm.value;
      this._api.register(user_firstName, user_lastName, user_email, user_contact, user_password, user_confirmpassword).subscribe((res: any) => {
        console.log("res", res)
        localStorage.setItem('token', res.token);
        Swal.fire({
          title: 'Success!',
          text: 'Registration in successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this._router.navigate(['/']); // Redirect after alert
        });

      },
        (err) => {
          // console.log("Error",err.error.message);
          Swal.fire({
            title: 'Registration Failed!',
            text: err.error.message,
            icon: 'error',
            confirmButtonText: 'Try Again',
            confirmButtonColor: '#436850',
            background: '#95714F',
            color: 'black'
          });
        })
    }
  }
}
