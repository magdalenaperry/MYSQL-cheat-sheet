# MYSQL - The Office Notes


Table of Contents

1. Database/Table
2. 
3. 
4. 

## Database/Tables
-  `sets up to prevent double creation of database`
      ```
      DROP DATABASE IF EXISTS office;
      CREATE DATABASE office;

- `allows usage of table`

      USE office;

- `creates table`

      CREATE TABLE employee (
        emp_id INT PRIMARY KEY,
        first_name VARCHAR(40),
        last_name VARCHAR(40),
        birth_day DATE,
        sex VARCHAR(1),
        salary INT,
        super_id INT,
        branch_id INT
      );


### FOREIGN KEYS: 
- `mgr_id column will be a foreign key that references the employee table, and its emp_id`

    CREATE TABLE branch (
      branch_id INT PRIMARY KEY,
      branch_name VARCHAR(40),
      mgr_id INT,
      mgr_start_date DATE,
      FOREIGN KEY(mgr_id) REFERENCES employee(emp_id) ON DELETE SET NULL
    );


### ON DELETE SET NULL

`after branch table has been created ^^ `
`add a foreign key to employee table and make the branch_id the foreign key and it will reference the branch table and its branch_id.`

`if the branch_id from branch table is deleted, the branch_id value in the employee table is set to null.`

    ALTER TABLE employee
    ADD FOREIGN KEY(branch_id) REFERENCES branch(branch_id) ON DELETE SET NULL;




`after employee table was created, we can now state that employee's table super_id is a foreign key that will reference the employees table emp_id`

`if the emp_id from employee is deleted, the the super_id is set to null`


    ALTER TABLE employee
    ADD FOREIGN KEY(super_id) REFERENCES employee(emp_id) ON DELETE SET NULL;

`ON DELETE SET NULL is used for non primary key attributes, need to use ON DELETE CASCADE for primary keys`

`makes this branch_id in the client table reference the branch table and its branch_id`
`(on delete set null: if the branch_id from branch table is deleted, the branch_id in client is set to null)`

    CREATE TABLE client (
      client_id INT PRIMARY KEY,
      client_name VARCHAR(40),
      branch_id INT,
      ON DELETE SET NULL
      FOREIGN KEY(branch_id) REFERENCES branch(branch_id) 
    );


`ON DELETE CASCADE`

`example: if the emp_id from employee is deleted, the emp_id from works_with row is deleted entirely`

`example: if the client_id from client is deleted, the client_id from works_with row is deleted entirely`

    CREATE TABLE works_with (
      emp_id INT,
      client_id INT,
      total_sales INT,
      PRIMARY KEY(emp_id, client_id),
      FOREIGN KEY(emp_id) REFERENCES employee(emp_id) ON DELETE CASCADE,
      FOREIGN KEY(client_id) REFERENCES client(client_id) ON DELETE CASCADE
    );

    CREATE TABLE branch_supplier (
      branch_id INT,
      supplier_name VARCHAR(40),
      supply_type VARCHAR(40),
      PRIMARY KEY(branch_id, supplier_name),
      FOREIGN KEY(branch_id) REFERENCES branch(branch_id) ON DELETE CASCADE
    );


-----

-- CORPORATE
-- values are set to null first because the values from branch have not been created yet.
-- (emp_id, first_name, last_name, birth_date, sex, salary, super_id, branch_id)
  INSERT INTO employee VALUES(100, 'David', 'Wallace', '1967-11-17', 'M', 250000, NULL, NULL);

  -- create the corporate branch here to be able to add to David Wallace;
  -- (branch_id, branch_name, mgr_id (ref: employees--emp_id), mgr_start_date)
  INSERT INTO branch VALUES(1, 'Corporate', 100, '2006-02-09');

  -- adds David Wallace's branch_id now that corporate branch has been created 
  UPDATE employee
  SET branch_id = 1
  WHERE emp_id = 100;

  -- adds Jan
  -- (emp_id, first_name, last_name, birth_date, sex, salary, super_id, branch_id)
  INSERT INTO employee VALUES(101, 'Jan', 'Levinson', '1961-05-11', 'F', 110000, 100, 1);



-- Scranton
-- (emp_id, first_name, last_name, birth_date, sex, salary, super_id, branch_id)
INSERT INTO employee VALUES(102, 'Michael', 'Scott', '1964-03-15', 'M', 75000, 100, NULL);

INSERT INTO branch VALUES(2, 'Scranton', 102, '1992-04-06');

UPDATE employee
SET branch_id = 2
WHERE emp_id = 102;

-- (emp_id, first_name, last_name, birth_date, sex, salary, super_id, branch_id)
INSERT INTO employee VALUES(103, 'Angela', 'Martin', '1971-06-25', 'F', 63000, 102, 2);
INSERT INTO employee VALUES(104, 'Kelly', 'Kapoor', '1980-02-05', 'F', 55000, 102, 2);
INSERT INTO employee VALUES(105, 'Stanley', 'Hudson', '1958-02-19', 'M', 69000, 102, 2);

