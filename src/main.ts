import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:8080',
  });
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
start().catch((err) => {
  console.log('Error starting server:', err);
});
