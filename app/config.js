/*
 * Файл настроек
 */
var config = {
    /* 
     * Настройки для подключения к БД MySQL
     *      
     * Скрипт для создания пустой тестовой БД 
     * расположен в папке /temp/mysql/empty.sql
     */
    db: {
        client: 'mysql',
        connection: {
            host     : '127.0.0.1',
            user     : 'root',
            password : 'password',
            database : 'images_app',
            charset  : 'utf8'
        }
    },
    /* 
     * Настройки для организации 
     */
    io: {
        host: '127.0.0.1',
        port: 9000,
        options: {
            'log level': 0
        }
    },
    /* 
     * Настройки для просмотра картинок по маршруту "show" 
     */
    img: {
        count: 10
    }
    
};

module.exports = config;