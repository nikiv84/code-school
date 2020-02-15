export class Course {
  constructor(
    public id: string,
    public name: string,
    public date: Date
  ) { }
}

export class CourseWithStudents extends Course {
  constructor(
    public id: string,
    public name: string,
    public date: Date,
    public numOfStudents: number
  ) {
    super(id, name, date);
    this.numOfStudents = numOfStudents;
  }
}