-- Stamford

-- (emp_id, first_name, last_name, birth_date, sex, salary, super_id, branch_id)
INSERT INTO employee VALUES(106, 'Josh', 'Porter', '1969-09-05', 'M', 78000, 100, NULL);

INSERT INTO branch VALUES(3, 'Stamford', 106, '1998-02-13');

UPDATE employee
SET branch_id = 3
WHERE emp_id = 106;

-- (emp_id, first_name, last_name, birth_date, sex, salary, super_id, branch_id)
INSERT INTO employee VALUES(107, 'Andy', 'Bernard', '1973-07-22', 'M', 65000, 106, 3);
INSERT INTO employee VALUES(108, 'Jim', 'Halpert', '1978-10-01', 'M', 71000, 106, 3);


-- BRANCH SUPPLIER

`branch_id (ref: branch(branch_id)), supplier_name, supply_type)`

      INSERT INTO branch_supplier VALUES(2, 'Hammer Mill', 'Paper');
      INSERT INTO branch_supplier VALUES(2, 'Uni-ball', 'Writing Utensils');
      INSERT INTO branch_supplier VALUES(3, 'Patriot Paper', 'Paper');
      INSERT INTO branch_supplier VALUES(2, 'J.T. Forms & Labels', 'Custom Forms');
      INSERT INTO branch_supplier VALUES(3, 'Uni-ball', 'Writing Utensils');
      INSERT INTO branch_supplier VALUES(3, 'Hammer Mill', 'Paper');
      INSERT INTO branch_supplier VALUES(3, 'Stamford Lables', 'Custom Forms');


-- CLIENT
      INSERT INTO client VALUES(400, 'Dunmore Highschool', 2);
      INSERT INTO client VALUES(401, 'Lackawana Country', 2);
      INSERT INTO client VALUES(402, 'FedEx', 3);
      INSERT INTO client VALUES(403, 'John Daly Law, LLC', 3);
      INSERT INTO client VALUES(404, 'Scranton Whitepages', 2);
      INSERT INTO client VALUES(405, 'Times Newspaper', 3);
      INSERT INTO client VALUES(406, 'FedEx', 2);

-- WORKS_WITH
      INSERT INTO works_with VALUES(105, 400, 55000);
      INSERT INTO works_with VALUES(102, 401, 267000);
      INSERT INTO works_with VALUES(108, 402, 22500);
      INSERT INTO works_with VALUES(107, 403, 5000);
      INSERT INTO works_with VALUES(108, 403, 12000);
      INSERT INTO works_with VALUES(105, 404, 33000);
      INSERT INTO works_with VALUES(107, 405, 26000);
      INSERT INTO works_with VALUES(102, 406, 15000);
      INSERT INTO works_with VALUES(105, 406, 130000);

      SELECT * FROM employee
      ORDER BY salary DESC; 

      SELECT first_name AS forename, last_name AS surname 
      FROM employee;

      SELECT DISTINCT sex FROM employee; 

-- find number of employees
      SELECT COUNT(emp_id) 
      FROM employee;


      SELECT * FROM employee
      WHERE sex = 'F' AND birth_day > '1970-01-01';

      SELECT COUNT(emp_id)
      FROM employee 
      WHERE sex = 'F' AND birth_day > '1970-01-01';

      SELECT AVG (salary)
      FROM employee
      WHERE branch_id = 2;

      SELECT SUM(salary)
      FROM employee;

      SELECT COUNT(sex), sex
      FROM employee
      GROUP BY sex;

      SELECT SUM(total_sales), emp_id
      FROM works_with
      GROUP by emp_id;

-- find clients who are an LLC
-- % = any # of characters before the '' OR ends with
-- _ = one character 

      SELECT *
      FROM client
      WHERE client_name LIKE '%LLC';   

-- find branch suppliers that are in the label business

      SELECT *
      FROM branch_supplier
      WHERE supplier_name LIKE '%labels%';

-- birthdays in october 

      SELECT * 
      FROM employee
      WHERE birth_day LIKE '____-10%';

-- find a list of employee and branch names
-- UNIONS have to have similar data types and columns to combine results

      SELECT first_name AS Indivuals
      FROM employee
      UNION
      SELECT branch_name 
      FROM branch
      UNION
      SELECT client_name
      FROM client; 

      SELECT salary FROM employee
      UNION
      SELECT total_sales FROM works_with;

      INSERT INTO branch VALUES(4, 'Buffalo', NULL, NULL);
      SELECT * FROM branch;

-- find a list of each branch and their managers
-- if you have a situation where two tables share the same information, you can use a join.
      SELECT employee.emp_id, employee.first_name, branch.branch_name
      FROM employee
-- inner join prints only employees that have shared row values
JOIN branch
      ON employee.emp_id = branch.mgr_id;


