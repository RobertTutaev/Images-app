// Работаем с ORM
var config = require('../config');
var knex = require('knex')(config.db);
var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
    tableName: 'users',
    idAttribute: 'user_id',
    files: function() {
        return this.hasMany(File);
    }
});

var File = bookshelf.Model.extend({
    tableName: 'files',
    idAttribute: 'file_id',
    user: function() {
        return this.belongsTo(User);
    }
});

var getFiles = function () {    
    return knex.
        select('name_orig', 'name_temp', 'comment').
        from('files').
        orderBy('dt').
        limit(10);
};

module.exports = {
    User: User,
    File: File,
    getFiles: getFiles
};