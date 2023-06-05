const x = [1, 5, 8];

console.log(
    x.map((n) => {
        if (n === 1) {
            return n * 100;
        } else {
            return n;
        }
    })
);
