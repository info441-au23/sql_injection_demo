import sqlite3 from 'sqlite3'
import { open } from 'sqlite'


let db;

export async function getDb() {
	if(!db) {
        db = await open({
          filename: ':memory:',
          driver: sqlite3.Database
        });

        await initializeDb();
    }
    
    return db;
}

async function initializeDb() {
    await db.exec('CREATE TABLE people(first_name text, last_name text)');
    await db.exec(`INSERT INTO people(first_name, last_name)
              VALUES ("James", "Bond"),
                     ("Jason", "Bourne"),
                     ("George", "Smiley"),
                     ("Austin", "Powers"),
			         ("Jack", "Bauer"),
                     ("Jack", "Ryan"),
                     ("Ethan", "Hunt")
        
        `)
    
    await db.exec('CREATE TABLE secret_table(message text)')
    await db.exec(`INSERT INTO secret_table(message)
              VALUES ('The password for James Bond is: l2k007'),
                     ('This is the super secret NOC list you are not supposed to see'),
                     ('Bonus, not in the class demo, the full source code for assignment 3')
         
        `)
}
