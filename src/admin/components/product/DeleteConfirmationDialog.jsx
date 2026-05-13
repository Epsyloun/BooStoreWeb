import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export default function DeleteConfirmationDialog({
  open = false,
  product = null,
  onConfirm = () => {},
  onCancel = () => {},
}) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>¿Archivar producto?</DialogTitle>
      <DialogContent>
        <Typography sx={{ mt: 2 }}>
          ¿Estás seguro de que quieres archivar el producto{" "}
          <strong>{product?.title}</strong>? Esta acción no se puede deshacer
          fácilmente.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onCancel} variant="outlined" color="secondary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Archivar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
