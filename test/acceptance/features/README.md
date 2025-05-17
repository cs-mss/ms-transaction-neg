# Pruebas de Aceptación con Cucumber

Este directorio contiene pruebas de aceptación para los endpoints de la API utilizando Cucumber.js.

## Estructura

- `features/*.feature`: Archivos que definen los escenarios de prueba en lenguaje Gherkin
- `features/step_definitions/*.ts`: Implementación de los pasos definidos en los archivos .feature
- `features/support/`: Archivos de soporte para las pruebas

## Escenarios de Prueba

### Certificados
- Crear un nuevo certificado
- Obtener un certificado por ID
- Obtener todos los certificados

### Registros
- Crear un nuevo registro
- Obtener un registro por ID
- Obtener todos los registros

## Cómo ejecutar las pruebas

Para ejecutar todas las pruebas de aceptación:

```bash
npm run test:features
```

Para ejecutar un archivo específico:

```bash
npx cucumber-js features/certificate/certificate.feature
```

Para ejecutar un escenario específico:

```bash
npx cucumber-js --name "Crear un nuevo certificado"
```

## Configuración

La configuración de Cucumber se encuentra en el archivo `cucumber.js` en la raíz del proyecto.

## Reporte

Después de ejecutar las pruebas, se generará un reporte HTML en `cucumber-report.html`.
