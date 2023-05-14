import { BookmarkForm } from "@/Components/BookmarkForm";
import { useContexts } from "@/Hooks/useContexts";
import { Stack } from "@mui/material";
import React from "react";
import { FormContainer } from "react-hook-form-mui";
import { useForm } from "@inertiajs/react";

export const AddBookmark: React.FC = () => {
    const { doDrawer, doToast } = useContexts();

    const { data, setData, post, processing, errors, reset } = useForm({
        url: "",
        title: undefined,
        description: undefined,
        tag_names: [],
        is_archived: false,
        unread: false,
        shared: false,
    });

    const submit = (data: any) => {
        setData(data);
        post(route("links.store"), {
            onSuccess: (page) => {
                doToast({
                    open: true,
                    title: "Success.",
                });

                doDrawer({
                    open: false,
                    children: <></>,
                });
            },
            onError: (errors) => {
                console.log(errors);
                doToast({
                    open: true,
                    type: "error",
                    title: "Failed",
                    description: errors.toString(),
                });
            },
        });
    };

    return (
        <Stack direction={"column"} spacing={2}>
            <FormContainer defaultValues={data} onSuccess={submit}>
                <BookmarkForm loading={processing} actions={<></>} />
            </FormContainer>
        </Stack>
    );
};

export default AddBookmark;
