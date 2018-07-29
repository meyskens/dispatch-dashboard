ARG ARCH
FROM node:10 as build

COPY ./ /opt/dash
WORKDIR /opt/dash

RUN npm install
RUN npm run build

ARG ARCH
FROM maartje/static-base:${ARCH}-latest

COPY --from=build /opt/dash/dist/dashboard /var/www