
export const validationUpdateSchema = {
    name: {
        in: ['body'],
        optional: true,
        custom: {
            options: (value) => value === null || typeof value === 'string',
            errorMessage: 'Name must be null or a string',
        },
    },
    email: {
        in: ['body'],
        optional: true,
        custom: {
            options: (value) => value === null || typeof value === 'string',
            errorMessage: 'Email must be null or a string',
        },
        isEmail: {
            errorMessage: 'Invalid email format',
        },
    },
    phone: {
        in: ['body'],
        optional: true,
        custom: {
            options: (value) => value === null || typeof value === 'string',
            errorMessage: 'Phone must be null or a string',
        },
    },
};
