export const MSG_AUTH = {
    PASSWORD_LENGTH: 'Password must be at least 8 characters long',
    REQUIRED: (param: string) => `${param} is required`,
    INCORRECT: (param: string) => `Incorrect ${param}`,
    REGISTERED_SUCCESS: (email: string) => `You registered successfully with email: ${email}`,
};
