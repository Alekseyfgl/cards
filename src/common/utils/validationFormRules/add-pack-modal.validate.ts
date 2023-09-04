import { MSG_PACK } from '../constans/app-messages.const';

export const addPackValidate = {
    required: MSG_PACK.REQUIRED,
    minLength: {
        value: 3,
        message: MSG_PACK.TITLE_LENGTH,
    },
};
