import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDebounce } from '../../utils/hooks';

interface SearchInputProps {
    placeholder?: string;
}

const CustomSearch: FC<SearchInputProps> = ({ placeholder = 'Search...' }) => {
    const [value, setValue] = useState<string>('');
    const debouncedValue = useDebounce<string>(value, 500);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputText = event.currentTarget.value;

        setValue(inputText.trim());
    };

    // Fetch API (optional)
    useEffect(() => {
        // Do fetch here...
        // Triggers when "debouncedValue" changes

        if (value !== '') {
            console.log('debouncedValue', value);
        }
    }, [debouncedValue]);
    return (
        <>
            <form>
                <p>Search</p>
                <TextField
                    variant={'outlined'}
                    value={value}
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">{<SearchIcon />}</InputAdornment>,
                        placeholder,
                    }}
                />
            </form>
        </>
    );
};

export default CustomSearch;
