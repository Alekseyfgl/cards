import { MSG_AUTH } from '../constans/constans';

export const emailValidate = {
    required: MSG_AUTH.REQUIRED('Email'),
    pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: MSG_AUTH.INCORRECT('email'),
    },
} as const;
