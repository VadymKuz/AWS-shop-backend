CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

drop table if exists product cascade;

create table product (
	id uuid not null default uuid_generate_v4() primary key,
	title text not null,
	description text not null,
	price integer not null,
	imageUrl text not null
);

drop table if exists stock cascade;

create table stock(
	product_id uuid not null primary key,
	count integer default 0,
	foreign key (product_id) references product(id)
);

insert into product (title, description, price, imageUrl) 
values (
'TREK Madone SLR 9 eTap Gen 7', 
'Madone SLR 9 is ultralight, insanely fast, and super smooth. It is the ride you reach for on race day when every watt counts and your eyes are on the top step.', 
13199,
'https://trek.scene7.com/is/image/TrekBicycleProducts/MadoneSLR9eTap_23_37420_B_Primary?$responsive-pjpg$&cache=on,on&wid=1920&hei=1440');

insert into product (title, description, price, imageUrl) 
values (
'TREK Madone SLR 9 Gen 7', 
'Madone SLR 9 is ultralight, insanely fast, and super smooth. It is the ride you reach for on race day when every watt counts and your eyes are on the top step.', 
12749,
'https://trek.scene7.com/is/image/TrekBicycleProducts/MadoneSLR9_23_37419_C_Primary?$responsive-pjpg$&cache=on,on&wid=1920&hei=1440');

insert into product (title, description, price, imageUrl) 
values (
'TREK Madone SLR 7 eTap Gen 7', 
'Madone SLR 7 is the ultimate race machine.', 
9699,
'https://trek.scene7.com/is/image/TrekBicycleProducts/MadoneSLR7eTap_23_37418_E_Primary?$responsive-pjpg$&cache=on,on&wid=1920&hei=1440');

insert into product (title, description, price, imageUrl) 
values (
'S-Works Tarmac SL7 - Speed of Light Collection', 
'Darkness, Light, Speed—three elements so intertwined they cannot exist without the other.', 
16000,
'https://assets.specialized.com/i/specialized/90621-00_TARMAC-SL7-SW-SPEED-OF-LIGHT-REDTNT-CMLN-WHT_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto');

insert into stock (product_id, count)
values ((select id from product limit 1), 5);

insert into stock (product_id, count)
values ((select id from product limit 1 offset 1), 10);

insert into stock (product_id, count)
values ((select id from product limit 1 offset 2), 15);

insert into stock (product_id, count)
values ((select id from product limit 1 offset 3), 20);

select p.id, p.title, p.description, p.price, p.imageUrl, s.count from stock as s
inner join product as p
on s.product_id = p.id;

select * from product as p where p.id = '05541c65-ee37-4536-9c28-d0b8d399a223';
select count(*) from product;

begin transaction;
insert into product (title, description, price, imageUrl) values (
'S-Works Tarmac SL7 - SRAM Red eTap AXS',
'Enter the new Tarmac—climb on the lightest bike the UCI allows, then descend on the fastest.',
14500,
'https://assets.specialized.com/i/specialized/90622-02_TARMAC-SL7-SW-ETAP-CARB-SPCTFLR-BRSH_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto');
insert into stock (product_id, count) values ((select id from product limit 1 offset 4), 4);
commit;
 
delete from stock where product_id = '6f7471fd-8526-4200-a705-8268db4301e3';
delete from product where id = '6f7471fd-8526-4200-a705-8268db4301e3';
