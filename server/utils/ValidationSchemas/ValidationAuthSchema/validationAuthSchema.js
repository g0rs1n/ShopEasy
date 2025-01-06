
export const validationRegistrationSchema = {
    name: {
        in: ['body'],
        exists: {
            errorMessage: 'Field is required'
        },
        notEmpty:{
            errorMessage: 'Name is required'
        },
        isString: {
            errorMessage: 'Name must be a string'
        },
    }, 
    email: {
        in: ['body'],
        exists: {
            errorMessage: 'Field is required'
        },
        isEmail: true,
        notEmpty:{
            errorMessage: 'Email is required'
        },
        isString: {
            errorMessage: 'Email must be a string'
        },
    },
    password: {
        in: ['body'],
        exists: {
            errorMessage: 'Field is required'
        },
        notEmpty:{
            errorMessage: 'Password is required'
        },
        isString: {
            errorMessage: 'Password must be a string'
        },
    }
}

export const validationAuthorizationSchema = {
    email: {
        in: ['body'],
        exists: {
            errorMessage: 'Field is required'
        },
        isEmail: true,
        notEmpty:{
            errorMessage: 'Email is required'
        },
        isString: {
            errorMessage: 'Email must be a string'
        },
    },
    password: {
        in: ['body'],
        exists: {
            errorMessage: 'Field is required'
        },
        notEmpty:{
            errorMessage: 'Password is required'
        },
        isString: {
            errorMessage: 'Password must be a string'
        },
    }
}