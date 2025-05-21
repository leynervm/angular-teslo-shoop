import { HttpClient } from '@angular/common/http'
import { computed, inject, Injectable, signal } from '@angular/core'
import { rxResource } from '@angular/core/rxjs-interop'
import { AuthResponse } from '@auth/interfaces/auth-response.interface'
import { User } from '@auth/interfaces/user.interface'
import { catchError, map, Observable, of, tap } from 'rxjs'
import { environment } from 'src/environments/environment'

const baseUrl = environment.baseUrl
type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking')
  private _user = signal<User | null>(null)
  private _token = signal<string | null>(window.localStorage.getItem('token'))
  private _errors = signal<string | null>(null)

  private http = inject(HttpClient)

  CheckStatusResource = rxResource({
    loader: () => this.checkStatus()
  })

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking'

    if (this._user()) return 'authenticated'

    return 'not-authenticated'
  })

  user = computed(() => this._user())
  token = computed(() => this._token())
  errors = computed(() => this._errors())
  isAdmin = computed(() => this._user()?.roles.includes('admin') ?? false)

  login (username: string, password: string): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${baseUrl}/auth/login`, {
        email: username,
        password: password
      })
      .pipe(
        map(resp => this.handleAuthSuccess(resp)),
        catchError((error: any) => this.handleAuthError(error))
      )
  }

  register (
    fullName: string,
    email: string,
    password: string
  ): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${baseUrl}/auth/register`, {
        fullName,
        email,
        password
      })
      .pipe(
        map(resp => this.handleAuthSuccess(resp)),
        catchError((error: any) => this.handleAuthError(error))
      )
  }

  checkStatus (): Observable<boolean> {
    const token = window.localStorage.getItem('token')

    if (!token) {
      this.logout()
      return of(false)
    }

    return this.http
      .get<AuthResponse>(`${baseUrl}/auth/check-status`, {
        // headers: {
        //   Authorization: `Bearer ${token}`
        // }
      })
      .pipe(
        map(resp => this.handleAuthSuccess(resp)),
        catchError((error: any) => this.handleAuthError(error))
      )
  }

  logout () {
    this._user.set(null)
    this._token.set(null)
    this._authStatus.set('not-authenticated')
    this._errors.set(null)
    window.localStorage.removeItem('token')
  }

  private handleAuthSuccess ({ user, token }: AuthResponse) {
    this._user.set(user)
    this._authStatus.set('authenticated')
    this._token.set(token)
    this._errors.set(null)
    window.localStorage.setItem('token', token)

    return true
  }

  private handleAuthError (error: any) {
    // console.log(error.error.message)
    this.logout()
    this._errors.set(error.error.message)
    return of(false)
  }
}
