import { UNREAD_KEY } from '@src/constants/key-value-store-keys';
import { kvClient } from '@src/lib/vercel-kv';
import type { Blog } from '@src/types/blog';
import { Request, Response } from 'express';

const shuffleBlogs = (blogs: Blog[]) => {
  return blogs.sort(() => Math.random() - 0.5);
};

export const addBlogController = async (req: Request, res: Response) => {
  const { blogUrl, blogName } = req.body;

  if (!blogUrl || !blogName) {
    res.status(400).send('Blog URL and Name are required.');
    return;
  }

  // Get existing unread blogs
  const existingUnreadBlogs = ((await kvClient.get(UNREAD_KEY)) ?? []) as Blog[];
  const unreadBlogsArray = existingUnreadBlogs;

  // Add new blog to the unread list
  unreadBlogsArray.push({ blogUrl, blogName });

  // Shuffle the blogs
  shuffleBlogs(unreadBlogsArray);

  await kvClient.set(UNREAD_KEY, unreadBlogsArray);

  res.status(201).json({ message: 'Blog added to unread list.', blog: { blogUrl, blogName } });
};