SELECT employee.emp_id, employee.first_name, branch.branch_name
FROM employee
-- all employees are included and row values that are not shared are NULL
LEFT JOIN branch
ON employee.emp_id = branch.mgr_id;


SELECT employee.emp_id, employee.first_name, branch.branch_name
FROM employee
-- all employees are included and row values that are not shared are NULL
RIGHT JOIN branch
ON employee.emp_id = branch.mgr_id;

-- full outer join cannot be done in MYSQL, all employees and all branches.


-- NESTED QUERIES:

-- find names of all employees who have sold over 30,000 to a client
SELECT employee.first_name,  works_with.client_id, works_with.total_sales
FROM employee
JOIN works_with
ON employee.emp_id = works_with.emp_id
WHERE total_sales > 30000; 

-- OR use a nested query to do this ^^

SELECT employee.first_name, employee.last_name
FROM employee
WHERE employee.emp_id IN (
	SELECT works_with.emp_id
    FROM works_with
    WHERE works_with.total_sales > 30000
);

SELECT COUNT(employee.emp_id)
FROM employee
WHERE employee.emp_id IN (
	SELECT works_with.emp_id
    FROM works_with
    WHERE works_with.total_sales > 30000
);

-- find all clients who are handled by the branch that Michael manages, assume you know his emp ID
SELECT client.client_id, client.client_name
FROM client
WHERE client.branch_id IN (
	SELECT branch.branch_id 
    FROM branch
    WHERE branch.mgr_id = 102
);

-- tables are not necessary for triggers
CREATE TABLE trigger_test (
	message VARCHAR(100),
    input VARCHAR(100)
);

-- delimiters are keys that delimit the end of the code you've written
-- delimiter is changed to $$ because we are writing a line of code that needs to delimit with a ; 
-- plug this into terminal instead
DELIMITER $$
CREATE
	TRIGGER my_trigger BEFORE INSERT
    ON employee 
    FOR EACH ROW BEGIN
		INSERT INTO trigger_test VALUES('added new employee');
	END$$
DELIMITER ; 
-- (emp_id, first_name, last_name, birth_date, sex, salary, super_id, branch_id)
INSERT INTO employee VALUES(109, 'Oscar', 'Martinez', '1968-02-19', 'M', 69000, 106, 3);


-- new delimiter
DELIMITER $$
CREATE
	TRIGGER name_trigger BEFORE INSERT
    ON employee 
    FOR EACH ROW BEGIN
		INSERT INTO trigger_test VALUES(NEW.first_name);
	END$$
DELIMITER ; 

INSERT INTO employee VALUES(110, 'Kevin', 'Malone', '1978-02-19', 'M', 69000, 106, 3);


-- new delimiter
DELIMITER $$
CREATE
	TRIGGER sex_trigger BEFORE INSERT
    ON employee 
    FOR EACH ROW BEGIN
		IF NEW.sex = 'M' THEN
			INSERT INTO trigger_test VALUES('added male employee', NEW.first_name);
		ELSEIF NEW.sex = 'F' THEN
			INSERT INTO trigger_test VALUES('added female employee', NEW.first_name);
		ELSE
			INSERT INTO trigger_test VALUES('added employee with undetermined sex', NEW.first_name);
		END IF;
	END$$
DELIMITER ; 

INSERT INTO employee VALUES(111, 'Pam', 'Beasely', '1988-02-19', 'F', 69000, 106, 3);

SELECT * FROM trigger_test;

INSERT INTO employee VALUES(112, 'Magdalena', 'Perry', '1994-02-19', 'F', 69000, 106, 3);

-- new delimiter
DELIMITER $$
CREATE
	TRIGGER sex_trigger AFTER DELETE
    ON employee 
    FOR EACH ROW BEGIN
		IF NEW.sex = 'M' THEN
			INSERT INTO trigger_test VALUES('added male employee', NEW.first_name);
		ELSEIF NEW.sex = 'F' THEN
			INSERT INTO trigger_test VALUES('added female employee', NEW.first_name);
		ELSE
			INSERT INTO trigger_test VALUES('added employee with undetermined sex', NEW.first_name);
		END IF;
	END$$
DELIMITER ; 

SELECT * FROM employee;


INSERT INTO employee VALUES(110, 'Angela', 'Martin', '1971-06-25', 'F', 63000, 102, 2);
INSERT INTO employee VALUES(111, 'Kelly', 'Kapoor', '1980-02-05', 'F', 55000, 102, 2);
INSERT INTO employee VALUES(112, 'Stanley', 'Hudson', '1958-02-19', 'M', 69000, 102, 2);


/* write your SQL query below */



SELECT FirstName, LastName, ReportsTo, Position, Age 
FROM maintable_SB9NH
WHERE ReportsTo IS NULL OR ReportsTo = "Jenny Richards"
ORDER BY Age

;
