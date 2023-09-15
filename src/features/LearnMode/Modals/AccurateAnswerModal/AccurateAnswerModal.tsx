import * as React from 'react';
import { FC } from 'react';
import { FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import s from './styles.module.scss';
import { SendRequestButton } from '../../../../common/components/ButtonSendRequest/SendRequestButton';
import { BasicModal } from 'common/components/GlobalModal/GlobalModal';
import { useForm } from 'react-hook-form';
import { GradeTypes, LearnDto } from '../../learn.interfaces';
import { learnThunks } from '../../learn-mode.slice';
import { useAppDispatch } from '../../../../app/hooks';
import { addAnswerValidate } from '../../../../common/utils/validationFormRules/add-card-modal.validate';
import { MSG_BTN, MSG_LEARN } from '../../../../common/utils/constans/app-messages.const';
import { accurateAnswers } from '../../utils/constans/common.consts';

interface AccurateAnswerModal {
    inOpen: boolean;
    setIsLoadingHandle: (value: boolean) => void;
    setActiveStepHandle: () => void;
    handleClose: () => void;
    isLoading: boolean;
    cardId: string;
}

export const AccurateAnswerModal: FC<AccurateAnswerModal> = (props) => {
    const { inOpen, isLoading, cardId, setIsLoadingHandle, handleClose, setActiveStepHandle } = props;
    const dispatch = useAppDispatch();

    const { register, handleSubmit, getValues, setValue } = useForm<LearnDto>({
        defaultValues: {
            card_id: cardId,
            grade: 5,
        },
    });

    const closeModal = () => {
        handleClose();
    };
    const handleChange = (event: SelectChangeEvent) => {
        const inputValue = +event.target.value as GradeTypes;
        setValue('grade', inputValue);
    };

    const sendAnswerHandler = (formValue: LearnDto) => {
        setIsLoadingHandle(true);
        dispatch(learnThunks.sendAnswerByCard({ dto: formValue, params: null, query: null })).finally(() => {
            setIsLoadingHandle(false);
            setActiveStepHandle();
            closeModal();
        });
    };

    const onSubmit = (formValue: LearnDto) => {
        sendAnswerHandler(formValue);
    };

    return (
        <BasicModal width={'360px'} isOpen={inOpen} title={MSG_LEARN.ACCURATE_ANSWER} commonHandleClose={closeModal}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl {...register('grade', addAnswerValidate)} disabled={isLoading} sx={{ width: '100%' }}>
                    <InputLabel id="demo-simple-select-autowidth-label">rate your answer</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={getValues().grade.toString()}
                        onChange={handleChange}
                        autoWidth
                        label="Rate your answer"
                    >
                        {accurateAnswers.map(({ text, value }, i) => (
                            <MenuItem key={i} value={value}>
                                {text}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div className={s.btns}>
                    <SendRequestButton isSentRequest={isLoading} disabled={isLoading}>
                        {MSG_BTN.SEND_ANSWER}
                    </SendRequestButton>
                </div>
            </form>
        </BasicModal>
    );
};
