'use strict'

const Schema = use('Schema')

class BookUserTableSchema extends Schema {

  up () {
    this.create('book_user', (table) => {
      table.increments()
      table.integer('book_id').unsigned().references('id').inTable('books')
      table.integer('user_id').unsigned().references('id').inTable('users')
      //table.primary(['book_id', 'user_id'])
    })
  }

  down () {
    this.drop('book_user')
  }

}

module.exports = BookUserTableSchema
