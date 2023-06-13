import React, {useEffect} from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import {Head, Link, useForm} from "@inertiajs/react";
import {Button, FormControlLabel, Grid, Switch, TextField} from "@mui/material";
import _ from "lodash";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (data: any) => {
        setData(data);

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <Grid
                container
                spacing={2}
                component="form"
                onSubmit={submit}
            >
                <Grid xs={12} item>
                    <TextField
                        error={!_.isNil(errors.email)}
                        label="Name"
                        defaultValue={data.email}
                        onChange={(e) =>
                            setData("email", e.target.value)
                        }
                        helperText={errors.email}
                        autoComplete="name"
                        fullWidth
                    />

                </Grid>
                <Grid xs={12} item>
                    <TextField
                        error={!_.isNil(errors.password)}
                        label="Password"
                        defaultValue={data.password}
                        onChange={(e) =>
                            setData("password", e.target.value)
                        }
                        helperText={errors.password}
                        autoComplete="current-password"
                        type={"password"}
                        fullWidth
                    />

                </Grid>
                <Grid xs={12} item>
                    <FormControlLabel control={<Switch
                        // @ts-ignore
                        defaultValue={data.remember} onChange={(e) =>
                        setData("remember", e.target.value == 'on')
                    } />} label="Remember Me" />
                </Grid>
                <Grid xs={6} item>
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                        >
                            Forgot your password?
                        </Link>
                    )}
                </Grid>
                <Grid xs={6} item>
                    <Button
                        variant={"outlined"}
                        type={"submit"}
                        disabled={processing}
                    >
                        Log in
                    </Button>
                </Grid>
            </Grid>
        </GuestLayout>
    );
}
