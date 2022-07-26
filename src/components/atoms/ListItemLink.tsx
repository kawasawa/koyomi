import { ListItem, ListItemProps } from '@material-ui/core';
import React from 'react';

export const ListItemLink = (props: ListItemProps<'a', { button?: true }>) => (
  <ListItem button component="a" {...props} />
);
