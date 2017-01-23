drop database if exists images_app;

create database if not exists images_app;

use images_app;

drop table if exists users;

create table if not exists users(
    user_id integer primary key auto_increment,
    username varchar(100) unique,
    password varchar(100),
    is_admin tinyint(1) DEFAULT 0
)engine=innodb;

drop table if exists files;

create table if not exists files(
    file_id integer primary key auto_increment,
    user_id integer not null,
    name_orig varchar(255) not null,
    name_temp varchar(255) not null,
    comment text,
    dt timestamp,
    index fk_users (user_id ASC),
    constraint fk_users 
        foreign key (user_id) 
            references `users` (`user_id`) 
                on delete cascade
                on update cascade
)engine=innodb;