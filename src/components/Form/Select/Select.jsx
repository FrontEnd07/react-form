import React, { useState } from 'react';
import style from './Select.module.scss';
import SelectLib from 'react-select';
import { Controller } from 'react-hook-form';

export const Select = ({
  appClassName,
  name,
  control,
  options,
  placeholder = '',
  errors
}) => {
  const dot = (color = '#ccc') => ({
    alignItems: 'center',
    display: 'flex',

    ':before': {
      // backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 8,
      height: 10,
      width: 10
    }
  });

  const colourStyles = {
    control: (styles, { data, isDisabled, isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: 'white',
      borderRadius: 24,
      boxShadow: 0,
      height: 55.5,
      // backgroundColor: isFocused ? 'rgba(215, 44, 51, 0.07)' : null,
      borderColor: isFocused ? 'red' : 'rgba(245, 245, 245, 0.8)',
      ':hover': {
        borderColor: 'red'
      },
      ':active': {
        borderColor: 'red'
      },
      cursor: 'pointer'
    }),
    menu: (provided, state) => ({
      ...provided,
      color: '#000',
      borderRadius: 24,
      overflow: 'hidden',
      zIndex: 10
    }),
    menuList: (provided, state) => ({
      ...provided,
      padding: 0
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: 'none'
    }),
    dropdownIndicator: styles => ({
      padding: '0 10px',
      display: 'flex',
      '& svg': {
        height: 50,
        width: 50
      }
    }),
    clearIndicator: styles => ({
      border: '2px solid rgba(162, 162, 174, 1)',
      borderRadius: '50%',
      display: 'flex',
      svg: {
        color: 'rgba(162, 162, 174, 1)'
      }
    }),
    valueContainer: styles => ({
      height: 55.5
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = 'red';
      return {
        ...styles,
        padding: 15,
        backgroundColor: isSelected
          ? 'rgba(245, 245, 245, 0.8)'
          : null
          ? 'rgba(245, 245, 245, 0.8)'
          : null,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? 'white' > 2
            ? 'white'
            : 'black'
          : data.color,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        zIndex: '1000',
        ':active': {
          ...styles[':active'],
          backgroundColor: 'rgba(245, 245, 245, 0.8)'
        },
        ':hover': {
          ...styles[':active'],
          backgroundColor:
            !isDisabled &&
            (isSelected ? data.color : 'rgba(245, 245, 245, 0.8)')
        }
      };
    },
    input: styles => ({ ...styles, ...dot() }),
    placeholder: (defaultStyles, { isFocused }) => {
      return {
        ...defaultStyles,
        left: 10,
        transform: isFocused
          ? 'translate(-5px, -20px) scale(0.8)'
          : 'translateY(-50%)',
        transition:
          'color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
        '&:after': {
          content: '"*"',
          color: 'red',
          opacity: 1
        }
      };
    },
    singleValue: (styles, { data }) => ({ ...styles, left: 10 })
  };

  return (
    <div className={`ui_select ${appClassName}`}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <SelectLib
              {...field}
              styles={colourStyles}
              options={options}
              placeholder={placeholder}
              className={`ui_select_container ${errors[name] &&
                'ui_select_container_active'}`}
              classNamePrefix={`ui_select`}
              isSearchable={false}
              isClearable
            />
          </>
        )}
      />
      {errors[name] && (
        <p className={style.error}>Поля обязательные для заполнения</p>
      )}
    </div>
  );
};
