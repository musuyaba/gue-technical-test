# gue-technical-test

1. Pastikan Anda memiliki Docker, versi yg saya gunakan adalah
    >PS gue-technical-test> docker --version
Docker version 25.0.3, build 4debf41
2. Terdapat `.env.example ` pada root folder, consumers dan producer. Anda dapat menghapus `.example` menjadi `.env` dan lakukan perubahan pada environment yg dipakai.
3. Lakukan `docker compose up --build` untuk memastikan container telah dibuat ulang. 
4. Migrasi database dilakukan secara otomatis, ketika consumer sudah berjalan. 
5. Namun, untuk seeder dapat dilakukan dengan Execute Sql `TempCategories.sql` dan `TempSummaries.sql`.
6. Apabila docker compose telah berjalan, Anda dapat membuka `localhost:8080` untuk monitoring pipeline pada topic yg digunakan pada pengemabangan ini. 
7. Anda dapat mengakses database postgresql juga sesuai environment berikut
    ```
    POSTGRESQL_GUE_DB=
    POSTGRESQL_GUE_USER=
    POSTGRESQL_GUE_PASSWORD=
    POSTGRESQL_GUE_PORT=
    ```