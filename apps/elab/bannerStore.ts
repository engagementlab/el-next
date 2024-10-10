import { BlobOptions } from 'buffer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BannerState {
  showBanner: boolean;
  hideBanner: (show: boolean) => void;
}
// the store itself does not need any change
export const useBannerStore = create<BannerState>()(
  persist(
    (set) => ({
      showBanner: true,
      hideBanner: (show: boolean) => {
        set({ showBanner: show });
      },
    }),
    {
      name: 'banner-store',
    }
  )
);
