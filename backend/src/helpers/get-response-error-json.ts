type ResponseErrorJSON = {
  error: string;
};

export const getResponseErrorJSON = (error: string): ResponseErrorJSON => {
  if (typeof error !== 'string') {
    return { error: 'Something went wrong while constructing error structure!' };
  }

  return { error };
};
