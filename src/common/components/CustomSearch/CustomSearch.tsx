import React, { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDebounce } from '../../utils/hooks';
import { KEYBOARD_KEYS } from '../../utils/constans/keyboard-keys.const';
import { Nullable } from '../../utils/optionalTypes/optional.types';
import { useSearchParams } from 'react-router-dom';
import { createPackQuery } from '../../../features/Packs/utils/mappers/pack.mapper';
import { PackQueryTypes } from '../../../features/Packs/packs.interfaces';

interface SearchInputProps {
    placeholder?: string;
    searchHandler: (searchValue: Nullable<string>) => void;
}

const CustomSearch: FC<SearchInputProps> = ({ placeholder = 'Search...', searchHandler }) => {
    const [value, setValue] = useState<Nullable<string>>(null);
    const debouncedValue = useDebounce<Nullable<string>>(value, 500);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const param: PackQueryTypes = Object.fromEntries(searchParams);
        if (param.packName !== '') {
            setValue(param.packName as string);
        }
    }, []);

    // Fetch API (optional)
    useEffect(() => {
        // if (value !== '') {

        searchHandler(value);
        // }
    }, [debouncedValue]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputText: string = event.currentTarget.value;
        setValue(inputText.trim());
    };


    const disableKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.code === 'Enter') event.preventDefault();
    };


    return (
        <>
            <form>
                <p>Search</p>
                <TextField
                    variant={'outlined'}
                    value={value ?? ''}
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: <InputAdornment position='start'>{<SearchIcon />}</InputAdornment>,
                        placeholder
                    }}
                    onKeyDown={disableKeyDown}
                />
            </form>
        </>
    );
};

export default CustomSearch;
