import Ajax from './Ajax';

export default {
  checkAuth: async () => {
    const response = await Ajax.verify();
    if (response.status === 200) return true;
    else return false;
  }
};
