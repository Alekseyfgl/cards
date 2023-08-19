export const MSG_AUTH = {
    PASSWORD_LENGTH: 'Password must be at least 8 characters long',
    REQUIRED: (param: string) => `${param} is required`,
    INCORRECT: (param: string) => `Incorrect ${param}`,
    REGISTERED_SUCCESS: (email: string) => `You registered successfully with email: ${email}`,
};

export const MSG_PACK = {
    REQUIRED: 'Fill in title',
    TITLE_LENGTH: 'Title must be at least 3 characters long',
    REMOVE_PACK: 'Do you want to remove this pack?',
    CHANGE_TITLE: 'Write new title of pack',
};
