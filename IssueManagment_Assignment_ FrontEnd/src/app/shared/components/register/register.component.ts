import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';


import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { User } from '../../../core/models/user.model';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    userName: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
    dob: FormControl<string>;
    city: FormControl<string>;
    country: FormControl<string>;
    acceptTerms: FormControl<boolean>;
    role: FormControl<User['role']>;
  }>;

  constructor(private fb: FormBuilder,private authService:AuthService,private route:Router) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
      email: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      userName: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
      password: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
      confirmPassword: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
      dob: this.fb.control('', { nonNullable: true }),
      city: this.fb.control('', { nonNullable: true }),
      country: this.fb.control('', { nonNullable: true }),
      acceptTerms: this.fb.control(false, { nonNullable: true, validators: [Validators.requiredTrue] }),
      role: this.fb.control<'user' | 'resolver'>('user', { nonNullable: true })
    });
  }

  onSubmit() {
    if (this.userForm.valid) {

      const user: User = {
        id: uuidv4(),
        name: this.userForm.value.name!,
        email: this.userForm.value.email!,
        userName: this.userForm.value.userName!,
        password: this.userForm.value.password!,
        confirmPassword: this.userForm.value.confirmPassword!,
        dob: this.userForm.value.dob!,
        city: this.userForm.value.city!,
        country: this.userForm.value.country!,
        acceptTerms: this.userForm.value.acceptTerms!,
        role: this.userForm.value.role!
      };

      this.authService.addUser(user);
      alert('User registered successfully!');
      this.route.navigate(['/login']);
      this.userForm.reset();


      console.log('Form Submitted:', user);
    }
  }
}
