import {FC, MouseEvent} from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import {headCells, PacksCell} from "./titles.thead";
import {PackSortRequestTypes, PackSortTypes} from "../../packs.interfaces";
import {getDirectionSort} from "../../utils/super-sort";

export type Order = "asc" | "desc";

interface EnhancedTableProps {
    onRequestSort: (event: MouseEvent<unknown>, property: PackSortTypes) => void;
    orderBy: PackSortRequestTypes;
}


export const THeaderPack: FC<EnhancedTableProps> = (props) => {
    const {orderBy, onRequestSort} = props;
    const createSortHandler = (property: PackSortTypes) => (event: MouseEvent<unknown>) => {
        // console.log("createSortHandler", property);
        onRequestSort(event, property);
    };


    const showSortIcon = (s: PacksCell, ordBy: PackSortRequestTypes): boolean => {
        if (orderBy === '') {
            return false
        }
        return s.sortBy === orderBy.slice(1)
    }


    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell key={headCell.id} align={"center"}>
                        <TableSortLabel
                            // active={headCell.sortBy === orderBy.slice(1)}
                            active={showSortIcon(headCell, orderBy)}
                            onClick={createSortHandler(headCell.sortBy)}
                            direction={getDirectionSort(orderBy)}>
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};
