import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  const weburl = process.env.WEB_URL || 'http://localhost:5173';
  app.enableCors({
    origin: weburl,
    credentials: true,
  });

  // app.use((req, res, next) => {
  //   console.log('XFF:', req.headers['x-forwarded-for']);
  //   next();
  // });

  await app.listen(process.env.PORT ?? 4000);
}
void bootstrap();
