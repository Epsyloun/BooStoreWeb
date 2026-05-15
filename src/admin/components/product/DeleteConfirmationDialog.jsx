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
  title = "¿Archivar producto?",
  subtitle = `¿Estás seguro de que quieres archivar el producto ${product?.title}? Esta acción no se puede deshacer fácilmente.`,
  color = "error",
  buttonText = "Archivar",
  onConfirm = () => {},
  onCancel = () => {},
}) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>{title}</DialogTitle>
      <DialogContent>
        <Typography sx={{ mt: 2 }}>{subtitle}</Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onCancel} variant="outlined" color="secondary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} variant="contained" color={color}>
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
