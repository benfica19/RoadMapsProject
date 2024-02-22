web: gunicorn app:app


server {
    listen 80;
    server_name 54.81.228.58;

    location / {
        proxy_pass http://127.0.0.1:8000;
    }

}



