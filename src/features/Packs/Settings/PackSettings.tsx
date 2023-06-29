import s from '../ListPacks/styles.module.scss';
import CustomSearch from '../../../common/components/CustomSearch/CustomSearch';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import { RangeSlider } from '../../../common/components/SupperSlider/SupperSlider';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import React, { FC } from 'react';
import { Nullable, Optional } from '../../../common/utils/optionalTypes/optional.types';
import { useAppSelector } from '../../../app/hooks';

interface PackSettingsProps {
    accessory: string;
    searchHandler: (searchValue: Nullable<string>) => void;
    accessoryHandler: (value: string) => void;
}

export const PackSettings: FC<PackSettingsProps> = (props) => {
    const { searchHandler, accessoryHandler, accessory } = props;
    const myId: Optional<string> = useAppSelector(state => state.auth!.profile!._id!);
    return (
        <div className={s.setting_panel}>
            <CustomSearch placeholder={'write text'} searchHandler={searchHandler} />

            <div>
                <p>Show pack cards</p>
                <ButtonGroup style={{ height: '30px' }} variant='contained' color='primary' size={'small'}>
                    <Button onClick={() => accessoryHandler(myId)}
                            color={accessory === myId ? 'secondary' : 'primary'}
                            size={'small'}>My</Button>
                    <Button onClick={() => accessoryHandler('')}
                            color={accessory === '' ? 'secondary' : 'primary'}
                            size={'small'}>All</Button>
                </ButtonGroup>
            </div>

            <RangeSlider />

            <IconButton aria-label='delete' size='small'>
                <FilterAltOffIcon fontSize='medium' />
            </IconButton>
        </div>
    );
};
