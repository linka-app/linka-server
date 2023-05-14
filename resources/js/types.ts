export interface BookmarkItem {
    title: string;
    id?: number;
    url: string;
    description?: string;
    website_title?: string;
    website_description?: string;
    is_archived?: boolean;
    unread?: boolean;
    shared?: boolean;
    tag_names: string[];
    date_added?: string;
    date_modified?: string;
}

export interface PageProps {
    auth: boolean;
}
