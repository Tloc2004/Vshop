import { create } from "zustand";

interface FeatureState {
  screenshotModeEnabled: boolean;
  toggleScreenshotMode: () => void;
}

export const useFeatureStore = create<FeatureState>((set) => ({
  screenshotModeEnabled: false,
  toggleScreenshotMode: () =>
    set((state) => ({ screenshotModeEnabled: !state.screenshotModeEnabled })),
}));
