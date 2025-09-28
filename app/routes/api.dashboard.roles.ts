import { ActionFunction, json } from '@remix-run/node';
import { db } from '~/utils/db.server';

export const action: ActionFunction = async ({ request }: { request: Request }) => {
    try {
        const method = request.method;
        if (method === 'POST') {
            const formData = await request.formData();
            const name = formData.get("name")?.toString();
            if (!name) return json({ message: 'All Fields are required' }, { status: 400 });
            const savedData =await db.rolesData.create({
                data: {
                    name,
                }
            });
            return json({ message: 'Role added successfully', data: savedData }, { status: 201 });
        }
        else if (method === "PUT") {
            const formData = await request.formData();
            const name = formData.get("name")?.toString();
            const url = new URL(request.url);
            const id = url.searchParams.get('id') as string
            if (!id) return json({ message: 'Something went wrong' }, { status: 400 });
            const role = await db.rolesData.findUnique({ where: { id } });
            if (!role) return json({ message: 'Something went wrong' }, { status: 400 });
            const updatedRole = await db.rolesData.update({
                where: { id }, data: {
                    name,
                }
            });
            return json({ message: 'Role updated successfully', data: updatedRole }, { status: 200 });
        }
        else if (method === "DELETE") {
            const url = new URL(request.url);
            const id = url.searchParams.get('id') as string
            if (!id) return json({ message: 'Something went wrong' }, { status: 400 });
            const role = await db.rolesData.findUnique({ where: { id } });
            if (!role) return json({ message: 'Something went wrong' }, { status: 400 });
            await db.rolesData.delete({ where: { id } });
            return json({ message: 'Role deleted successfully' }, { status: 200 });
        }
        return json({ message: 'Method not allowed' }, { status: 405 });
    } catch (error) {
        console.error('Error handling request:', error);
        return json({ message: 'Internal server error' }, { status: 500 });
    }
};
