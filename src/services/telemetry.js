import { doc, setDoc, getDoc, collection, getCountFromServer, increment } from 'firebase/firestore';
import { db } from '../firebase';

function getTodayString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const trackChatbotQuery = async () => {
  try {
    const today = getTodayString();
    await setDoc(
      doc(db, 'stats', 'global'),
      {
        chatbotQueries: increment(1),
        [`dailyQueries.${today}`]: increment(1),
      },
      { merge: true }
    );
  } catch (e) {
    console.warn('Telemetry: trackChatbotQuery failed:', e);
  }
};

export const trackProjectClick = async (projectId) => {
  if (!projectId) return;
  try {
    const safeId = projectId.replace(/\./g, '_');
    await setDoc(
      doc(db, 'stats', 'global'),
      {
        [`projectClicks.${safeId}`]: increment(1),
      },
      { merge: true }
    );
  } catch (e) {
    console.warn('Telemetry: trackProjectClick failed:', e);
  }
};

export const trackLanguageChange = async (lang) => {
  if (!lang) return;
  try {
    await setDoc(
      doc(db, 'stats', 'global'),
      {
        [`languages.${lang}`]: increment(1),
      },
      { merge: true }
    );
  } catch (e) {
    console.warn('Telemetry: trackLanguageChange failed:', e);
  }
};

export const trackVisitor = async () => {
  try {
    const isNewSession = !sessionStorage.getItem('portfolio_session_tracked');
    const updateData = {
      pageViews: increment(1),
    };
    if (isNewSession) {
      sessionStorage.setItem('portfolio_session_tracked', 'true');
      updateData.visitorCount = increment(1);
    }
    await setDoc(
      doc(db, 'stats', 'global'),
      updateData,
      { merge: true }
    );
  } catch (e) {
    console.warn('Telemetry: trackVisitor failed:', e);
  }
};

export const fetchTelemetryData = async () => {
  try {
    const docSnap = await getDoc(doc(db, 'stats', 'global'));
    const globalData = docSnap.exists() ? docSnap.data() : {};

    let contactsCount = 0;
    try {
      const coll = collection(db, 'contacts');
      const countSnap = await getCountFromServer(coll);
      contactsCount = countSnap.data().count;
    } catch (err) {
      console.warn('Telemetry count contacts failed:', err);
    }

    let guestbookCount = 0;
    try {
      const coll = collection(db, 'guestbook');
      const countSnap = await getCountFromServer(coll);
      guestbookCount = countSnap.data().count;
    } catch (err) {
      console.warn('Telemetry count guestbook failed:', err);
    }

    return {
      chatbotQueries: globalData.chatbotQueries || 0,
      visitorCount: globalData.visitorCount || 0,
      pageViews: globalData.pageViews || 0,
      contactsCount,
      guestbookCount,
      projectClicks: globalData.projectClicks || {},
      languages: globalData.languages || {},
      dailyQueries: globalData.dailyQueries || {},
    };
  } catch (e) {
    console.error('Telemetry: fetchTelemetryData failed:', e);
    throw e;
  }
};
