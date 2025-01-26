CREATE TABLE users (
    id SERIAL PRIMARY KEY,                  
    first_name VARCHAR(100) NOT NULL,         
    last_name VARCHAR(100) NOT NULL,          
    email VARCHAR(255) UNIQUE NOT NULL,       
    password VARCHAR(255) NOT NULL,           
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,         
    role VARCHAR(50) DEFAULT 'user',  
    last_login TIMESTAMP,                   
    profile_picture_url TEXT    
);
