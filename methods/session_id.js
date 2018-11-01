module.exports = {
  createUnique: () => {
    let encoded = (Math.random() * 1e32).toString(36);
    return encoded;
  }
};