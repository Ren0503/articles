import { Module, forwardRef } from '@nestjs/common';
import { JwtModule} from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './service/auth.service';
import { RolesGuard } from './guard/roles.guard';
import { JwtAuthGuard } from './utils/jwt-guards';
import { JwtStrategy } from './utils/jwt-strategy';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        forwardRef(() => UsersModule),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {expiresIn: '10000s'}
            })
        })
    ],
    providers: [AuthService, RolesGuard, JwtAuthGuard, JwtStrategy ],
    exports: [AuthService]
})
export class AuthModule { }
