import { Pagination, Box } from "@mui/material";

export const CustomPagination = ({
  totalItems,
  itemsPerPage,
  page,
  onChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <Box display="flex" justifyContent="center" mt={3}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => onChange(value)}
        color="primary"
      />
    </Box>
  );
};
