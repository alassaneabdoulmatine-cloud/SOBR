import { Module } from '@nestjs/common';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './auth';
import { UsersModule } from './users/users.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    AuthModule.forRoot({
      auth,
      bodyParser: {
        json: { limit: '2mb' },
        urlencoded: { limit: '2mb', extended: true },
        rawBody: true,
      },
    }),
    UsersModule,
    ProjectModule,
  ],
})
export class AppModule {}
