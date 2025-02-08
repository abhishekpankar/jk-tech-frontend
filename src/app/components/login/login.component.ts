import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, FacebookAuthProvider } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private fireAuth: AngularFireAuth) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value);
    }
  }

  async loginWithGoogle() {
    const response = await this.fireAuth.signInWithPopup(new GoogleAuthProvider())
    this.authService.browserLogin({
      provider: 'google',
      user: {
        token: (response.credential as any)?.idToken,
        email: response.user?.email,
        name: response.user?.displayName,
        id: (response.additionalUserInfo?.profile as any)?.id,
      },
    });
  }

  async loginWithFacebook() {
    const response = await this.fireAuth.signInWithPopup(new FacebookAuthProvider())
    this.authService.browserLogin({
      provider: 'facebook',
      user: {
        token: (response.credential as any)?.accessToken,
        id: (response.additionalUserInfo?.profile as any)?.id,
        email: (response.additionalUserInfo?.profile as any).email,
        name: (response.additionalUserInfo?.profile as any).name,
      },
    });
  }
}