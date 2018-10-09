FROM mongo:latest
LABEL description="this image builds mongodb"

# allows to specify the database to be used for creation scripts
ENV MONGO_INITDB_DATABASE=models

WORKDIR /docker-entrypoint-initdb.d/

ADD ./insertDocs.js ./

EXPOSE 27017
