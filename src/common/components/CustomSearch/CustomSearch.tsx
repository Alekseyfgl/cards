import React, { ChangeEvent, FC, KeyboardEvent, memo, useEffect, useState } from 'react';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDebounce } from '../../utils/hooks';
import { Nullable } from '../../utils/types/optional.types';
import { CustomTextField } from '../CustomTextField/CustomTextField';

interface SearchInputProps {
    placeholder?: string;
    searchValue: string;
    searchHandler: (searchValue: Nullable<string>) => void;
}

export const CustomSearch: FC<SearchInputProps> = memo((props) => {
    const { placeholder = 'Search...', searchHandler, searchValue } = props;

    //null need for first render
    const [value, setValue] = useState<Nullable<string>>(searchValue || null);
    const debouncedValue = useDebounce<Nullable<string>>(value, 1000);

    // Fetch API (optional)
    useEffect(() => {
        if (value === null) return;
        searchHandler(value);
    }, [debouncedValue]);

    useEffect(() => {
        if (searchValue === '' && value !== null) setValue('');
    }, [searchValue]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputText: string = event.currentTarget.value;
        setValue(inputText.trimStart());
    };

    const disableKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.code === 'Enter') event.preventDefault();
    };

    return (
        <>
            <form>
                <CustomTextField
                    marginBottom={'0px'}
                    value={value === null ? searchValue : value}
                    onChange={handleChange}
                    startAdornment={<InputAdornment position="start">{<SearchIcon />}</InputAdornment>}
                    placeholder={placeholder}
                    onKeyDown={disableKeyDown}
                    variant={'outlined'}
                />
            </form>
        </>
    );
});
