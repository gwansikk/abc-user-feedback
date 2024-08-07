/**
 * Copyright 2023 LINE Corporation
 *
 * LINE Corporation licenses this file to you under the Apache License,
 * version 2.0 (the "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at:
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
import type { Props } from 'react-select';
import ReactSelect from 'react-select';

import { Badge, Icon } from '@ufb/ui';

import { cn } from '@/shared';

export interface ISelectBoxProps<Option, IsMulti extends boolean>
  extends Props<Option, IsMulti> {
  isExpand?: boolean;
  label?: string;
  width?: number;
  height?: number;
}

function SelectBox<Option = unknown, IsMulti extends boolean = false>(
  props: ISelectBoxProps<Option, IsMulti>,
) {
  const {
    isExpand,
    label,
    classNames,
    height = 40,
    width,
    styles,
    ...reactSelectProps
  } = props;

  const component = () => (
    <ReactSelect
      classNames={{
        control: ({ isFocused, isDisabled }) =>
          cn([
            'border rounded py-2 px-3 gap-2 min-h-10 min-w-[120px]',
            isFocused ? 'border-fill-primary' : 'border-fill-tertiary',
            isDisabled ? 'bg-fill-tertiary' : 'bg-primary',
          ]),
        dropdownIndicator: ({ isFocused }) =>
          isFocused ? 'text-primary' : 'text-secondary',
        placeholder: () => 'text-secondary',
        menu: () => 'border rounded mt-2 bg-primary shadow overflow-hidden',
        option: ({ isFocused, isSelected }) =>
          cn([
            'px-3 py-2',
            {
              'bg-fill-tertiary': isFocused,
              'bg-fill-secondary font-bold': isSelected,
            },
          ]),
        noOptionsMessage: () => 'p-3 text-secondary',
        singleValue: () => 'font-12-regular',
        valueContainer: () => 'gap-1',
        input: () => 'font-12-regular',
        indicatorsContainer: () => 'flex gap-2',
        ...classNames,
      }}
      styles={{
        valueContainer: (base) => ({
          ...base,
          flexWrap: isExpand ? 'wrap' : 'nowrap',
        }),
        menuPortal: (base) => ({ ...base, zIndex: 100 }),
        control: (base) => ({ ...base, width: width ?? 'full', height }),
        ...styles,
      }}
      components={{
        IndicatorSeparator: () => null,
        ClearIndicator: ({ innerProps }) => (
          <div {...innerProps}>
            <Icon
              name="CloseCircleFill"
              className="text-tertiary hover:text-primary cursor-pointer"
              size={20}
            />
          </div>
        ),
        MultiValue: ({ children, selectProps, removeProps }) => {
          return (
            <Badge
              type="secondary"
              size="sm"
              right={
                !selectProps.isDisabled ?
                  { iconName: 'Close', onClick: removeProps.onClick }
                : undefined
              }
            >
              {children}
            </Badge>
          );
        },
      }}
      menuPortalTarget={document.body}
      unstyled
      {...reactSelectProps}
    />
  );

  if (label) {
    return (
      <div>
        <label className="input-label mb-2">
          {label}
          {props.required && <span className="text-red-primary ml-1">*</span>}
        </label>
        {component()}
      </div>
    );
  }
  return component();
}

export default SelectBox;
