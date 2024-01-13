## ENV settings
```
NODE_ENV=development
PORT=8686

DB_DIALECT=mysql

DEV_DB_USERNAME=root
DEV_DB_PASSWORD=231296
DEV_DB_NAME=microkols_news
DEV_DB_HOSTNAME=127.0.0.1

CI_DB_USERNAME=
CI_DB_PASSWORD=
CI_DB_NAME=
CI_DB_HOSTNAME=

PROD_DB_USERNAME=root
PROD_DB_PASSWORD=231296
PROD_DB_NAME=microkols_news
PROD_DB_HOSTNAME=127.0.0.1

ENABLE_RESET_DB=1

DEV_CACHE_HOST=127.0.0.1
DEV_CACHE_PORT=6379
ENABLE_CACHE=0

DOMAIN_ROOT=https://localhost:8686
DOMAIN_IMG=https://localhost:8686
DOMAIN_CLIENT=http://localhost:8888
PREFIX_API_CACHE=microkols_news_
SESSION_SECRET=abc
FOLDER_UPLOAD_BASE=D:/Sources/microkols_news/public/uploads/
```
## Installations
```sh
npm install
```
## Create or Reset db (ENABLE_RESET_DB = 1)
```sh
npm run resetdb
```
## Run project with development
```sh
npm run dev
```
## Run project with production
```sh
npm run prod
```