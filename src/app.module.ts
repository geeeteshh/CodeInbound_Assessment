import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';


@Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'password',
        database: 'nestdb',
        autoLoadEntities: true,
        synchronize: true,
      }),
      TypeOrmModule.forFeature([User]),
      JwtModule.register({
        secret: 'your_jwt_secret',
        signOptions: { expiresIn: '1h' },
      }),
    ],
    controllers: [UsersController],
    providers: [UsersService, AuthService, JwtStrategy],
  })
  export class AppModule {}