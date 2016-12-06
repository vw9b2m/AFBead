# AFBead

## 1. Követelményanalízis

### 1.1. Célkitűzés, projektindító dokumentum

A program legfőbb célja jól átláthatóan, és érthetően megjeleníteni az adott könyvek/novellák, és italok főbb tulajdonságait, és receptjüket egy webes vastagkliens, azaz egyoldali alkalmazás felhasználásával Az adatok védelme érdekében legyen lehetőség regisztrációra, majd bejelentkezésre. Bejelentkezett felhasználó a könyvek/novellák listáját megtekintheti, bővítheti, meglévő elemeket törölhet, valamit megjegyzéseket írhat.

Funkcionális követelmények:

- Regisztrációra
- Bejelentkezés
- Csak bejelentkezett felhasználók által elérhető funkciók
 - új könyv/novella hozzáadása
 - a meglévő könyv/novella szerkesztésére
 - a meglévő könyv/novella törlésére
 - könyv/novella kedvencekhez adása
- Nem funkcionális követelmények:
- Könnyű áttekinthetőség: Színekkel típus szerint csoportosítás
- Használhatóság: Könnyű áttekinthetőség, ésszerű elrendezés, könnyen kezelhetőség
- Megbízhatóság: jelszóval védett funkciók, és a jelszavak védelme a háttérben. Hibásan bevitt adatok esetén a program jól láthatóan jelezzen a felhasználónak. A jól bevitt adatok maradjanak az űrlapban.
- Karbantarthatóság: könnyen lehessen bővíteni, a különböző típusú fájlok külön csoportosítva, ésszerűen legyenek felbontva, a könnyebb fejleszthetőség miatt

### 1.2. Szakterületi fogalomjegyzék

#### Fajták:

- Novella: Rövid terjedelmű szépirodalmi mű
- Könyv : Olyan, szövegből és ábrából álló, fizikai (papír) információhordozójú, nem periodikus (irodalmi vagy szakmai célú) publikáció, amely 49 vagy több oldalból áll.

#### Egyéb:
- Kedvencek : a felhasználó által összeállított lista a kedvenc könyveiből/novelláiból

### 1.3. Használatieset-modell, funkcionális követelmények

Vendég: Csak a publikus oldalakat éri el

- Főoldal:Novella
- Böngészés
- Bejelentkezés
- Regisztráció

Bejelentkezett felhasználó: A publikus oldalak elérésén felül egyéb funkciókhoz is hozzáfér.

- Új könyv/novella  felvétele
- Meglévő könyv/novella  megtekintése
- Meglévő könyv/novella  szerkesztése
- Meglévő könyv/novella  törlése

![alt tag](https://github.com/vw9b2m/AFBead/blob/master/images/1.png)

Vegyünk példának egy egyszerű folyamatot:

Meglévő könyv/novella szerkesztése:

1. A felhasználó az oldalra érkezve, bejelentkezik vagy regisztrál
2. Regisztráció után megtekintheti a könyveket/novellákat listázó oldalt, ahol kiválaszthatja a szerkeszteni kívánt könyvet/novellát.
3. Rákattint a könyv/novella nevére.
4. A megtekintés oldalon kiválaszthatja a „Módosítás” gombot
5. Szerkesztés oldalon felviszi az új adatokat
6. Ok gombra kattintva elmenti a változásokat

![alt tag](https://github.com/vw9b2m/AFBead/blob/master/images/2.png)

## 2. Tervezés

### 2.1. Architektúra terv

#### 2.1.1. Komponensdiagram

![alt tag](https://github.com/vw9b2m/AFBead/blob/master/images/3.png)

#### 2.1.2. Oldaltérkép:

Publikus:
- Főoldal
- Böngészés
- Bejelentkezés
- Regisztráció

Bejelentkezett:

- Főoldal
	- könyv/novella megtekintése
		- könyv/novella szerkesztése
		- könyv/novella törlése
		- könyv/novella kedvenchez adása
- Böngészés
	- könyv/novella megtekintése
		- könyv/novella szerkesztése
		- könyv/novella törlése
		- könyv/novella kedvenchez adása
- Kilépés

#### 2.1.3. Végpontok

- GET /: főoldal
- GET /create/novella novella készítése
- POST /novella/create novella adatainak felküldése
- GET /browse novellák böngészés
- GET /novella/:id novella megtekintése
- GET /user/:id user adatainak megtekintése
- GET /novella/:id/addToFavs Kedvencnek adás
- GET /novella/:id/edit novella szerkesztése
- POST /novella/:id/edit novella szerkesztett adatainak felküldése
- POST /novella/:id/delete novella törlése
- GET /register regisztráció
- POST /register regisztrációs adatok felküldése
- GET /login belépés
- POST /login beléptetés
- GET /logout kilépés

### 2.2.3. Osztálymodell

#### Adatmodell

![alt tag](https://github.com/vw9b2m/AFBead/blob/master/images/4.png)

## 3. Implementáció

### 3.1.1. Fejlesztőkörnyezet

- Adonis.js

- Követelmények: Böngésző

- Project élesítésének folyamata:

1. Git repository leclone-ozása
2. Helyi ide: Visual Studio Code megnyitása, fájl kiválasztása
3. npm i paranccsal függősgek felépítése(ctrl + ö :terminál)
4. npm run dev paranccsal localhost:3333 porton elindul a szerver
5. node_modules\.bin\admin config\express-admin paranccsal localhost:4444 porton elindul az express admin
6. kód módosítása
7. bead mappából git add . , git commit -m 'leírás', git push parancsokkal mentjük a változtatásokat

3.1.2. Könyvtárstruktúra
- app
    - http
        - controllers
            - NovellaController.js
            - UserController.js
        - route.js
    - Model 
        - Book
        - Category
        - Token
        - User
- config
    - express-admin
- database
    - migrations
    - development.sqlite
- resources
    - views
        - book.njk
        - bookCreate.njk
        - bookEdit.njk
        - browse.njk
        - login.njk
        - main.njk
        - master.njk
        - register.njk
        - user.njk
        - welcome.njk

