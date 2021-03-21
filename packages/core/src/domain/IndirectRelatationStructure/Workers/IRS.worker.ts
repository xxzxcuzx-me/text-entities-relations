self.onmessage = (event: MessageEvent<{ question: string }>) => {
  console.log("worker msg", event);

  self.postMessage({
    answer: "XD",
  });
};

console.log("worker init");
