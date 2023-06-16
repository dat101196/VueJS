export const shuffled = (list) =>
  list.sort(() => {
    const rs = Math.random() - 0.5;
    // console.log("a:", a);
    // console.log("b:", b);
    // console.log("rs:", rs);
    return rs;
  });
