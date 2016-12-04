'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

    favourites () {
        return this.belongsToMany('App/Model/Book')
    }
}

module.exports = User
