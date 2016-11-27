FROM nginx

RUN mkdir /home/app && \
	mkdir /home/app/pac-generator

RUN ln -s /mnt /home/app/pac-generator/dist

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
