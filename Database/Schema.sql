
CREATE TABLE users(
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    description TEXT,
    company VARCHAR(50),
    mail_id VARCHAR(255) UNIQUE NOT NULL,
    phone_no VARCHAR(10) UNIQUE NOT NULL,
    profile_photo VARCHAR(500),
    role ENUM('Buyer', 'Seller', 'Admin'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE listings(
    listing_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    image VARCHAR(500) NOT NULL,
    price INT NOT NULL,
    description TEXT,
    Category ENUM('Organic Waste', 'Plastic Waste', 'E-Waste', 'Municipal Solid Waste', 'Industrial Waste', 'Agriculture Waste', 'Textile Waste', 'Medical Waste'),
    location VARCHAR(100),
    status ENUM('Active', 'Inactive'),
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Foreign Key (created_by) REFERENCES users(user_id)
);

CREATE TABLE transactions(
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    listing_id INT,
    seller_id INT,
    buyer_id INT,
    Foreign Key (listing_id) REFERENCES listings(listing_id),
    Foreign Key (seller_id) REFERENCES users(user_id),
    Foreign Key (buyer_id) REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
