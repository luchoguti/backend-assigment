import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
      .setTitle('Docred practical')
      .setDescription('Rest Full API documentation of the Docred practical.')
      .setVersion('1.0')
      .addTag('Docred practical')
      .build();
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Documentation API Docred practical.',
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document,customOptions);
  await app.listen(3070);
}
bootstrap();
