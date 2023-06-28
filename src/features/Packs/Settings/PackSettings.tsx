import s from '../ListPacks/styles.module.scss';
import CustomSearch from '../../../common/components/CustomSearch/CustomSearch';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import { RangeSlider } from '../../../common/components/SupperSlider/SupperSlider';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import React, { FC } from 'react';

interface PackSettingsProps {
    searchHandler: (searchValue: string) => void;
}

export const PackSettings: FC<PackSettingsProps> = (props) => {
    const { searchHandler } = props;
    return (
        <div className={s.setting_panel}>
            <CustomSearch placeholder={'write text'} searchHandler={searchHandler} />

            <div>
                <p>Show pack cards</p>
                <ButtonGroup style={{ height: '30px' }} variant='contained' color='primary' size={'small'}>
                    <Button size={'small'}>My</Button>
                    <Button size={'small'}>All</Button>
                </ButtonGroup>
            </div>

            <RangeSlider />

            <IconButton aria-label='delete' size='small'>
                <FilterAltOffIcon fontSize='medium' />
            </IconButton>
        </div>
    );
};
