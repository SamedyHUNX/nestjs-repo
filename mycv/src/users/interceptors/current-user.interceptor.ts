import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    // Look at request
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (!userId) {
      const user = await this.usersService.findOne(userId);
      request.CurrentUser = user;
    }

    return handler.handle(); // Go ahead and run route handler
  }
}
