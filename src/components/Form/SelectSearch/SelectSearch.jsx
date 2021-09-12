import React, { useState } from 'react';
import style from './SelectSearch.module.scss';
import SelectLib, { components } from 'react-select';
import { Controller } from 'react-hook-form';
import Search from './../../../assets/svg/search.svg';

const Control = ({ children, ...props }) => {
  const style = { cursor: 'pointer', marginLeft: '12.5px' };
  return (
    <components.Control {...props}>
      <span style={{ marginLeft: '12.5px', color: 'red' }}>*</span>
      <span style={style}>
        <img src={Search} alt="" />
      </span>
      {children}
    </components.Control>
  );
};

export const SelectSearch = ({
  appClassName,
  name,
  control,
  options,
  placeholder = '',
  errors
}) => {
  const dot = (color = '#ccc') => ({
    alignItems: 'center',
    display: 'flex'
  });
  const colourStyles = {
    control: (styles, { data, isDisabled, isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: 'white',
      borderRadius: 24,
      boxShadow: 0,
      height: 55.5,
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
        ...defaultStyles
      };
    },
    singleValue: (styles, { data }) => ({ ...styles })
  };
  return (
    <div className={`ui_select_search ${appClassName}`}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <SelectLib
            styles={colourStyles}
            {...field}
            isClearable
            options={options}
            components={{ Control }}
            placeholder={placeholder}
            className={`ui_select_search_container ${errors[name] &&
              'ui_select_search_container_active'}`}
            classNamePrefix={`ui_select_search`}
            isSearchable={true}
          />
        )}
      />
      {errors[name] && (
        <p className={style.error}>Поля обязательные для заполнения</p>
      )}
    </div>
  );
};
