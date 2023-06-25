import s from '../ListPacks/packs.module.scss';
import CustomSearch from '../../../common/components/CustomSearch/CustomSearch';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import { RangeSlider } from '../../../common/components/SupperSlider/SupperSlider';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import React from 'react';

export const PackSettings = () => {
    return (
        <div className={s.setting_panel}>
            <CustomSearch placeholder={'write text'} />

            <div>
                <p>Show pack cards</p>
                <ButtonGroup style={{ height: '30px' }} variant="contained" color="primary" size={'small'}>
                    <Button size={'small'}>My</Button>
                    <Button size={'small'}>All</Button>
                </ButtonGroup>
            </div>

            <RangeSlider />

            <IconButton aria-label="delete" size="small">
                <FilterAltOffIcon fontSize="medium" />
            </IconButton>
        </div>
    );
};
