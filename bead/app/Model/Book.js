'use strict'

const Lucid = use('Lucid')

class Book extends Lucid {
    category () {
        return this.belongsTo('App/Model/Category')
    }

    fans () {
        return this.belongsToMany('App/Model/User')
    }
}

module.exports = Book
