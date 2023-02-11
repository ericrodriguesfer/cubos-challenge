class Interval {
  start: Date;
  end: Date;

  constructor({ start, end }: Interval) {
    this.start = start;
    this.end = end;
  }
}

export { Interval };
