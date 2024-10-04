import { Blog } from '@src/types/blog';

export const shuffleBlogs = (blogs: Blog[]) => {
  return blogs.sort(() => Math.random() - 0.5);
};
