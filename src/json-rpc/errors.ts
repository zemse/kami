import { JsonErrorObject } from './interfaces';

export const PARSE_ERROR: JsonErrorObject = {
  code: -32700,
  message: 'Parse error',
};

export const INVALID_REQUEST: JsonErrorObject = {
  code: -32600,
  message: 'Invalid Request',
};

export const METHOD_NOT_FOUND: JsonErrorObject = {
  code: -32601,
  message: 'Method not found',
};

export const INVALID_PARAMS: JsonErrorObject = {
  code: -32602,
  message: 'Invalid params',
};

export const INTERNAL_ERROR: JsonErrorObject = {
  code: -32603,
  message: 'Internal error',
};

export const SERVER_ERROR: JsonErrorObject = {
  code: -32000,
  message: 'Server error',
};

export const ID_ERROR: JsonErrorObject = {
  code: -32001,
  message: 'Id error',
};

export const NONCE_ERROR: JsonErrorObject = {
  code: -32002,
  message: 'Nonce error',
};

export const SIGNATURE_ERROR: JsonErrorObject = {
  code: -32003,
  message: 'Signature error',
};

export function getError(errorObj: JsonErrorObject): Error {
  return new Error(
    `${errorObj.message} (${errorObj.code})${
      errorObj.data ? `: ${errorObj.data}` : ''
    }`
  );
}
