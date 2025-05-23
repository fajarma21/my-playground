import type { OptionData } from '@/app/client-video-converter/types';

export interface OptionsProps {
  data: OptionData;
  display: boolean;
  onChange: (value: OptionData) => void;
}
