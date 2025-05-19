# Document Management Microservice

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[![NPM Version](https://img.shields.io/npm/v/@nestjs/core.svg)](https://www.npmjs.com/~nestjscore)
[![License](https://img.shields.io/npm/l/@nestjs/core.svg)](https://www.npmjs.com/~nestjscore)
[![NPM Downloads](https://img.shields.io/npm/dm/@nestjs/common.svg)](https://www.npmjs.com/~nestjscore)
[![CircleCI](https://img.shields.io/circleci/build/github/nestjs/nest/master)](https://circleci.com/gh/nestjs/nest)

## Overview

Microservicio de gestión de documentos y transacciones desarrollado con NestJS. Este servicio maneja la creación, validación y gestión de documentos, certificados y registros de transacciones, implementando una arquitectura hexagonal (también conocida como arquitectura de puertos y adaptadores) para asegurar una separación clara de responsabilidades y facilitar el mantenimiento y las pruebas.

## Características Principales

- Gestión de documentos y certificados
- Registro de transacciones con validaciones
- Implementación completa de arquitectura hexagonal con puertos y adaptadores
- Separación clara entre dominio, aplicación e infraestructura
- Inyección de dependencias a través de interfaces
- Validación de datos robusta
- Integración con Docker

## Estructura del Proyecto

```
src/
├── context/
│   ├── documents/                 # Contexto de documentos
│   │   ├── domain/                # Capa de dominio
│   │   │   ├── class/             # Entidades de dominio
│   │   │   ├── errors/            # Errores de dominio
│   │   │   └── services/          # Servicios de dominio
│   │   ├── application/           # Capa de aplicación
│   │   │   ├── ports/             # Puertos de entrada (interfaces)
│   │   │   │   └── in/            # Interfaces para casos de uso
│   │   │   └── use-cases/         # Implementación de casos de uso
│   │   └── infrastructure/        # Capa de infraestructura
│   │       ├── contracts/         # Puertos de salida (interfaces)
│   │       ├── entities/          # Entidades de persistencia
│   │       ├── repositories/      # Implementaciones de repositorios
│   │       ├── services/          # Servicios de infraestructura
│   │       └── module/            # Módulos de NestJS
│   └── shared/                    # Código compartido
└── app/                           # Configuración de la aplicación
    ├── controllers/               # Controladores (adaptadores de entrada)
    └── routes/                    # Definición de rutas
```

## Arquitectura Hexagonal

Este proyecto implementa la arquitectura hexagonal (también conocida como arquitectura de puertos y adaptadores) con las siguientes capas:

### Capa de Dominio
- Contiene las entidades de negocio (`Document`, `DocumentRegister`, `DocumentCertificate`)
- Define las reglas y lógica de negocio
- Es independiente de frameworks y tecnologías externas

### Capa de Aplicación
- Define los casos de uso de la aplicación
- Implementa la lógica de aplicación utilizando las entidades del dominio
- Define puertos de entrada (interfaces) para los casos de uso
- Depende del dominio pero es independiente de la infraestructura

### Capa de Infraestructura
- Implementa los adaptadores para los puertos definidos en el dominio y la aplicación
- Contiene la implementación específica de tecnologías (NestJS, TypeORM, etc.)
- Incluye controladores, repositorios y servicios
- Se comunica con el exterior (bases de datos, APIs, etc.)

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
