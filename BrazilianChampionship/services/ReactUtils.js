class ReactUtils{

    // Sequence generator function (commonly referred to as "range", e.g. Clojure, PHP, etc.)
    range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

}

const reactUtils = new ReactUtils();
export default reactUtils;