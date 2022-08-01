# Xepelin - Plataforma para modificar tasas
La idea del proyecto es contar con una plataforma a través de la cual usuarios autenticados puedan cambiar las tasas de diferentes clientes y que se les notifique de ese cambio via email.

## Desarrollo
Para lograr lo anterior se desarrolló un MVP que consta de dos partes: una webapp con un login y un GSheet con la tabla de ids, tasas e emails, junto con un script para pegarle al servicio que se encarga de la mensajería.

### Webapp
La webapp está hecha usando el framework Django. Se tomó la decisión de usar Django no sólo porque podemos levantar una app muy fácilmente con un par de comandos, sino porque además nos abstrae del manejo de usuarios (autenticación y autorización) y la creación de una base de datos.

Considerando que es un MVP, se tomó la decisión de no invertir tiempo en el desarrollo de un front separado del back, ni por hacer un front vistoso. Por esto, el front se reduce a un par de templates de HTML que levanta Django.

### GSheet - Apps Scripts
El GSheet cuenta con un script a través de Apps Scripts por el cual cuando se modifica la columna de tasas se envía un email al cliente correspondiente.

Para esto se creó un activador (trigger) que se dispara al editar el sheet y, si se está modificando la columna de tasas, se tome el id y el email de la fila de la celda modificada y se usen esos parámetros para el request al servicio de mensajería. Además se hace unas pequeñas validaciones sobre dichos parámetros antes de realizar el llamado al servicio. Si el servicio devuelve un status code distinto a 200 se levanta un error, que puede ser trackeado desde la pestaña de activadores.

### Deploy
El deploy se hizo en un AWS EC2, donde simplemente se levantó el proyecto con el comando de Django:
```
python3 manage.py runserver 0:80
```

## Plataforma
Para usar la plataforma:
 - Entrar a http://18.229.133.127/login/
 - Ingresar un username y password válidos
 - Luego de ingresar será redirigido a http://18.229.133.127/rates/ donde aparecerá el sheet embebido listo para ser usado
 - Para deslogearse hacer click en "Log Out"

A modo de ejemplo se disponibilizó el user:
```
username: admin
password: xepelin123
```
Tener en cuenta que se pueden manejar la lista de usuarios desde http://18.229.133.127/admin. Aquí se pueden agregar más users, modificarlos, eliminarlos, etc.
