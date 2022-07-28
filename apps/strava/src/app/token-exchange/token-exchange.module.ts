import { NgModule } from '@angular/core';

import { TokenExchangePage } from './pages/token-exchange.page';
import { TokenExchangeRoutingModule } from './token-exchange-routing.module';

@NgModule({
  declarations: [TokenExchangePage],
  imports: [TokenExchangeRoutingModule],
})
export class TokenExchangeModule {}
