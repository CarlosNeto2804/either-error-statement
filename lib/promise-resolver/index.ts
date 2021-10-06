import { Either, left, right } from "../either";
export const promiseResolver = (promise: Promise<any>): Promise<Either<any, any>> => {
  return promise.then(right).catch(left);
};
