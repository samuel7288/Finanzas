# Finanzas personales con Gmail

App web local para registrar compras personales. El MVP conecta Gmail con OAuth, lee correos recientes que parezcan avisos de compra y los agrega como transacciones pendientes de revisar.

Ahora el acceso a la app tambien usa Google: al conectar tu cuenta, la misma autorizacion sirve para iniciar sesion y para leer Gmail.

## Configuracion

1. Instala dependencias:

   ```bash
   npm install
   ```

2. Crea un archivo `.env` desde `.env.example`.
   - Si usas la app compilada con `npm.cmd run start`, deja `PORT`, `FRONTEND_URL` y `GOOGLE_REDIRECT_URI` apuntando al mismo puerto, por ejemplo `4000`.
   - Si usas Vite en desarrollo (`npm.cmd run dev`), `FRONTEND_URL` debe apuntar a `http://localhost:5173`.

3. En Google Cloud:
   - Crea un proyecto.
   - Activa Gmail API.
   - Configura OAuth consent screen en modo de prueba y agrega tu correo como test user.
   - Crea un OAuth Client de tipo Web application.
   - Agrega esta URI autorizada de redireccion:

     ```text
     http://localhost:4000/api/gmail/oauth2callback
     ```

4. Copia el Client ID y Client Secret en `.env`.

5. Ejecuta:

   ```bash
   npm run dev
   ```

6. Abre:

   ```text
   http://localhost:5173
   ```

En Windows PowerShell, si `npm` esta bloqueado por la politica de ejecucion, usa `npm.cmd`:

```bash
npm.cmd run dev
```

Tambien puedes correr la app compilada en un solo puerto:

```bash
npm.cmd run build
npm.cmd run start
```

Y abrir:

```text
http://localhost:4000
```

## Base de datos

La app ahora viene preparada para usar `Prisma + PostgreSQL`.

- Si `DATABASE_URL` esta configurada, el backend usa PostgreSQL.
- Si `DATABASE_URL` no existe, la app sigue funcionando con `data/app-data.json` como respaldo local mientras terminas la migracion.

Para preparar Prisma:

```bash
npm.cmd run prisma:generate
```

En Prisma ORM v7 la conexion de PostgreSQL se lee desde [prisma.config.ts](<C:\Users\samue\OneDrive\Documents\GitHub\Finanzas\prisma.config.ts>) y el esquema vive en [schema.prisma](<C:\Users\samue\OneDrive\Documents\GitHub\Finanzas\prisma\schema.prisma>).

Cuando ya tengas tu base PostgreSQL disponible:

```bash
npm.cmd run prisma:push
```

La base ya incluye modelos para:

- usuarios
- conexion Google / Gmail
- transacciones
- logs de sincronizacion
- presupuestos
- metas
- cuentas
- posiciones de inversion
- alertas
- reglas automaticas

## Google y Gmail

La app usa Google OAuth para dos cosas:

- iniciar sesion en la app con tu cuenta Google
- leer correos de Gmail para detectar compras

Los scopes usados son:

```text
openid
email
profile
https://www.googleapis.com/auth/gmail.readonly
```

Puedes ajustar la busqueda de correos en `.env` con `GMAIL_SEARCH_QUERY`. Para hacerlo mas preciso, usa filtros por remitente de tu banco, por ejemplo:

```text
from:(alertas@tubanco.com) newer_than:45d
```

## Flujo actual

- Conectar Gmail.
- Sincronizar correos recientes.
- Revisar transacciones pendientes.
- Aprobar, ignorar o cambiar categoria.
- Agregar compras manuales.
