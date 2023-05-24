"use server";

export function greet(name: string) {
  console.log("hola! ", name);

  return `Hello ${name} from server!`;
}

// module state on server
let counter = 0;

export const getCounter = () => counter;

export const increment = () => {
  counter += 1;
};
