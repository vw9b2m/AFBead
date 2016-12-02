'use strict'

class NovellaController {
    * main (req, res) {
        const categories = yield Category.all()

        for (const category of categories) {
            const topNovells = yield category.novells().limit(3).fetch()
            category.topNovells = topNovells.toJSON()
        }

        yield res.sendView('main', {
            categories: categories.toJSON()
        })
    }

    * create(req, res){
        const categories = yield Category.all()

        yield res.sendView('novellaCreate', {
            categories: categories.toJSON()
        })
    }

    * doCreate(req, res){
           const novellaData = req.all()

        // 2. validáció
        const rules = {
            'name': 'required|min:3',
            'ingredients': 'required',
            'instructions': 'required',
        }
        /*
        const validation = yield Validator.validateAll(recipeData, rules)
        if (validation.fails()) {
            yield req
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect('/recipe/create')
            return
        }*/

        // TODO: check category

        const novella = new Novella()
        novella.title = novellaData.title
        novella.user_id = 1
        novella.category_id = novellaData.category
        novella.author = novellaData.author
        novella.leiras = novellaData.leiras

        yield novella.save()

        res.redirect(`/novella/${novella.id}`)
    }

}

module.exports = NovellaController
