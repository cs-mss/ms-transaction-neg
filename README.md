# Document Management Microservice

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[![NPM Version](https://img.shields.io/npm/v/@nestjs/core.svg)](https://www.npmjs.com/~nestjscore)
[![License](https://img.shields.io/npm/l/@nestjs/core.svg)](https://www.npmjs.com/~nestjscore)
[![NPM Downloads](https://img.shields.io/npm/dm/@nestjs/common.svg)](https://www.npmjs.com/~nestjscore)
[![CircleCI](https://img.shields.io/circleci/build/github/nestjs/nest/master)](https://circleci.com/gh/nestjs/nest)

## Overview

Microservicio de gestión de documentos y transacciones desarrollado con NestJS. Este servicio maneja la creación, validación y gestión de documentos, certificados y registros de transacciones.

## Características Principales

- Gestión de documentos y certificados
- Registro de transacciones con validaciones
- Arquitectura hexagonal
- Validación de datos robusta
- Integración con Docker

## Estructura del Proyecto

```
src/
├── context/
│   ├── documents/      # Lógica de negocio de documentos
│   │   ├── domain/     # Entidades y lógica de negocio
│   │   ├── dto/        # Transferencia de datos
│   │   ├── application/# Casos de uso
│   │   └── infrastructure/ # Implementaciones específicas
│   └── shared/        # Código compartido
└── app/              # Configuración de la aplicación
```

## Requisitos

- Node.js 18+
- Docker y Docker Compose (opcional)
- TypeScript

## Instalación

```bash
# Instalar dependencias
$ npm install

# Copiar archivo de ejemplo de entorno
$ cp .env.example .env

# Editar variables de entorno en .env
```

## Ejecución

```bash
# Desarrollo
$ npm run start

# Modo desarrollo con hot reload
$ npm run start:dev

# Producción
$ npm run start:prod
```

## Pruebas

```bash
# Unit tests
$ npm run test

# End-to-end tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```

## Docker

```bash
# Construir y ejecutar con Docker Compose
$ docker-compose up --build
```

## Contribución

1. Fork del repositorio
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

MIT License - vea [LICENSE](LICENSE) para detalles.
