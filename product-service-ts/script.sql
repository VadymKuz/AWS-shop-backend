CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

drop table if exists product cascade;

create table product (
	id uuid not null default uuid_generate_v4() primary key,
	title text not null,
	description text,
	price integer
);

drop table if exists stock cascade;

create table stock(
	product_id uuid not null primary key,
	count integer default 0,
	foreign key (product_id) references product(id)
);

insert into product (title, description, price) 
values (
'TREK Madone SLR 9 eTap Gen 7', 
'Madone SLR 9 is ultralight, insanely fast, and super smooth. It is the ride you reach for on race day when every watt counts and your eyes are on the top step.', 
13199);

insert into product (title, description, price) 
values (
'TREK Madone SLR 9 Gen 7', 
'Madone SLR 9 is ultralight, insanely fast, and super smooth. It is the ride you reach for on race day when every watt counts and your eyes are on the top step.', 
12749);

insert into product (title, description, price) 
values (
'TREK Madone SLR 7 eTap Gen 7', 
'Madone SLR 7 is the ultimate race machine.', 
9699);

insert into product (title, description, price) 
values (
'S-Works Tarmac SL7 - Speed of Light Collection', 
'Darkness, Light, Speed—three elements so intertwined they cannot exist without the other.', 
16000);

insert into stock (product_id, count)
values ((select id from product order by title limit 1), 5);

insert into stock (product_id, count)
values ((select id from product order by title limit 1 offset 1), 10);

insert into stock (product_id, count)
values ((select id from product order by title limit 1 offset 2), 15);

insert into stock (product_id, count)
values ((select id from product order by title limit 1 offset 3), 20);



