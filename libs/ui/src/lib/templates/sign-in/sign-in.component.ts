import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertType } from '../../molecules/alert/alert.component';
import { toolkitAnimations } from '../../styles/animations';

@Component({
  selector: 'jfc-sign-in',
  templateUrl: './sign-in.component.html',
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
  public alertType: AlertType = 'error';

  /**
   * Message to display
   */
  @Input()
  public alertMessage = '';

  /**
   * Social login options.
   *
   * Options: facebook | twitter | github
   *
   */
  @Input()
  public socialLogins: SocialLogin[] = [];

  /**
   * Allow users to sign in anonymously?
   */
  @Input()
  public allowAnonymousSignIn = false;

  /**
   * Allow users to sign in with email and password?
   * This is the default mechanism for signing in.
   */
  @Input()
  public allowEmailAndPasswordSignIn = true;

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
  public signIn = new EventEmitter<SignInModel | undefined>();

  /**
   * Emits the requested anonymous sign in
   */
  @Output()
  public signInAnonymously = new EventEmitter<void>();

  /**
   * Emits the requested social sign in
   */
  @Output()
  public socialSignIn = new EventEmitter<SocialLogin>();

  /**
   * @ignore
   */
  public signInForm!: FormGroup;

  /**
   * @ignore
   */
  public passwordInputType: 'password' | 'text' = 'password';

  public get emailError(): string {
    const required = this.getRequiredError('email');
    if (required) {
      return required;
    }

    if (this.signInForm.get('email')?.hasError('email')) {
      return 'Please enter a valid email address';
    }

    return '';
  }

  public get passwordError(): string {
    return this.getRequiredError('password');
  }

  public get passwordIcon(): string {
    if (this.passwordInputType === 'password') {
      return 'heroicons_solid:eye';
    } else {
      return 'heroicons_solid:eye-off';
    }
  }

  public get allowSocialLogin(): boolean {
    return this.socialLogins.length > 0;
  }

  public get hasFacebookLogin(): boolean {
    return this.socialLogins.includes('facebook');
  }

  public get hasGithubLogin(): boolean {
    return this.socialLogins.includes('github');
  }

  public get hasTwitterLogin(): boolean {
    return this.socialLogins.includes('twitter');
  }

  constructor(private _formBuilder: FormBuilder) {}

  /**
   * @ignore
   */
  public ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [''],
    });

    this.setupLoadingState();
  }

  /**
   * @ignore
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['loading'] && !changes['loading'].isFirstChange()) {
      this.setupLoadingState();
    }
  }

  /**
   * @ignore
   */
  private setupLoadingState(): void {
    if (this.loading) {
      this.signInForm.disable();
    } else {
      this.signInForm.enable();
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
    if (!this.allowEmailAndPasswordSignIn) {
      this.signIn.emit();
    } else if (this.signInForm.valid) {
      this.signIn.emit(this.signInForm.value);
    }
  }

  /**
   * @ignore
   */
  public socialLoginClick(social: SocialLogin) {
    this.socialSignIn.emit(social);
  }

  /**
   * @ignore
   */
  public anonymousLoginClick() {
    this.signInAnonymously.emit();
  }

  /**
   * @ignore
   */
  private getRequiredError(formControlName: string): string {
    if (this.signInForm.get(formControlName)?.hasError('required')) {
      return 'This is required';
    }

    return '';
  }
}

/**
 * Sign in for a new account
 */
export interface SignInModel {
  email: string;
  password: string;
  rememberMe: boolean;
}

export type SocialLogin = 'facebook' | 'twitter' | 'github';
