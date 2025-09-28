import { json, LoaderFunction, redirect } from '@remix-run/node';
import { requireAuth } from '~/middleware/auth';
import { removeAdminSession } from '~/server/cookies.server';

export const loader:LoaderFunction = async ({ request }: { request: Request }) => {
  try {
    await requireAuth(request);
    const cookie = await removeAdminSession();
    
    return redirect('/login', {
      headers: {
        'Set-Cookie': cookie,
      },
    });
  } catch (error) {
    console.error("Error during sign-out:", error);
    return json({ message: 'Something went wrong during sign-out.' }, { status: 500 });
  }
};
