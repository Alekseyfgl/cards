import { FC, MouseEvent } from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import { headCells } from "./titles.thead";
import { PackSortTypes } from "../../packs.interfaces";

export type Order = "asc" | "desc";

interface EnhancedTableProps {
  onRequestSort: (event: MouseEvent<unknown>, property: PackSortTypes) => void;
  orderBy: string;
}

export const THeaderPack: FC<EnhancedTableProps> = (props) => {
  const { orderBy, onRequestSort } = props;
  const createSortHandler = (property: PackSortTypes) => (event: MouseEvent<unknown>) => {
    console.log("createSortHandler", property);
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={"center"}>
            <TableSortLabel
              active={orderBy === `0${headCell.sortBy}`}
              onClick={createSortHandler(headCell.sortBy)}
              direction={"desc"} // стрелка вверх или вниз
            >
              {headCell.label}
              {/*{orderBy === headCell.sortBy ? (*/}
              {/*  <Box component="span">*/}
              {/*    {"AAAAAAAAAA"}*/}
              {/*    {"desc" === "desc" ? "sorted descending" : "sorted ascending"}*/}
              {/*  </Box>*/}
              {/*) : null}*/}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
