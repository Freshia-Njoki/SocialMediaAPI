import sql from 'mssql';
import config from '../db/config.js';

//get all comments
export const getComments = async (req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request ()
        .query('SELECT * FROM Comments')
        res.status(200).json(result.recordset);
        
    } catch (error) {
        res.status(400).json({error});
        
    } finally {
        sql.close();
    }
};

//get one Comment

export const getComment = async (req, res) => {
    try {
        const { comment_id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
        .input("comment_id", sql.Int, comment_id)
            .query('SELECT * FROM Comments WHERE comment_id  = @comment_id');
            !result.recordset[0] ? res.status(400).json({ message : 'unable to get the Comments'}) : res.status(200).json(result.recordset);

    } catch (error) {
        res.status(400).json({ error })
        
    } finally {
        sql.close();
    }
};

//delete a Comment
export const deleteComment = async (req, res) => {
    try {
        const { comment_id } = req.params;
        let pool = await sql.connect(config.sql);
        await pool.request()
        .input("comment_id", sql.Int, comment_id)
        .query('DELETE FROM Comments WHERE comment_id = @comment_id')
        res.status(200).json({message : "deleted a comment successfully"})
    } catch (error) {
        res.status(400).json({ error })
        
    } finally {
        sql.close();
    }
};

//update a Comment
export const updateComment = async (req, res) => {
    try {
        const { comment_id } = req.params;
        const { content} = req.body
        let pool = await sql.connect(config.sql);
        await pool.request ()
        .input('comment_id', sql.Int, comment_id)
        .input('content', sql.VarChar, content)
        .query('UPDATE Comments SET content = @content WHERE comment_id = @comment_id');
        res.status(200).json({ message : "updated a Comment successfully"})
    } catch (error) {
        res.status(400).json({ error });
        
    } finally {
        sql.close()
    }
        
};

//adding a Comment

export const addComment = async (req, res) => {
    try {
        const { comment_id, content, post_id, user_id} = req. body;
        let pool = await sql.connect(config.sql);
        await pool.request()
        .input('comment_id', sql.Int, comment_id)
        .input('content', sql.VarChar, content)
        .input('post_id', sql.VarChar, post_id)
        .input('user_id', sql.VarChar, user_id)
        .query('INSERT INTO Comments (comment_id, content, post_id, user_id) VALUES (@comment_id, @content, @post_id, @user_id)');
        res.status(200).json({ message : "added a Comment successfully"})
        
    } catch (error) {
        res.status(400).json({ error })
        
    } finally{
        sql.close()
    }
};