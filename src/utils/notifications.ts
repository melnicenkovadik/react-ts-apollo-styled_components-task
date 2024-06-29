import { toast } from 'react-toastify';

export const notify = (content: string) => toast(content);
export const notifyError = (content: string) => toast.error(content);
