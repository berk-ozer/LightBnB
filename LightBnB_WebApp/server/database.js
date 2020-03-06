const properties = require('./json/properties.json');
const users = require('./json/users.json');

const db = require('./db/index');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const queryString = `
    SELECT *
    FROM users
    WHERE email = $1
  `;
  const values = [email];

  return db.query(queryString, values)
    .then(res => res.rows[0] || null)
    .catch(err => err);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryString = `
    SELECT *
    FROM users
    WHERE id = $1
  `;
  const values = [id];

  return db.query(queryString, values)
    .then(res => res.rows[0] || null)
    .catch(err => err);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const queryString = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [user.name, user.email, user.password]

  return db.query(queryString, values)
    .then(res => res.rows[0])
    .catch(err => err);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `
  SELECT reservations.*, properties.*, AVG(property_reviews.rating) as average_rating
  FROM properties
  JOIN reservations ON properties.id = reservations.property_id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.end_date < now()::date
  AND reservations.guest_id = $1
  GROUP BY properties.id, reservations.id
  ORDER BY start_date
  LIMIT $2;
  `;
  const values = [guest_id, limit];

  return db.query(queryString, values)
    .then(res => res.rows)
    .catch(err => err);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  let queryString = `
    SELECT properties.*, AVG(property_reviews.rating) as average_rating
    FROM properties
    LEFT JOIN property_reviews ON property_id = properties.id
  `;

  const [whereClauses, queryParams] = generateWhereClauses(options);

  if (queryParams.length) {queryString += 'WHERE '};

  queryString += whereClauses;
  queryString += `
  GROUP BY properties.id
  `;

  if (options.minimum_rating) {
    queryParams.push(Number(options.minimum_rating));
    queryString += `HAVING AVG(property_reviews.rating) >= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString += `
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
  `;
  
  return db.query(queryString, queryParams)
    .then(res => res.rows)
    .catch(err => err);
}
exports.getAllProperties = getAllProperties;

// Returns where clauses as a string, query parameters as array
const generateWhereClauses = options => {
  const clauses = [];
  const queryParams = [];

  for (const option in options) {

    if (options[option] !== '' && option !== 'minimum_rating') {
  
      if (option === 'city') {
        clauses.push(`city ILIKE $${queryParams.length + 1}`);
        queryParams.push(`%${options[option]}%`);
        continue;
      }
      
      if (option === 'owner_id') {
        clauses.push(`owner_id = $${queryParams.length + 1}`);
        queryParams.push(Number(options[option]));
        continue;
      }
      
      if (option === 'minimum_price_per_night') {
        clauses.push(`cost_per_night >= $${queryParams.length + 1}`);
      }

      if (option === 'maximum_price_per_night') {
        clauses.push(`cost_per_night <= $${queryParams.length + 1}`);
      }

      queryParams.push(Number(options[option] * 100));
    }

  }

  return [`${clauses.join(' AND ')}`, queryParams];
}

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const queryString = `
  INSERT INTO properties (title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, province, city, country, street, post_code) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;
  `;
  const queryParams = [property.title, property.description, property.owner_id, property.cover_photo_url, property.thumbnail_photo_url, property.cost_per_night, Number(property.parking_spaces), Number(property.number_of_bathrooms), Number(property.number_of_bedrooms), property.province, property.city, property.country, property.street, property.post_code]

  return db.query(queryString, queryParams) 
    .then(res => res.rows[0])
    .catch(err => err);
}
exports.addProperty = addProperty;
