import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { Stack } from "@mui/material";
import { FormContainer } from "react-hook-form-mui";
import { BookmarkForm } from "@/Components/BookmarkForm";
import React, { useState } from "react";

const Add: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);

    const submit = (data: any) => {
        setIsLoading(true);
        router.post(route("bookmark.store"), data);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Add Bookmark" />
            <Stack direction={"column"} spacing={2} sx={{ width: "100%" }}>
                <FormContainer
                    defaultValues={{
                        url: "",
                        title: undefined,
                        description: undefined,
                        tag_names: [],
                        is_archived: false,
                        unread: false,
                        shared: false,
                    }}
                    onSuccess={submit}
                >
                    <BookmarkForm loading={isLoading} actions={<></>} />
                </FormContainer>
            </Stack>
        </AuthenticatedLayout>
    );
};

export default Add;
