class ReactUtils{

    // Sequence generator function (commonly referred to as "range", e.g. Clojure, PHP, etc.)
    range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

    rangeMidSeason = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => String(start + (i * step)) + '-' + this.temporadaSeguinte(start, i, step));

    temporadaSeguinte = (start, i, step) => {
        let nextSeason = start - 2000 + ((i+1) * step);
        if(nextSeason < 10){
            return '0' + String(nextSeason);
        }
        return String(nextSeason);
    }
}

const reactUtils = new ReactUtils();
export default reactUtils;