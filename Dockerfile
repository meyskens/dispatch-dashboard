FROM amd64/node:14 as build

COPY ./ /opt/dash
WORKDIR /opt/dash

RUN rm -f ./src/constants.ts
RUN mv ./src/constants.ts.prod ./src/constants.ts

RUN npm install
RUN npm run build

FROM ghcr.io/meyskens/static-base:f43eda38b2756e94e3cfaea868d68cfe2b142f55

RUN echo 'url.rewrite-if-not-file = ( "(?!\.\w+$)" => "/index.html" )' >> /etc/lighttpd/lighttpd.conf

COPY --from=build /opt/dash/dist/dashboard /var/www
