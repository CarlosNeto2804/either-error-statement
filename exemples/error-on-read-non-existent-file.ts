import * as fs from "fs/promises";
import { Either, promiseResolver, left, right } from "../lib";

class CustomError {
  message: string;
  stack: string;
  name: string;
  constructor(err: Error) {
    this.message = err.message;
    this.stack = err.stack;
    this.name = err.name;
  }
}

const readFile = async (): Promise<Either<CustomError, string>> => {
  const result: Either<Error, Buffer> = await promiseResolver(
    fs.readFile("non-existent-file.txt")
  );

  if (result.isLeft()) {
    return left(new CustomError(result.value));
  }

  return right(result.value.toString("utf-8"));
};

(async () => {
  const res = await readFile();
  console.log(res.value);
  /**
   * // output
   * CustomError {
        message: "ENOENT: no such file or directory, open 'non-existent-file.txt'",
        stack: "Error: ENOENT: no such file or directory, open 'non-existent-file.txt'",
        name: 'Error'
    }
   */
})();
