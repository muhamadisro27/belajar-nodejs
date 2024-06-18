function tagFunction(array, ...args) {
  console.log(array);
  console.log(args);
}

test("tag function", () => {
  const name = "Isro";

  tagFunction`Hello ${name}!, how are you?`;
  tagFunction`Bye ${name}!, see you later!`;
});
