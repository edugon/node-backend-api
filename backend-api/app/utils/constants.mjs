export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const REGEX = {
    password: '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{4,})',
    email: '^[^@]+@[^@]+\.[a-zA-Z]{2,}$'
}

export const MESSAGES = {
    required_field: 'this is required!',
    min_day: 'at least one day',
    max_week: 'no more than a week',
    max_day: 'no more than one day',
    invalid_pass: 'at least one uppercase or one number (min. 4 chars)',
    invalid_email: 'invalid email address',
    id_exists: 'id already exists',
    mongo_error: 'Mongo error :('
}

export const ENTITY = {
    shift: 'Shift',
    user: 'User',
    worker: 'Worker'
}

export const HTTP_CODE = {
    success: 200,
    bad_request: 400,
    not_found: 404,
    error: 500
}

export const ERROR = {
    bad_request: 'BadRequest',
    not_found: 'NotFoundError',
    validation: 'ValidationError',
    mongo: 'MongoError'
}