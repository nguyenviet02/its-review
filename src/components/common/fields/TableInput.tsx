import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Box, Button } from "@mui/material";
import {
  GridSlotProps,
  GridToolbarContainer,
  GridRowsProp,
  GridRowModesModel,
  GridColDef,
  DataGrid,
  GridRowModel,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  disabled?: boolean;
  name: string;
};

declare module "@mui/x-data-grid" {
  interface ToolbarPropsOverrides {
    setTableData: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
  }
}

function EditToolbar(props: GridSlotProps["toolbar"]) {
  const { setTableData } = props;

  const handleClick = () => {
    const id = randomId();
    setTableData((oldRows) => [
      ...oldRows,
      { id, goal: "", suggestion: "", estimatedTime: "" },
    ]);
  };

  return (
    <GridToolbarContainer>
      <Button
        color="primary"
        startIcon={<PlusCircleIcon />}
        onClick={handleClick}
      >
        Thêm hàng
      </Button>
    </GridToolbarContainer>
  );
}

const TableInput = ({ disabled, name }: Props) => {
  const formMethods = useFormContext();
  const dataTable = formMethods.getValues(name);

  const initialRows: GridRowsProp = useMemo(() => {
    if (dataTable) {
      return dataTable;
    }
    return [
      {
        id: randomId(),
        goal: "",
        suggestion: "",
        estimatedTime: "",
      },
    ];
  }, [dataTable]);

  const [tableData, setTableData] = React.useState(initialRows);

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow };
    const newTableData = tableData.map((row) =>
      row.id === newRow.id ? updatedRow : row,
    );
    setTableData(newTableData);
    formMethods.setValue(name, newTableData);
    return updatedRow;
  };
  const columns: GridColDef[] = [
    {
      field: "goal",
      headerName: "Mục tiêu phát triển",
      headerAlign: "center",
      editable: true,
      flex: 1,
    },
    {
      field: "suggestion",
      headerName: "Đề xuất",
      headerAlign: "center",
      editable: true,
      flex: 1,
    },
    {
      field: "estimatedTime",
      headerName: "Thời gian dự kiến thực hiện",
      headerAlign: "center",
      type: "date",
      editable: true,
      flex: 1,
    },
  ];

  React.useEffect(() => {
    formMethods.register(name);
  }, [formMethods, name]);

  return (
    <Box
      sx={{
        width: "100%",
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={tableData}
        columns={columns}
        processRowUpdate={processRowUpdate}
        showCellVerticalBorder
        showColumnVerticalBorder
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnSorting
        disableColumnMenu
        disableDensitySelector
        disableColumnResize
				isCellEditable={() => !disabled}
        hideFooter
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setTableData },
        }}
      />
    </Box>
  );
};

export default TableInput;
