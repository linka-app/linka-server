import React, { FormEventHandler, useRef } from "react";
import { useForm } from "@inertiajs/react";
import {
    Alert,
    Button,
    Card,
    CardContent,
    CardHeader,
    Fade,
    Grid,
    TextField,
} from "@mui/material";
import _ from "lodash";

export default function UpdatePasswordForm({
    className = "",
}: {
    className?: string;
}) {
    const passwordInput = useRef<HTMLInputElement>();
    const currentPasswordInput = useRef<HTMLInputElement>();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <>
            <Card>
                <CardHeader
                    title="Update Password"
                    subheader="Ensure your account is using a long, random password to stay secure."
                />
                <CardContent>
                    <Grid
                        container
                        spacing={2}
                        component="form"
                        onSubmit={updatePassword}
                    >
                        <Grid xs={12} item>
                            <TextField
                                error={!_.isNil(errors.current_password)}
                                inputRef={currentPasswordInput}
                                label="Current Password"
                                defaultValue={data.current_password}
                                onChange={(e) =>
                                    setData("current_password", e.target.value)
                                }
                                type={"password"}
                                fullWidth
                            />
                        </Grid>
                        <Grid xs={12} item>
                            <TextField
                                error={!_.isNil(errors.password)}
                                inputRef={passwordInput}
                                label="New Password"
                                defaultValue={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                type={"password"}
                                fullWidth
                                helperText={errors.current_password}
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid xs={12} item>
                            <TextField
                                error={!_.isNil(errors.password_confirmation)}
                                label="Confirm Password"
                                defaultValue={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                type={"password"}
                                fullWidth
                                helperText={errors.password_confirmation}
                                autoComplete="new-password"
                            />
                        </Grid>

                        <Grid xs={8} item>
                            <Button
                                variant={"contained"}
                                type={"submit"}
                                disabled={processing}
                                fullWidth
                            >
                                Save
                            </Button>
                        </Grid>
                        <Grid xs={4} item>
                            <Fade in={recentlySuccessful}>
                                <Alert severity="success">Saved.</Alert>
                            </Fade>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}
