import { ActionFunction, json } from '@remix-run/node';
import { deleteImage, uploadImage } from '~/utils/cloudinary.server';
import { db } from '~/utils/db.server';

export const action: ActionFunction = async ({ request }: { request: Request }) => {
    try {
        const method = request.method;
        if (method === 'POST') {
            const formData = await request.formData();
            const company = formData.get("company")?.toString();
            const role = formData.get("role")?.toString();
            const period = formData.get("period")?.toString();
            const description = formData.get("description")?.toString();
            const photo = formData.get("photo") as File | null;
            if (!company || !role || !period || !description || !photo) return json({ message: 'All Fields are required' }, { status: 400 });
            const photoUrl = await uploadImage(photo);
            const savedData =await db.experienceData.create({
                data: {
                    company,
                    role,
                    period,
                    description,
                    photoUrl
                }
            });
            return json({ message: 'Experience Information added successfully', data: savedData }, { status: 201 });
        }
        else if (method === "PUT") {
            const formData = await request.formData();
            const company = formData.get("company")?.toString();
            const role = formData.get("role")?.toString();
            const period = formData.get("period")?.toString();
            const description = formData.get("description")?.toString();
            const photo = formData.get("photo") as File | null;
            const url = new URL(request.url);
            const id = url.searchParams.get('id') as string
            if (!id) return json({ message: 'Something went wrong' }, { status: 400 });
            const experience = await db.experienceData.findUnique({ where: { id } });
            if (!experience) return json({ message: 'Something went wrong' }, { status: 400 });
            let photoUrl = experience.photoUrl
            if (photo) {
                deleteImage(photoUrl)
                photoUrl = await uploadImage(photo);
            }
            const updatedExperience = await db.experienceData.update({
                where: { id }, data: {
                    company,
                    role,
                    period,
                    description,
                    photoUrl
                }
            });
            return json({ message: 'Experience Information updated successfully', data: updatedExperience }, { status: 200 });
        }
        else if (method === "DELETE") {
            const url = new URL(request.url);
            const id = url.searchParams.get('id') as string
            if (!id) return json({ message: 'Something went wrong' }, { status: 400 });
            const experience = await db.experienceData.findUnique({ where: { id } });
            if (!experience) return json({ message: 'Something went wrong' }, { status: 400 });
            const photoUrl = experience.photoUrl
            if (photoUrl) {
                deleteImage(photoUrl)
            }
            await db.experienceData.delete({ where: { id } });
            return json({ message: 'Experience data deleted successfully' }, { status: 200 });
        }
        return json({ message: 'Method not allowed' }, { status: 405 });
    } catch (error) {
        console.error('Error handling rsequest:', error);
        return json({ message: 'Internal server error' }, { status: 500 });
    }
};
