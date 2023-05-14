import { Button, Stack, Unstable_Grid2 as Grid } from "@mui/material";
import React, { ReactNode, useState } from "react";
import {
    AutocompleteElement,
    SwitchElement,
    TextareaAutosizeElement,
    TextFieldElement,
    useFormContext,
} from "react-hook-form-mui";
import { usePage } from "@inertiajs/react";

export const BookmarkForm: React.FC<{
    bookmarkId?: number;
    loading: boolean;
    actions: ReactNode;
}> = (props) => {
    const { tags } = usePage().props;

    const { watch } = useFormContext();
    const resultViewMode = watch("url");
    const [hasBookmark, setHasBookmark] = useState<boolean>();

    return (
        <Stack spacing={2} pb={2}>
            <Grid container spacing={0}>
                <Grid xs={8}>
                    <Stack direction={"row"} spacing={1}>
                        <SwitchElement
                            label="Unread"
                            labelPlacement="start"
                            name="unread"
                        />
                        <SwitchElement
                            label="Archived"
                            labelPlacement="start"
                            name="is_archived"
                        />
                        <SwitchElement
                            label="Shared"
                            labelPlacement="start"
                            name="shared"
                        />
                    </Stack>
                </Grid>
                <Grid
                    xs={12}
                    md={4}
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    {props.actions}
                </Grid>
            </Grid>

            <TextFieldElement
                name="url"
                label="Url"
                fullWidth
                required
                autoComplete="off"
                helperText={hasBookmark ? "This bookmark already exists" : null}
            />
            <TextFieldElement
                name="title"
                label="Title"
                fullWidth
                autoComplete="off"
            />
            <TextareaAutosizeElement
                name="description"
                label="Description"
                fullWidth
                resizeStyle="vertical"
                rows={3}
            />
            <AutocompleteElement
                label="Tags"
                multiple
                name="tag_names"
                options={tags}
                autocompleteProps={{
                    freeSolo: true,
                }}
            />
            <TextFieldElement
                name="website_title"
                label="Website Title"
                autoComplete="off"
                fullWidth
            />
            <TextareaAutosizeElement
                autoComplete="off"
                name="website_description"
                label="Website Description"
                fullWidth
                resizeStyle="vertical"
                rows={3}
            />
            <Button
                disabled={props.loading}
                fullWidth
                type="submit"
                variant="contained"
            >
                Submit
            </Button>
        </Stack>
    );
};

export default BookmarkForm;
