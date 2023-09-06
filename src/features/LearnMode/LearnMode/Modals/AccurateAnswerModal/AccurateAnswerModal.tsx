import * as React from 'react';
import { FC, useState } from 'react';
import { FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import { BasicModal } from '../../../../../common/components/GlobalModal/GlobalModal';
import MenuItem from '@mui/material/MenuItem';
import s from './styles.module.scss';
import { SendRequestButton } from '../../../../../common/components/ButtonSendRequest/SendRequestButton';

interface AccurateAnswerModal {
    inOpen: boolean;
    closeModal: () => void;
    isSentRequest: boolean;
}

export const AccurateAnswerModal: FC<AccurateAnswerModal> = (props) => {
    const { inOpen, isSentRequest, closeModal } = props;
    const [grade, setGrade] = useState(5);

    const handleChange = (event: SelectChangeEvent) => {
        setGrade(+event.target.value);
    };

    return (
        <BasicModal width={'360px'} isOpen={inOpen} title={'Choose a more accurate answer'} commonHandleClose={closeModal}>
            <form onSubmit={() => {}}>
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="demo-simple-select-autowidth-label">rate your answer</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={grade.toString()}
                        onChange={handleChange}
                        autoWidth
                        label="Rate your answer"
                    >
                        <MenuItem value={5}>Correct answer</MenuItem>
                        <MenuItem value={4}>I was almost right</MenuItem>
                        <MenuItem value={3}>Half correct answer</MenuItem>
                        <MenuItem value={2}>Guessed the answer :)</MenuItem>
                        <MenuItem value={1}>Incorrect answer :(</MenuItem>
                    </Select>
                </FormControl>
                <div className={s.btns}>
                    <SendRequestButton isSentRequest={isSentRequest} disabled={!!isSentRequest}>
                        Send answer
                    </SendRequestButton>
                </div>
            </form>
        </BasicModal>
    );
};
