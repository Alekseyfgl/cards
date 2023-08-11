let timerId;

function doItAfter(ms) {
    return new Promise((resolve) => {
        timerId = setTimeout(() => {
            resolve({ name: 'Alex' });
        }, ms);
    });
}

doItAfter(5000).then((r) => console.log(r));

// clearTimeout(timerId);
