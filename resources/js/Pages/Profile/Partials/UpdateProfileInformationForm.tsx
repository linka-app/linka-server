import {Link, useForm, usePage} from "@inertiajs/react";
import React, {FormEventHandler} from "react";
import {Alert, Button, Card, CardContent, CardHeader, Fade, Grid, TextField, Typography,} from "@mui/material";
import _ from "lodash";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    // @ts-ignore
    const profile = usePage().props.auth.profile;
    // @ts-ignore
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: profile?.name,
            email: profile?.email,
            bookmark_date_display: profile?.bookmark_date_display,
            bookmark_link_target: profile?.bookmark_link_target,
            enable_sharing: profile?.enable_sharing,
            enable_favicons: profile?.enable_favicons,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <>
            <Card>
                <CardHeader
                    title="Profile Information"
                    subheader="Update your account's profile information and email address."
                />
                <CardContent>
                    <Grid
                        container
                        spacing={2}
                        component="form"
                        onSubmit={submit}
                    >
                        <Grid xs={12} item>
                            <TextField
                                error={!_.isNil(errors.name)}
                                label="Name"
                                defaultValue={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                helperText={errors.name}
                                autoComplete="name"
                                fullWidth
                            />
                        </Grid>
                        <Grid xs={12} item>
                            <TextField
                                error={!_.isNil(errors.email)}
                                label="Email"
                                defaultValue={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                helperText={errors.email}
                                autoComplete="username"
                                fullWidth
                            />
                        </Grid>
                        <Grid xs={12} item>
                            {mustVerifyEmail &&
                                user.email_verified_at === null && (
                                    <Typography variant={"caption"}>
                                        Your email address is unverified.
                                        <Link
                                            href={route("verification.send")}
                                            method="post"
                                            as="button"
                                            style={{
                                                textDecoration: "underline",
                                            }}
                                        >
                                            Click here to re-send the
                                            verification email.
                                        </Link>
                                    </Typography>
                                )}
                            {status === "verification-link-sent" && (
                                <Alert severity="success">
                                    A new verification link has been sent to
                                    your email address.
                                </Alert>
                            )}
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
