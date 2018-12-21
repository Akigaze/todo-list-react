export const allEqualTo = (received, value) => {
  const pass = received.every(i => i === value);
  if (pass) {
    return {
      message: () => `expected ${received} all to be ${value}.`,
      pass: true
    };
  } else {
    const differ = received.find(i => i !== value);
    return {
      message: () => `expected ${received} all to be ${value}, but ${differ} is not equal to ${value}.`,
      pass: false
    };
  }
};
