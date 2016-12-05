# AFBead

. Követelményanalízis

1.1. Célkitűzés, projektindító dokumentum

A program legfőbb célja jól átláthatóan, és érthetően megjeleníteni az adott koktélok, és italok főbb tulajdonságait, és receptjüket egy webes vastagkliens, azaz egyoldali alkalmazás felhasználásával Az adatok védelme érdekében legyen lehetőség regisztrációra, majd bejelentkezésre. Bejelentkezett felhasználó a koktélok listáját megtekintheti, bővítheti, meglévő elemeket törölhet, valamit megjegyzéseket írhat.

Funkcionális követelmények:

Regisztrációra
Bejelentkezés
Csak bejelentkezett felhasználók által elérhető funkciók
 -új könyv/novella hozzáadása
 -a meglévő könyv/novella szerkesztésére
 -a meglévő könyv/novella törlésére
 - könyv/novella kedvencekhez adása
Nem funkcionális követelmények:
Könnyű áttekinthetőség: Színekkel típus szerint csoportosítás
Használhatóság: Könnyű áttekinthetőség, ésszerű elrendezés, könnyen kezelhetőség
Megbízhatóság: jelszóval védett funkciók, és a jelszavak védelme a háttérben. Hibásan bevitt adatok esetén a program jól láthatóan jelezzen a felhasználónak. A jól bevitt adatok maradjanak az űrlapban.
Karbantarthatóság: könnyen lehessen bővíteni, a különböző típusú fájlok külön csoportosítva, ésszerűen legyenek felbontva, a könnyebb fejleszthetőség miatt

1.2. Használatieset-modell, funkcionális követelmények

Vendég: Csak a publikus oldalakat éri el

-Főoldal:Novella
-Böngészés
-Bejelentkezés
-Regisztráció

Bejelentkezett felhasználó: A publikus oldalak elérésén felül egyéb funkciókhoz is hozzáfér.

-Új könyv/novella  felvétele
-Meglévő könyv/novella  megtekintése
-Meglévő könyv/novella  szerkesztése
-Meglévő könyv/novella  törlése

Vegyünk példának egy egyszerű folyamatot:

Meglévő könyv/novella szerkesztése:

1.A felhasználó az oldalra érkezve, bejelentkezik vagy regisztrál
2.Regisztráció után megtekintheti a könyveket/novellákat listázó oldalt, ahol kiválaszthatja a szerkeszteni kívánt könyvet/novellát.
3.Rákattint a könyv/novella nevére.
4.A megtekintés oldalon kiválaszthatja a „Módosítás” gombot
5.Szerkesztés oldalon felviszi az új adatokat
6.Ok gombra kattintva elmenti a változásokat

2.1.2. Oldaltérkép:

Publikus:

-Főoldal
-Böngészés
-Bejelentkezés
-Regisztráció

Bejelentkezett:

-Főoldal
	-könyv/novella megtekintése
		-könyv/novella szerkesztése
		-könyv/novella törlése
		-könyv/novella kedvenchez adása
-Böngészés
	-könyv/novella megtekintése
		-könyv/novella szerkesztése
		-könyv/novella törlése
		-könyv/novella kedvenchez adása
-Kilépés

2.1.3. Végpontok
-Route.get('/', 'NovellaController.main')
-Route.get('/novella/create', 'NovellaController.create').middleware('auth')
-Route.post('/novella/create', 'NovellaController.doCreate').middleware('auth')
-Route.get('/browse', 'NovellaController.browse')

-Route.get('/novella/:id', 'NovellaController.show')
-Route.get('/user/:id', 'UserController.show')
-Route.get('/novella/:id/addToFavs', 'NovellaController.addToFavs')
-Route.get('/novella/:id/edit', 'NovellaController.edit')
-Route.post('/novella/:id/edit', 'NovellaController.doEdit')
-Route.post('/novella/:id/delete', 'NovellaController.doDelete')


-Route.get('/register', 'UserController.register')
-Route.post('/register', 'UserController.doRegister')


-Route.get('/login', 'UserController.login')
-Route.post('/login', 'UserController.doLogin')
-Route.get('/logout', 'UserController.doLogout')


## Választott feladat leírása
- A beadandómban egy kezdő/haladó íróknak való novella-gyűjtő oldalt valósítok meg.
- Az oldal lehetővé teszi a vendégként való böngészést, illetve regisztrált tagoknak a feltöltést is.
- A novellákat Kategóriákba lehet sorolni, egyszerre többe is.(sok- a sokhoz kapcsolat)
- A novellákat (regisztrált tagként) lehet a "Kedvenc" - listához adni, ami lehetővé teszi az értékelést is.(egy felhasználónak egy kedvenc listája lesz)

## Novellák
### Funkcionális Követelmények

**Vendég**
- Vendégként az oldalon szeretnék kiemelt novellákat látni.
- Vendégként szeretnék az oldalon a novellák között szabadon böngészni.
- Vendégként szeretnék egy novella-leírást megtekinteni.
- Vendégként szeretnék novellát keresni.
- Vendégként szeretnék tudni regisztrálni az oldalra.

**Felhasználó**
- Felhasználóként szeretnék tudni bejentkezni.
- Felhasználóként szeretném a profilom szerkeszteni.	
- Felhasználóként szeretnék új novellákat beküldeni.
- Felhasználóként szeretném a saját novelláim módosítani, törölni.

### Nem Funkcionális Követelmények
- Felhasználóbarát ergonomikus elrendezés és kinézet.
- Gyors működés
- Biztonságos működés: 
	- Jelszó védelem
	- Funkciókhoz való hozzáférés
	
## Adat modellek
- Könyv
- Felhasználó
- Kategória
- Kedvencek
