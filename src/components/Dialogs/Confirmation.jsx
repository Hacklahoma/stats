import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from '@material-ui/core';

/**
 * Shows confirmation dialog to make sure user knows what they are doing
 *
 * @param open Whether modal is open or not
 * @param setModal Setting this to null will close the modal
 * @param setConfirmed Whether user pressed confirmed
 * @param Title Title for dialog
 */
function Confirmation({ open, setModal, confirmationButton, setConfirmed, title }) {
  /**
   * Closes this modal
   */
  const handleClose = () => {
    setModal(null);
  };

  /**
   * Tells caller that user has pressed confirmed
   */
  const handleConfirm = () => {
    setConfirmed(true);
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button variant="contained" style={{ fontWeight: 'bold' }} onClick={handleConfirm} color="secondary">
          {confirmationButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Confirmation;
