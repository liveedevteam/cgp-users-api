# Dockerfile-db

FROM postgres:15

WORKDIR /docker-entrypoint-initdb.d/

ADD init.sql .

RUN chown postgres:postgres init.sql
