FROM postgres

WORKDIR /app

# COPY db /app/db/dump.sql 
COPY ./db/dump.sql /docker-entrypoint-initdb.d/

ADD ./db/dump.sql /docker-entrypoint-initdb.d



FROM python:3

# Set unbuffered output for python
ENV PYTHONUNBUFFERED 1

# Install PostgreSQL client
RUN apt-get update && apt-get install -y postgresql-client

# Create app directory
WORKDIR /app

# Install app dependencies
COPY requirements.txt .

RUN pip install -r requirements.txt

# Bundle app source
COPY . .

# Copy wait-for-postgres.sh script
COPY wait-for-postgres.sh /app/wait-for-postgres.sh
RUN chmod +x /app/wait-for-postgres.sh

# Set executable permissions for scripts
RUN chmod +x backend.sh
ENTRYPOINT ["./backend.sh"]


# Expose port
EXPOSE 8000

# entrypoint to run the django.sh file
CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]