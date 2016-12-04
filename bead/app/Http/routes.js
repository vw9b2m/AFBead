'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.get('/', 'NovellaController.main')
Route.get('/novella/create', 'NovellaController.create').middleware('auth')
Route.post('/novella/create', 'NovellaController.doCreate').middleware('auth')

Route.get('/novella/:id', 'NovellaController.show')
Route.get('/novella/:id/edit', 'NovellaController.edit')
Route.post('/novella/:id/edit', 'NovellaController.doEdit')
Route.post('/novella/:id/delete', 'NovellaController.doDelete')

//Route.on('/').render('welcome')
