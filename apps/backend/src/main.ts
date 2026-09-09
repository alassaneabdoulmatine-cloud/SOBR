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

  // app.getHttpAdapter().getInstance().set('trust proxy', 1);

  // app.use((req, res, next) => {
  //   console.log({
  //     xff: req.headers['x-forwarded-for'],
  //     xRealIp: req.headers['x-real-ip'],
  //     socketIp: req.socket.remoteAddress,
  //     ip: req.ip,
  //     ips: req.ips,
  //   });

  //   next();
  // });

  await app.listen(process.env.PORT ?? 4000);
}
void bootstrap();
