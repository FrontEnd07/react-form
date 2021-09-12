import React from 'react';
import style from './FormStore.module.scss';
import { useSelector } from 'react-redux';
import Check from './../../../assets/svg/check.svg';

const FormStore = () => {
  const { form } = useSelector(state => state.app);
  return (
    <div className={style.main}>
      <div className={style.first}>
        <div>
          <span>Уровень образования</span>
          <span>{form && form.level_education.label}</span>
        </div>
        <div>
          <span>Год окончания</span>
          <span>{form && form.year_ending}</span>
        </div>
      </div>
      <div className={style.Oneclass}>
        <span>Московский технический университет</span>
        <span>{form && form.select_university.label}</span>
      </div>
      <div className={style.first}>
        <div>
          <span>Серия диплома</span>
          <span>{form && form.diploma_series}</span>
        </div>
        <div>
          <span>Номер диплома</span>
          <span>{form && form.diploma_number}</span>
        </div>
      </div>
      <div className={style.Oneclass}>
        <span>Специальность по диплому</span>
        <span>{form && form.diploma_specialty}</span>
      </div>
      <div className={style.Oneclass}>
        <span>Квалификация по диплому</span>
        <span>{form && form.diploma_qualification}</span>
      </div>
      <div className={style.cheked}>
        <span>
          <img src={Check} />
        </span>
        <span>Нострификация</span>
      </div>
      <div onClick={() => alert(form.file.name)} className={style.docs}>
        <span>Документ: </span>
        <span>Скачать документ</span>
      </div>
    </div>
  );
};

export default FormStore;
