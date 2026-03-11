```sql



~ via  v8.5.3 
  ❯ mariadb -u root -p
Enter password: 
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 46
Server version: 12.2.2-MariaDB Arch Linux

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| testdb             |
+--------------------+
5 rows in set (0.000 sec)

MariaDB [(none)]> use testdb;
Database changed
MariaDB [testdb]> show tables;
Empty set (0.000 sec)

MariaDB [testdb]> create table client ()
    -> ^C
    -> \c
MariaDB [testdb]> create table client (
    -> id int  primary key ,
    -> nom varchar(255),
    -> age int , 
    -> salaire decimal(10,2),
    -> check (age >= 18) );
Query OK, 0 rows affected (0.022 sec)

MariaDB [testdb]> desc client;
+---------+---------------+------+-----+---------+-------+
| Field   | Type          | Null | Key | Default | Extra |
+---------+---------------+------+-----+---------+-------+
| id      | int(11)       | NO   | PRI | NULL    |       |
| nom     | varchar(255)  | YES  |     | NULL    |       |
| age     | int(11)       | YES  |     | NULL    |       |
| salaire | decimal(10,2) | YES  |     | NULL    |       |
+---------+---------------+------+-----+---------+-------+
4 rows in set (0.001 sec)

MariaDB [testdb]> insert into client  (nom,age,salaire) values ('ahmed',24,10000);
ERROR 1364 (HY000): Field 'id' doesn't have a default value
MariaDB [testdb]> alter table client modify id int auto_increment;
Query OK, 0 rows affected (0.044 sec)              
Records: 0  Duplicates: 0  Warnings: 0

MariaDB [testdb]> desc client;
+---------+---------------+------+-----+---------+----------------+
| Field   | Type          | Null | Key | Default | Extra          |
+---------+---------------+------+-----+---------+----------------+
| id      | int(11)       | NO   | PRI | NULL    | auto_increment |
| nom     | varchar(255)  | YES  |     | NULL    |                |
| age     | int(11)       | YES  |     | NULL    |                |
| salaire | decimal(10,2) | YES  |     | NULL    |                |
+---------+---------------+------+-----+---------+----------------+
4 rows in set (0.001 sec)

MariaDB [testdb]> insert into client  (nom,age,salaire) values ('ahmed',24,10000);
Query OK, 1 row affected (0.006 sec)

MariaDB [testdb]> select * from client;
+----+-------+------+----------+
| id | nom   | age  | salaire  |
+----+-------+------+----------+
|  1 | ahmed |   24 | 10000.00 |
+----+-------+------+----------+
1 row in set (0.000 sec)

MariaDB [testdb]> -- inserons une ligne avec age < 18
MariaDB [testdb]> insert into client  (nom,age,salaire) values ('ahmed',17,10000);
ERROR 4025 (23000): CONSTRAINT `CONSTRAINT_1` failed for `testdb`.`client`
MariaDB [testdb]> SHOW CREATE TABLE client;
+--------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Table  | Create Table                                                                                                                                                                                                                                                                                                                       |
+--------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| client | CREATE TABLE `client` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `salaire` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `CONSTRAINT_1` CHECK (`age` >= 18)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci |
+--------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.000 sec)

MariaDB [testdb]> -- removing age constraint 
MariaDB [testdb]> alter table client drop constraint CONSTRAINT_1;
Query OK, 0 rows affected (0.032 sec)
Records: 0  Duplicates: 0  Warnings: 0

MariaDB [testdb]> desc client;
+---------+---------------+------+-----+---------+----------------+
| Field   | Type          | Null | Key | Default | Extra          |
+---------+---------------+------+-----+---------+----------------+
| id      | int(11)       | NO   | PRI | NULL    | auto_increment |
| nom     | varchar(255)  | YES  |     | NULL    |                |
| age     | int(11)       | YES  |     | NULL    |                |
| salaire | decimal(10,2) | YES  |     | NULL    |                |
+---------+---------------+------+-----+---------+----------------+
4 rows in set (0.001 sec)

MariaDB [testdb]> insert into client  (nom,age,salaire) values ('ahmed',17,10000);
Query OK, 1 row affected (0.006 sec)

MariaDB [testdb]> select * from  client;
+----+-------+------+----------+
| id | nom   | age  | salaire  |
+----+-------+------+----------+
|  1 | ahmed |   24 | 10000.00 |
|  2 | ahmed |   17 | 10000.00 |
+----+-------+------+----------+
2 rows in set (0.000 sec)

MariaDB [testdb]> drop table client;
Query OK, 0 rows affected (0.020 sec)

MariaDB [testdb]> create table client (id int , age int, constraint age_min check (age >= 18) );
Query OK, 0 rows affected (0.021 sec)

MariaDB [testdb]> desc client;
+-------+---------+------+-----+---------+-------+
| Field | Type    | Null | Key | Default | Extra |
+-------+---------+------+-----+---------+-------+
| id    | int(11) | YES  |     | NULL    |       |
| age   | int(11) | YES  |     | NULL    |       |
+-------+---------+------+-----+---------+-------+
2 rows in set (0.001 sec)

MariaDB [testdb]> alter table client modify id int auto_increment , add primary key(id);
Query OK, 0 rows affected (0.046 sec)              
Records: 0  Duplicates: 0  Warnings: 0

MariaDB [testdb]> desc client;
+-------+---------+------+-----+---------+----------------+
| Field | Type    | Null | Key | Default | Extra          |
+-------+---------+------+-----+---------+----------------+
| id    | int(11) | NO   | PRI | NULL    | auto_increment |
| age   | int(11) | YES  |     | NULL    |                |
+-------+---------+------+-----+---------+----------------+
2 rows in set (0.001 sec)

MariaDB [testdb]> SHOW CREATE TABLE client;
+--------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Table  | Create Table                                                                                                                                                                                                                      |
+--------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| client | CREATE TABLE `client` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `age` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `age_min` CHECK (`age` >= 18)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci |
+--------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.000 sec)

MariaDB [testdb]> -- removing primary key
MariaDB [testdb]> -- since primary key is known
MariaDB [testdb]> alter table client drop primary key;
ERROR 1075 (42000): Incorrect table definition; there can be only one auto column and it must be defined as a key
MariaDB [testdb]> -- mariadb throws an error because  auto_increment needs an index
MariaDB [testdb]> alter table client modify id int, drop  primary key;
Query OK, 0 rows affected (0.048 sec)              
Records: 0  Duplicates: 0  Warnings: 0

MariaDB [testdb]> desc client;
+-------+---------+------+-----+---------+-------+
| Field | Type    | Null | Key | Default | Extra |
+-------+---------+------+-----+---------+-------+
| id    | int(11) | YES  |     | NULL    |       |
| age   | int(11) | YES  |     | NULL    |       |
+-------+---------+------+-----+---------+-------+
2 rows in set (0.001 sec)

MariaDB [testdb]> 


```
