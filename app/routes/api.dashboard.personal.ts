
import { ActionFunction, json } from '@remix-run/node';
import { uploadImage } from '~/utils/cloudinary.server';
import { db } from '~/utils/db.server';

export const action: ActionFunction = async ({ request }: { request: Request }) => {
    try {
        const formData = await request.formData();
        let photo = formData.get("photo") as File | string | null;
        const name = formData.get("name")?.toString();
        const headline = formData.get("headline")?.toString();
        const resumeLink = formData.get("resumeLink")?.toString();
        if (photo) {
            photo = await uploadImage(photo);
        }
        if (!name || !headline || !resumeLink) return json({ message: 'Personal data is required' }, { status: 400 });
    
        const method = request.method;
        if (method === 'POST') {
            const savedData =await db.personalData.create({
                data: {
                    name,
                    headline,
                    resumeLink,
                    photoUrl: photo 
                }
            });
            return json({ message: 'Personal data added successfully', data: savedData }, { status: 201 });
        }
        else if (method === "PUT") {
            const url = new URL(request.url);
            const id = url.searchParams.get('id') as string
            if (!id) return json({ message: 'Something went wrong' }, { status: 400 });
            const data = await db.personalData.findUnique({ where: { id } });
            if (!data) return json({ message: 'Something went wrong' }, { status: 400 });
            let photoUrl = data?.photoUrl;
            if(photo){
                photoUrl = photo;
            }
            const updatedData = await db.personalData.update({ where: { id }, data: { 
                name,
                headline,
                resumeLink,
                photoUrl 
               }});
            return json({ message: 'Personal data updated successfully', data: updatedData }, { status: 200 });
        }
        return json({ message: 'Method not allowed' }, { status: 405 });
    } catch (error) {
        console.error('Error handling request:', error);
        return json({ message: 'Internal server error' }, { status: 500 });
    }
};
