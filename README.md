# Introduccion

Ontibici es una aplicacion web de alquiler de bicicletas, donde hay dos vistas diferentes dependiendo si es un cliente o un administrador

# Funciones

La web tiene un total de 4 secciones si el que se logea es un cliente que se trata de:

* Home
* Rent
* User
* Log out

Si el usuario logeado es un administrador el total de secciones de 5 que se trata de:

* Home
* Rent
* Dashborad
* User
* Log out

# Home 

 En el Home hay un **mapa** donde estan las estaciones geolocalizadas y al pulsar en una de ellas te lleva a su details donde se estan los slots y donde el cliente podra alquilar una bicicleta.

# Rent 

* En el Rent estan todas las **estaciones lisatdas** y al pulsar en una esatcion te lleva a su details donde se estan los slots y donde el cliente podra alquilar una bicicleta.
* Si el usuario no esta logeado al pulsar en una estacion se llevara a al usuario a la pagina de login para que se autentifique y una vez ya este logeado podra entrar al details de las esataciones.

# Dashborad

En el Dashborad el administrador podra realizar las sigientes acciones:

 * En la vista de las estaciones habra una tabla con todas las estaciones y la informacion de las estaciones, las acciones que se podran hacer sera: **crear** una nueva estacion, **actualizar** una estacion ya creada y **eliminar** una estacion.
 * En la vista de las bicicletas habra una tabla con todas las bicicletas y la informacion de las bicicletas, las acciones que se podran realizar seran las sigientes:  **crear** una nueva bicicleta, **actualizar** una bicicleta ya creada y **eliminar** una bicicleta.
 * En la vista de los usuarios habra una tabla con la informacion relevante de los usuarios y la accion que se podra realizar es **borrar** usuarios.
 * En la vista de las rent habra una tabla con la informacion de las rent que se han realizado y la accion que se podra realizar es **borrar** una rent.
 * En la vista de las Slots habra una tabla con las estaciones que existen y al pulsar en los slots de la estacion mostrara una tabla con los slots que tiene esa esatcion y que bicicleta tiene asociada.
 * En la visat de las incidencias hay dos tablas una tabla donde estan incidencias de los slots y otra tabla donde estan las incidencias de las estaciones, las acciones que se podran realizar son **actualizar** el estado de incidencia y **borrar** una incidencia.
 * En la vista de las **billing** hay una tabla con toda la inforamacion de las billing de todos los usuarios, el precio actual del alquiler y para introducir un nuevo precio, las acciones que se podran accer seran **actualizar** una billing y **actualizar** el precio del alquiler.


# User

* Donde aparece el nombre del usuario al clicar se accede al profile ese usuario.
* En el profile habra la informacion del usuario, una tabla con las **billing** del usuario, notificaciones del estacdo de la incidencia y por ultimo dos tablas de las incidencias que haya hecho el usuario de estaciones o de los slots.


# Log out

La aplicación web, consta también, de un módulo de login donde el usuario puede crear una cuenta, e iniciar sesión con ella.

* Login
* Register
* Logout

Además el login tiene un token mediante JWT en el que va verificando durante el uso de la web si hay un usuario conectado.

# Puesta en marcha

Es necesario crear el fichero .env en la carpeta de servidor.

Tener instalado las siguientes herramientas:

* Django
* React
* PostgreSQL

# Backend

* virtualenv 1_CRUD --python=python3         virtualenv Django_React
* $ source 1_CRUD/bin/activate       Django_React\Scripts\activate
* $ pip3 install postgre
* $ pip3 install django
* $ pip3 install djangorestframework
* $ pip3 install django-cors-headers
* $ pip3 freeze > requirements.txt
* $ pip3 install -r requirements.txt
* $ python manage.py makemigrations
* $ python manage.py migrate
* $ python manage.py createsuperuser

# Frontend

* npm install
* npm run dev

# Librerias

[Boostrap](https://getbootstrap.com/)
[Fontawesome](https://fontawesome.com/)
