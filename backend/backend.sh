#!/bin/bash

# Verifica si hay migraciones pendientes
if python manage.py showmigrations | grep "\[ \]" > /dev/null; then
    # Ejecuta las migraciones
    python manage.py migrate
fi

# Continúa con el comando de inicio del servidor Django
exec "$@"