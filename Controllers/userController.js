import sql from 'mssql';
import config from '../db/config.js';


//get all users
export const getUsers = async (req, res) => {
    try {
        let pool = await sql.connect(config.sql)
        const result = await pool.request().query("SELECT * FROM Users")
        !result.recordset[0] ? res.status(404).json({ message : 'user not found' }) : //check if exist and display a mssg(fixed show blank)
        res.status(200).json(result.recordset);
        
    } catch (error) {
        res.status(201).json({ error})
        
    } finally {
        sql.close()
    }
}
 //get 1 user
export const getUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
        .input("id", sql.Int, user_id)
            .query("select * from Users where user_id = @id");
        // !result.recordset[0] ? res.status(404).json({ message: 'user not found' }) :
            // res.status(200).json(result.recordset);
            if (!result.recordset[0]) {
                res.status(404).json({ error});
              } else {
                const user = result.recordset[0];
                res.status(200).json(user);
              }
    } catch (error) {
        res.status(500).json({ error });
        
    } finally {
        sql.close()
    }
}
    
// // Delete a user
export const deleteUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        await sql.connect(config.sql);
        await sql.query`DELETE FROM Users WHERE user_id = ${user_id}`;
        res.status(200).json({ message: 'Removed a user successfully' });
    } catch (error) {
        res.status(500).json({ error });
    } finally {
        sql.close();
    }
};

// // Update a user
export const updateUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { username } = req.body;
        let pool = await sql.connect(config.sql);
        await pool.request()
            .input("userId", sql.Int, user_id)
            .input("username", sql.VarChar, username)
            // .input("email", sql.VarChar, email)
            // .input("password", sql.VarChar, password)
            .query("UPDATE Users SET username = @username WHERE user_id = @userId");
        res.status(200).json({ message: 'Username updated successfully' });
    } catch (error) {
        res.status(500).json({ error });
    } finally {
        sql.close();
    }
};

//adding a new user
export const createUsers = async (req, res) => {
    try {
        const { user_id, username, email, password } = req.body;
        let pool = await sql.connect(config.sql);
        let insertTodo = await pool.request()
            .input("user_id", sql.Int, user_id) 
            .input("username", sql.VarChar, username) 
            .input("email", sql.VarChar, email) 
            .input("password", sql.VarChar, password) 
            .query("insert into Users (user_id, username, email, password ) values (@user_id, @username, @email, @password)"); 
        res.status(201).json({ message: 'user added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the todo' });
    } finally {
        sql.close();   // Close the SQL connection
    }
};