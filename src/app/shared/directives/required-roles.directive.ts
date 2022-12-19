import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { TokenService } from '../services/token.service';

@Directive({
  selector: '[requiredRole]'
})
export class RequiredRolesDirective {

  @Input()
  set requiredRole(role: string) {
    if (role && this._tokenService.hasRole(role)) {
      this.vcr.createEmbeddedView(this.tr);
    } else
      this.vcr.clear();
  }

  constructor(private tr: TemplateRef<any>, private vcr: ViewContainerRef, private _tokenService: TokenService) { }

}
