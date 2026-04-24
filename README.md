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

## Datos locales

Los tokens de Gmail y tus transacciones se guardan en `data/app-data.json`. Ese archivo esta en `.gitignore` para evitar subir informacion personal al repositorio.

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
