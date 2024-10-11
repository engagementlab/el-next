import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface BannerState {
  fullBanner: boolean;
  toggleFullBanner: (hide: boolean) => void;
}

export const useBannerStore = create<BannerState>()(
  persist(
    (set) => ({
      fullBanner: true,
      toggleFullBanner: (hide: boolean) => {
        set({ fullBanner: hide });
      },
    }),
    {
      name: 'banner-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
