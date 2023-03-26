import { authors, books } from "./data.js";
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql";

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "The author",
  fields: () => {
    return {
      id: { type: GraphQLNonNull(GraphQLInt) },
      name: { type: GraphQLNonNull(GraphQLString) },
      books: {
        type: GraphQLList(BookType),
        resolve: (author) => {
          return books.filter((book) => book.authorId === author.id);
        },
      },
    };
  },
});

const BookType = new GraphQLObjectType({
  name: "Books",
  description: "Type of a book",
  fields: () => {
    return {
      id: { type: GraphQLNonNull(GraphQLInt) },
      title: { type: GraphQLNonNull(GraphQLString) },
      authorId: { type: GraphQLNonNull(GraphQLInt) },
      author: {
        type: AuthorType,
        resolve: (book) => {
          return authors.find((author) => author.id === book.authorId);
        },
      },
    };
  },
});

export const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "This is root query.",
  fields: () => {
    return {
      books: {
        type: GraphQLList(BookType),
        description: "List of all books",
        resolve: () => books,
      },
      authors: {
        type: GraphQLList(AuthorType),
        description: "List of all authors",
        resolve: () => authors,
      },
      book: {
        type: BookType,
        description: "Get a book by id",
        args: { id: { type: GraphQLInt } },
        resolve: (parent, args) => books.find((book) => book.id === args.id),
      },
      author: {
        type: AuthorType,
        description: "Get a author by id",
        args: { id: { type: GraphQLInt } },
        resolve: (parent, args) =>
          authors.find((author) => args.id == author.id),
      },
    };
  },
});

export const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "This is root mutation.",
  fields: () => {
    return {
      addBook: {
        type: BookType,
        args: {
          title: { type: GraphQLNonNull(GraphQLString) },
          authorId: { type: GraphQLNonNull(GraphQLInt) },
        },
        resolve: (parent, args) => {
          const book = {
            id: books.length + 1,
            title: args.title,
            authorId: args.authorId,
          };
          books.push(book);
          return book;
        },
      },
      addAuthor: {
        type: AuthorType,
        description: "Add an author.",
        args: {
          name: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: (parent, args) => {
          const author = {
            id: authors.length + 1,
            name: args.name,
          };
          authors.push(author);
          return author;
        },
      },
    };
  },
});
