FROM registry.superlucy.net/library/nginx:1.22-alpine

WORKDIR /usr/share/nginx/html/

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY ./dist  /usr/share/nginx/html/

EXPOSE 80

RUN cp -rp /usr/share/nginx/html/demo/index.html /usr/share/nginx/html/index.html 

CMD ["nginx", "-g", "daemon off;"]