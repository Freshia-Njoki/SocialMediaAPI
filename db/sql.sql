CREATE DATABASE Info;

CREATE TABLE Users(
	user_id INT PRIMARY KEY,
	username VARCHAR(255),
	email VARCHAR(255),
	password VARCHAR(255)
)

CREATE TABLE Posts(
	post_id INT PRIMARY KEY,
	title VARCHAR(255),
	content VARCHAR(255),
	user_id INT,
	CONSTRAINT FK_Posts_Users
		FOREIGN KEY (user_id)
		REFERENCES Users(user_id) ON DELETE CASCADE,
)

CREATE TABLE Comments(
	comment_id INT PRIMARY KEY,
	content VARCHAR(255),
	post_id INT,
	user_id INT,
	CONSTRAINT FK_Comments_Users
		FOREIGN KEY (user_id)
		REFERENCES Users(user_id) ON DELETE SET NULL,
		
	CONSTRAINT FK_Comments_Posts
		FOREIGN KEY (post_id)
		REFERENCES Posts(post_id)
);




-- Inserting values into the Users table
INSERT INTO Users (user_id, username, email, password)
VALUES
  (1, 'user1', 'user1@example.com', 'password1'),
  (2, 'user2', 'user2@example.com', 'password2'),
  (3, 'user3', 'user3@example.com', 'password3'),
  (4, 'user4', 'user4@example.com', 'password4'),
  (5, 'user5', 'user5@example.com', 'password5'),
  (6, 'user6', 'user6@example.com', 'password6'),
  (7, 'user7', 'user7@example.com', 'password7'),
  (8, 'user8', 'user8@example.com', 'password8'),
  (9, 'user9', 'user9@example.com', 'password9'),
  (10, 'user10', 'user10@example.com', 'password10');

-- Inserting values into the Posts table
INSERT INTO Posts (post_id, title, content, user_id)
VALUES
  (1, 'Post 1', 'Content of Post 1', 1),
  (2, 'Post 2', 'Content of Post 2', 1),
  (3, 'Post 3', 'Content of Post 3', 2),
  (4, 'Post 4', 'Content of Post 4', 3),
  (5, 'Post 5', 'Content of Post 5', 3),
  (6, 'Post 6', 'Content of Post 6', 4),
  (7, 'Post 7', 'Content of Post 7', 5),
  (8, 'Post 8', 'Content of Post 8', 6),
  (9, 'Post 9', 'Content of Post 9', 7),
  (10, 'Post 10', 'Content of Post 10', 8);

-- Inserting values into the Comments table
INSERT INTO Comments (comment_id, content, post_id, user_id)
VALUES
  (1, 'Comment 1', 1, 2),
  (2, 'Comment 2', 1, 3),
  (3, 'Comment 3', 2, 4),
  (4, 'Comment 4', 3, 1),
  (5, 'Comment 5', 4, 5),
  (6, 'Comment 6', 4, 6),
  (7, 'Comment 7', 5, 7),
  (8, 'Comment 8', 6, 9),
  (9, 'Comment 9', 7, 10),
  (10, 'Comment 10', 8, 3);
