import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

export const warningBox = (str) => toast(
    <>
      <h3>{str}</h3>
      <Button 
      variant='contained'
      sx={{backgroundColor: 'black'}}
      onClick={() => toast.dismiss()}
      >Ok
      </Button>
    </>
    , {
      containerId: 'warningContainer',
      toastId: 'warning'
    });