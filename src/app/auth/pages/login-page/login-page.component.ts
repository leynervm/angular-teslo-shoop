import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Component, inject, signal } from '@angular/core'
import { AuthService } from '@auth/services/auth.service'
import { Router, RouterLink } from '@angular/router'

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.component.html'
})
export default class LoginPageComponent {
  private fb = inject(FormBuilder)
  authService = inject(AuthService)
  router = inject(Router)
  hasError = signal<boolean>(false)
  isPosting = signal<boolean>(false)

  loginForm = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.minLength(6), Validators.email]
    ],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  onSubmit () {
    if (this.loginForm.invalid) {
      this.hasError.set(true)

      setTimeout(() => {
        this.hasError.set(false)
      }, 2000)
      return
    }

    const { email = '', password = '' } = this.loginForm.value
    // console.log({ email, password })

    this.authService.login(email!, password!).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/', {})
        return
      }

      this.hasError.set(true)
      setTimeout(() => {
        this.hasError.set(false)
      }, 2000)
    })
  }
}
