import { ActionFunction, json } from '@remix-run/node';
import { db } from '~/utils/db.server';

export const action: ActionFunction = async ({ request }: { request: Request }) => {
  const method = request.method;
  try {
    if (method === 'POST') {
      const formData = await request.formData();
      const about = formData.get("about")?.toString();
      if (!about) return json({ message: 'About data is required' }, { status: 400 });

      const savedData = await db.aboutData.create({ data: { about } });
      return json({ message: 'About data added successfully', data: savedData }, { status: 201 });
    }
    else if (method === "PUT") {
      const formData = await request.formData();
      const about = formData.get("about")?.toString();
      if (!about) return json({ message: 'About data is required' }, { status: 400 });
      const url = new URL(request.url);
      const id = url.searchParams.get('id') as string
      if (!id) return json({ message: 'Something went wrong' }, { status: 400 });
      const updatedData = await db.aboutData.update({ where: { id }, data: { about } });
      return json({ message: 'About data updated successfully', data: updatedData }, { status: 200 });
    }
    return json({ message: 'Method not allowed' }, { status: 405 });
  } catch (error) {
    console.error('Error handling request:', error);
    return json({ message: 'Internal server error' }, { status: 500 });
  }
};
