import s from '../ListPacks/styles.module.scss';
import CustomSearch from '../../../common/components/CustomSearch/CustomSearch';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import React, { FC, memo } from 'react';
import { Nullable, Optional } from '../../../common/utils/optionalTypes/optional.types';
import { useAppSelector } from '../../../app/hooks';
import { RangeSlider } from '../../../common/components/SupperSlider/SupperSlider';

interface PackSettingsProps {
    accessory: string;
    searchValue: string;
    amountCards: number[];
    searchHandler: (searchValue: Nullable<string>) => void;
    accessoryHandler: (value: string) => void;
    setAmountCards: (amountCards: number[]) => void;
}

export const PackSettings: FC<PackSettingsProps> = (props) => {
    const { searchHandler, accessoryHandler, setAmountCards, accessory, amountCards, searchValue } = props;
    const myId: Optional<string> = useAppSelector((state) => state.auth!.profile!._id!);
    return (
        <div className={s.setting_panel}>
            <CustomSearch placeholder={'write text'} searchHandler={searchHandler} searchValue={searchValue} />

            <div>
                <p>Show pack cards</p>
                <ButtonGroup style={{ height: '30px' }} variant="contained" color="primary" size={'small'}>
                    <Button onClick={() => accessoryHandler(myId)} color={accessory === myId ? 'secondary' : 'primary'} size={'small'}>
                        My
                    </Button>
                    <Button onClick={() => accessoryHandler('')} color={accessory === '' ? 'secondary' : 'primary'} size={'small'}>
                        All
                    </Button>
                </ButtonGroup>
            </div>

            <RangeSlider setAmountCards={setAmountCards} amountCards={amountCards} />

            <IconButton aria-label="delete" size="small">
                <FilterAltOffIcon fontSize="medium" />
            </IconButton>
        </div>
    );
};
