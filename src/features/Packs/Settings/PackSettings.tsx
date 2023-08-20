import s from '../ListPacks/styles.module.scss';
import CustomSearch from '../../../common/components/CustomSearch/CustomSearch';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import React, { FC } from 'react';
import { Nullable, Optional } from '../../../common/utils/optionalTypes/optional.types';
import { useAppSelector } from '../../../app/hooks';
import { RangeSlider } from '../../../common/components/SupperSlider/SupperSlider';

const btnStyles = {
    width: '70px',
    height: '40px',
    padding: 0,
    borderRadius: '2px',
    '& .MuiButton-label': { justifyContent: 'center' },
};

interface PackSettingsProps {
    accessory: string;
    searchValue: string;
    amountCards: number[];
    searchHandler: (searchValue: Nullable<string>) => void;
    accessoryHandler: (value: string) => void;
    setAmountCards: (amountCards: number[]) => void;
    resetAllFilters: () => void;
    disabled: boolean;
}

export const PackSettings: FC<PackSettingsProps> = (props) => {
    const { searchHandler, accessoryHandler, setAmountCards, resetAllFilters, accessory, disabled, amountCards, searchValue } = props;
    const myId: Optional<string> = useAppSelector((state) => state.auth!.profile!._id!);

    return (
        <div className={s.setting_panel}>
            <CustomSearch placeholder={'write text'} searchHandler={searchHandler} searchValue={searchValue} />

            <div>
                <p>Show pack cards</p>
                <ButtonGroup disabled={disabled} variant="contained" color="primary" size={'small'}>
                    <Button onClick={() => accessoryHandler(myId)} color={accessory === myId ? 'secondary' : 'primary'} size={'small'} sx={btnStyles}>
                        My
                    </Button>
                    <Button onClick={() => accessoryHandler('')} color={accessory === '' ? 'secondary' : 'primary'} size={'small'} sx={btnStyles}>
                        All
                    </Button>
                </ButtonGroup>
            </div>

            <RangeSlider disabled={disabled} setAmountCards={setAmountCards} amountCards={amountCards} />

            <IconButton
                onClick={resetAllFilters}
                aria-label="delete"
                sx={{
                    padding: '7px 8px',
                    borderRadius: '2px',
                    border: '1px solid #E8E8E8',
                }}
            >
                <FilterAltOffIcon fontSize="medium" />
            </IconButton>
        </div>
    );
};
