'use strict'

const Category = use('App/Model/Category')
const Book= use('App/Model/Book')

class NovellaController {
    * main (req, res) {
        const categories = yield Category.all()

        for (const category of categories) {
            const topBooks = yield category.books().limit(3).fetch()
            category.topBooks = topBooks.toJSON()
        }

        yield res.sendView('main', {
            categories: categories.toJSON()
        })
    }

    * create(req, res){
        const categories = yield Category.all()

        yield res.sendView('bookCreate', {
            categories: categories.toJSON()
        })
    }

    * doCreate(req, res){
        const user = req.currentUser
        const novellaData = req.all()

        // 2. validáció
        const rules = {
            'name': 'required|min:3',
            'ingredients': 'required',
            'instructions': 'required',
        }
        
        const validation = yield Validator.validateAll(recipeData, rules)
        if (validation.fails()) {
            yield req
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect('/recipe/create')
            return
        }

        // TODO: check category

        const novella = new Book()
        novella.title = novellaData.title
        novella.author = novellaData.author
        novella.category_id = novellaData.category
        novella.description = novellaData.description
        
        
        

        yield novella.save()

        res.redirect(`/novella/${novella.id}`)
    }

    * show (req, res){
        const book = yield Book.find(req.param('id'))
        yield book.related('category').load()

        yield res.sendView('book', {
            book: book.toJSON()
        })
    }

    * edit (req, res) {
        const book = yield Book.find(req.param('id'))
        const categories = yield Category.all()

        yield res.sendView('bookEdit', {
            book: book.toJSON(),
            categories: categories.toJSON()
        })
    }

    * doEdit (req, res) {
        const book = yield Book.find(req.param('id'))

        if (book === null) {
            res.notFound('Sorry, novel not found.')
            return
        }

        // 1. input
        const bookData = req.all()

        // 2. validáció
        const rules = {
            'name': 'required|min:3',
            'ingredients': 'required',
            'instructions': 'required',
        }

        const validation = yield Validator.validateAll(recipeData, rules)
        if (validation.fails()) {
            yield req
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect(`/recipe/${recipe.id}/edit`)
            return
        }

        // TODO: check category

        book.title = bookData.title
        book.author = bookData.author
        book.category_id = bookData.category
        book.description = bookData.description

        yield book.save()

        res.redirect(`/novella/${book.id}`)
    }

}

module.exports = NovellaController
