'use strict'

const Validator = use('Validator')
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

    * browse(req, res){
          const categories = yield Category.all()

        for (const category of categories) {
            const topBooks = yield category.books().fetch()
            category.topBooks = topBooks.toJSON()
        }

        yield res.sendView('browse', {
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
            'title': 'required|min:3',
            'author': 'required',
            'description': 'required'
            
        }
        
        const validation = yield Validator.validateAll(novellaData, rules)
        if (validation.fails()) {
            yield req
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect('/novella/create')
            return
        }

        // TODO: check category

        const novella = new Book()
        novella.title = novellaData.title
        novella.author = novellaData.author
        novella.category_id = novellaData.category
        novella.description = novellaData.description
        novella.user_id = user.id
        
        
        

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
        const user = req.currentUser
        const book = yield Book.find(req.param('id'))

        if (book === null) {
            res.notFound('Sorry, novel not found.')
            return
        }

        // 1. input
        const bookData = req.all()

        // 2. validáció
        const rules = {
            'title': 'required|min:3',
            'author': 'required',
            'description': 'required',
        }

        const validation = yield Validator.validateAll(bookData, rules)
        if (validation.fails()) {
            yield req
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect(`/novella/${book.id}/edit`)
            return
        }

        // TODO: check category

        book.title = bookData.title
        book.author = bookData.author
        book.category_id = bookData.category
        book.description = bookData.description
        book.user_id = user.id

        yield book.save()

        res.redirect(`/novella/${book.id}`)
    }

    * doDelete (req, res) {
        const user = req.currentUser
        const book = yield Book.find(req.param('id'))

        yield user.favourites().detach([book.id])
        yield book.fans().detach([user.id])

        yield book.delete()

        res.redirect('/')
    }

    * addToFavs(req, res){
        const user = req.currentUser
        const book = yield Book.find(req.param('id'))

        if (book === null) {
            res.notFound('Sorry, novel not found.')
            return
        }

        yield user.favourites().attach([book.id])
        yield book.fans().attach([user.id])

        res.redirect(`/novella/${book.id}`)

    }

     * ajaxDelete (req, res) {
        const book = yield Book.find(req.param('id'))

        yield book.delete()

        res.ok({
            success: true
        })
    }
}



module.exports = NovellaController
