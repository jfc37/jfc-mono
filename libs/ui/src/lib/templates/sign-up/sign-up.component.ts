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
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertType } from '../../molecules/alert/alert.component';
import { toolkitAnimations } from '../../styles/animations';

@Component({
  selector: 'jfc-sign-up',
  templateUrl: './sign-up.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: toolkitAnimations,
})
export class SignUpComponent implements OnInit, OnChanges {
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
   * Route to sign in page
   */
  @Input()
  public signInRoute = '';

  /**
   * Route to terms of service
   */
  @Input()
  public termsOfServiceRoute = '';

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
   * Require name
   * Defaults to true
   */
  @Input()
  public requireName = true;

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
   * Text to display in the main sign in button.
   * Default to "Sign up" if none is provided.
   */
  @Input()
  public signUpText = 'Sign up';

  /**
   * Emits the requested sign in
   */
  @Output()
  public signUp = new EventEmitter<Partial<SignUpModel> | undefined>();

  /**
   * @ignore
   */
  public nameControl!: FormControl;

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
  public agreeToTermsControl!: FormControl;

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

  public get nameError(): string {
    if (this.nameControl.hasError('required')) {
      return 'This is required';
    }

    return '';
  }

  public get agreeToTermsError(): string {
    if (this.agreeToTermsControl.hasError('required')) {
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
    this.nameControl = this._formBuilder.control('', [Validators.required]);
    this.agreeToTermsControl = this._formBuilder.control('', [
      Validators.requiredTrue,
    ]);

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
    const requireNameChange =
      changes['requireName'] && !changes['requireName'].isFirstChange();
    if (
      loadingChange ||
      requireEmailChange ||
      requirePasswordChange ||
      requireNameChange
    ) {
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

    if (this.loading || !this.requireName) {
      this.nameControl.disable();
    } else {
      this.nameControl.enable();
    }

    if (this.loading || !this.termsOfServiceRoute) {
      this.agreeToTermsControl.disable();
    } else {
      this.agreeToTermsControl.enable();
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
    if (this.requireEmail && this.emailControl.invalid) {
      return;
    }

    if (this.requireName && this.nameControl.invalid) {
      return;
    }

    if (this.requirePassword && this.passwordControl.invalid) {
      return;
    }

    if (this.termsOfServiceRoute && this.agreeToTermsControl.invalid) {
      return;
    }

    const model: Partial<SignUpModel> = {};
    if (this.requireEmail) {
      model.email = this.emailControl.value;
    }

    if (this.requireName) {
      model.name = this.nameControl.value;
    }

    if (this.requirePassword) {
      model.password = this.passwordControl.value;
    }

    this.signUp.emit(model);
  }
}

/**
 * Sign up for a new account
 */
export interface SignUpModel {
  email: string;
  password: string;
  name: string;
}
