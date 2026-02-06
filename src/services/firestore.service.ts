import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    addDoc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase.config';

// User Preferences
export interface UserPreferences {
    dietary?: string[];
    favorites?: string[];
    allergies?: string[];
}

export const updateUserPreferences = async (userId: string, preferences: UserPreferences) => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, { preferences });
};

// Mail Summaries
export interface MailSummary {
    id?: string;
    userId: string;
    emailContent: string;
    summary: string;
    category: string;
    priority: string;
    createdAt: Date;
}

export const saveMailSummary = async (summary: MailSummary) => {
    const summariesRef = collection(db, 'mailSummaries');
    const docRef = await addDoc(summariesRef, {
        ...summary,
        createdAt: Timestamp.fromDate(summary.createdAt),
    });
    return docRef.id;
};

export const getUserMailSummaries = async (userId: string, limitCount = 10) => {
    const summariesRef = collection(db, 'mailSummaries');
    const q = query(
        summariesRef,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as MailSummary));
};

// Lost & Found Items
export interface LostFoundItem {
    id?: string;
    userId: string;
    userName: string;
    type: 'lost' | 'found';
    title: string;
    description: string;
    imageUrl?: string;
    aiTags: string[];
    location: string;
    contactInfo: string;
    status: 'active' | 'claimed' | 'resolved';
    createdAt: Date;
}

export const addLostFoundItem = async (item: LostFoundItem) => {
    const itemsRef = collection(db, 'lostFound');
    const itemData = {
        ...item,
        createdAt: Timestamp.fromDate(item.createdAt),
    };
    const docRef = await addDoc(itemsRef, itemData);
    return docRef.id;
};

export const getLostFoundItems = async (type?: 'lost' | 'found', limitCount = 20) => {
    const itemsRef = collection(db, 'lostFound');
    let q;

    if (type) {
        q = query(
            itemsRef,
            where('type', '==', type),
            where('status', '==', 'active'),
            orderBy('createdAt', 'desc'),
            limit(limitCount)
        );
    } else {
        q = query(
            itemsRef,
            where('status', '==', 'active'),
            orderBy('createdAt', 'desc'),
            limit(limitCount)
        );
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as LostFoundItem));
};

export const updateLostFoundStatus = async (itemId: string, status: 'active' | 'claimed' | 'resolved') => {
    const itemRef = doc(db, 'lostFound', itemId);
    await updateDoc(itemRef, { status });
};

// Announcements
export interface Announcement {
    id?: string;
    title: string;
    content: string;
    category: 'Academic' | 'Event' | 'Urgent' | 'General';
    priority: 'High' | 'Medium' | 'Low';
    createdAt: Date;
    expiresAt?: Date;
}

export const getAnnouncements = async (limitCount = 10) => {
    const announcementsRef = collection(db, 'announcements');
    const q = query(
        announcementsRef,
        orderBy('createdAt', 'desc'),
        limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Announcement));
};

// Real-time listener for announcements
export const subscribeToAnnouncements = (callback: (announcements: Announcement[]) => void) => {
    const announcementsRef = collection(db, 'announcements');
    const q = query(announcementsRef, orderBy('createdAt', 'desc'), limit(10));

    return onSnapshot(q, (snapshot) => {
        const announcements = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        } as Announcement));
        callback(announcements);
    });
};

// Study Schedules
export interface StudySchedule {
    id?: string;
    userId: string;
    subjects: string[];
    schedule: string;
    tips: string[];
    examDates?: Record<string, string>;
    createdAt: Date;
}

export const saveStudySchedule = async (schedule: StudySchedule) => {
    const schedulesRef = collection(db, 'studySchedules');
    const docRef = await addDoc(schedulesRef, {
        ...schedule,
        createdAt: Timestamp.fromDate(schedule.createdAt),
    });
    return docRef.id;
};

export const getUserStudySchedules = async (userId: string) => {
    const schedulesRef = collection(db, 'studySchedules');
    const q = query(
        schedulesRef,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(5)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as StudySchedule));
};
