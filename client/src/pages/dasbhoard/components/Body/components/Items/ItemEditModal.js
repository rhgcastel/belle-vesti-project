import React, {
    useState,
    forwardRef,
    useImperativeHandle
} from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import api from "../../../../../../services/api";
import { warningBox } from "../../../../../components/WarningBox";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const ItemEditModal = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState({
        sku: '',
        title: '',
        price: 0.00,
        description: '',
        category: '',
        image: '',
        quantity: 0
    })

    useImperativeHandle(ref, () => ({
        handleOpen() {
            setOpen(true);
        },
    }));


    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdate = async () => {
        const data = item;
        const getId = props.selection.map((e) => e._id).toString();
        if (!item.sku && !item.title && !item.price && !item.description && !item.category && !item.image && !item.quantity)
            return warningBox("No changes have been made.");
        await api.put(`/api/item/${getId}`, data);
        warningBox("Item updated with success.");
        handleClose();
        setTimeout(window.location.reload.bind(window.location), 1800);
    };

    const handleRemoveImage = async () => {
        const getId = props.selection.map(e => e._id).toString();
        await api.put(`/api/item/${getId}`, { image: '' });
        warningBox("Image removed with success.");
        setTimeout(window.location.reload.bind(window.location), 1800);
    }

    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack
                        component="form"
                        sx={{
                            width: "35ch",
                        }}
                        spacing={3}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="outlined-required"
                            label="SKU"
                            defaultValue={props.selection.map((e) => e.sku)}
                            onChange={(e) => setItem({ sku: e.target.value })}
                        />
                        <TextField
                            id="outlined-required"
                            label="Title"
                            defaultValue={props.selection.map((e) => e.title)}
                            onChange={(e) => setItem({ title: e.target.value })}
                        />
                        <TextField
                            id="outlined-required"
                            label="Price(£)"
                            defaultValue={props.selection.map((e) => e.price)}
                            onChange={(e) => setItem({ price: e.target.value })}
                        />
                        <TextField
                            id="outlined-required"
                            label="Description"
                            defaultValue={props.selection.map((e) => e.description)}
                            onChange={(e) => setItem({ description: e.target.value })}
                        />
                        <TextField
                            id="outlined-required"
                            label="Category"
                            defaultValue={props.selection.map((e) => e.category)}
                            onChange={(e) => setItem({ category: e.target.value })}
                        />
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <TextField
                                id="outlined-required"
                                label="Image"
                                style={{ width: 310 }}
                                defaultValue={props.selection.map((e) => e.image)}
                                onChange={(e) => setItem({ image: e.target.value })}
                            />
                            <IconButton style={{ marginRight: -100 }} onClick={() => handleRemoveImage()}>
                                <DeleteIcon />
                            </IconButton>
                        </div>

                        <TextField
                            id="outlined-required"
                            label="Quantity"
                            defaultValue={props.selection.map((e) => e.quantity)}
                            onChange={(e) => setItem({ quantity: e.target.value })}
                        />

                        <div style={{ float: "right", marginTop: 20 }}>
                            <Button
                                variant="contained"
                                style={{ marginRight: 10 }}
                                onClick={handleUpdate}
                            >
                                Confirm
                            </Button>

                            <Button variant="contained" onClick={handleClose}>
                                Cancel
                            </Button>
                        </div>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
});
export default ItemEditModal;  