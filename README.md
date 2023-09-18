# Sistema de alquiler de Autos Campus

## Descripcion del proyecto
Una empresa de alquiler de autos desea mejorar su sistema de gestión de alquileres y reservas para optimizar su proceso y brindar un mejor servicio a sus clientes. Actualmente, la empresa lleva el registro de sus clientes, automóviles disponibles, alquileres y reservas en tablas separadas en una base de datos MongoDB.

## Problematica principal
El principal problema que enfrenta la empresa es la falta de integración entre las diferentes tablas de la base de datos, lo que dificulta la gestión y seguimiento de los alquileres y reservas de los automóviles en cada sucursal. Además, el proceso de registro de entrega y devolución de los vehículos no está correctamente organizado, lo que puede llevar a errores en los datos y a un servicio insatisfactorio para los clientes.

La empresa necesita una solución que permita la integración de la información de clientes, automóviles, alquileres y reservas en un solo sistema, facilitando el seguimiento y control de cada transacción. Además, se requiere un sistema de registro de entrega y devolución de automóviles que sea más eficiente y evite errores en los datos.

## Herramientas a utilizar
La solución propuesta consiste en desarrollar una aplicación web utilizando Node.js y Express para el backend. Se utilizará una base de datos MongoDB para almacenar toda la información relacionada con los clientes, automóviles, alquileres, reservas, sucursales y empleados.

## Mejoras adicionales
La aplicación permitirá a los empleados registrar nuevos clientes, administrar la disponibilidad de automóviles en cada sucursal, realizar alquileres y reservas, y llevar un registro detallado de cada entrega y devolución de automóviles. Además, se implementará un sistema de autenticación basado en JWT (JSON Web Tokens) para garantizar la seguridad de la información.

## Resultado esperado
Con esta solución, la empresa podrá tener un sistema centralizado y eficiente para gestionar todos sus procesos relacionados con el alquiler de autos, lo que mejorará la satisfacción de sus clientes y aumentará su competitividad en el mercado.


# Rutas basicas
Estas son las peticiones basicas de cada una de las diferentes colecciones en mongoDB.

