import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { toolkitAnimations } from '../../styles/animations';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'jfc-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: toolkitAnimations,
})
export class SignInComponent implements OnInit, OnChanges {
  /**
   * Big bold title text
   */
  @Input()
  public heroText = 'Welcome!';

  /**
   * Description or weasle words about the application
   */
  @Input()
  public subtitle = '';

  /**
   * Url of logo
   */
  @Input()
  public logoUrl = '';

  /**
   * Is loading
   *
   * Will disable all inputs and show loading indicator
   */
  @Input()
  public loading = false;

  /**
   * Route to sign up page
   */
  @Input()
  public signUpRoute = '';

  /**
   * Require password
   * Defaults to false
   */
  @Input()
  public requirePassword = false;

  /**
   * Require email
   * Defaults to true
   */
  @Input()
  public requireEmail = true;

  /**
   * Route to forgotten password page
   */
  @Input()
  public forgotPasswordRoute = '';

  /**
   * Type of alert. Possible options are:
   * - info
   * - success
   * - warning
   * - error
   */
  @Input()
  public alertType = 'error';
  // public alertType: AlertType = 'error';

  /**
   * Message to display
   */
  @Input()
  public alertMessage = '';

  /**
   * Allow users to sign in anonymously?
   */
  @Input()
  public allowAnonymousSignIn = false;

  /**
   * Text to display in the main sign in button.
   * Default to "Sign in" if none is provided.
   */
  @Input()
  public signInText = 'Sign in';

  /**
   * Emits the requested sign in
   */
  @Output()
  public signIn = new EventEmitter<Partial<SignInModel> | undefined>();

  /**
   * Emits the requested anonymous sign in
   */
  @Output()
  public signInAnonymously = new EventEmitter<void>();

  /**
   * @ignore
   */
  public emailControl!: FormControl;

  /**
   * @ignore
   */
  public passwordControl!: FormControl;

  /**
   * @ignore
   */
  public passwordInputType: 'password' | 'text' = 'password';

  public get emailError(): string {
    if (this.emailControl.hasError('required')) {
      return 'This is required';
    }

    if (this.emailControl.hasError('email')) {
      return 'Please enter a valid email address';
    }

    return '';
  }

  public get passwordError(): string {
    if (this.passwordControl.hasError('required')) {
      return 'This is required';
    }

    return '';
  }

  public get passwordIcon(): string {
    if (this.passwordInputType === 'password') {
      return 'heroicons_solid:eye';
    } else {
      return 'heroicons_solid:eye-off';
    }
  }

  constructor(private _formBuilder: FormBuilder) {}

  /**
   * @ignore
   */
  public ngOnInit(): void {
    this.emailControl = this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]);
    this.passwordControl = this._formBuilder.control('', [Validators.required]);

    this.setupLoadingState();
  }

  /**
   * @ignore
   */
  public ngOnChanges(changes: SimpleChanges): void {
    const loadingChange =
      changes['loading'] && !changes['loading'].isFirstChange();
    const requireEmailChange =
      changes['requireEmail'] && !changes['requireEmail'].isFirstChange();
    const requirePasswordChange =
      changes['requirePassword'] && !changes['requirePassword'].isFirstChange();
    if (loadingChange || requireEmailChange || requirePasswordChange) {
      this.setupLoadingState();
    }
  }

  /**
   * @ignore
   */
  private setupLoadingState(): void {
    if (this.loading || !this.requireEmail) {
      this.emailControl.disable();
    } else {
      this.emailControl.enable();
    }

    if (this.loading || !this.requirePassword) {
      this.passwordControl.disable();
    } else {
      this.passwordControl.enable();
    }
  }

  /**
   * @ignore
   */
  public togglePasswordVisability(): void {
    if (this.passwordInputType === 'password') {
      this.passwordInputType = 'text';
    } else {
      this.passwordInputType = 'password';
    }
  }

  /**
   * @ignore
   */
  public onFormSubmit(): void {
    if (!this.requireEmail && !this.requirePassword) {
      this.signIn.emit();
    } else if (this.requireEmail && this.requirePassword) {
      if (this.emailControl.valid && this.passwordControl.valid) {
        this.signIn.emit({
          email: this.emailControl.value,
          password: this.passwordControl.value,
        });
      }
    } else {
      if (this.emailControl.valid) {
        this.signIn.emit({
          email: this.emailControl.value,
        });
      }
    }
  }

  /**
   * @ignore
   */
  public anonymousLoginClick() {
    this.signInAnonymously.emit();
  }
}

/**
 * Sign in for a new account
 */
export interface SignInModel {
  email: string;
  password: string;
}
