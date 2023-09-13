import { MSG_LEARN } from '../../../../common/utils/constans/app-messages.const';

export const accurateAnswers = [
    {
        text: MSG_LEARN.CORRECT_ANSWER,
        value: 5,
    },
    {
        text: MSG_LEARN.ALMOST_RIGHT,
        value: 4,
    },
    {
        text: MSG_LEARN.HALF_CORRECT,
        value: 3,
    },
    {
        text: MSG_LEARN.GUESSED_ANSWER,
        value: 2,
    },
    {
        text: MSG_LEARN.INCORRECT_ANSWER,
        value: 1,
    },
] as const;
