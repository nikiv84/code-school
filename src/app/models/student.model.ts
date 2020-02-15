export class Student {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone?: string
  ) { }
}

export class StudentWithCourses extends Student {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public numOfCourses: number,
    public phone?: string
  ) {
    super(id, firstName, lastName, email, phone);
    this.numOfCourses = numOfCourses;
  }
}
