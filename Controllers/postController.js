import sql from 'mssql';
import config from '../db/config.js';

//get all posts
export const getPosts = async (req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
        .query('SELECT * FROM Posts')
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(400).json({error});
        
    } finally {
        sql.close();
    }
};

//get one post

export const getPost = async (req, res) => {
    try {
        const { post_id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
        .input("id", sql.Int, post_id)
            .query('SELECT * FROM Posts WHERE post_id  = @id');
            !result.recordset[0] ? res.status(400).json({ message : 'unable to get the post'}) : res.status(200).json(result.recordset);

    } catch (error) {
        res.status(400).json({ error })
        
    } finally {
        sql.close();
    }
};

//delete a post
export const deletePost = async (req, res) => {
    try {
        const { post_id } = req.params;
        let pool = await sql.connect(config.sql);
        await pool.request()
        .input("post_id", sql.Int, post_id)
        .query('DELETE FROM Posts WHERE post_id = @post_id')
        res.status(200).json({message : "deleted a post successfully"})
        
        
    } catch (error) {
        res.status(400).json({ error })
        
    } finally {
        sql.close();
    }
};

//update a post
export const updatePost = async (req, res) => {
    try {
        const { post_id } = req.params;
        const { title, content} = req.body
        let pool = await sql.connect(config.sql);
        await pool.request ()
        .input('post_Id', sql.Int, post_id)
        .input('title', sql.VarChar, title)
        .input('content', sql.VarChar, content)
        .query('UPDATE Posts SET title = @title, content = @content WHERE post_id = @post_Id');
        res.status(200).json({ message : "updated a post successfully"})
    } catch (error) {
        res.status(400).json({ error });
        
    } finally {
        sql.close()
    }
        
};


//adding a post

export const addPost = async (req, res) => {
    try {
        const { post_id, title, content, user_id } = req. body;
        let pool = await sql.connect(config.sql);
        await pool.request()
        .input('post_Id', sql.Int, post_id)
        .input('title', sql.VarChar, title)
        .input('content', sql.VarChar, content)
        .input('user_id', sql.VarChar, user_id)
        .query('INSERT INTO Posts (post_id, title, content, user_id) VALUES (@post_Id, @title, @content, @user_id)');
        res.status(200).json({ message : "added a post successfully"})
        
    } catch (error) {
        res.status(400).json({ error })
        
    } finally{
        sql.close()
    }
};