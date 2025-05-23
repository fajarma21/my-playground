import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';
import styles from './View.module.css';
import type { OptionsProps } from './View.types';

const Options = ({ data, display, onChange }: OptionsProps) => {
  const { duration, frameRate, height, width } = data;

  const initData = useRef(data);
  const [isCustom, setIsCustom] = useState(false);

  const handleChangeText = (
    e: ChangeEvent<HTMLInputElement>,
    key: string,
    max?: number
  ) => {
    let value = e.target.value;
    const onlyDigit = new RegExp(/\d/, 'g');
    if (!value.match(onlyDigit) || Number(value) <= 0) return;

    if (max) value = Number(value) > max ? String(max) : value;

    if (key === 'height' || key === 'width') {
      const siblingKey = key === 'height' ? 'width' : 'height';
      const siblingValue =
        (Number(value) * Number(initData.current[siblingKey])) /
        Number(initData.current[key]);
      onChange({
        ...data,
        [key]: value,
        [siblingKey]: String(Math.round(siblingValue)),
      });
    } else {
      onChange({
        ...data,
        [key]: value,
      });
    }
  };

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value !== 'custom') {
      onChange({
        ...data,
        frameRate: e.target.value,
      });
    }
    setIsCustom(value === 'custom');
  };

  return (
    <div className={styles.options} data-title="Options">
      {display ? (
        <>
          <section>
            <label htmlFor="width">Width</label>
            <div className={styles.multipleInput}>
              <input
                type="number"
                id="width"
                min={1}
                value={width}
                onChange={(e) => handleChangeText(e, 'width')}
              />
              <input
                type="range"
                min={1}
                max={Number(initData.current.width) * 2}
                value={width}
                onChange={(e) => handleChangeText(e, 'width')}
              />
            </div>
          </section>
          <section>
            <label htmlFor="height">Height</label>
            <input
              type="number"
              id="height"
              min={1}
              value={height}
              onChange={(e) => handleChangeText(e, 'height')}
            />
          </section>
          <section>
            <label htmlFor="duration">Duration</label>
            <div className={styles.multipleInput}>
              <input
                type="number"
                id="duration"
                min={1}
                max={Number(initData.current.duration)}
                value={duration}
                onChange={(e) =>
                  handleChangeText(
                    e,
                    'duration',
                    Number(initData.current.duration)
                  )
                }
              />
              <input
                type="range"
                min={1}
                max={Number(initData.current.duration)}
                step={0.1}
                value={duration}
                onChange={(e) => handleChangeText(e, 'duration')}
              />
            </div>
          </section>
          <section>
            <label htmlFor="frameRate">Frame Rate</label>
            <div className={styles.multipleInput}>
              <select id="frameRate" onChange={handleChangeSelect}>
                <option value="">Default</option>
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="30">30</option>
                <option value="custom">Custom</option>
              </select>
              {isCustom && (
                <input
                  type="number"
                  value={frameRate}
                  onChange={(e) => handleChangeText(e, 'frameRate')}
                />
              )}
            </div>
          </section>
        </>
      ) : (
        <p className={styles.empty}>You have to select the video first.</p>
      )}
    </div>
  );
};

export default Options;
