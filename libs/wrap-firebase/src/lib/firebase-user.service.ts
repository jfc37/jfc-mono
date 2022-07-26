import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseError } from '@firebase/util';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class FirebaseUserService {
  constructor(private _auth: AngularFireAuth) {}

  /**
   * Gets the id of the currently logged in user
   */
  public getId(): Observable<string> {
    return this._getAuthUser().pipe(map(user => user.uid));
  }

  public getDisplayName(): Observable<string> {
    return this._getAuthUser().pipe(
      filter<firebase.default.User>(Boolean),
      map(user => user.displayName || user.email || 'Anonymous')
    );
  }

  /**
   * Logs the user out
   * Emits once logout if complete
   */
  public logout(): Promise<void> {
    return this._auth.signOut();
  }

  /**
   * Attempts to sign into firebase with the given email and password
   * Returns whether it was successful, and an error code if it failed
   * @param email
   * @param password
   * @returns sign in result
   */
  public async signIn(email: string, password: string): Promise<SignInResult> {
    try {
      await this._auth.signInWithEmailAndPassword(email, password);
      return getSuccessfulSignInResult();
    } catch (err) {
      return getUnsuccessfulSignInResult(err as FirebaseError);
    }
  }

  /**
   * Attempts to sign into firebase anonymously
   * Returns whether it was successful, and an error code if it failed
   * @returns sign in result
   */
  public async signInAnonymously(): Promise<SignInResult> {
    try {
      await this._auth.signInAnonymously();
      return getSuccessfulSignInResult();
    } catch (err) {
      return getUnsuccessfulSignInResult(err as FirebaseError);
    }
  }

  private _getAuthUser(): Observable<firebase.default.User> {
    return this._auth.user.pipe(
      filter(user => Boolean(user))
    ) as Observable<firebase.default.User>;
  }
}

export interface SignInResult {
  successful: boolean;
  errorCode?: SignInErrors;
  errorMessage?: string;
}

export enum SignInErrors {
  AccountLocked = 'AccountLocked',
  IncorrectEmailOrPassword = 'IncorrectEmailOrPassword',
  InvalidSignInMethod = 'InvalidSignInMethod',
}

function getSuccessfulSignInResult(): SignInResult {
  return {
    successful: true,
  };
}

function getUnsuccessfulSignInResult(error: FirebaseError): SignInResult {
  const errorCode = getSignInErrorFromFirebaseCode(error?.code);
  return {
    successful: false,
    errorCode,
    errorMessage: ERROR_MESSAGES[errorCode],
  };
}

function getSignInErrorFromFirebaseCode(code: string): SignInErrors {
  switch (code) {
    case 'auth/user-disabled':
      return SignInErrors.AccountLocked;
    case 'auth/operation-not-allowed':
    case 'auth/admin-restricted-operation':
      return SignInErrors.InvalidSignInMethod;

    default:
      return SignInErrors.IncorrectEmailOrPassword;
  }
}

const ERROR_MESSAGES: Record<string, string> = {
  [SignInErrors.AccountLocked]:
    'This account has been locked. Please see the system administrator',
  [SignInErrors.IncorrectEmailOrPassword]: 'Incorrect email or password',
  [SignInErrors.InvalidSignInMethod]: 'This sign in method is not configured',
};
