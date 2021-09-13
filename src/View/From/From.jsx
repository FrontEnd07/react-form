import React, { useState, useRef } from 'react';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import style from './From.module.scss';
import FormStore from './FormStore/FormStore';
import { Button } from './../../components/Button/Button';
import Checked from './../../assets/svg/checked.svg';
import { formAC } from './../../store/reducers/Form/Form';
import { LField, Select, SelectSearch } from './../../components/Form/';

const schema = yup.object().shape({
  level_education: yup.object().required('empty'),
  year_ending: yup.string().required('empty'),
  select_university: yup.object().required('empty'),
  diploma_series: yup.string().required('empty'),
  diploma_number: yup.string().required('empty'),
  diploma_specialty: yup.string().required('empty'),
  diploma_qualification: yup.string().required('empty'),
  file: yup.mixed().required('empty')
});

const checkboxFalse = yup.object().shape({
  checkbox: yup.boolean().required('empty')
});

const checkboxTrue = yup.object().shape({
  checkbox: yup.boolean().default(true)
});

const From = () => {
  const [checkbox, setCheckbox] = useState(true);
  const [formStore, setFormStore] = useState(null);
  const [nameFile, setNameFile] = useState(null);

  const dispatch = useDispatch();
  const inputFile = useRef(null);

  const diploma_number = useRef();
  const diploma_specialty = useRef();
  const diploma_qualification = useRef();
  const onButtonClick = () => {
    inputFile.current.click();
  };
  const merged = checkbox
    ? schema.concat(checkboxTrue)
    : schema.concat(checkboxFalse);

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(merged)
  });

  const handlerSubmit = data => {
    dispatch(formAC(data));
    setFormStore(true);
  };

  const levelEducation = [
    { value: 1, label: 'Среднее профессиональное' },
    { value: 2, label: 'Высшее профессиональное' },
    { value: 3, label: 'Низкая профессиональное' }
  ];

  const options = [
    { value: 'chocolate', label: 'МТУСАВУ' },
    { value: 'strawberry', label: 'МТУШШ' },
    { value: 'vanilla', label: 'МТУСИИ' }
  ];

  return (
    <div className={style.main}>
      <div className={style.blockForm}>
        <div
          style={formStore ? null : { marginLeft: 'auto', marginRight: 'auto' }}
          className={style.form}
        >
          <div>
            <div>
              <Select
                control={control}
                name="level_education"
                options={levelEducation}
                appClassName={style.select}
                placeholder={'Уровень образования'}
                errors={errors}
              />
            </div>
            <div>
              <LField
                id="year_ending"
                name="year_ending"
                type="number"
                onChange={e => {
                  const { name, value } = e.target;
                  setValue(name, value);
                }}
                label={'Год окончания'}
                control={control}
                errors={errors}
              />
            </div>
          </div>
          <div>
            <div>
              <SelectSearch
                placeholder="Введите для выбора ВУЗа"
                control={control}
                name="select_university"
                options={options}
                errors={errors}
              />
            </div>
          </div>
          <div className={style.diploma}>
            <div>
              <LField
                id="diploma_series"
                name="diploma_series"
                type="text"
                onChange={e => {
                  const { name, value, maxLength } = e.target;
                  setValue(name, value);
                  value.length === maxLength && diploma_number.current.focus();
                }}
                max={8}
                label={'Серия диплома'}
                control={control}
                errors={errors}
              />
            </div>
            <div>
              <LField
                id="diploma_number"
                name="diploma_number"
                type="text"
                onChange={e => {
                  const { name, value, maxLength } = e.target;
                  setValue(name, value);
                  value.length === maxLength &&
                    diploma_specialty.current.focus();
                }}
                max={8}
                inputRef={diploma_number}
                label={'Номер диплома'}
                control={control}
                errors={errors}
              />
            </div>
          </div>
          <div>
            <div>
              <LField
                id="diploma_specialty"
                name="diploma_specialty"
                type="text"
                onChange={e => {
                  const { name, value, maxLength } = e.target;
                  setValue(name, value);
                  value.length === maxLength &&
                    diploma_qualification.current.focus();
                }}
                max={8}
                inputRef={diploma_specialty}
                label={'Специальность по диплому'}
                control={control}
                errors={errors}
              />
            </div>
          </div>
          <div>
            <div>
              <LField
                id="diploma_qualification"
                name="diploma_qualification"
                inputRef={diploma_qualification}
                onChange={e => {
                  const { name, value, maxLength } = e.target;
                  setValue(name, value);
                }}
                type="text"
                label={'Квалификация по диплому'}
                control={control}
                errors={errors}
              />
            </div>
          </div>
          <div onClick={() => setCheckbox(!checkbox)} className={style.label}>
            {!checkbox ? (
              <>
                <span
                  className={
                    getValues('checkbox') === undefined
                      ? style.errorChecked + ' ' + style.firstChild
                      : style.firstChild
                  }
                />
                <span
                  className={
                    getValues('checkbox') === undefined &&
                    style.errorCheckedText
                  }
                >
                  Нострификация
                </span>
              </>
            ) : (
              <>
                <img src={Checked} alt="" />
                <span>Нострификация</span>
              </>
            )}
          </div>
          <div
            style={errors.file && { borderColor: 'red' }}
            onClick={onButtonClick}
            className={style.document}
          >
            <input
              ref={inputFile}
              style={{ display: 'none' }}
              id="file"
              name="file"
              type="file"
              onChange={event => {
                setValue('file', event.currentTarget.files[0]);
                getValues('file').name !== undefined &&
                  setNameFile(getValues('file').name);
              }}
            />
            <span>Документ: </span>
            {!nameFile ? (
              <>
                <span className={style.main}>Загрузить файлы или </span>
                <span>открыть проводник</span>
              </>
            ) : (
              <>{nameFile}</>
            )}
          </div>
        </div>
        {formStore && (
          <div className={style.store}>
            <FormStore />
          </div>
        )}
      </div>
      <div className={style.btn}>
        <Button appClassName="" onClick={handleSubmit(handlerSubmit)}>
          Сохранить
        </Button>
        <Button
          onClick={() => {
            setFormStore(false);
            dispatch(formAC(null));
          }}
          appClassName=""
        >
          Отмена
        </Button>
      </div>
    </div>
  );
};
export default From;
