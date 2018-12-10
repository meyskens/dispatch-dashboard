ARG ARCH
FROM node:10 as build

COPY ./ /opt/dash
WORKDIR /opt/dash

RUN rm -f ./src/constants.ts
RUN mv ./src/constants.ts.prod ./src/constants.ts

RUN npm install
RUN npm run build

ARG ARCH
FROM maartje/static-base:${ARCH}-latest

RUN echo 'url.rewrite-if-not-file = ( "(?!\.\w+$)" => "/index.html" )' >> /etc/lighttpd/lighttpd.conf

COPY --from=build /opt/dash/dist/dashboard /var/www
