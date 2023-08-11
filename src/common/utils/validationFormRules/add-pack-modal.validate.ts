import { MSG_ADD_PACK } from '../constans/app-messages.const';

export const addPackValidate = {
    required: MSG_ADD_PACK.REQUIRED,
    minLength: {
        value: 3,
        message: MSG_ADD_PACK.TITLE_LENGTH,
    },
};
