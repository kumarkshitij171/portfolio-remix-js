import { PortfolioData } from '~/types/portfolio';
import { db } from '~/utils/db.server';

export const loadData = async (): Promise<PortfolioData> => {
  try {
    const aboutPromise = db.aboutData.findFirst();
    const personalPromise = db.personalData.findFirst();
    const rolesPromise = db.rolesData.findMany();
    const experiencesPromise = db.experienceData.findMany({
      orderBy: {
        creationDate: 'desc',
      }
    });
    const projectsPromise = db.projectData.findMany({
      orderBy: {
        creationDate: 'desc',
      }
    });
    const skillsPromise = db.skillsData.findMany({
      orderBy: {
        creationDate: 'desc',
      }
    });
    const educationPromise = db.educationData.findMany({
      orderBy: {
        creationDate: 'desc',
      }
    });
    const contactInfoPromise = db.contactInfoData.findMany({
      orderBy: {
        creationDate: 'desc',
      }
    });

    const [
      aboutData,
      personalData,
      rolesData,
      experiencesData,
      projectsData,
      skillsData,
      educationData,
      contactInfoData
    ] = await Promise.all([
      aboutPromise,
      personalPromise,
      rolesPromise,
      experiencesPromise,
      projectsPromise,
      skillsPromise,
      educationPromise,
      contactInfoPromise
    ]);

    return {
      personal: personalData || {
        id: '',
        name: '',
        headline: '',
        resumeLink: '',
        photoUrl: ''
      },
      about: aboutData || { 
        id: '', 
        about: '' 
      },
      roles: rolesData || [],
      experiences: experiencesData || [],
      projects: projectsData || [],
      skills: skillsData || [],
      education: educationData || [],
      contactInfo: contactInfoData || []
    };
  } catch (error) {
    console.error("Error in loadData: ", error);
    return {
      personal: {
        id: '',
        name: '',
        headline: '',
        resumeLink: '',
        photoUrl: ''
      },
      about: { 
        id: '', 
        about: '' 
      },
      roles: [],
      experiences: [],
      projects: [],
      skills: [],
      education: [],
      contactInfo: []
    };
  }
};