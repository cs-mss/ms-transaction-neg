import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { CustomWorld } from './world';

Before(async function (this: CustomWorld) {
  await this.setupApp();
});

After(async function (this: CustomWorld) {
  if (this.app) {
    await this.app.close();
  }
});

BeforeAll(function () {
  console.log('Iniciando pruebas de aceptación...');
});

AfterAll(function () {
  console.log('Pruebas de aceptación completadas.');
});