El puerto usado en cada uno de las peticiones es [8000](./app/models/server.js#L8) pero si el usuario lo desea cambiar puede hacerlo [aqui](./.env#L1).

Algunos parametros usados en las diferentes peticiones:
| Parameter           | Type     | Description                       |
| :--------           | :------- | :-------------------------------- |
| `:id`  | `string` | **Requerido**. `ObjectId de MongoDB a buscar` |
## `Alquileres`
-
  ```bash
    GET http://localhost:8000/api/alquileres/  
  ```
-
  ```bash
    GET http://localhost:8000/api/alquileres/:id  
  ```
-
  ```bash
    POST http://localhost:8000/api/alquileres/  
  ```
-
  ```bash
    DELETE http://localhost:8000/api/alquileres/:id
  ```
-
  ```bash
    PATCH http://localhost:8000/api/alquileres/:id 
  ```

## `Automoviles`
-
  ```bash
    GET http://localhost:8000/api/automoviles/  
  ```
-
  ```bash
    GET http://localhost:8000/api/automoviles/:id  
  ```
-
  ```bash
    POST http://localhost:8000/api/automoviles/  
  ```
-
  ```bash
    DELETE http://localhost:8000/api/automoviles/:id
  ```
-
  ```bash
    PATCH http://localhost:8000/api/automoviles/:id 
  ```

## `Clientes`
-
  ```bash
    GET http://localhost:8000/api/clientes/  
  ```
-
  ```bash
    GET http://localhost:8000/api/clientes/:id  
  ```
-
  ```bash
    POST http://localhost:8000/api/clientes/  
  ```
-
  ```bash
    DELETE http://localhost:8000/api/clientes/:id
  ```
-
  ```bash
    PATCH http://localhost:8000/api/clientes/:id
  ```

## `Empleados`
-
  ```bash
    GET http://localhost:8000/api/empleados/  
  ```
-
  ```bash
    GET http://localhost:8000/api/empleados/:id  
  ```
-
  ```bash
    POST http://localhost:8000/api/empleados/  
  ```
-
  ```bash
    DELETE http://localhost:8000/api/empleados/:id
  ```
-
  ```bash
    PATCH http://localhost:8000/api/empleados/:id
  ```

## `Registros de Devoluciones`
-
  ```bash
    GET http://localhost:8000/api/registroDevolucion/  
  ```
-
  ```bash
    GET http://localhost:8000/api/registroDevolucion/:id  
  ```
-
  ```bash
    POST http://localhost:8000/api/registroDevolucion/  
  ```
-
  ```bash
    DELETE http://localhost:8000/api/registroDevolucion/:id
  ```
-
  ```bash
    PATCH http://localhost:8000/api/registroDevolucion/:id
  ```

## `Registro de Entregas`
-
  ```bash
    GET http://localhost:8000/api/registroEntrega/  
  ```
-
  ```bash
    GET http://localhost:8000/api/registroEntrega/:id  
  ```
-
  ```bash
    POST http://localhost:8000/api/registroEntrega/  
  ```
-
  ```bash
    DELETE http://localhost:8000/api/registroEntrega/:id
  ```
-
  ```bash
    PATCH http://localhost:8000/api/registroEntrega/:id
  ```

## `Reservas Realizadas`
-
  ```bash
    GET http://localhost:8000/api/reservas/  
  ```
-
  ```bash
    GET http://localhost:8000/api/reservas/:id  
  ```
-
  ```bash
    POST http://localhost:8000/api/reservas/  
  ```
-
  ```bash
    DELETE http://localhost:8000/api/reservas/:id
  ```
-
  ```bash
    PATCH http://localhost:8000/api/reservas/:id
  ```

## `Sucursales Disponibles`
-
  ```bash
    GET http://localhost:8000/api/sucursales/  
  ```
-
  ```bash
    GET http://localhost:8000/api/sucursales/:id  
  ```
-
  ```bash
    POST http://localhost:8000/api/sucursales/  
  ```
-
  ```bash
    DELETE http://localhost:8000/api/sucursales/:id
  ```
-
  ```bash
    PATCH http://localhost:8000/api/sucursales/:id
  ```

## `Autos disponibles en cada sucursal`
-
  ```bash
    GET http://localhost:8000/api/sucursalesAutomoviles/  
  ```
-
  ```bash
    GET http://localhost:8000/api/sucursalesAutomoviles/:id  
  ```
-
  ```bash
    POST http://localhost:8000/api/sucursalesAutomoviles/  
  ```
-
  ```bash
    DELETE http://localhost:8000/api/sucursalesAutomoviles/:id  
  ```
-
  ```bash
    PATCH http://localhost:8000/api/sucursalesAutomoviles/:id  
  ```


# Endpoints requeridos

#### 2. Mostrar todos los clientes registrados en la base de datos.
-
  ```bash
    GET http://localhost:8000/api/clientes/
  ```

#### 3. Obtener todos los automóviles disponibles para alquiler.
-
  ```bash
    GET http://localhost:8000/api/sucursalesAutomoviles/
  ```

#### 4. Listar todos los alquileres activos junto con los datos de los clientes relacionados.
-
  ```bash
    GET http://localhost:8000/api/alquileres/
  ```

#### 5. Mostrar todas las reservas pendientes con los datos del cliente y el automóvil reservado.
-
  ```bash
    GET http://localhost:8000/api/reservas/pendientes
  ```

#### 6. Obtener los detalles del alquiler con el ID_Alquiler específico. 
-
  ```bash
    GET http://localhost:8000/api/alquileres/:id
  ```

#### 7. Listar los empleados con el cargo de "Vendedor".
-
  ```bash
    GET http://localhost:8000/api/empleados/ocupacion/vendedor
  ```
