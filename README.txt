URL Website: http://203.194.115.210:8001
Folder di Server: /var/www/classroom/projects/student1
Database Name: db_student1
DB_HOST: MySQL

ssh root@203.194.115.210:8001


ssh root@203.194.115.210
Xm3SW!2!P4FaQI
cd /var/www/classroom/projects/student1


# 1. Masuk ke "komputer container" siswa 1
docker exec -it app_student1 bash

# 2. Install Library PHP (Tunggu agak lama)
composer install

# 3. Setup Config
cp .env.example .env
php artisan key:generate

# 4. Setup Database
# Pastikan di .env DB_HOST=mysql
php artisan migrate

# 5. Fix Error Permission (PENTING: Biar ga error 500/Blank)
chmod -R 777 storage bootstrap/cache

# 6. Keluar dari container
exit

APP_URL=http://203.194.115.210:8001  <-- Ganti sesuai port siswa

DB_CONNECTION=mysql
DB_HOST=mysql         <-- PENTING: Jangan localhost, tapi 'mysql'
DB_PORT=3306
DB_DATABASE=db_student1  <-- Sesuai nama DB siswa
DB_USERNAME=root
DB_PASSWORD=root_password_change_me


# 1. Install Library
docker exec -it app_student1 composer install

# 2. Setup Key
docker exec -it app_student1 cp .env.example .env
docker exec -it app_student1 php artisan key:generate

# 3. Setup Database & Permission
docker exec -it app_student1 php artisan migrate
docker exec -it app_student1 chmod -R 777 storage bootstrap/cache