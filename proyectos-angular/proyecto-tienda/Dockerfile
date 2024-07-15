# Etapa de construcción
FROM node:18 as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Etapa de producción
FROM nginx:alpine
COPY --from=build . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
