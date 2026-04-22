```py
# employe(id, nom, prenom, poste, dep→departement, sup→employe, salaire)
# departement(id, nom, ville)
# direction(id_emp→employe, id_dep→departement)
```
## Q1 — Employés avec salaire entre 10 000 et 20 000, avec nom du département
### avec jointure
```sql
SELECT e.id, e.nom, e.prenom, d.nom AS departement
FROM employe e
JOIN departement d ON e.dep = d.id
WHERE e.salaire BETWEEN 10000 AND 20000;
```
### avec sous-requets
```sql
SELECT e.id, e.nom, e.prenom,
       (SELECT d.nom 
        FROM departement d 
        WHERE d.id = e.dep) AS departement
FROM employe e
WHERE e.salaire BETWEEN 10000 AND 20000;
```
## Q2 — Pour chaque département : id, nom, et nom du directeur
### avec jointure
```sql
SELECT d.id, d.nom AS departement, e.nom AS directeur
FROM departement d
JOIN direction dir ON d.id = dir.id_dep
JOIN employe e ON dir.id_emp = e.id;
```
### avec sous-requets
```sql
SELECT d.id, d.nom AS departement,
       (SELECT e.nom
        FROM employe e
        WHERE e.id = (
            SELECT dir.id_emp
            FROM direction dir
            WHERE dir.id_dep = d.id
        )
       ) AS directeur
FROM departement d;
```
## Q3 — Pour chaque supérieur : son id, nom et prénom
### avec jointure 
```sql
SELECT e.id, e.nom, e.prenom
FROM employe emp
JOIN employe e ON emp.sup = e.id
WHERE emp.sup IS NOT NULL;
```
## Q3-bis — Sans doublons (DISTINCT déjà appliqué ci-dessus)
### avec jointure
```sql
SELECT DISTINCT e.id, e.nom, e.prenom
FROM employe emp
JOIN employe e ON emp.sup = e.id
WHERE emp.sup IS NOT NULL;
```
### avec sous-requets
```sql
SELECT e.id, e.nom, e.prenom
FROM employe e
WHERE e.id IN (
    SELECT emp.sup
    FROM employe emp
    WHERE emp.sup IS NOT NULL
);
```
## Q4 — Pour chaque département : id, nombre d'employés, salaire moyen
```sql
-- ici on affiche des departements avec meme nom mais de ville differente
select dep, 
    count(id) nombre_demploye, 
    avg(salaire) salaire_moyenne
from employe 
group by dep;
```
## Q4-bis — Nom des départements identifiés par Q4
```sql
--  affichage de la ville ou se trouve le departement
SELECT d.id, d.nom, d.ville,
        COUNT(e.id) AS nb_emp,
        AVG(e.salaire) AS s_moy
FROM employe e
JOIN departement d ON e.dep = d.id
GROUP BY d.id, d.nom, d.ville;
```
## Q5 — Employés qui sont supérieurs mais PAS directeurs (sans EXCEPT/MINUS)
### avec jointure
```sql
select distinct e.sup  
from employe e 
left join direction d on d.id_emp = e.sup  
where d.id_emp is null 
    and e.sup is not null;
```
### avec sous-requets
```sql
SELECT DISTINCT sup AS id_employe
FROM employe
WHERE sup IS NOT NULL
  AND sup NOT IN (SELECT id_emp FROM direction);
```
## Q5-bis — Nom des employés identifiés par Q5
### avec jointure 
```sql
SELECT DISTINCT e.id, e.nom, e.prenom
FROM employe e
JOIN employe emp ON emp.sup = e.id
LEFT JOIN direction di ON di.id_emp = e.id
WHERE di.id_emp IS NULL;-- id_emp = null c-a-d  pas directeur
```
### avec sous-requets
```sql
SELECT e.id, e.nom, e.prenom
FROM employe e
WHERE e.id IN (
    SELECT emp.sup
    FROM employe emp
    WHERE emp.sup IS NOT NULL
)AND  e.id NOT IN (
    SELECT  id_emp 
    FROM direction
);
```
