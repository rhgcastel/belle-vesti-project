import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

export const confirmationBox = (str, func) => toast(
    <>
      <h3>{str}</h3>
      <Button
        variant="contained"
        style={{ marginRight: 10, backgroundColor: 'black' }}
        onClick={() => func()}
      >
        Yes
      </Button>
      <Button
        variant="contained"
        style={{ marginRight: 10, backgroundColor: 'black' }}
        onClick={() => toast.dismiss()}
      >
        No
      </Button>
    </>
    , {
      containerId: 'confirmationContainer',
      toastId: 'confirmation'
    })