import { ActionFunction, json } from '@remix-run/node';
import { deleteImage, uploadImage } from '~/utils/cloudinary.server';
import { db } from '~/utils/db.server';

export const action: ActionFunction = async ({ request }: { request: Request }) => {
    try {
        const method = request.method;
        if (method === 'POST') {
            const formData = await request.formData();
            const type = formData.get("type")?.toString();
            const value = formData.get("value")?.toString();
            const photo = formData.get("photo") as File | null;
            if (!type || !value || !photo) return json({ message: 'All Fields are required' }, { status: 400 });
            const photoUrl = await uploadImage(photo);
            const savedData =await db.contactInfoData.create({
                data: {
                    type,
                    value,
                    photoUrl
                }
            });
            return json({ message: 'Contact Information added successfully', data: savedData }, { status: 201 });
        }
        else if (method === "PUT") {
            const formData = await request.formData();
            const type = formData.get("type")?.toString();
            const value = formData.get("value")?.toString();
            const photo = formData.get("photo") as File | null;
            const url = new URL(request.url);
            const id = url.searchParams.get('id') as string
            if (!id) return json({ message: 'Something went wrong' }, { status: 400 });
            const contactInfo = await db.contactInfoData.findUnique({ where: { id } });
            if (!contactInfo) return json({ message: 'Something went wrong' }, { status: 400 });
            let photoUrl = contactInfo.photoUrl
            if (photo) {
                deleteImage(photoUrl)
                photoUrl = await uploadImage(photo);
            }
            const updatedcontactInfo = await db.contactInfoData.update({
                where: { id }, data: {
                    type,
                    value,
                    photoUrl
                }
            });
            return json({ message: 'Contact Information updated successfully', data: updatedcontactInfo }, { status: 200 });
        }
        else if (method === "DELETE") {
            const url = new URL(request.url);
            const id = url.searchParams.get('id') as string
            if (!id) return json({ message: 'Something went wrong' }, { status: 400 });
            const contactInfo = await db.contactInfoData.findUnique({ where: { id } });
            if (!contactInfo) return json({ message: 'Something went wrong' }, { status: 400 });
            const photoUrl = contactInfo.photoUrl
            if (photoUrl) {
                deleteImage(photoUrl)
            }
            await db.contactInfoData.delete({ where: { id } });
            return json({ message: 'contactInfo data deleted successfully' }, { status: 200 });
        }
        return json({ message: 'Method not allowed' }, { status: 405 });
    } catch (error) {
        console.error('Error handling rsequest:', error);
        return json({ message: 'Internal server error' }, { status: 500 });
    }
};
