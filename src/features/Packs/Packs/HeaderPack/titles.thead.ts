import { PacksRow } from "../Packs";

export interface PacksCell {
  id: keyof PacksRow;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
}

export const headCells: readonly PacksCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name"
  },
  {
    id: "cards",
    numeric: false,
    disablePadding: false,
    label: "Cards"
  },
  {
    id: "updated",
    numeric: false,
    disablePadding: false,
    label: "Last Updated"
  },
  {
    id: "created",
    numeric: false,
    disablePadding: false,
    label: "Created By"
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Actions"
  }
];
