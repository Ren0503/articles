import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from 'src/users/interface/users.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService
  ) {

  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const params = request.params;
    const user: User = request.user;

    return this.userService.findOne(user.id).pipe(
      map((user: User) => {
        let hasPermission = false;

        if (user.id === Number(params.id)) {
          hasPermission = true;
        }

        return user && hasPermission;
      })
    )
  }
}
