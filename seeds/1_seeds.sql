INSERT INTO users (name, email password) VALUES 
('Jack Dunfield', 'jackdun@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Katie Moss', 'katiemossz@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Phil Kess', 'philk@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Joe Viro', 'joeviro32@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Sally Kessel', 'sallypants@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Luke Bewaj', 'lukecool@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
('Chill Ooli', 'oilchilly@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active, owner_id) VALUES 
('faucibus lectus,','description','http://littlepicture.com/sg9834k','http://largerpicture.com/gml34ge',342,1,1,3,'Ethiopia','Ap #850-2802 Ultricies Ave','Kaluga','KLU','41-954','True',1),
('auctor non,','description','http://littlepicture.com/asf2dsf','http://largerpicture.com/dhfh54',424,4,1,0,'Saint Lucia','6600 Aliquam Rd.','Juazeiro do Norte','CE','4236 MC','False',2),
('Aliquam tincidunt,','description','http://littlepicture.com/fghf46','http://largerpicture.com/dfh35',211,1,2,7,'Myanmar','1197 A, Avenue','San Pedro','SJ','YJ98 6JP','True',3),
('a sollicitudin','description','http://littlepicture.com/34672','http://largerpicture.com/dfh45',214,0,6,3,'Haiti','881-5461 Vel Road','Etawah','Uttar Pradesh','46-382','True',4),
('vestibulum nec,','description','http://littlepicture.com/23426','http://largerpicture.com/fgfj65',275,1,2,3,'United Arab Emirates','P.O. Box 621, 644 Convallis Road','Envigado','Antioquia','Z7227','True',5),
('Pellentesque ultricies','description','http://littlepicture.com/gdfhdht','http://largerpicture.com/34536fgh',292,2,6,4,'South Georgia and The South Sandwich Islands','Ap #997-2985 Nam Avenue','Värnamo','F','912956','True',5),
('at auctor','description','http://littlepicture.com/dhtrhrth','http://largerpicture.com/dfh334',390,2,3,2,'Solomon Islands','7170 Neque Street','Bergama','İzmir','70187','True',6),
('nunc ac','description','http://littlepicture.com/rtyej5','http://largerpicture.com/dfhd22',272,0,1,2,'Sao Tome and Principe','Ap #849-2419 Mi Street','Lincoln','Nebraska','66751','True',2),
('porttitor scelerisque','description','http://littlepicture.com/shtsj4','http://largerpicture.com/dfjy5',317,2,2,6,'Haiti','P.O. Box 703, 2798 Nonummy. Rd.','Awka','Anambra','32269','False',7),
('Donec tempus,','description','http://littlepicture.com/4t34fd','http://largerpicture.com/dhfh33',305,1,3,0,'Latvia','634-7123 Natoque Street','Uiwang','Gye','57701','True',3);

INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES 
('2018-09-30','2019-06-11',3,7),
('2018-03-18','2019-07-02',3,3),
('2018-09-13','2019-01-07',4,3),
('2018-09-27','2019-02-04',8,4),
('2018-03-01','2019-01-04',2,3),
('2018-06-21','2018-12-11',6,5),
('2018-04-11','2019-09-17',4,5),
('2018-07-28','2019-04-18',4,2),
('2018-07-02','2019-05-19',6,4),
('2018-09-11','2019-04-14',8,2);