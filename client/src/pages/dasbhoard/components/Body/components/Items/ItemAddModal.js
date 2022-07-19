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
import api from "../../../../../../api/api";
import { warningBox } from "../../../../../components/WarningBox";

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

const ItemAddModal = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const [newItem, setNewItem] = useState({
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

    const handleAddition = async () => {
        const data = newItem;
        if (!newItem.sku || !newItem.title || !newItem.price || !newItem.description || !newItem.category || !newItem.quantity)
            return warningBox("Please, fill in all the fields.");
        try {
            await api.post(`/api/item`, data);
            warningBox("New item added with success.");
            handleClose();
            setTimeout(window.location.reload.bind(window.location), 1800)
        } catch (err) {
            warningBox(err.response.data);
        }
    };

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
                            label="SKU* (10 characters)"
                            defaultValue='BLV'
                            onChange={(e) => setNewItem({ sku: e.target.value })}
                        />
                        <TextField
                            id="outlined-required"
                            label="Title*"
                            onChange={(e) => setNewItem({ title: e.target.value })}
                        />
                        <TextField
                            id="outlined-required"
                            label="Price(£)*"
                            onChange={(e) => setNewItem({ price: e.target.value })}
                        />
                        <TextField
                            id="outlined-required"
                            label="Description*"
                            onChange={(e) => setNewItem({ description: e.target.value })}
                        />
                        <TextField
                            id="outlined-required"
                            label="Category*"
                            onChange={(e) => setNewItem({ category: e.target.value })}
                        />
                        <TextField
                            id="outlined-required"
                            label="Image"
                            onChange={(e) => setNewItem({ image: e.target.value })}
                        />
                        <TextField
                            id="outlined-required"
                            label="Quantity*"
                            onChange={(e) => setNewItem({ quantity: e.target.value })}
                        />

                        <div style={{ marginTop: 20 }}>
                            <Button
                                variant="contained"
                                style={{ marginRight: 10 }}
                                onClick={handleAddition}
                            >
                                Add
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
export default ItemAddModal;  