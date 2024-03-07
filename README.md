# Setup
- NodeJS 16+
- PostgreSQL 16
- Configurar nombre de base de datos y usuario en .env


# Instalación
```
git clone https://github.com/AlejandroWilcke/prisma-postgresql.git
```
```
cd prisma-postgresql
```
```
npm install
```
- Importante configurar .env previo a este paso
```
npx prisma migrate dev
```
```
npx prisma generate
```

# Seedear DB con Movies y Users
```
npm run seed
```

# Correr la aplicación
```
npm start
```

# Diagrama DB
[Link al diagrama](https://dbdiagram.io/d/65e2252ecd45b569fb52a0da)

# Postman

#### 1- Importar colección de postman:
[Link a la colección en JSON](https://api.postman.com/collections/33223255-233c65c5-6ea4-437f-b584-ee3fab4df77f?access_key=PMAT-01HRB4S62E08RMAQG7YFXSWZM5)

#### 2- Setear un ambiente de Postman con estas 2 variables, y seleccionarlo:
- BASE_URL = http://localhost:3000/api
- token = null

#### 3- Autenticación a traves de los requests de la carpeta Auth (cada petición en esta carpeta guarda el token en la variable de ambiente)

#### 4- Realizar consultas y mutaciones a traves de las peticiones de Postman

# Notas
- Siendo prisma en ocasiones interactiva con la shell utilizada, es preferible no utilizar Git BASH.
- Un usuario solo puede ver y modificar su propio perfil.
- Al ser un test, en el POST de users uno puede crear su propio usuario con distintos roles.

ADMIN:
- Puede listar todos los usuarios

EDITOR:
- Puede ver, crear, editar y borrar todas las reviews

BASIC:
- Puede ver y crear reviews
