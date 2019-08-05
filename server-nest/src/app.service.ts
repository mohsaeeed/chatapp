import { Injectable } from '@nestjs/common';
import { ConfigService } from './core/config/config-service';

@Injectable()
export class AppService {
  private isAuthEnabled: boolean;
  constructor(config: ConfigService) {
    if (config.isApiAuthEnabled) {
      // something
    }
  }
}
