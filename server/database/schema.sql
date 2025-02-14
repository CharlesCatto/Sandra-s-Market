

-- Create the user table
CREATE TABLE user (
  id INT unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  profile_picture VARCHAR(255),
  firstname VARCHAR(255),
  lastname VARCHAR(255),
  birthdate DATE,
  phone_number VARCHAR(20),
  sold INT DEFAULT 0,
  is_admin BOOLEAN DEFAULT FALSE
);

-- Create the christmas_market table
CREATE TABLE christmas_market (
  id INT unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  location POINT NOT NULL,
  address VARCHAR(255) NOT NULL,
  number_of_exponents INT NOT NULL,
  number_of_craftsmen INT NOT NULL,
  place_type ENUM('church', 'main_square', 'sport_hall', 'other') NOT NULL,
  animation_type JSON,
  animals_forbidden BOOLEAN DEFAULT FALSE,
  exposition BOOLEAN DEFAULT FALSE,
  restauration ENUM('food', 'drink', 'both', 'none') DEFAULT 'none',
  santa_present BOOLEAN DEFAULT FALSE,
  usual_days JSON,
  user_id INT unsigned NOT NULL,
  FOREIGN KEY(user_id) REFERENCES user(id),
  SPATIAL INDEX(location)
);

-- Insert sample users
INSERT INTO user (id, username, email, password, profile_picture, firstname, lastname, birthdate, phone_number, sold, is_admin) VALUES 
(1, 'admin', 'admin@vroom.com', '$argon2id$v=19$m=65536,t=3,p=4$DDXkvDxw3PNiSIg8/cn67g$m/GhPrYzwGOUidcSPJ8XnmB0OUHAw9quzdMDyJIT30Y', 'person_15439869.png', 'admin', 'admin', '1990-01-01', '+33601020304', 100, true),
(2, 'Aldup', 'alice@example.com', '$argon2id$v=19$m=65536,t=3,p=4$DDXkvDxw3PNiSIg8/cn67g$m/GhPrYzwGOUidcSPJ8XnmB0OUHAw9quzdMDyJIT30Y', 'person_15439869.png', 'Alice', 'Dupont', '2001-01-01', '+33601020304', 2, false),
(3, 'The B', 'bob@example.com', '$argon2id$v=19$m=65536,t=3,p=4$DDXkvDxw3PNiSIg8/cn67g$m/GhPrYzwGOUidcSPJ8XnmB0OUHAw9quzdMDyJIT30Y', 'person_15439869.png', 'Bob', 'Martin', '2001-01-01', '+33601020311', 1, false);

-- Insert sample Christmas markets
INSERT INTO christmas_market (
  name, location, address, number_of_exponents, number_of_craftsmen, place_type, animation_type, animals_forbidden, exposition, santa_present, restauration, usual_days, user_id
) VALUES 
(
  'Marché de Noël de Strasbourg', 
  POINT(48.583148, 7.747882), 
  'Place de la Cathédrale, 67000 Strasbourg', 
  300, 
  150, 
  'main_square', 
  '["food", "music", "parade"]', 
  FALSE, 
  TRUE, 
  TRUE, 
  'both', 
  '["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]', 
  1
),
(
  'Marché de Noël de Colmar', 
  POINT(48.079358, 7.358512), 
  'Place des Dominicains, 68000 Colmar', 
  200, 
  100, 
  'church', 
  '["food", "music"]', 
  TRUE, 
  FALSE, 
  TRUE, 
  'food', 
  '["Friday", "Saturday", "Sunday"]', 
  2
);