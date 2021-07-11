import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { BLOG_PACKAGE_NAME } from 'src/proto/src/proto/blog';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: BLOG_PACKAGE_NAME,
        protoPath: join(__dirname, '/../proto/blog.proto'),
      },
    },
  );
  app.listen(() => console.log('Microservice is listening'));
}
bootstrap();
