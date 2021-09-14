import { ListItem, ListItemProps } from '@material-ui/core';

const ListItemLink = (props: ListItemProps<'a', { button?: true }>) => <ListItem button component="a" {...props} />;

export default ListItemLink;
