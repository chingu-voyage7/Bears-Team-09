user nginx;
worker_processes auto;
pid /run/nginx.pid;

events {
    worker_connections 768;
}

http {
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    server_names_hash_bucket_size 128;

    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
    ssl_prefer_server_ciphers on;
    ssl_certificate     /etc/nginx/certificate.pem;
    ssl_certificate_key /etc/nginx/private_key.pem;
    ssl_session_cache   shared:SSL:10m;
    ssl_session_timeout 10m;

    gzip on;
    gzip_disable "msie6";

    server {
        server_name ${server_name};

        location / {
            proxy_pass http://${frontend_name}:3000;
        }

        location /api {
            proxy_pass http://${backend_name}:8000;
        }

        listen 443 ssl;
        listen [::]:443;
    }

    server {
        listen 80 default_server;
        listen [::]:80 default_server;
        server_name ${server_name};
        return 301 https://$server_name$request_uri;
    }
}