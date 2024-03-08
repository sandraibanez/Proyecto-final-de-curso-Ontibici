#!/bin/bash
# wait-for-postgres.sh

set -e

host="$1"
port="$2"
shift 2
cmd="$@"

until PG_PASSWORD=$POSTGRES_PASSWORD psql -h "$host" -p "$port" -U "$POSTGRES_USER" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
PG_PASSWORD=$POSTGRES_PASSWORD exec $cmd