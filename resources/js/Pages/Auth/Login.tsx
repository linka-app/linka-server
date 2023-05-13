import React, { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    CheckboxElement,
    FormContainer,
    PasswordElement,
    TextFieldElement,
} from "react-hook-form-mui";
import { Button, Stack } from "@mui/material";

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

            <FormContainer defaultValues={data} onSuccess={submit}>
                <Stack spacing={2}>
                    <TextFieldElement
                        name="email"
                        label="Email"
                        autoComplete="username"
                        required
                        fullWidth
                        helperText={errors.email}
                    />
                    <PasswordElement
                        name="password"
                        label="Password"
                        autoComplete="current-password"
                        required
                        fullWidth
                        helperText={errors.password}
                    />
                    <CheckboxElement name="remember" label="Remember Me" />
                    <Stack spacing={2} direction={"row"}>
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Forgot your password?
                            </Link>
                        )}
                        <Button
                            variant={"outlined"}
                            type={"submit"}
                            disabled={processing}
                        >
                            Log in
                        </Button>
                    </Stack>
                </Stack>
            </FormContainer>
        </GuestLayout>
    );
}
