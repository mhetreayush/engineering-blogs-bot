import { READ_KEY, UNREAD_KEY } from '@src/constants/key-value-store-keys';
import { kvClient } from '@src/lib/vercel-kv';
import { Blog } from '@src/types/blog';

export async function getRandomBlog() {
  // Fetch unread and read blogs in parallel
  const [unreadBlogs, readBlogs] = (await Promise.all([kvClient.get(UNREAD_KEY), kvClient.get(READ_KEY)])) as [Blog[] | null, Blog[] | null];

  // Check if unread blogs are available
  if (!unreadBlogs || unreadBlogs.length === 0) {
    // If unread list is empty, reset it with read blogs
    if (readBlogs) {
      await kvClient.set(UNREAD_KEY, readBlogs);
      await kvClient.del(READ_KEY); // Clear the read list
      console.log('Resetting unread blogs from read blogs.');
    } else {
      throw new Error('No blogs available.');
    }
  }

  // Now fetch again after resetting
  const updatedUnreadBlogs = ((await kvClient.get(UNREAD_KEY)) ?? []) as Blog[];

  if (updatedUnreadBlogs.length === 0) {
    throw new Error('No unread blogs available after reset.');
  }

  // Get a random blog
  const randomIndex = Math.floor(Math.random() * updatedUnreadBlogs.length);
  const randomBlog = updatedUnreadBlogs[randomIndex];

  // Prepare to update unread and read lists in parallel
  const updatedUnreadBlogsArray = updatedUnreadBlogs.filter((_, index) => index !== randomIndex);

  // Use Promise.all to update the unread and read lists simultaneously
  await Promise.all([
    kvClient.set(UNREAD_KEY, updatedUnreadBlogsArray),
    kvClient.set(READ_KEY, [...(((await kvClient.get(READ_KEY)) ?? []) as Blog[]), randomBlog]),
  ]);

  return randomBlog;
}

export const getRandomBlogController = async (req, res) => {
  try {
    const blog = await getRandomBlog();
    res.status(200).json({ message: 'Random blog fetched.', blog });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
