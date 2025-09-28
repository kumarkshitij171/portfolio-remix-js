import { ActionFunction, json } from '@remix-run/node';
import { deleteImage, uploadImage } from '~/utils/cloudinary.server';
import { db } from '~/utils/db.server';

export const action: ActionFunction = async ({ request }: { request: Request }) => {
    try {
        const method = request.method;
        if (method === 'POST') {
            const formData = await request.formData();
            const title = formData.get("title")?.toString();
            const description = formData.get("description")?.toString();
            const link = formData.get("link")?.toString();
            const photo = formData.get("photo") as File | null;
            if (!title || !link || !description || !photo) return json({ message: 'All Fields are required' }, { status: 400 });
            const photoUrl = await uploadImage(photo);
            const savedData =await db.projectData.create({
                data: {
                    title,
                    description,
                    link,
                    photoUrl
                }
            });
            return json({ message: 'Project Information added successfully', data: savedData }, { status: 201 });
        }
        else if (method === "PUT") {
            const formData = await request.formData();
            const title = formData.get("title")?.toString();
            const description = formData.get("description")?.toString();
            const link = formData.get("link")?.toString();
            const photo = formData.get("photo") as File | null;
            const url = new URL(request.url);
            const id = url.searchParams.get('id') as string
            if (!id) return json({ message: 'Something went wrong' }, { status: 400 });
            const project = await db.projectData.findUnique({ where: { id } });
            if (!project) return json({ message: 'Something went wrong' }, { status: 400 });
            let photoUrl = project.photoUrl
            if (photo) {
                deleteImage(photoUrl)
                photoUrl = await uploadImage(photo);
            }
            const updatedProject = await db.projectData.update({
                where: { id }, data: {
                    title,
                    link,
                    description,
                    photoUrl
                }
            });
            return json({ message: 'Project Information updated successfully', data: updatedProject }, { status: 200 });
        }
        else if (method === "DELETE") {
            const url = new URL(request.url);
            const id = url.searchParams.get('id') as string
            if (!id) return json({ message: 'Something went wrong' }, { status: 400 });
            const project = await db.projectData.findUnique({ where: { id } });
            if (!project) return json({ message: 'Something went wrong' }, { status: 400 });
            const photoUrl = project.photoUrl
            if (photoUrl) {
                deleteImage(photoUrl)
            }
            await db.projectData.delete({ where: { id } });
            return json({ message: 'project data deleted successfully' }, { status: 200 });
        }
        return json({ message: 'Method not allowed' }, { status: 405 });
    } catch (error) {
        console.error('Error handling rsequest:', error);
        return json({ message: 'Internal server error' }, { status: 500 });
    }
};
