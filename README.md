Games Stats

### Opis

// TODO 

### Instrukcja

```
./dev start
./dev stop
```

http://localhost:3000

Inne przydatne komendy

```
./dev logs
./dev logs <app/db>
./dev reset
./dev restart
./dev ps
./dev yarn knex
./dev yarn test
```

### Środowisko programistyczne

System operacyjny: Ubuntu >= 18.04 LTS

Programy:

- docker >= 19.03.5
- docker-compose >= 1.21.2
- node.js zainstalowany lokalnie za pomocą nvm (oprócz tego z docker'a)
- VSCode (może być zainstalowany za pomocą snap)
- Opcjonalnie program do łączenia z bazą danych jeśli nie chcemy używać psql CLI (dbeaver, data grip, ...)
 

### Opis techniczny

Projekt dzieli się na dwa moduły (backend i frontend). Cały kod przechowywany jest w jednym repozytorium (tzw. monorepo).

Backend wykorzystuje framework hapi.js (https://hapi.dev/). Do komunikacji z bazą danych PostgreSQL używam knex (query builder http://knexjs.org/) i objection.js (ORM dla knex'a https://vincit.github.io/objection.js/).
Cały kod podzielony jest na kilka części:
- readers - kod, który służy tylko do oczytu danych z bazy (wyszukiwanie, paginacje itp.)
- services - kod, który służy do zapisu danych w bazie danych (chcemy mieć tylo 1 sposób na tworzenie, uaktualniania i kasowanie danych)
- tesy - framework jest.js

Frontend
Vue 2.6 z Vuetify
