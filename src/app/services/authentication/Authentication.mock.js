export const validUserCredentials = {
  user: {
    getIdToken: () => {
      return new Promise((resolve) => resolve('idToken'));
    },
  },
};

export const incorrectUserCredentials = {};
