import React, { useState, forwardRef } from 'react';
import style from './LField.module.scss';
import TextField from '@material-ui/core/TextField';
import { Controller } from 'react-hook-form';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const CssTextField = withStyles({
  root: {
    width: '100%',

    '& label.Mui-focused': {
      // color: 'green'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green'
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(25px, 10px) scale(0.75)'
    },
    '& .PrivateNotchedOutline-legendNotched-7': {
      maxWidth: 0
    },
    '& .MuiOutlinedInput-input': {
      padding: '26.5px 26px 10px'
    },
    '& .MuiFormLabel-root': {
      '&:before': {
        content: '"*"',
        color: 'red',
        opacity: 1
      }
    },
    '& .Mui-error.MuiOutlinedInput-root': {
      background: 'rgba(215, 44, 51, 0.07)'
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '24px',
      border: '1px',
      '& fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.2)'
      },
      '&:hover fieldset': {
        borderColor: '#E62B25'
      },
      '&.Mui-focused fieldset': {
        border: '2px solid',
        borderColor: '#E62B25'
      }
    }
  }
})(TextField);

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    // margin: theme.spacing(1)
  }
}));

export const LField = props => {
  const classes = useStyles();
  const [isShowHide, setIsShowHide] = useState(true);
  const {
    errors,
    appClassName,
    type,
    onChange,
    inputRef,
    max,
    ...rest
  } = props;
  return (
    <div className={`${style.main} ${appClassName}`}>
      <Controller
        name={rest.name}
        control={rest.control}
        render={({ field }) => (
          <CssTextField
            {...field}
            inputProps={max && { maxLength: max }}
            inputRef={inputRef}
            onChange={onChange}
            type={type}
            className={classes.margin}
            error={!!errors[rest.name]}
            label={rest.label}
            variant="outlined"
          />
        )}
      />
      {errors[rest.name] && (
        <p className={style.error}>Поля обязательные для заполнения</p>
      )}
    </div>
  );
};
