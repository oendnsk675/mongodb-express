# Express dan mongodb simpel restApi dengan middleware

Berikut adalah simpel restApi template, yang bisa temen-temen ambil refrensi jika temen-temen baru mulai bermigrasi ke express, template ini dilengkapi dengan middleware untuk authorization, dan authenticationnya, yang pada dasaranya menggunakan pattern mvc, tetapi karna fokus di pembuatan restApinya saya tidak membuat viewnya di express, melainkan di projek lainnya.

## Fitur

- Login
- Register
- Buat post
- Update post
- Lihat post
- Lihat detail post
- Authorization dengan menejemen role [ user, admin]
- Authentication menggunakan jwt (JSON Web Token)
- cek duplikat email
 

## Cara menggunakan
Install semua module kemudian jalankan servernya

```sh
npm install
npm run start
```

untuk development, install dulu nodemon

```sh
npm install -g nodemon
```

kemudian jalankan mode development 

```sh
npm run dev
```

## Endpoints Route

Dillinger is currently extended with the following plugins.
Instructions on how to use them in your own application are linked below.

| Plugin | README |
| ------ | ------ |
| Login | [post] [http://localhost:8000/api/login][PlDb] |
| Register | [post] [http://localhost:8000/api/register][PlGh] |
| Get Post | [get] [http://localhost:8000/api/posts/][PlGd] |
| Get Detail Post | [get] [http://localhost:8000/api/posts/:slug][PlOd] |
| Create Post | [post] [http://localhost:8000/api/posts/][PlMe] |
| Update Post | [put] [http://localhost:8000/api/posts/:slug][PlGa] |

## Struktur Folder

```
app
└───Controllers
│   └───userController
│             └───auth
└───middlware
│
└───models
│    └───schema
│
└───routes
config
```

### Penjelasan struktur folder
- folder app berisi folder controllers, middleware, models, dan route.
- folder controllers merupakan folder berisi file controller logic bisnis dari aplikasi kita, contohnya di dalamnya terdapat folder userControll, yang berisi untuk menejemen user, contohnya salah satunya lebih dalam lagi foldernya yakni auth, atau autentikasi untuk user nantinya, dan masih banyak lagi fungsi file yang ada di dalam folder controller ini.
- folder middleware berisikan aturan-aturan yang kita buat untuk user ketika berinteraksi dengan restApi aplikasi kita nantinya, contohnya aturan-aturan menejemen roler, dsb.
- models berisikan file models yang berhubungan dengan database kita, karna di template ini menggunakan mongodb untuk databasenya, jadi di dalam folder ini berisikan skema dari database, dsb.
- routes merupakan file yang berisikan routing untuk user, ketika user merequest dari endpoint tertentu dia akan meroutekan kemana, entah dia return suatu nilai atau ke controller untuk melakukan berbagai proses sehingga user mendapatkan apa yang dia minta
- folder config beriskan config sistem, seperti config untuk pengaturan database, config untuk jwt.

## License

MIT