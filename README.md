
# HTTPS Setup for www.actdelta.com

This guide explains the steps to configure HTTPS for your React application hosted with Docker, Nginx as a reverse proxy, and Let's Encrypt for SSL certificates.

---

## **1. Prerequisites**
Before starting, ensure you have:
1. A server with **Docker** and **Docker Compose** installed.
2. A registered domain: `www.actdelta.com` (and `actdelta.com`).
3. Access to your domain's DNS management (e.g., GoDaddy).
4. Open ports `80` (HTTP) and `443` (HTTPS).

---

## **2. Project Directory Structure**
Organize your project as follows:
```
project/
├── frontend/
│   ├── Dockerfile
│   ├── public/
│   ├── src/
│   └── package.json
├── backend/
│   ├── Dockerfile
├── nginx/
│   ├── nginx.conf
├── docker-compose.yml
└── data/
    └── letsencrypt/
    └── www/
```

---

## **3. Configure DNS**
Update your domain's DNS settings:
1. Log in to your DNS provider (e.g., GoDaddy).
2. Create or update the following DNS records:
    - **A Record**:
        - **Host**: `@`
        - **Points To**: `<Your Server's Public IP>`
    - **A Record**:
        - **Host**: `www`
        - **Points To**: `<Your Server's Public IP>`

3. Verify DNS propagation:
   ```bash
   dig actdelta.com +short
   dig www.actdelta.com +short
   ```

---

## **4. Create Nginx Configuration**
Create `nginx/nginx.conf`:
```nginx
server {
    listen 80;
    server_name actdelta.com www.actdelta.com;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name actdelta.com www.actdelta.com;

    ssl_certificate /etc/letsencrypt/live/actdelta.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/actdelta.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://frontend:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## **5. Docker Compose Configuration**
Create or update `docker-compose.yml`:
```yaml
version: '3.8'

services:
  frontend:
    container_name: frontend
    image: upshift/frontend:latest
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:80"
    depends_on:
      - backend
    networks:
      - app-network
    environment:
      REACT_APP_API_URL: http://backend:4000/api/v1/

  backend:
    container_name: backend
    image: upshift/backend:latest
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "4000:8080"
    depends_on:
      - db
    networks:
      - app-network

  db:
    container_name: postgres
    image: postgres:latest
    environment:
      POSTGRES_DB: mydatabase
      POSTGRES_PASSWORD: secret
      POSTGRES_USER: cvvnk
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network

  nginx:
    image: nginx:latest
    container_name: nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf
      - ./data/letsencrypt:/etc/letsencrypt
      - ./data/www:/var/www/certbot
    depends_on:
      - frontend
    networks:
      - app-network

  certbot:
    image: certbot/certbot
    container_name: certbot
    volumes:
      - ./data/letsencrypt:/etc/letsencrypt
      - ./data/www:/var/www/certbot
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do sleep 6h & wait $!; certbot renew; done'"
    networks:
      - app-network

networks:
  app-network:

volumes:
  postgres_data: {}
```

---

## **6. Obtain SSL Certificate**
Run Certbot to generate the SSL certificate:
```bash
docker run --rm -v "$(pwd)/data/letsencrypt:/etc/letsencrypt" -v "$(pwd)/data/www:/var/www/certbot" certbot/certbot certonly --webroot --webroot-path=/var/www/certbot -d actdelta.com -d www.actdelta.com --non-interactive --agree-tos --email your-email@example.com
```

---

## **7. Start Services**
Start all services using Docker Compose:
```bash
docker-compose up -d
```

---

## **8. Verify HTTPS**
1. Visit `https://actdelta.com` or `https://www.actdelta.com`.
2. Use [SSL Labs](https://www.ssllabs.com/ssltest/) to test your SSL setup.

---

## **9. Certificate Renewal**
The Certbot container automatically renews certificates. After renewal, reload Nginx:
```bash
docker exec nginx nginx -s reload
```

---

## **10. Troubleshooting**
- Check Nginx logs:
  ```bash
  docker logs nginx
  ```
- Check Certbot logs:
  ```bash
  cat ./data/letsencrypt/logs/letsencrypt.log
  ```
- Ensure ports `80` and `443` are open:
  ```bash
  sudo netstat -tuln | grep LISTEN
  ```

---

