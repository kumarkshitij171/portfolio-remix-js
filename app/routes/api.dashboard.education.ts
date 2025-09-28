import { ActionFunction, json } from '@remix-run/node';
import { deleteImage, uploadImage } from '~/utils/cloudinary.server';
import { db } from '~/utils/db.server';

export const action: ActionFunction = async ({ request }: { request: Request }) => {
    try {
        const method = request.method;
        if (method === 'POST') {
            const formData = await request.formData();
            const institution = formData.get("institution")?.toString();
            const degree = formData.get("degree")?.toString();
            const period = formData.get("period")?.toString();
            const photo = formData.get("photo") as File | null;
            if (!institution || !degree || !period || !photo) return json({ message: 'All Fields are required' }, { status: 400 });
            const photoUrl = await uploadImage(photo);
            const savedData =await db.educationData.create({
                data: {
                    institution,
                    degree,
                    period,
                    photoUrl
                }
            });
            return json({ message: 'Education Information added successfully', data: savedData }, { status: 201 });
        }
        else if (method === "PUT") {
            const formData = await request.formData();
            const institution = formData.get("institution")?.toString();
            const degree = formData.get("degree")?.toString();
            const period = formData.get("period")?.toString();
            const photo = formData.get("photo") as File | null;
            const url = new URL(request.url);
            const id = url.searchParams.get('id') as string
            if (!id) return json({ message: 'Something went wrong' }, { status: 400 });
            const education = await db.educationData.findUnique({ where: { id } });
            if (!education) return json({ message: 'Something went wrong' }, { status: 400 });
            let photoUrl = education.photoUrl
            if (photo) {
                deleteImage(photoUrl)
                photoUrl = await uploadImage(photo);
            }
            const updatededucation = await db.educationData.update({
                where: { id }, data: {
                    institution,
                    degree,
                    period,

                    photoUrl
                }
            });
            return json({ message: 'Education Information updated successfully', data: updatededucation }, { status: 200 });
        }
        else if (method === "DELETE") {
            const url = new URL(request.url);
            const id = url.searchParams.get('id') as string
            if (!id) return json({ message: 'Something went wrong' }, { status: 400 });
            const education = await db.educationData.findUnique({ where: { id } });
            if (!education) return json({ message: 'Something went wrong' }, { status: 400 });
            const photoUrl = education.photoUrl
            if (photoUrl) {
                deleteImage(photoUrl)
            }
            await db.educationData.delete({ where: { id } });
            return json({ message: 'education data deleted successfully' }, { status: 200 });
        }
        return json({ message: 'Method not allowed' }, { status: 405 });
    } catch (error) {
        console.error('Error handling rsequest:', error);
        return json({ message: 'Internal server error' }, { status: 500 });
    }
};
