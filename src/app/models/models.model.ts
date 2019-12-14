export class User {
  age: number;
  name: string;
  email: string;
}

export class Author {
  id: number;
  name: string;
}

export class Book {
  id: number;
  title: string;
  author: number;
}

export class Library {
  id: number;
  name: string;
  address: string;
  books: Array<number>;
}
