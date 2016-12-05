'use strict'

const Schema = use('Schema')

class BooksTableSchema extends Schema {

  up () {
    this.create('books', (table) => {
      table.increments()
      table.string('title', 50).notNullable()
      table.string('author', 100).notNullable()
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.text('description').notNullable()
      table.timestamps()
      table.unique(['title', 'author'])
    })
  }

  down () {
    this.drop('books')
  }

}

module.exports = BooksTableSchema
