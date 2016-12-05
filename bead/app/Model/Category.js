'use strict'

const Lucid = use('Lucid')

class Category extends Lucid {
    books () {
        return this.hasMany('App/Model/Book')
    }
}

module.exports = Category