import { Module }            from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountRepo }       from './account.repo';
import { ClientModule }      from '../../../lib/server/client.module';
import { ConfigModule }      from '@nestjs/config';
import { TypeOrmModule }     from '@nestjs/typeorm';
import * as path             from 'path';
import { JwtModule }         from '@nestjs/jwt';
import { AuthService }       from './auth.service';
import { CharacterRepo }     from './character.repo';

export const AccountEntities = [
  path.resolve(__dirname, 'entities/*.entity.js'),
];

@Module({
  imports    : [
    ConfigModule,
    JwtModule.register({
      secret     : process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '60m',
      },
    }),
    TypeOrmModule.forFeature([AccountRepo, CharacterRepo]),
    ClientModule,
  ],
  providers  : [AuthService],
  controllers: [AccountController],
  exports    : [TypeOrmModule],
})
export class AccountModule {

  static forRoot() {
    return {
      module : AccountModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        TypeOrmModule.forRoot({
          type       : 'mysql',
          host       : process.env.DB_HOST,
          port       : Number(process.env.DB_PORT),
          username   : process.env.DB_USERNAME,
          password   : process.env.DB_PASSWORD,
          database   : 'game',
          entities   : AccountEntities,
          synchronize: true,
        }),
      ],
    };
  }
}
