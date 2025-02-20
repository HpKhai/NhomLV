import { message } from 'antd';

const success = (mes = 'Success') => {
  message.success(mes);
};

const error = (mes = 'Error') => {
  message.error(mes);
};

export { success, error }