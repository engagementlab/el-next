import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface BannerState {
  bannerVisible: boolean;
  hideBanner: () => void;
}

export const useBannerStore = create<BannerState>()(
  persist(
    (set) => ({
      bannerVisible: true,
      hideBanner: () => {
        set({ bannerVisible: false });
      },
    }),
    {
      name: 'banner-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
