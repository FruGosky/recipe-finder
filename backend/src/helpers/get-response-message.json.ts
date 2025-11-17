type ResponseMessageJSON = {
  message: string;
};

export const getResponseMessageJSON = (message: string): ResponseMessageJSON => {
  if (typeof message !== 'string') {
    return { message: 'Something went wrong while constructing message structure!' };
  }

  return { message };
};
