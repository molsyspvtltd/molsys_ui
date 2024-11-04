# build env
FROM node:13.12.0-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

# production env
FROM nginx:stable-alpine
COPY  ssl/ca_bundle.crt /etc/nginx/ssl/
COPY  ssl/certificate.crt /etc/nginx/ssl/
COPY  ssl/private.key /etc/nginx/ssl/
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
