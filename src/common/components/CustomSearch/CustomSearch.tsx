import React, { ChangeEvent, FC, KeyboardEvent, memo, useEffect, useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDebounce } from '../../utils/hooks';
import { Nullable } from '../../utils/optionalTypes/optional.types';

interface SearchInputProps {
    placeholder?: string;
    searchValue: string;
    searchHandler: (searchValue: Nullable<string>) => void;
}

const CustomSearch: FC<SearchInputProps> = memo((props) => {
    const { placeholder = 'Search...', searchHandler, searchValue } = props;

    const [value, setValue] = useState<Nullable<string>>(searchValue || null);
    const debouncedValue = useDebounce<Nullable<string>>(value, 1000);

    // Fetch API (optional)
    useEffect(() => {
        searchHandler(value);
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
                    //first init get from params, then get from input
                    value={value === null ? searchValue : value}
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">{<SearchIcon />}</InputAdornment>,
                        placeholder,
                    }}
                    onKeyDown={disableKeyDown}
                />
            </form>
        </>
    );
});

export default CustomSearch;
