import { Module } from '@nestjs/common';
import { AuthModule } from "@thallesp/nestjs-better-auth";
import { auth } from "./auth";
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    AuthModule.forRoot({
      auth,
      bodyParser: {
        json: { limit: "2mb" },
        urlencoded: { limit: "2mb", extended: true },
        rawBody: true,
      },
    }),
    UsersModule,
    PostModule
  ],
})
export class AppModule { }
