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

export function headerRequest(urlBase: string) {
  let api;

  switch (urlBase) {
    case 'ms-cms-service':
      api = 'ms-cms-service';

      break;

    default:
      api = 'ms-cms-service';
      break;
  }

  const data = {
    api,
    channel: 'WebSME',
    context: 'WEB',
    priority: 3,
    reqType: 'REQUEST',
    subChannel: 'WebSME',
    synasyn: 'true',
    userID: 'admin1',
  };
  return data;
}

export function bodyBuilder(
  authenType: string,
  data?: Record<string, unknown>,
) {
  return {
    authenType,
    data,
  };
}

// export function htmlWithBr(
//   dom: string,
//   config?: {
//     ADD_ATTR: string[];
//   },
// ) {
//   const sanitizedHtml = config
//     ? DOMPurify.sanitize(dom || '-', config) || ''
//     : DOMPurify.sanitize(dom || '-') || '';

//   const value =
//     sanitizedHtml.length === 9 ? '-' : sanitizedHtml.replace(/\n/g, '<br>');

//   return value;
// }
