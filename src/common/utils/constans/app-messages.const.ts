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

export const MSG_CARD = {
    REMOVE_CARD: 'Do you want to remove this card?',
    REQUIRED_QUESTION: 'Fill in question',
    REQUIRED_ANSWER: 'Fill in answer',
    ADD_CARD: 'Write the name of the question and the answer to it if you want to add a card',
    TITLE_LENGTH: 'Title must be at least 3 characters long',
};
