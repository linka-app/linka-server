import React, {FormEventHandler, useRef, useState} from 'react';
import {useForm} from '@inertiajs/react';
import {Button, Card, CardContent, CardHeader, Grid, TextField} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import _ from "lodash";

export default function DeleteUserForm({ className = '' }: { className?: string }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <>
            <Card>
                <CardHeader
                    title="Delete Account"
                    subheader="Once your account is deleted, all of its resources and data will be permanently deleted. Before
                    deleting your account, please download any data or information that you wish to retain."
                />
                <CardContent>
                    <Button
                        variant={"contained"}
                        color={'error'}
                        type={"button"}
                        onClick={confirmUserDeletion}
                        fullWidth
                    >
                        Delete Account
                    </Button>
                </CardContent>
            </Card>
            <Dialog
                open={confirmingUserDeletion}
                onClose={closeModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete your account?"}
                </DialogTitle>
                <DialogContent>
                    <Grid
                        container
                        spacing={2}
                        component="form"
                        onSubmit={deleteUser}
                    >
                        <Grid xs={12} item>
                            Once your account is deleted, all of its resources and data will be permanently deleted. Please
                            enter your password to confirm you would like to permanently delete your account.
                        </Grid>
                        <Grid xs={12} item>
                            <TextField
                                error={!_.isNil(errors.password)}
                                label="Password"
                                placeholder={'Password'}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                type={"password"}
                                fullWidth
                                helperText={errors.password}
                                inputRef={passwordInput}
                            />
                        </Grid>
                        <Grid xs={6} item>
                            <Button
                                variant={"contained"}
                                color={'secondary'}
                                type={"submit"}
                                onClick={closeModal}
                                fullWidth
                            >
                                Cancel
                            </Button>
                        </Grid>
                        <Grid xs={6} item>
                            <Button
                                variant={"contained"}
                                color={'error'}
                                type={"submit"}
                                disabled={processing}
                                fullWidth
                            >
                                Delete Account
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
}
