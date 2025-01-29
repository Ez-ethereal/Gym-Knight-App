CREATE TABLE workouts (
    workout_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL
);

-- REFERENCES creates a foreign key relationship - every value in this column must match a user_id in the users database
-- ON DELETE CASCADE means that when a user is deleted, all corresponding workouts will be automatically cleaned up as well
