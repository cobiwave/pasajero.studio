import { device } from '@/utils/detect';

interface ShareData {
  title?: string;
  text?: string;
  url: string;
}

const openSharePopup = (network: 'facebook' | 'twitter' | 'linkedin', url: string) => {
  const w = 600;
  const h = 450;
  const left = window.screen.width / 2 - w / 2;
  const top = window.screen.height / 2 - h / 2;
  const encodedUrl = encodeURIComponent(url);

  const shareURL = {
    facebook: `https://www.facebook.com/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
  }[network];

  const popup = window.open(
    shareURL,
    'share',
    `location=1,status=1,scrollbars=1,resizable=1,width=${w},height=${h},top=${top},left=${left}`
  );
  if (popup) popup.opener = null;
};

export const share = {
  async email() {
    const url = window.location.href;
    const title = document.title;
    const emailSubject = 'Check this out';
    const emailBody = `${title}\n${url}`;

    const shareData: ShareData = {
      url,
      title: emailSubject,
      text: emailBody
    };

    try {
      if (device.mobile && navigator.share) {
        await navigator.share(shareData);
        return;
      }

      window.location.href = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    } catch (error) {
      console.error('Error sharing via email:', error);
    }
  },

  async facebook() {
    const url = window.location.href;
    const shareData: ShareData = {
      url,
      title: document.title
    };

    try {
      if (device.mobile && navigator.share) {
        await navigator.share(shareData);
        return;
      }

      openSharePopup('facebook', url);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  },

  async twitter() {
    const url = window.location.href;
    const shareData: ShareData = {
      url,
      title: document.title
    };

    try {
      if (device.mobile && navigator.share) {
        await navigator.share(shareData);
        return;
      }
      openSharePopup('twitter', url);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  },

  async linkedin() {
    const url = window.location.href;
    const shareData: ShareData = {
      url,
      title: document.title
    };

    try {
      if (device.mobile && navigator.share) {
        await navigator.share(shareData);
        return;
      }
      openSharePopup('linkedin', url);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }
};
