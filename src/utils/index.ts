interface bodyLoginType {
  username: string;
  password: string;
}

export const bodyLogin = (data: bodyLoginType) => {
  return {
    header: {
      channel: 'WebSME',
      subChannel: 'WebSME',
      context: 'PC',
      location: '10.9.12.90',
      requestNode: '01',
      userID: 'CAREER_ADMIN',
    },
    body: {
      enquiry: {
        authenType: 'getLogin',
        password: data.password || '123456a@',
        username: data.username || 'WEBSME.TEST10',
      },
      command: 'GET_ENQUIRY',
    },
  };
};
