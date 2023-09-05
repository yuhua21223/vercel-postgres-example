// Import the `db` object from '@vercel/postgres' package, which helps in interacting with a PostgreSQL database.
import { db } from '@vercel/postgres';

export default async function handler(request, response) {
  const client = await db.connect();
  
  try {
    // Create the Pets and Girls tables if they don't exist
    await client.sql`CREATE TABLE IF NOT EXISTS Pets ( Name varchar(255), Owner varchar(255) );`;
    await client.sql`CREATE TABLE IF NOT EXISTS Girls ( Name varchar(255), Owner varchar(255) );`;
    await client.sql`CREATE TABLE IF NOT EXISTS Boys ( BoyName varchar(255), BoyOwner varchar(255) );`;
    
    // Initialize arrays with sample names
    const names = ['Fiona', 'Lucy'];
    const girlNames = ['anh', 'yuri', 'sj'];
    const boyNames = ['Gavin', 'Yuhua'];
    
    // Insert sample data into the Pets and Girls tables
    await client.sql`INSERT INTO Pets (Name, Owner) VALUES (${names[0]}, ${names[1]});`;
    await client.sql`INSERT INTO Girls (Name, Owner) VALUES (${girlNames[0]}, ${girlNames[2]});`;
    await client.sql`INSERT INTO Boys (BoyName, BoyOwner) VALUES (${boyNames[0]}, ${boyNames[1]});`;
    
    await client.sql`DELETE FROM Pets;`;
    await client.sql`DELETE FROM Girls;`;
    await client.sql`DELETE FROM Boys;`;

  } catch (error) {
    // Handle errors by returning a 500 status code and the error message
    return response.status(500).json({ error });
  }
  
  // Fetch all rows from the Pets and Girls tables
  const pets = await client.sql`SELECT * FROM Pets;`;
  const girls = await client.sql`SELECT * FROM Girls;`;
  const boys = await client.sql`SELECT * FROM Boys;`;
  
  // Return a 200 OK status code and the fetched rows in the response
  return response.status(200).json({ pets: pets.rows, girls: girls.rows, boys: boys.rows });
}
