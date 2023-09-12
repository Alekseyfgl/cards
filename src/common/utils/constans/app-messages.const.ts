export const MSG_AUTH = {
    PASSWORD_LENGTH: 'Password must be at least 8 characters long',
    REQUIRED: (param: string) => `${param} is required`,
    INCORRECT: (param: string) => `Incorrect ${param}`,
    REGISTERED_SUCCESS: (email: string) => `You registered successfully with email: ${email}`,
};

export const MSG_BTN = {
    SAVE: 'Save',
    CANCEL: 'Cancel',
    BACK: 'Back',
    REMOVE: 'Remove',
    CRETE_NEW_CARD: 'Create new card',
    SING_IN: 'Sing in',
    SING_OUT: 'Sing out',
    REGISTRATION: 'Registration',
};

export const MSG_PACK = {
    REQUIRED: 'Fill in title',
    TITLE_LENGTH: 'Title must be at least 3 characters long',
    REMOVE_PACK: 'Do you want to remove this pack?',
    CHANGE_TITLE: 'Write new title of pack',
    PACKS_NOT_FOUND: "There aren't packs",
    ADD_NEW_PACK: 'Add new pack',
};

export const MSG_CARD = {
    REMOVE_CARD: 'Do you want to remove this card?',
    REQUIRED_QUESTION: 'Fill in question',
    REQUIRED_ANSWER: 'Fill in answer',
    ADD_CARD: 'Write the name of the question and the answer to it if you want to add a card',
    TITLE_LENGTH: 'Title must be at least 3 characters long',
    CARDS_NOT_FOUND: "There aren't cards",
};
