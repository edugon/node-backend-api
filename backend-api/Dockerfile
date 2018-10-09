FROM node:latest
LABEL description="this image builds node backend-api"

# use changes to package.json to force docker not to use the cache
# this is more efficient as we avoid reinstalling all packages in every build
ADD ./app/package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app

WORKDIR /usr/src/app
ADD ./app ./

# custom init is needed
ADD ./init.sh ./
RUN chmod 777 init.sh

EXPOSE 3000

CMD ./init.sh