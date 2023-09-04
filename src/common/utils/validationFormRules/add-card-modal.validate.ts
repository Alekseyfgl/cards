import { MSG_CARD } from '../constans/app-messages.const';

export const addQuestionValidate = {
    required: MSG_CARD.REQUIRED_QUESTION,
    minLength: {
        value: 3,
        message: MSG_CARD.TITLE_LENGTH,
    },
};
export const addAnswerValidate = {
    required: MSG_CARD.REQUIRED_ANSWER,
    minLength: {
        value: 3,
        message: MSG_CARD.TITLE_LENGTH,
    },
};
