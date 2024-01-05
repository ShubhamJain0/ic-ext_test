import { formatDistanceToNow } from 'date-fns';

//Calculate last opened time of the connection
export const calculateLastOpened = (lastOpened: string) => {
  return formatDistanceToNow(new Date(lastOpened), {
    addSuffix: true,
  });
};
