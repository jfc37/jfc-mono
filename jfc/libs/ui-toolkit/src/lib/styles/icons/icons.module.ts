import { NgModule, Optional, SkipSelf } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@NgModule()
export class IconsModule {
  constructor(
    private _domSanitizer: DomSanitizer,
    private _matIconRegistry: MatIconRegistry,
    @Optional() @SkipSelf() parentModule?: IconsModule
  ) {
    // Do not allow multiple injections
    if (parentModule) {
      throw new Error(
        'IconsModule has already been loaded. Import this module in the AppModule only.'
      );
    }

    // Register icon sets
    this._matIconRegistry.addSvgIconSet(
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'icons/material-twotone.svg'
      )
    );
    this._matIconRegistry.addSvgIconSetInNamespace(
      'mat_outline',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'icons/material-outline.svg'
      )
    );
    this._matIconRegistry.addSvgIconSetInNamespace(
      'mat_solid',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'icons/material-solid.svg'
      )
    );
    this._matIconRegistry.addSvgIconSetInNamespace(
      'iconsmind',
      this._domSanitizer.bypassSecurityTrustResourceUrl('icons/iconsmind.svg')
    );
    this._matIconRegistry.addSvgIconSetInNamespace(
      'feather',
      this._domSanitizer.bypassSecurityTrustResourceUrl('icons/feather.svg')
    );
    this._matIconRegistry.addSvgIconSetInNamespace(
      'heroicons_outline',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'icons/heroicons-outline.svg'
      )
    );
    this._matIconRegistry.addSvgIconSetInNamespace(
      'heroicons_solid',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'icons/heroicons-solid.svg'
      )
    );
  }
}
