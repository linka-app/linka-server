import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import {Head} from "@inertiajs/react";
import React from "react";
import {Stack} from "@mui/material";
import UpdatePrefrencesForm from "@/Pages/Profile/Partials/UpdatePrefrencesForm";

export const Edit: React.FC<{
    mustVerifyEmail: boolean;
    status?: string;
}> = (props) => {
    return (
        <AuthenticatedLayout>
            <Head title="Profile" />
            <Stack spacing={2}>
                <UpdateProfileInformationForm
                    mustVerifyEmail={props.mustVerifyEmail}
                    status={props.status}
                />
                <UpdatePrefrencesForm />
                <UpdatePasswordForm />
                <DeleteUserForm className="max-w-xl" />
            </Stack>
        </AuthenticatedLayout>
    );
};

export default Edit;
