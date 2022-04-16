interface Msg {
  message: string;
}

interface Success extends Msg {
  data: any;
}

interface Error extends Msg {
  error: string;
}

export function success(params?: Partial<Success>): Success {
  return {
    message: params?.message || 'Success',
    data: params?.data,
  };
}

export function error(error: any, message?: string): Error {
  return {
    message: message || 'Error',
    error
  };
}
