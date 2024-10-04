import { READ_KEY, UNREAD_KEY } from '@src/constants/key-value-store-keys';
import { shuffleBlogs } from '@src/helpers/shuffle-blogs';
import { kvClient } from '@src/lib/vercel-kv';
import { Blog } from '@src/types/blog';

async function resetBlogs() {
  // Fetch the read blogs
  const readBlogs = (await kvClient.get(READ_KEY)) as Blog[] | null;

  if (!readBlogs || readBlogs.length === 0) {
    throw new Error('No read blogs available to reset.');
  }

  // Fetch the unread blogs
  const unreadBlogs = (await kvClient.get(UNREAD_KEY)) as Blog[] | null;

  // Combine read blogs with unread blogs
  const combinedUnreadBlogs = [...readBlogs, ...(unreadBlogs ?? [])];

  shuffleBlogs(combinedUnreadBlogs);

  // Reset unread blogs with the combined list and clear the read list
  await Promise.all([
    kvClient.set(UNREAD_KEY, combinedUnreadBlogs), // Add read blogs to unread list
    kvClient.del(READ_KEY), // Clear the read list
  ]);

  console.log('Blogs have been reset successfully.');
}

export const resetBlogsController = async (req, res) => {
  try {
    await resetBlogs();
    res.status(200).json({ message: 'Blogs have been reset successfully.' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
