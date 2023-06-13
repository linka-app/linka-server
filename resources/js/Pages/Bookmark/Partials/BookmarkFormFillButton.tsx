import React from "react";
import {Grid,} from "@mui/material";
// @ts-ignore
import {InertiaFormProps} from "@inertiajs/react/types/useForm";
import _ from "lodash";
import {usePage} from "@inertiajs/react";
import {i18n, I18nLocals} from "@/i18n";
import LoadingButton from "@mui/lab/LoadingButton";
import PsychologySharpIcon from "@mui/icons-material/PsychologySharp";

export const BookmarkFormFillButton: React.FC<{
    errors?: InertiaFormProps['errors'];
    setData: any;
    data: any;
}> = (props) => {
    const profile = _.get(usePage(), 'props.auth.user.profile') as any;
    const translation = i18n[(profile?.language as I18nLocals) || 'en'];

    const [loading, setLoading] = React.useState(false);

    const doFill = async () => {

        setLoading(true);
        const theResult = await window.axios.post(route("bookmark.fill"),{
            url: props.data.url
        }).then(res => {
                return res.data
        });

        const newData = {
            title: _.get(theResult, 'title'),
            description: _.get(theResult, 'desc'),
            tags: _.get(theResult, 'tags'),
        }

        props.setData({ ...props.data, ...newData });
        setLoading(false);
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
                    type={'button'}
                >
                    {translation.bookmarkFormFillButtonFillWithChatGPT}
                </LoadingButton>
            </Grid>
        </>
    );
}
