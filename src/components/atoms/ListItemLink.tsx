import { ListItem, ListItemProps } from '@material-ui/core';
import React from 'react';

const ListItemLink = (props: ListItemProps<'a', { button?: true }>) => <ListItem button component="a" {...props} />;

export default ListItemLink;
