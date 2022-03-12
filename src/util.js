 //return the number of days employees have worked on the same project together
export const checkOverlap = (emp1Start, emp1End, emp2Start, emp2End) => {

    const startDate1 = new Date(emp1Start);
    const endDate1 = emp1End === null ? new Date() : new Date(emp1End);
    const startDate2 = new Date(emp2Start);
    const endDate2 = emp2End === null ? new Date() : new Date(emp2End);

    const start = startDate1 < startDate2 ? startDate2 : startDate1;
    const end = endDate1 < endDate2 ? endDate1 : endDate2;

    if (end > start) {
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  }
  //get each possible pair
  Array.prototype.pairs = function (func) {
    for (let i = 0; i < this.length - 1; i++) {
      for (let j = i; j < this.length - 1; j++) {
        return func([this[i], this[j + 1]]);
      }
    }
  }  