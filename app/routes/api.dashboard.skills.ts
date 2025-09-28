import { ActionFunction, json } from '@remix-run/node';
import { deleteImage, uploadImage } from '~/utils/cloudinary.server';
import { db } from '~/utils/db.server';

export const action: ActionFunction = async ({ request }: { request: Request }) => {
    try {
        const method = request.method;
        if (method === 'POST') {
            const formData = await request.formData();
            const name = formData.get("name")?.toString();
            const photo = formData.get("photo") as File | null;
            if (!name || !photo) return json({ message: 'All Fields are required' }, { status: 400 });
            const photoUrl = await uploadImage(photo);
            const savedData =await db.skillsData.create({
                data: {
                    name,
                    photoUrl
                }
            });
            return json({ message: 'Skill Information added successfully', data: savedData }, { status: 201 });
        }
        else if (method === "PUT") {
            const formData = await request.formData();
            const name = formData.get("name")?.toString();
            const photo = formData.get("photo") as File | null;
            const url = new URL(request.url);
            const id = url.searchParams.get('id') as string
            if (!id) return json({ message: 'Something went wrong' }, { status: 400 });
            const skill = await db.skillsData.findUnique({ where: { id } });
            if (!skill) return json({ message: 'Something went wrong' }, { status: 400 });
            let photoUrl = skill.photoUrl
            if (photo) {
                deleteImage(photoUrl)
                photoUrl = await uploadImage(photo);
            }
            const updatedSkill = await db.skillsData.update({
                where: { id }, data: {
                    name,
                    photoUrl
                }
            });
            return json({ message: 'Skill Information updated successfully', data: updatedSkill }, { status: 200 });
        }
        else if (method === "DELETE") {
            const url = new URL(request.url);
            const id = url.searchParams.get('id') as string
            if (!id) return json({ message: 'Something went wrong' }, { status: 400 });
            const skill = await db.skillsData.findUnique({ where: { id } });
            if (!skill) return json({ message: 'Something went wrong' }, { status: 400 });
            const photoUrl = skill.photoUrl
            if (photoUrl) {
                deleteImage(photoUrl)
            }
            await db.skillsData.delete({ where: { id } });
            return json({ message: 'skill data deleted successfully' }, { status: 200 });
        }
        return json({ message: 'Method not allowed' }, { status: 405 });
    } catch (error) {
        console.error('Error handling rsequest:', error);
        return json({ message: 'Internal server error' }, { status: 500 });
    }
};
