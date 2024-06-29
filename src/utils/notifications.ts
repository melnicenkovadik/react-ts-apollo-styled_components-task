import { toast } from 'react-toastify';

export const notify = (content: string) => toast(content);
export const notifyError = (content: string) => toast.error(content);
export const notifyWarn = (content: string) => toast.warn(content);
export const notifyInfo = (content: string) => toast.info(content);
