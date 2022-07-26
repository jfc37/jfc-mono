import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseUserService } from './firebase-user.service';

@NgModule({
  providers: [FirebaseUserService],
  imports: [CommonModule],
})
export class WrapFirebaseModule {}
