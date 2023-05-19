import React from "react";
import {Grid, TextField,} from "@mui/material";
// @ts-ignore
import {InertiaFormProps} from "@inertiajs/react/types/useForm";
import _ from "lodash";
import {router, usePage} from "@inertiajs/react";
import {i18n, I18nLocals} from "@/i18n";
import LoadingButton from "@mui/lab/LoadingButton";
import PsychologySharpIcon from "@mui/icons-material/PsychologySharp";


export const BookmarkFormFillButton: React.FC<{
    errors?: InertiaFormProps['errors'];
    setData: InertiaFormProps['setData'];
    data: InertiaFormProps['data'];
}> = (props) => {
    const profile = usePage().props.auth.user.profile as any;
    const translation = i18n[(profile?.language as I18nLocals) || 'en'];

    //const [search, setSearch] = React.useState("");

    const doFill = async () => {
        router.post(route("bookmark.index"), { search: props.data.url }, {
            preserveState: true,
            onProgress: () => {
                props.setData("title", "test");
                props.setData("description", "test");
                props.setData("tags", "test");
            },
            only: ['fillform']
        });
        return ;
    };

    return (
        <>
            <Grid xs={12} item>
                <LoadingButton
                    loading={loading}
                    startIcon={<PsychologySharpIcon />}
                    variant="outlined"
                    onClick={doFill}
                    fullWidth
                >
                    {translation.bookmarkFormFillButtonFillWithChatGPT}
                </LoadingButton>

                BookmarkFormFillButton
            </Grid>
            <Grid xs={12} item>
                <TextField
                    error={!_.isNil(props.errors.url)}
                    label="Url"
                    defaultValue={props.data.url}
                    onChange={(e) =>
                        props.setData("url", e.target.value)
                    }
                    helperText={props.errors.url}
                    fullWidth
                    autoComplete={"off"}
                />
            </Grid>
        </>
    );
}
