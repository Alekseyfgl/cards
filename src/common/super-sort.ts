import { PackSortRequestTypes, PackSortTypes } from '../features/Packs/packs.interfaces';
import { login } from '../features/Auth/auth.slice';


export const superSortCreator = (criterion: PackSortTypes, currentSort: PackSortRequestTypes): PackSortRequestTypes => {
    const direction = currentSort[0] as '0' | '1';
    return direction === '0' ? `${1}${criterion}` : `${0}${criterion}`;
};

export const checkDirection = (currentSort: PackSortRequestTypes): 'asc' | 'desc' => {
    const direction = currentSort[0] as '0' | '1';
    return direction === '0' ? 'asc' : 'desc';
}

