import { Component, inject, signal } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { AuthService } from '@auth/services/auth.service'

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.component.html'
})
export default class RegisterPageComponent {
  authService = inject(AuthService)
  router = inject(Router)
  private fb = inject(FormBuilder)
  hasError = signal<boolean>(false)
  isPosting = signal<boolean>(false)
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.min(6), Validators.email]],
    password: ['', [Validators.required, Validators.min(6)]],
    fullName: ['', [Validators.required, Validators.min(6)]]
  })

  onSubmit () {
    if (this.registerForm.invalid) {
      this.hasError.set(true)

      setTimeout(() => {
        this.hasError.set(false)
      }, 2000)
      return
    }

    const { fullName = '', email = '', password = '' } = this.registerForm.value
    this.authService
      .register(fullName!, email!, password!)
      .subscribe(isAuthenticated => {
        // console.log(isAuthenticated)

        if (isAuthenticated) {
          this.router.navigateByUrl('/', {})
          return
        }

        this.hasError.set(true)
        setTimeout(() => {
          this.hasError.set(false)
        }, 4000)
      })
  }
}
