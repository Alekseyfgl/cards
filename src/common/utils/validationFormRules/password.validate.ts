import { MSG_AUTH } from '../constans/constans';

const MIN_LENGTH = 8;

export const passwordValidate = {
    required: MSG_AUTH.REQUIRED('Password'),
    minLength: {
        value: MIN_LENGTH,
        message: MSG_AUTH.PASSWORD_LENGTH,
    },
} as const;

export const confirmPasswordValidate = {
    required: MSG_AUTH.REQUIRED('Confirm Password'),
    minLength: {
        value: MIN_LENGTH,
        message: MSG_AUTH.PASSWORD_LENGTH,
    },
    validate: (value: string, values: any) => value === values.password || 'Passwords do not match',
} as const;
