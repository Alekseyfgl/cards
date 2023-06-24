import {FC, MouseEvent} from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import {headCells} from "./titles.thead";
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


    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell key={headCell.id} align={"center"}>
                        <TableSortLabel active={headCell.sortBy === orderBy.slice(1)}
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
