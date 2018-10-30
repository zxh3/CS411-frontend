CREATE TABLE restaurant (
    name VARCHAR(255) PRIMARY KEY,
    type VARCHAR(255),
    address VARCHAR(255),
    phoneNumber VARCHAR(255)
);

CREATE TABLE dish (
    name VARCHAR(255) PRIMARY KEY
);

CREATE TABLE ingredient (
    name VARCHAR(255) PRIMARY KEY
);

CREATE TABLE dishIngredient (
    dishName VARCHAR(255),
    ingredientName VARCHAR(255),
    PRIMARY KEY (dishName, ingredientName),
    FOREIGN KEY (dishName) REFERENCES dish (name) ON DELETE CASCADE,
    FOREIGN KEY (ingredientName) REFERENCES ingredient (name) ON DELETE CASCADE
);

CREATE TABLE dishRestaurant (
    dishName VARCHAR(255),
    restaurantName VARCHAR(255),
    PRIMARY KEY (dishName, restaurantName),
    FOREIGN KEY (dishName) REFERENCES dish (name) ON DELETE CASCADE,
    FOREIGN KEY (restaurantName) REFERENCES restaurant (name) ON DELETE CASCADE
);

INSERT INTO restaurant VALUES 
('Cravings', 'Chinese', '603 S Wright St Champaign, IL', '217-328-2538'),
('Lai Lai Wok', 'Chinese', '402 E Green St Champaign, IL', '217-328-1888'),
('Chipotle Mexican Grill', 'Mexican', '528 E Green St Champaign, IL', '217-344-0466');

INSERT INTO dish VALUES
('burrito'),
('burrito bowl'),
('salad'),
('tacos'),
('mapo tofu'),
('house fried rice'),
('orange chicken'),
('crispy shrimp');

INSERT INTO ingredient VALUES
('chicken'),
('rice'),
('egg'),
('tofu'),
('shrimp'),
('steak'),
('beef'),
('tomato'),
('corn'),
('red chili');

INSERT INTO dishIngredient VALUES
('burrito', 'chicken'),
('burrito', 'steak'),
('burrito', 'tomato'),
('burrito', 'corn'),
('burrito bowl', 'chicken'),
('burrito bowl', 'steak'),
('burrito bowl', 'tomato'),
('burrito bowl', 'corn'),
('salad', 'chicken'),
('salad', 'steak'),
('salad', 'tomato'),
('salad', 'corn'),
('tacos', 'chicken'),
('tacos', 'steak'),
('tacos', 'tomato'),
('tacos', 'corn'),
('mapo tofu', 'tofu'),
('mapo tofu', 'red chili'),
('mapo tofu', 'beef'),
('house fried rice', 'rice'),
('house fried rice', 'egg'),
('orange chicken', 'chicken'),
('crispy shrimp', 'shrimp');

INSERT INTO dishRestaurant VALUES
('burrito', 'Chipotle Mexican Grill'),
('burrito bowl', 'Chipotle Mexican Grill'),
('salad', 'Chipotle Mexican Grill'),
('tacos', 'Chipotle Mexican Grill'),
('mapo tofu', 'Lai Lai Wok'),
('house fried rice', 'Lai Lai Wok'),
('orange chicken', 'Lai Lai Wok'),
('mapo tofu', 'Cravings'),
('house fried rice', 'Cravings'),
('orange chicken', 'Cravings'),
('crispy shrimp', 'Cravings');
